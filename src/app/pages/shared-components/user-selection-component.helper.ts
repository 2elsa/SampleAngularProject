import { ChangeDetectorRef } from "@angular/core";
import { AppService } from "@services/app.service";
import { ExtendedNamedModel } from "@shared/extended-named-model";
import { UserSelectionHelper } from "@shared/user-selection-helper";
import { combineLatest, forkJoin, Observable } from "rxjs";

export abstract class UserSelectionComponentHelper<TUserOption> {

  optionList: ExtendedNamedModel[];
  userOptions: TUserOption[];
  abstract title: string;

  private user_matching_propertyName: string;
  private apiFuncs: {
    fromJsConverter: (model: any) => TUserOption,
    onUserSelected: (option: ExtendedNamedModel, model: TUserOption) => Observable<TUserOption>,
    onUserDeleted: (selection: ExtendedNamedModel) => Observable<boolean>
  };

  constructor(protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService) { }

  protected init(sources: [Observable<ExtendedNamedModel[]>, Observable<TUserOption[]>], matchingPropertyName: string,
    apiFuncs: {
      fromJsConverter: (model: any) => TUserOption,
      onUserSelected: (option: ExtendedNamedModel, model: TUserOption) => Observable<TUserOption>,
      onUserDeleted: (selection: ExtendedNamedModel) => Observable<boolean>
    }) {

    this.apiFuncs = apiFuncs;
    this.user_matching_propertyName = matchingPropertyName;

    combineLatest(sources).subscribe(resultSet => {
      this.optionList = resultSet[0].map(e => (<ExtendedNamedModel>{ ...e }));
      this.userOptions = resultSet[1].map(e => (<TUserOption>{ ...e }));
    });
  }

  onSelectionChanged($event: ExtendedNamedModel): void {
    const changed = { ...$event } as ExtendedNamedModel;
    if (changed.checked) {
      const model = this.apiFuncs.fromJsConverter(changed) as any;
      model['user_Id'] = this.appService.currentUser.id;
      model['id'] = changed.userOptionId;
      model[this.user_matching_propertyName] = changed.id;
      this.apiFuncs.onUserSelected(changed, model).subscribe(d => {
        changed.userOptionId = +(d as any)[this.user_matching_propertyName];
        this.cdr.detectChanges();
        console.log('hurray...saved!!');
      });
    } else if (!changed.checked && (changed.id || 0) > 0) {
      this.apiFuncs.onUserDeleted(changed).subscribe(d => {
        changed.checked = !d;
        this.cdr.detectChanges();
        console.log('hmmm...deleted!!');
      });
    }
  }
}