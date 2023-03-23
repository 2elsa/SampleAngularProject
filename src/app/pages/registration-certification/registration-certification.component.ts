import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { UserCrd } from '@services/flxwealthmanager.api.client';
import { dialogOptions, registrationCertificationDialogTypes } from '@shared/dialog.config';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { ImageSources } from '@shared/resource.utils';
import { Observable, Subscription } from 'rxjs';
import { CertificationComponent } from './certification/certification.component';
import { CrdComponent } from './crd/crd.component';
import { IndustryExperienceComponent } from './industry-experience/industry-experience.component';
import { RegistrationCertificationActions } from './registration-certification-state-management/registration-certification.actions';
import { registrationCertificationStateNs } from './registration-certification-state-management/registration-certification.state';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-registration-certification',
  templateUrl: './registration-certification.component.html',
  styleUrls: ['./registration-certification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationCertificationComponent implements OnInit, OnDestroy {

  dialogType = registrationCertificationDialogTypes;
  Images = ImageSources;

  private dialogConfig = {
    minHeight: dialogOptions.height,
    minWidth: '40vw',
    maxWidth: dialogOptions.width
  };

  model: {
    registrations: ExtendedNamedModel[],
    certifications: ExtendedNamedModel[],
    crd?: UserCrd,
    industryExperience?: ExtendedNamedModel
  } = {
      registrations: [], certifications: []
    };

  private sub$: Subscription;

  @Select(registrationCertificationStateNs.RegistrationCertificationState)
  state$: Observable<registrationCertificationStateNs.RegistrationCertificationStateModel>;

  constructor(private readonly title: Title,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly store: Store) { }

  ngOnInit(): void {
    this.title.setTitle('Licensing');
    this.loadRegistrationCertificationData();
    this.handleStateChanges();
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  openDialog(dialogType: registrationCertificationDialogTypes) {
    switch (dialogType) {
      case registrationCertificationDialogTypes.certification:
        this.dialog.open(CertificationComponent, this.dialogConfig);
        break;
      case registrationCertificationDialogTypes.crd:
        this.dialog.open(CrdComponent, this.dialogConfig);
        break;
      case registrationCertificationDialogTypes.industry_experience:
        this.dialog.open(IndustryExperienceComponent, this.dialogConfig);
        break;
      case registrationCertificationDialogTypes.registration:
        this.dialog.open(RegistrationComponent, this.dialogConfig);
        break;
      default:
        throw new Error(`no dialog setup for ${dialogType}`);
    }
  }

  private handleStateChanges() {
    this.sub$ = this.state$.subscribe(s => {
      this.model.registrations = s.registrationOptions.filter(c => c.checked);
      this.model.certifications = s.certificationOptions.filter(c => c.checked);
      this.model.crd = s.userCrd;
      this.model.industryExperience = s.industryExperienceOptions.find(c => c.checked);
      this.cdr.detectChanges();
    });
  }

loadRegistrationCertificationData() {
    this.store.dispatch(new RegistrationCertificationActions.GetAllUserRegistrationCertificationInfo());
  }
}
