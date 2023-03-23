import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Select, Store } from '@ngxs/store';
import {
  UserBiography, UserEducation, UserHonorAndAward,
  UserJobHistory, UserLinkedIn,
  UserProfessionalAssociation
} from '@services/flxwealthmanager.api.client';
import { professionalExperienceDialogTypes } from '@shared/dialog.config';
import { ImageSources } from '@shared/resource.utils';
import { Observable, Subscription } from 'rxjs';
import { ProfessionalExperienceHelperService } from './professional-experience-helper.service';
import { ProfessionalExperienceActions } from './professional-experience-state-management/professional-experience.actions';
import { ProfessionalExperienceState, ProfessionalExperienceStateModel } from './professional-experience-state-management/professional-experience.state';

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.scss']
})
export class ProfessionalExperienceComponent implements OnInit, OnDestroy {

  dialogType = professionalExperienceDialogTypes;

  Images = ImageSources;
  private subs$: Subscription;

  model: {
    biography?: UserBiography,
    educations: UserEducation[],
    honorsAndAwards: UserHonorAndAward[],
    jobHistories: UserJobHistory[],
    linkedIn?: UserLinkedIn,
    professionalAssociations: UserProfessionalAssociation[],
  } = {
      educations: [], honorsAndAwards: [], jobHistories: [], professionalAssociations: []
    };

  @Select(ProfessionalExperienceState) state$: Observable<ProfessionalExperienceStateModel>;

  constructor(private readonly title: Title,
    private readonly cdr: ChangeDetectorRef,
    private readonly helperService: ProfessionalExperienceHelperService,
    private readonly store: Store,
    private readonly ngSelectConfig: NgSelectConfig) { }

  ngOnInit(): void {
    this.ngSelectConfig.appendTo = 'body';
    this.title.setTitle('Professional Experience');
    this.loadUserProfessionalExperienceData();
    this.handleStateChanges();
  }

  ngOnDestroy() {
    this.subs$ && this.subs$.unsubscribe();
  }

  openDialog(dialogType?: professionalExperienceDialogTypes) {
    switch (dialogType) {
      case professionalExperienceDialogTypes.bio:
        this.store.dispatch(new ProfessionalExperienceActions.ResetBiography());
        break;
      case professionalExperienceDialogTypes.education:
        this.store.dispatch(new ProfessionalExperienceActions.ResetSelectedEducation());
        break;
      case professionalExperienceDialogTypes.honorAward:
        this.store.dispatch(new ProfessionalExperienceActions.ResetSelectedHonorAward());
        break;
      case professionalExperienceDialogTypes.jobHistory:
        this.store.dispatch(new ProfessionalExperienceActions.ResetSelectedJobHistory());
        break;
      case professionalExperienceDialogTypes.linkedIn:
        this.store.dispatch(new ProfessionalExperienceActions.ResetLinkedIn());
        break;
      case professionalExperienceDialogTypes.professionalAssociation:
        this.store.dispatch(new ProfessionalExperienceActions.ResetSelectedProfessionalAssociation());
        break;
      default:
        console.error(`no action found for ${dialogType}`);
        break;
    }
    this.helperService.openDialog(dialogType);
  }

  private handleStateChanges() {
    this.subs$ = this.state$.subscribe(s => {
      this.model.biography = s.biography;
      this.model.educations = s.educations;
      this.model.honorsAndAwards = s.honorsAndAwards;
      this.model.jobHistories = s.jobHistories;
      this.model.linkedIn = s.linkedIn;
      this.model.professionalAssociations = s.professionalAssociations;
      this.cdr.detectChanges();
    });
  }

  private loadUserProfessionalExperienceData() {
    this.store.dispatch(new ProfessionalExperienceActions.LoadAllProfessionalExperienceData());
  }
}
