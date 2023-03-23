import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { EngagementComponent } from './engagement.component';
import { PreferredContactTimeComponent } from './preferred-contact-time/preferred-contact-time.component';
import { DesiredSolutionComponent } from './desired-solution/desired-solution.component';
import { ContactFrequencyComponent } from './contact-frequency/contact-frequency.component';
import { ClientFocusComponent } from './client-focus/client-focus.component';
import { InvestmentComponent } from './investment/investment.component';
import { PreferredEngagementComponent } from './preferred-engagement/preferred-engagement.component';
import { ReviewManagerComponent } from './review-manager/review-manager.component';
import { SharedComponentsModule } from '@shared-components/shared-components.module';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { EngagementState } from './engagement-state-management/engagement.state';

const routes: Routes = [
  { path: '', component: EngagementComponent }
]

@NgModule({
  declarations: [EngagementComponent,
    PreferredContactTimeComponent,
    DesiredSolutionComponent,
    ContactFrequencyComponent,
    ClientFocusComponent,
    InvestmentComponent,
    PreferredEngagementComponent,
    ReviewManagerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    SharedComponentsModule,
    NgxsModule.forFeature([EngagementState]),
    RouterModule.forChild(routes)
  ]
})
export class EngagementModule { }
