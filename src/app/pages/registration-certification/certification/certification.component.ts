import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserCertification } from '@services/flxwealthmanager.api.client';
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
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificationComponent extends UserSelectionComponentHelper<UserCertification> implements OnInit {
  title = 'Edit Certifications';

  @Select(proExpNs.RegistrationCertificationState) state$: Observable<proExpNs.RegistrationCertificationStateModel>;

  constructor(
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.state$.pipe(map(m => m.certificationOptions)),
      this.state$.pipe(map(s => s.userCertifications))],
      registrationCertificationOptionIdMapper.certification, {
      fromJsConverter: UserCertification.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserCertification) => {
        return this.store.dispatch(new RegistrationCertificationActions.AddedUserCertification(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new RegistrationCertificationActions.DeletedUserCertification(model))
      }
    });
  }

}
