import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserProfessionalAssociation } from '@services/flxwealthmanager.api.client';
import { professionalExperienceDialogTypes } from '@shared/dialog.config';
import { ImageSources } from '@shared/resource.utils';
import { Subscription } from 'rxjs';
import { ProfessionalExperienceHelperService } from '../../professional-experience-helper.service';
import { ProfessionalExperienceActions } from '../../professional-experience-state-management/professional-experience.actions';

@Component({
  selector: 'app-profession-association-item-display',
  templateUrl: './profession-association-item-display.component.html',
  styleUrls: ['./profession-association-item-display.component.scss']
})
export class ProfessionAssociationItemDisplayComponent implements OnInit, OnDestroy {
  Images = ImageSources;

  @Input() proAssoc: UserProfessionalAssociation;
  private sub$: Subscription;
  constructor(private readonly store: Store,
    private readonly helperService: ProfessionalExperienceHelperService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  delete() {
    if (!this.proAssoc) {
      return;
    }
    this.helperService.openConfirmDialog('Do you really want to delete this record?')
      .then(response => {
        response && this.store.dispatch(new ProfessionalExperienceActions.DeleteProfessionalAssociation(this.proAssoc.id!!));
      });
  }

  edit() {
    this.sub$ = this.store.dispatch(new ProfessionalExperienceActions.ResetSelectedProfessionalAssociation(this.proAssoc))
      .subscribe(() => this.helperService.openDialog(professionalExperienceDialogTypes.professionalAssociation));
  }
}
