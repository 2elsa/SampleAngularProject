import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { FlxWealthManagerApiClient, UserIndustryExperience } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { registrationCertificationOptionIdMapper } from '@shared/user-selection-helper';
import { Subscription, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  RegistrationCertificationActions
} from '../registration-certification-state-management/registration-certification.actions';
import { registrationCertificationStateNs as proExpNs }
  from '../registration-certification-state-management/registration-certification.state';

@Component({
  selector: 'app-industry-experience',
  templateUrl: './industry-experience.component.html',
  styleUrls: ['./industry-experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndustryExperienceComponent extends UserSelectionComponentHelper<UserIndustryExperience> implements OnInit {
  title = 'Edit Industry Experience';

  @Select(proExpNs.RegistrationCertificationState) state$: Observable<proExpNs.RegistrationCertificationStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.state$.pipe(map(m => m.industryExperienceOptions)),
      this.state$.pipe(map(s => s.userIndustryExperience))],
      registrationCertificationOptionIdMapper.industryExperience, {
      fromJsConverter: UserIndustryExperience.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserIndustryExperience) => {
        return this.store.dispatch(new RegistrationCertificationActions.AddedUserIndustryExperience(option, model));
      },
      onUserDeleted: (_model: ExtendedNamedModel) => {
        return of(true);
      }
    });
  }

  onSelectionChanged(e: ExtendedNamedModel): void {
    this.optionList.filter(o => o.id !== e.id).forEach(o => o.checked = false);
    const changed = { ...e } as ExtendedNamedModel;
    const model = UserIndustryExperience.fromJS(changed);
    model['id'] = this.appService.currentUser.id;
    model.experience_Id = changed.id;
    this.store.dispatch(new RegistrationCertificationActions.AddedUserIndustryExperience(e, model))
      .subscribe(_d => {
        this.cdr.detectChanges();
      });
  }
  
}
