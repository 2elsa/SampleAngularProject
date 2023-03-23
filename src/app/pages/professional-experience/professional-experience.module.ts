import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalExperienceComponent } from './professional-experience.component';
import { RouterModule, Routes } from '@angular/router';
import { BiographyComponent } from './biography/biography.component';
import { LinkedInComponent } from './linked-in/linked-in.component';
import { JobHistoryComponent } from './job-history/job-history.component';
import { EducationComponent } from './education/education.component';
import {
  ProfessionalAssociationComponent
} from './professional-association/professional-association.component';
import { HonorAndAwardComponent } from './honor-and-award/honor-and-award.component';
import { QuillModule } from 'ngx-quill';
import { SharedComponentsModule } from '@shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import {
  ProfessionalExperienceState
} from './professional-experience-state-management/professional-experience.state';
import {
  EducationItemDisplayComponent
} from './education/education-item-display/education-item-display.component';
import { AwardItemDisplayComponent } from './honor-and-award/award-item-display/award-item-display.component';
import {
  JobHistoryItemDisplayComponent
} from './job-history/job-history-item-display/job-history-item-display.component';
import { LinkedInDisplayComponent } from './linked-in/linked-in-display/linked-in-display.component';
import {
  ProfessionAssociationItemDisplayComponent
} from './professional-association/profession-association-item-display/profession-association-item-display.component';
import { ProfessionalExperienceHelperService } from './professional-experience-helper.service';
import { BiographyDisplayComponent } from './biography/biography-display/biography-display.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDateFnsDateModule } from 'ngx-mat-datefns-date-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  { path: '', component: ProfessionalExperienceComponent }
]
@NgModule({
  declarations: [
    ProfessionalExperienceComponent,
    BiographyComponent,
    LinkedInComponent, JobHistoryComponent,
    EducationComponent, ProfessionalAssociationComponent,
    HonorAndAwardComponent,
    EducationItemDisplayComponent,
    AwardItemDisplayComponent,
    JobHistoryItemDisplayComponent,
    LinkedInDisplayComponent,
    ProfessionAssociationItemDisplayComponent,
    BiographyDisplayComponent],
  providers: [ProfessionalExperienceHelperService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: "us"
    }],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDateFnsDateModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    QuillModule.forRoot(),
    NgxsModule.forFeature([ProfessionalExperienceState])
  ]
})
export class ProfessionalExperienceModule { }
