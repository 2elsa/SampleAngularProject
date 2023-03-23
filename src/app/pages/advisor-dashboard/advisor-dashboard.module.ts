import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdvisorDashboardComponent } from './advisor-dashboard.component';
import { NavComponent } from 'src/app/layout/nav/nav.component';
import { ProfileCompletionComponent } from 'src/app/layout/profile-completion/profile-completion.component';
import { ProfileComponent } from 'src/app/layout/profile/profile.component';
import { QuickLinksComponent } from 'src/app/layout/quick-links/quick-links.component';
import { SideNavComponent } from 'src/app/layout/side-nav/side-nav.component';
import { TopStoryComponent } from 'src/app/layout/top-story/top-story.component';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '@shared-components/shared-components.module';
import { NgxsModule } from '@ngxs/store';
import { DashboardState } from './dash-board-state-management/dashboard-state';
import { AddPictureComponent } from 'src/app/layout/profile/add-picture/add-picture.component';
import { NavModule } from 'src/app/layout/nav/nav.module';

const routes: Routes = [
  {
    path: '', component: AdvisorDashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../engagement/engagement.module')
          .then(m => m.EngagementModule)
      },
      {
        path: 'engagement',
        loadChildren: () => import('../engagement/engagement.module')
          .then(m => m.EngagementModule)
      },
      {
        path: 'professional-experience',
        loadChildren: () => import('../professional-experience/professional-experience.module')
          .then(m => m.ProfessionalExperienceModule)
      },
      {
        path: 'investment-utilization',
        loadChildren: () => import('../investment-utilization/investment-utilization.module')
          .then(m => m.InvestmentUtilizationModule)
      }, {
        path: 'licensing',
        loadChildren: () => import('../registration-certification/registration-certification.module')
          .then(m => m.RegistrationCertificationModule)
      }
    ]
  }
]


@NgModule({
  declarations: [
    AdvisorDashboardComponent,
    ProfileComponent,
    SideNavComponent,
    ProfileCompletionComponent,
    QuickLinksComponent,
    TopStoryComponent,
    AddPictureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NavModule,
    SharedComponentsModule,
    NgxsModule.forFeature([DashboardState]),
    RouterModule.forChild(routes)
  ]
})
export class AdvisorDashboardModule { }
