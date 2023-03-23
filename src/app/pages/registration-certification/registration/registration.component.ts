import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserRegistration } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { registrationCertificationOptionIdMapper } from '@shared/user-selection-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  RegistrationCertificationActions
} from '../registration-certification-state-management/registration-certification.actions';
import { registrationCertificationStateNs as proExpNs }
  from '../registration-certification-state-management/registration-certification.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent extends UserSelectionComponentHelper<UserRegistration> implements OnInit {
  title = 'Edit Wealth Manager Registrations';

  @Select(proExpNs.RegistrationCertificationState) state$: Observable<proExpNs.RegistrationCertificationStateModel>;

  constructor(
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.state$.pipe(map(m => m.registrationOptions)),
      this.state$.pipe(map(s => s.userRegistrations))],
      registrationCertificationOptionIdMapper.registration, {
      fromJsConverter: UserRegistration.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserRegistration) => {
        return this.store.dispatch(new RegistrationCertificationActions.AddedUserRegistration(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new RegistrationCertificationActions.DeletedUserRegistration(model))
      }
    });
  }

}
