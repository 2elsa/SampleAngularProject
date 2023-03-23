import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { LoginModel } from '@services/flxwealthmanager.api.client';
import { regex } from '@shared/regex';
import { Subscription } from 'rxjs';
import { AccountActions } from '../account-state-management/account.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  errorMsg: string | undefined;
  busy?: boolean;
  private sub$: Subscription;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly appService: AppService,
    private readonly store: Store) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailAddress: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(regex.email)])),
      password: new FormControl(null, Validators.required)
    });
  }

  login() {
    this.errorMsg = undefined;
    this.busy = true;
    if (this.form.valid) {
      const formData = LoginModel.fromJS(this.form.getRawValue());
      this.sub$ = this.store.dispatch(new AccountActions.AuthenticateUser(formData))
        .subscribe(_e => {
          this.busy = false;
          if (this.appService.isLoggedIn) {
            this.router.navigate(['/advisor-dashboard']);
          }
        }, err => {
          this.busy = false;
          this.errorMsg = 'Failed to authenticate user';
        });
    } else {
      this.busy = false;
      this.errorMsg = 'Form is not complete!';
    }
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

}
