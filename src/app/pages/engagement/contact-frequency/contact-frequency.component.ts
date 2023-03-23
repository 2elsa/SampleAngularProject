import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { FlxWealthManagerApiClient, UserClientFocus, UserContactFrequency } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { EngagementActions } from '../engagement-state-management/engagement.actions';
import { EngagementState, EngagementStateModel } from '../engagement-state-management/engagement.state';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { engagementUserOptionIdMapper } from '@shared/user-selection-helper';

@Component({
  selector: 'app-contact-frequency',
  templateUrl: './contact-frequency.component.html',
  styleUrls: ['./contact-frequency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFrequencyComponent extends UserSelectionComponentHelper<UserContactFrequency> implements OnInit {

  title = 'Edit Wealth Manager Contact Frequency';
  @Select(EngagementState) engagementState$: Observable<EngagementStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.engagementState$.pipe(map(m => m.contactFrequencyOptions)),
      this.engagementState$.pipe(map(s => s.userContactFrequencies))], engagementUserOptionIdMapper.contactFrequency, {
      fromJsConverter: UserContactFrequency.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserContactFrequency) => {
        return this.store.dispatch(new EngagementActions.AddedUserContactFrequency(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return of(true);
      }
    });
  }

  onSelectionChanged(e: ExtendedNamedModel): void {
    this.optionList.filter(o => o.id !== e.id).forEach(o => o.checked = false);
    const changed = { ...e } as ExtendedNamedModel;
    const model = UserContactFrequency.fromJS(changed);
    model['id'] = this.appService.currentUser.id;
    model.frequency_Id = changed.id;
    this.store.dispatch(new EngagementActions.AddedUserContactFrequency(e, model))
      .subscribe(_d => {
        this.cdr.detectChanges();
      });
  }
}
