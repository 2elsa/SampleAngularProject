import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserEducation } from '@services/flxwealthmanager.api.client';
import { professionalExperienceDialogTypes } from '@shared/dialog.config';
import { ImageSources } from '@shared/resource.utils';
import { Subscription } from 'rxjs';
import { ProfessionalExperienceHelperService } from '../../professional-experience-helper.service';
import {
  ProfessionalExperienceActions
} from '../../professional-experience-state-management/professional-experience.actions';

@Component({
  selector: 'app-education-item-display',
  templateUrl: './education-item-display.component.html',
  styleUrls: ['./education-item-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationItemDisplayComponent implements OnInit, OnDestroy {
  Images = ImageSources;

  @Input() education: UserEducation;

  private sub$: Subscription;
  constructor(private readonly store: Store,
    private readonly helperService: ProfessionalExperienceHelperService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  delete() {
    if (!this.education) {
      return;
    }
    this.helperService.openConfirmDialog('Do you really want to delete this record?')
      .then(response => {
        response && this.store.dispatch(new ProfessionalExperienceActions.DeleteEducation(this.education.id!!));
      })
  }

  edit() {
    this.sub$ = this.store.dispatch(new ProfessionalExperienceActions.ResetSelectedEducation(this.education))
      .subscribe(() => this.helperService.openDialog(professionalExperienceDialogTypes.education));
  }
}
