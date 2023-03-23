import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserHonorAndAward } from '@services/flxwealthmanager.api.client';
import { professionalExperienceDialogTypes } from '@shared/dialog.config';
import { ImageSources } from '@shared/resource.utils';
import { Subscription } from 'rxjs';
import { ProfessionalExperienceHelperService } from '../../professional-experience-helper.service';
import {
  ProfessionalExperienceActions
} from '../../professional-experience-state-management/professional-experience.actions';

@Component({
  selector: 'app-award-item-display',
  templateUrl: './award-item-display.component.html',
  styleUrls: ['./award-item-display.component.scss']
})
export class AwardItemDisplayComponent implements OnInit, OnDestroy {
  Images = ImageSources;

  @Input() award: UserHonorAndAward;

  private sub$: Subscription;
  constructor(private readonly store: Store,
    private readonly helperService: ProfessionalExperienceHelperService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  delete() {
    if (!this.award) {
      return;
    }
    this.helperService.openConfirmDialog('Do you really want to delete this record?')
      .then(response => {
        response && this.store.dispatch(new ProfessionalExperienceActions.DeleteHonorAward(this.award.id!!));
      })
  }

  edit() {
    this.sub$ = this.store.dispatch(new ProfessionalExperienceActions.ResetSelectedHonorAward(this.award))
      .subscribe(() => this.helperService.openDialog(professionalExperienceDialogTypes.honorAward));
  }
}
