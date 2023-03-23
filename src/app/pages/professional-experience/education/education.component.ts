import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { CountryState, NamedModel, UserEducation } from '@services/flxwealthmanager.api.client';
import { ComponentFormHelper } from '@shared-components/shared-form-component.helper';
import { Utils } from '@shared/utils';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ProfessionalExperienceActions
} from '../professional-experience-state-management/professional-experience.actions';
import {
  ProfessionalExperienceState,
  ProfessionalExperienceStateModel
} from '../professional-experience-state-management/professional-experience.state';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent extends ComponentFormHelper.SharedFormComponentHelper<UserEducation>
  implements OnInit, OnDestroy {

  title = 'Education';

  countries: NamedModel[] = [];
  states: CountryState[] = [];

  startYears: number[] = Utils.getYearsSince(new Date(), 100, 'back');
  endYears: number[] = [];

  private subs$: { [key: string]: Subscription | undefined } = {};

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
      fromJs: (formData) => {
        return UserEducation.fromJS(formData);
      },
      formDataSource: () => this.state$.pipe(map(s => s.selectedEducation || UserEducation.fromJS({ user_Id: this.appService.currentUser?.id }))),
      onFormSave: (formData) => this.store.dispatch(formData.id ? new ProfessionalExperienceActions.UpdateEducation(formData)
        : new ProfessionalExperienceActions.AddEducation(formData))
    }).then(() => {
      const countryFrmCtrl = this.form.get('country_Id');
      this.subs$['country'] = countryFrmCtrl?.valueChanges
        .subscribe(countryId => {
          this.getStates(+countryId);
        });

      const attendedFromCtrl = this.form.get('year_From');
      this.subs$['attendedFrom'] = attendedFromCtrl?.valueChanges.subscribe((val: any) => {
        this.endYears = +val && this.filterEndYear(+val) || []
        this.cdr.detectChanges();
      });
      this.cdr.detectChanges();
    });

    this.state$.subscribe(state => {
      if (!this.countries.length) {
        this.countries = state.countries;
      }
      this.states = state.states ?? [];
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.cleanup();
    Object.keys(this.subs$).forEach(k => this.subs$[k]?.unsubscribe());
  }

  formatState(state: CountryState) {
    return (state && state.id && state.short_Name ? `${state.long_Name} ( ${state.short_Name} )` : `${state.long_Name}`) || '';
  }

  getFormFields(data: UserEducation) {
    if (data.country_Id) {
      this.getStates(data.country_Id);
    }
    if (data.year_From) {
      this.filterEndYear(data.year_From);
    }
    this.title = `${data.id ? 'Edit' : 'Add New'} Education`;
    return {
      city: new FormControl(data?.city,
        Validators.compose([Validators.required, this.noEmptyStringValidator])),
      state_Id: new FormControl(data?.state_Id),
      country_Id: new FormControl(data?.country_Id, Validators.compose([Validators.required, this.noEmptyStringValidator])),
      school: new FormControl(data?.school, Validators.compose([Validators.required, this.noEmptyStringValidator])),
      degree: new FormControl(data?.degree, Validators.compose([Validators.required, this.noEmptyStringValidator])),
      degree_Year: new FormControl(data?.degree_Year, [Validators.maxLength(5)]),
      fields_Of_Study: new FormControl(data?.fields_Of_Study, Validators.compose([Validators.required, this.noEmptyStringValidator])),
      year_From: new FormControl(data?.year_From, Validators.compose([Validators.required])),
      year_To: new FormControl(data?.year_To),
      dissertation: new FormControl(data?.dissertation),
      advisor: new FormControl(data?.advisor),
      is_Highest: new FormControl(data?.is_Highest ?? false),
      user_Id: new FormControl(data?.user_Id || this.appService.currentUser.id),
      id: new FormControl(data?.id || 0)
    };
  }

  private filterEndYear(startYear: number): number[] {
    return this.startYears.filter(y => y >= startYear);
  }

  private getStates(countryId: number) {
    this.states = [];
    if (countryId) {
      this.store.dispatch(new ProfessionalExperienceActions.GetAllStatesForCountry(countryId));
    } else {
      this.cdr.detectChanges();
    }
  }

}
