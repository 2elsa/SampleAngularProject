import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailModel, FlxWealthManagerApiClient } from '@services/flxwealthmanager.api.client';
import { regex } from '@shared/regex';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent implements OnInit {

  form: FormGroup
  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly apiClient: FlxWealthManagerApiClient) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(regex.email)]))
    });
  }

  resetPassword() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.apiClient.requestPasswordReset(EmailModel.fromJS(formData))
        .subscribe(_ => this.router.navigate(['/account/password-change']),
          (err: HttpErrorResponse) => {
            console.log('errrors:', err)
          });
    }
  }
}
