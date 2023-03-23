import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { CountryState, NamedModel, UserJobHistory } from '@services/flxwealthmanager.api.client';
import { ComponentFormHelper } from '@shared-components/shared-form-component.helper';
import { regex } from '@shared/regex';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfessionalExperienceActions } from '../professional-experience-state-management/professional-experience.actions';
import { ProfessionalExperienceState, ProfessionalExperienceStateModel } from '../professional-experience-state-management/professional-experience.state';
const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/yyyy',
    monthYearLabel: 'MMM yyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.scss'],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobHistoryComponent extends ComponentFormHelper.SharedFormComponentHelper<UserJobHistory>
  implements OnInit, OnDestroy {

  title = 'Job History';


  countries: NamedModel[] = [];
  states: CountryState[] = [];

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
      fromJs: (formData) => UserJobHistory.fromJS(formData),
      formDataSource: () => this.state$.pipe(map(s => s.selectedJobHistory || UserJobHistory.fromJS({ user_Id: this.appService.currentUser?.id }))),
      onFormSave: (formData) => this.store.dispatch(formData.id ? new ProfessionalExperienceActions.UpdateJobHistory(formData)
        : new ProfessionalExperienceActions.AddJobHistory(formData))
    }).then(() => {
      this.form.get('country_Id')?.valueChanges
        .subscribe(countryId =>
          countryId && this.store.dispatch(new ProfessionalExperienceActions.GetAllStatesForCountry(+countryId)));
      this.form.get('is_Present')?.valueChanges.subscribe(val => {
        const endDateCntrl = this.form.get('end_Date');
        if (!!val) {
          endDateCntrl?.setValue(null);
          endDateCntrl?.setValidators(null);
          endDateCntrl?.disable();
        } else {
          endDateCntrl?.enable();
          endDateCntrl?.setValidators(Validators.required);
          endDateCntrl?.updateValueAndValidity();
        }
      });
      this.cdr.detectChanges();
    });

    this.state$.subscribe(state => {
      this.countries = state.countries;
      this.states = state.states;
    });
  }

  ngOnDestroy() {
    this.cleanup();
  }

  chosenYearHandler(year: any, control?: AbstractControl) {
    control?.setValue(year);
  }

  chosenMonthHandler(month: any, datepicker: MatDatepicker<any>, control?: AbstractControl) {
    control?.setValue(month);
    datepicker?.close();
  }

  formatState(state: CountryState) {
    return (state && state.id && state.short_Name ? `${state.long_Name} ( ${state.short_Name} )` : `${state.long_Name}`) || '';
  }

  get today(): Date {
    return new Date();
  }

  get maxEndDate(): Date | null{
    const startDate = this.form?.get('start_Date')?.value;
    return startDate && new Date(startDate) || null;
  }

  getFormFields(data: UserJobHistory) {

    if (data.country_Id) {
      this.store.dispatch(new ProfessionalExperienceActions.GetAllStatesForCountry(data.country_Id));
    }
    this.title = `${data.id ? 'Edit' : 'Add New'} Job History`;

    return {
      company_Name: new FormControl(data?.company_Name,
        Validators.compose([Validators.required, this.noEmptyStringValidator])),
      title: new FormControl(data?.title,
        Validators.compose([Validators.required, this.noEmptyStringValidator])),
      city: new FormControl(data?.city, Validators.compose([Validators.required, this.noEmptyStringValidator])),
      state_Id: new FormControl(data?.state_Id),
      country_Id: new FormControl(data?.country_Id, Validators.compose([Validators.required, this.noEmptyStringValidator])),
      start_Date: new FormControl(data?.start_Date, [Validators.required]),
      end_Date: new FormControl({ value: data?.end_Date, disabled: data?.is_Present ?? false }),
      is_Present: new FormControl(data?.is_Present, data?.is_Present ? [] : [Validators.required]),
      web_Address: new FormControl(data?.web_Address, Validators.pattern(regex.websiteUrl)),
      user_Id: new FormControl(data?.user_Id || this.appService.currentUser.id),
      id: new FormControl(data?.id || 0)
    };
  }
}
