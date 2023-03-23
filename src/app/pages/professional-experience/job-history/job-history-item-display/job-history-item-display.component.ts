import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserJobHistory } from '@services/flxwealthmanager.api.client';
import { professionalExperienceDialogTypes } from '@shared/dialog.config';
import { ImageSources } from '@shared/resource.utils';
import { Subscription } from 'rxjs';
import { ProfessionalExperienceHelperService } from '../../professional-experience-helper.service';
import { ProfessionalExperienceActions
 } from '../../professional-experience-state-management/professional-experience.actions';

@Component({
  selector: 'app-job-history-item-display',
  templateUrl: './job-history-item-display.component.html',
  styleUrls: ['./job-history-item-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobHistoryItemDisplayComponent implements OnInit, OnDestroy {
  Images = ImageSources;

  @Input() jobHistory: UserJobHistory;
  private sub$: Subscription;
  constructor(private readonly store: Store,
    private readonly cdr: ChangeDetectorRef,
    private readonly helperService: ProfessionalExperienceHelperService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  delete() {
    if (!this.jobHistory) {
      return;
    }
    this.helperService.openConfirmDialog('Do you really want to delete this record?')
      .then(response => {
        response && this.store.dispatch(new ProfessionalExperienceActions.DeleteJobHistory(this.jobHistory.id!!));
      })
  }

  edit() {
    this.sub$ = this.store.dispatch(new ProfessionalExperienceActions.ResetSelectedJobHistory(this.jobHistory))
      .subscribe(() => this.helperService.openDialog(professionalExperienceDialogTypes.jobHistory));
  }
}
