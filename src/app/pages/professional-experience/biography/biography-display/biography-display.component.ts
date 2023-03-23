import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserBiography } from '@services/flxwealthmanager.api.client';
import { professionalExperienceDialogTypes } from '@shared/dialog.config';
import { ImageSources } from '@shared/resource.utils';
import { Subscription } from 'rxjs';
import { ProfessionalExperienceHelperService } from '../../professional-experience-helper.service';
import {
  ProfessionalExperienceActions
} from '../../professional-experience-state-management/professional-experience.actions';

@Component({
  selector: 'app-biography-display',
  templateUrl: './biography-display.component.html',
  styleUrls: ['./biography-display.component.scss']
})
export class BiographyDisplayComponent implements OnInit {
  Images = ImageSources;
  @Input() biography: UserBiography;

  private sub$: Subscription;

  constructor(private readonly store: Store,
    private readonly helperService: ProfessionalExperienceHelperService) { }

  ngOnInit(): void {
  }

  delete() {
    if (!this.biography) {
      return;
    }
    this.helperService.openConfirmDialog('Do you really want to delete this record?')
      .then(response => {
        response && this.store.dispatch(new ProfessionalExperienceActions.DeleteBiography(this.biography.id!!));
      })
  }

  edit() {
    this.sub$ = this.store.dispatch(new ProfessionalExperienceActions.ResetBiography(this.biography))
      .subscribe(() => this.helperService.openDialog(professionalExperienceDialogTypes.bio));
  }

}
