import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserProfessionalAssociation } from '@services/flxwealthmanager.api.client';
import { ComponentFormHelper } from '@shared-components/shared-form-component.helper';
import { Utils } from '@shared/utils';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfessionalExperienceActions } from '../professional-experience-state-management/professional-experience.actions';
import { ProfessionalExperienceState, ProfessionalExperienceStateModel } from '../professional-experience-state-management/professional-experience.state';

@Component({
  selector: 'app-professional-association',
  templateUrl: './professional-association.component.html',
  styleUrls: ['./professional-association.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalAssociationComponent extends ComponentFormHelper.SharedFormComponentHelper<UserProfessionalAssociation>
  implements OnInit, OnDestroy {

  title = 'Professional Association';
  startYears: number[] = Utils.getYearsSince(new Date(), 100, 'back');
  endYears: number[];

  private subs$: Record<string, Subscription | undefined> = {};

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
      fromJs: (formData) => UserProfessionalAssociation.fromJS(formData),
      formDataSource: () => this.state$.pipe(map(s => s.selectedProfessionalAssociation || UserProfessionalAssociation.fromJS({ user_Id: this.appService.currentUser?.id }))),
      onFormSave: (formData) => this.store.dispatch(formData.id ? new ProfessionalExperienceActions.UpdateProfessionalAssociation(formData)
        : new ProfessionalExperienceActions.AddProfessionalAssociation(formData))
    }).then(() => {
      this.subs$['attendedFrom'] = this.form.get('start_Year')?.valueChanges.subscribe(val => {
        this.endYears = +val && this.startYears.filter(y => y >= +val) || [];
        this.cdr.detectChanges();
      });
      this.form.get('is_Present')?.valueChanges.subscribe(val => {
        const endYearCntrl = this.form.get('end_Year');
        if (!!val) {
          endYearCntrl?.setValue(undefined);
          endYearCntrl?.disable();
          endYearCntrl?.setValidators(null);
        } else {
          endYearCntrl?.enable();
          endYearCntrl?.setValidators(Validators.required);
          endYearCntrl?.updateValueAndValidity();
        }
      });


    });
  }

  ngOnDestroy() {
    this.cleanup();
  }

  getFormFields(data: UserProfessionalAssociation) {
    this.title = `${data.id ? 'Edit' : 'Add New'} Professional Association`;
    return {
      association_Name: new FormControl(data?.association_Name,
        Validators.compose([Validators.required, this.noEmptyStringValidator])),
      start_Year: new FormControl(data.start_Year, Validators.compose([Validators.required, this.noEmptyStringValidator])),
      end_Year: new FormControl({value: data.end_Year, disabled: data.is_Present}),
      is_Present: new FormControl(data?.is_Present),
      user_Id: new FormControl(data?.user_Id || this.appService.currentUser.id),
      id: new FormControl(data?.id || 0)
    };
  }
}
