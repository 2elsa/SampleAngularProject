import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserHonorAndAward } from '@services/flxwealthmanager.api.client';
import { ComponentFormHelper } from '@shared-components/shared-form-component.helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ProfessionalExperienceActions
} from '../professional-experience-state-management/professional-experience.actions';
import {
  ProfessionalExperienceState,
  ProfessionalExperienceStateModel
} from '../professional-experience-state-management/professional-experience.state';

@Component({
  selector: 'app-honor-and-award',
  templateUrl: './honor-and-award.component.html',
  styleUrls: ['./honor-and-award.component.scss']
})
export class HonorAndAwardComponent extends ComponentFormHelper.SharedFormComponentHelper<UserHonorAndAward>
  implements OnInit, OnDestroy {

  title = 'Honor/Award';

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
      fromJs: (formData) => UserHonorAndAward.fromJS(formData),
      formDataSource: () => this.state$.pipe(map(s => s.selectedHonorAward || UserHonorAndAward.fromJS({ user_Id: this.appService.currentUser?.id }))),
      onFormSave: (formData) => this.store.dispatch(formData.id ? new ProfessionalExperienceActions.UpdateHonorAward(formData)
        : new ProfessionalExperienceActions.AddHonorAward(formData))
    })
  }

  ngOnDestroy() {
    this.cleanup();
  }

  getFormFields(data: UserHonorAndAward) {
    this.title = `${data.id ? 'Edit' : 'Add New'} Honor/Award`;
    return {
      award_Name: new FormControl(data?.award_Name,
        Validators.compose([Validators.required, this.noEmptyStringValidator])),
      award_Organization: new FormControl(data?.award_Organization, Validators.compose([Validators.required, this.noEmptyStringValidator])),
      acronym: new FormControl(data?.acronym),
      years: new FormControl(data?.years, Validators.compose([Validators.required, this.noEmptyStringValidator])),
      user_Id: new FormControl(data?.user_Id || this.appService.currentUser.id),
      id: new FormControl(data?.id || 0)
    };
  }

}
