import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserCrd } from '@services/flxwealthmanager.api.client';
import { Observable, Subscription } from 'rxjs';
import {
  RegistrationCertificationActions
} from '../registration-certification-state-management/registration-certification.actions';
import { registrationCertificationStateNs as proExpNs }
  from '../registration-certification-state-management/registration-certification.state';

@Component({
  selector: 'app-crd',
  templateUrl: './crd.component.html',
  styleUrls: ['./crd.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrdComponent implements OnInit, OnDestroy {

  title = 'Edit Wealth Manager Crd';

  private sub$: Subscription;

  @Select(proExpNs.RegistrationCertificationState) state$: Observable<proExpNs.RegistrationCertificationStateModel>;
  model: UserCrd;

  constructor(private readonly appService: AppService,
    private readonly store: Store) { }

  ngOnInit(): void {
    this.sub$ = this.state$.subscribe(state => {
      this.model = UserCrd.fromJS(state.userCrd || { user_Id: this.appService.currentUser.id });
    });
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  saveChanges(model: UserCrd) {
    model.user_Id = this.appService.currentUser.id;
    if (model.id) {
      this.store.dispatch(new RegistrationCertificationActions.UpdateUserCrd(model));
    } else {
      this.store.dispatch(new RegistrationCertificationActions.AddedUserCrd(model));
    }
  }
}
