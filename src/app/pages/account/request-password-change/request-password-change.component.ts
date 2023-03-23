import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlxWealthManagerApiClient, PasswordModel } from '@services/flxwealthmanager.api.client';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-request-password-change',
  templateUrl: './request-password-change.component.html',
  styleUrls: ['./request-password-change.component.scss']
})
export class RequestPasswordChangeComponent implements OnInit {

  form: FormGroup

  constructor(private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly apiClient: FlxWealthManagerApiClient,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.setupForm();
  }


  private setupForm() {

    this.form = this.formBuilder.group({
      code: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [Validators.required])
    }, {
      validators: (cntrl: AbstractControl) => {
        if (this.form && this.form.dirty) {
          const password = cntrl.get('password')?.value;
          const matches = password === cntrl.get('confirmPassword')?.value;
          if (!matches) {
            return { mismatch: 'Confirm password must be same as password' };
          }
        }
        return null;
      }
    });
  }

  changePassword() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.apiClient.requestPasswordReset(PasswordModel.fromJS(formData))
        .pipe(take(1))
        .subscribe(_ => this.router.navigate(['/account/signin']));
    }
  }

}
