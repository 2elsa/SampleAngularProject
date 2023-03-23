import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegistrationCertificationComponent
} from './registration-certification.component';
import { RouterModule, Routes } from '@angular/router';
import { CrdComponent } from './crd/crd.component';
import { RegistrationComponent } from './registration/registration.component';
import { CertificationComponent } from './certification/certification.component';
import { IndustryExperienceComponent } from './industry-experience/industry-experience.component';
import { NgxsModule } from '@ngxs/store';
import {
  registrationCertificationStateNs
} from './registration-certification-state-management/registration-certification.state';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedComponentsModule } from '@shared-components/shared-components.module';

const routes: Routes = [
  { path: '', component: RegistrationCertificationComponent }
]

@NgModule({
  declarations: [RegistrationCertificationComponent,
    CrdComponent,
    RegistrationComponent,
    CertificationComponent,
    IndustryExperienceComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    SharedComponentsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([registrationCertificationStateNs.RegistrationCertificationState])
  ]
})
export class RegistrationCertificationModule { }
