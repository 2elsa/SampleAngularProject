import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Client, NamedModel, User } from '@services/flxwealthmanager.api.client';
import { regex } from '@shared/regex';
import { PhoneNumberUtil, AsYouTypeFormatter, PhoneNumberFormat } from 'google-libphonenumber';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MembershipActions } from '../membership-state-management/membership.actions';
import { MembershipState, MembershipStateModel } from '../membership-state-management/membership.state';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberComponent implements OnInit, OnDestroy {

  @Input() model: User | undefined;
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup
  busy?: boolean;
  clients: Client[] = [];
  permissions: NamedModel[] = [];
  response?: { msg?: string, type?: 'error' | 'success' } = {};

  passwordRequired = true;

  @Select(MembershipState) state$: Observable<MembershipStateModel>;

  private asYouTypeFormatter: AsYouTypeFormatter;

  private sub$: Subscription;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.passwordRequired = this.model == null || this.model?.id == null;
    this.store.dispatch(new MembershipActions.GetPermissions());
    this.store.dispatch(new MembershipActions.GetClients()).pipe(take(1)).subscribe(_ => {
      this.setupForm();
      this.setupStateListener();
    });
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  private setupForm() {

    const locale = this.getClientLocale().split('-').pop()!!;
    const phoneUtil = PhoneNumberUtil.getInstance();
    let validPhone = '';

    this.form = this.formBuilder.group({
      id: new FormControl(this.model?.id || 0),
      first_Name: new FormControl(this.model?.first_Name?.trim(), Validators.compose([Validators.required, Validators.pattern(regex.nameWithoutSpace)])),
      last_Name: new FormControl(this.model?.last_Name?.trim(), Validators.compose([Validators.required, Validators.pattern(regex.nameWithSpace)])),
      company_Name: new FormControl(this.model?.company_Name?.trim()),
      job_Title: new FormControl(this.model?.job_Title?.trim()),
      phone_Number: new FormControl(this.model?.phone_Number, Validators.compose([(cntrl) => {
        if (this.form && this.form.dirty && cntrl.dirty) {
          const num = cntrl.value;
          if (num === validPhone) {
            return null;
          }
          try {
            this.asYouTypeFormatter = new AsYouTypeFormatter(locale);
            const parsedPhone = phoneUtil.parse(num, locale);
            const formatted = this.asYouTypeFormatter.inputDigit(phoneUtil.format(parsedPhone, PhoneNumberFormat.NATIONAL));
            if (phoneUtil.isValidNumber(parsedPhone)) {
              validPhone = formatted;
              cntrl.setValue(formatted);
              return null;
            }
            return { phone: 'Enter valid phone number' };
          } catch (e) { console.log(e) }
        }
        return null;
      }])),
      client_Id: new FormControl(this.model?.client_Id || '', Validators.compose([Validators.required])),
      permission_Id: new FormControl(this.model?.permission_Id || '', Validators.compose([Validators.required])),
      email_Address: new FormControl(this.model?.email_Address?.trim(), Validators.compose([Validators.required, Validators.pattern(regex.email)])),
      password: new FormControl(null, this.passwordRequired ? [Validators.required] : []),
      confirmPassword: new FormControl(null, this.passwordRequired ? [Validators.required] : [])
    }, {
      validators: (cntrl) => {
        if (this.form && this.form.dirty && this.passwordRequired) {
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


  createAccount() {
    this.busy = true;
    this.response = undefined;
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      const user = User.fromJS(formData);
      const action = user.id ? new MembershipActions.UpdateUser(user) : new MembershipActions.CreateNewUser(user);
      this.store.dispatch(action)
        .pipe(take(1),
          tap(_ => {
            this.form.reset();
            this.busy = false;
          })).subscribe(_ => {
            this.response = { msg: `User successfully ${user.id ? 'updated' : 'created'}`, type: 'success' };
            this.cdr.detectChanges();
          }, err => {
            this.response = { msg: err, type: 'error' };
            this.cdr.detectChanges();
          });
    } else {
      this.busy = false;
      this.response = { msg: 'Form is invalid.', type: 'error' };
    }
  }

  private setupStateListener() {
    this.state$.subscribe(s => {
      this.clients = s.clients;
      this.permissions = s.permissions;
      this.cdr.detectChanges();
    });
  }

  private getClientLocale(): string {
    return (navigator.languages && navigator.languages.length > 0) ?
      navigator.languages[0] : navigator.language;
  }
}
