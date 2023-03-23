import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ImageSources } from '@shared/resource.utils';
import { ClientFocusComponent } from './client-focus/client-focus.component';
import { ContactFrequencyComponent } from './contact-frequency/contact-frequency.component';
import { DesiredSolutionComponent } from './desired-solution/desired-solution.component';
import { InvestmentComponent } from './investment/investment.component';
import { PreferredContactTimeComponent } from './preferred-contact-time/preferred-contact-time.component';
import { PreferredEngagementComponent } from './preferred-engagement/preferred-engagement.component';
import { ReviewManagerComponent } from './review-manager/review-manager.component';
import { dialogOptions, engagementDialogTypes } from '@shared/dialog.config';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { EngagementState, EngagementStateModel } from './engagement-state-management/engagement.state';
import { EngagementActions } from './engagement-state-management/engagement.actions';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { UserTeamReviewer } from '@services/flxwealthmanager.api.client';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class EngagementComponent implements OnInit, OnDestroy {

  dialogType = engagementDialogTypes;
  
  private dialogConfig = {
    minHeight: dialogOptions.height,
    maxWidth: '70vw',
    minWidth: dialogOptions.width
  };

  Images = ImageSources;
  
  private subs$: Subscription;

  constructor(private readonly title: Title,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly store: Store) { }


  model: {
    clientFocus: ExtendedNamedModel[],
    contactTimes: ExtendedNamedModel[],
    contactFrequencies: ExtendedNamedModel[],
    investments: ExtendedNamedModel[],
    desiredSolutions: ExtendedNamedModel[],
    engagements: ExtendedNamedModel[],
    reviewer?: UserTeamReviewer
  } = {
      clientFocus: [], contactTimes: [], contactFrequencies: [],
      investments: [], desiredSolutions: [], engagements: []
    };

  @Select(EngagementState) state$: Observable<EngagementStateModel>;

  ngOnInit(): void {
    this.title.setTitle('Client Profile');
    this.loadUserEngagementData();
    this.handleStateChanges();
  }

  ngOnDestroy() {
    this.subs$ && this.subs$.unsubscribe();
  }

  openDialog(dialogType?: engagementDialogTypes) {
    switch (dialogType) {
      case engagementDialogTypes.client_focus:
        this.dialog.open(ClientFocusComponent, this.dialogConfig);
        break;
      case engagementDialogTypes.contact_time:
        this.dialog.open(PreferredContactTimeComponent, this.dialogConfig);
        break;
      case engagementDialogTypes.desired_solution:
        this.dialog.open(DesiredSolutionComponent, this.dialogConfig);
        break;
      case engagementDialogTypes.engagement:
        this.dialog.open(PreferredEngagementComponent, this.dialogConfig);
        break;
      case engagementDialogTypes.frequency:
        this.dialog.open(ContactFrequencyComponent, this.dialogConfig);
        break;
      case engagementDialogTypes.investment:
        this.dialog.open(InvestmentComponent, this.dialogConfig);
        break;

      case engagementDialogTypes.reviewer:
        this.dialog.open(ReviewManagerComponent, this.dialogConfig);
        break;
      default:
        throw new Error(`No dialog setup for ${dialogType}`);
    }
  }

  private handleStateChanges() {
   this.subs$ = this.state$.subscribe(s => {
      this.model.clientFocus = s.clientFocusOptions.filter(c => c.checked);
      this.model.contactTimes = s.contactTimeOptions.filter(c => c.checked);
      this.model.contactFrequencies = s.contactFrequencyOptions.filter(c => c.checked);
      this.model.desiredSolutions = s.desiredSolutionOptions.filter(c => c.checked);
      this.model.engagements = s.preferredEngagementOptions.filter(c => c.checked);
      this.model.investments = s.investmentImplementationOptions.filter(c => c.checked);
      this.model.reviewer = s.userReviewManager;
      this.cdr.detectChanges();
    });
  }

  private loadUserEngagementData() {
    this.store.dispatch(new EngagementActions.GetAllUserEngagementInfo());
  }
}
