import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from '@pages/membership/member/member.component';
import { AuthorizedAccessGuard } from 'src/app/core/guards/authorized-access.guard';
import { SuperAdminGuard } from 'src/app/core/guards/super-admin.guard';
import { LoginComponent } from './login/login.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RequestPasswordChangeComponent } from './request-password-change/request-password-change.component';
import { WelcomeComponent } from './welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '@shared-components/shared-components.module';
import { NgxsModule } from '@ngxs/store';
import { AccountState } from './account-state-management/account.state';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '', component: AccountComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'signin', component: LoginComponent },
      { path: 'password-forgotten', component: PasswordForgottenComponent },
      { path: 'password-reset', component: PasswordResetComponent },
      { path: 'password-change', component: RequestPasswordChangeComponent }
    ]
  }
]


@NgModule({
  declarations: [AccountComponent, WelcomeComponent, LoginComponent,
  PasswordForgottenComponent, PasswordResetComponent, RequestPasswordChangeComponent, NotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxsModule.forFeature([AccountState]),
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
