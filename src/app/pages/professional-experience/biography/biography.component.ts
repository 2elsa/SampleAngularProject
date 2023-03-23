import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserBiography } from '@services/flxwealthmanager.api.client';
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
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiographyComponent extends ComponentFormHelper.SharedFormComponentHelper<UserBiography>
  implements OnInit, OnDestroy {

  title = 'Share information about yourself';

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
      fromJs: (formData) => UserBiography.fromJS(formData),
      formDataSource: () => this.state$.pipe(map(s => s.biography || UserBiography.fromJS({ user_Id: this.appService.currentUser?.id }))),
      onFormSave: (bio) => this.store.dispatch(bio.id ? new ProfessionalExperienceActions.UpdateBiography(bio) : new ProfessionalExperienceActions.AddBiography(bio))
    })
  }

  ngOnDestroy() {
    this.cleanup();
  }

  getFormFields(data: UserBiography) {
    return {
      description: new FormControl(data?.description,
        Validators.compose([Validators.required, this.noEmptyStringValidator])),
      user_Id: new FormControl(data?.user_Id || this.appService.currentUser.id),
      id: new FormControl(data?.id || 0)
    };
  }
}
