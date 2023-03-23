import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MembershipComponent } from './membership.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { SharedComponentsModule } from '@shared-components/shared-components.module';
import { MembersListComponent } from './members-list/members-list.component';
import { AuthorizedAccessGuard } from 'src/app/core/guards/authorized-access.guard';
import { SuperAdminGuard } from 'src/app/core/guards/super-admin.guard';
import { MemberComponent } from './member/member.component';
import { NavModule } from 'src/app/layout/nav/nav.module';
import { MembershipState } from './membership-state-management/membership.state';

const routes: Routes = [
  {
    path: '', component: MembershipComponent,
    children: [
      {
        path:'',
        redirectTo: 'members-list'
      },
      {
        path: 'members-list',
        component: MembersListComponent,
        canActivate: [AuthorizedAccessGuard, SuperAdminGuard]
      },
      {
        path: 'sign-up',
        component: MembersListComponent,
        canActivate: [AuthorizedAccessGuard, SuperAdminGuard]
      }
    ]
  }
];


@NgModule({
  declarations: [MembershipComponent, MembersListComponent, MemberComponent],
  imports: [
    CommonModule,
    FormsModule,
    NavModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxsModule.forFeature([MembershipState]),
    RouterModule.forChild(routes)
  ]
})
export class MembershipModule { }
