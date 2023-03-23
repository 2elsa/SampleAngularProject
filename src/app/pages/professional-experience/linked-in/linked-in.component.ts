import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserLinkedIn } from '@services/flxwealthmanager.api.client';
import { ComponentFormHelper } from '@shared-components/shared-form-component.helper';
import { regex } from '@shared/regex';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfessionalExperienceActions } from '../professional-experience-state-management/professional-experience.actions';
import { ProfessionalExperienceState, ProfessionalExperienceStateModel } from '../professional-experience-state-management/professional-experience.state';

@Component({
  selector: 'app-linked-in',
  templateUrl: './linked-in.component.html',
  styleUrls: ['./linked-in.component.scss']
})
export class LinkedInComponent extends ComponentFormHelper.SharedFormComponentHelper<UserLinkedIn>
  implements OnInit, OnDestroy {

  title = 'LinkedIn Profile';

  @Select(ProfessionalExperienceState) state$: Observable<ProfessionalExperienceStateModel>;

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly appService: AppService,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly modalRef: MatDialogRef<any>,
    protected readonly store: Store) {
    super(formBuilder, cdr, modalRef, store);
  }

  ngOnInit(): void {
    this.init({
      fromJs: (formData) => UserLinkedIn.fromJS(formData),
      formDataSource: () => this.state$.pipe(map(s => s.linkedIn || UserLinkedIn.fromJS({ user_Id: this.appService.currentUser?.id }))),
      onFormSave: (formData) => this.store.dispatch(formData.id ? new ProfessionalExperienceActions.UpdateLinkedIn(formData) : new ProfessionalExperienceActions.AddLinkedIn(formData))
    })
  }

  ngOnDestroy() {
    this.cleanup();
  }

  getFormFields(data: UserLinkedIn) {
    this.title = `${data.id ? 'Edit' : 'Add'} LinkedIn Profile Link`;
    return {
      url: new FormControl(data?.url,
        Validators.compose([Validators.required, Validators.pattern(regex.linkedInUrl)])),
      user_Id: new FormControl(data?.user_Id || this.appService.currentUser.id),
      id: new FormControl(data?.id || 0)
    };
  }
}
