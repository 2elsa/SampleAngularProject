import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserLinkedIn } from '@services/flxwealthmanager.api.client';
import { professionalExperienceDialogTypes } from '@shared/dialog.config';
import { ImageSources } from '@shared/resource.utils';
import { Subscription } from 'rxjs';
import { ProfessionalExperienceHelperService } from '../../professional-experience-helper.service';
import { ProfessionalExperienceActions } from '../../professional-experience-state-management/professional-experience.actions';

@Component({
  selector: 'app-linked-in-display',
  templateUrl: './linked-in-display.component.html',
  styleUrls: ['./linked-in-display.component.scss']
})
export class LinkedInDisplayComponent implements OnInit, OnDestroy {
  Images = ImageSources;

  @Input() linkedIn: UserLinkedIn;
  private sub$: Subscription;
  constructor(private readonly store: Store,
    private readonly helperService: ProfessionalExperienceHelperService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  delete() {
    if (!this.linkedIn) {
      return;
    }
    this.helperService.openConfirmDialog('Do you really want to delete this record?')
      .then(response => {
        response && this.store.dispatch(new ProfessionalExperienceActions.DeleteLinkedIn(this.linkedIn.id!!));
      })
  }

  edit() {
    this.sub$ = this.store.dispatch(new ProfessionalExperienceActions.ResetLinkedIn(this.linkedIn))
      .subscribe(() => this.helperService.openDialog(professionalExperienceDialogTypes.linkedIn));
  }
}
