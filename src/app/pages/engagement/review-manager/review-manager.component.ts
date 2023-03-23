import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { UserTeamReviewer } from '@services/flxwealthmanager.api.client';
import { Observable, Subscription } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { EngagementActions } from '../engagement-state-management/engagement.actions';
import { EngagementState, EngagementStateModel } from '../engagement-state-management/engagement.state';
import { take } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review-manager',
  templateUrl: './review-manager.component.html',
  styleUrls: ['./review-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewManagerComponent implements OnInit, OnDestroy {

  title = 'Edit Who on your team reviews asset managers?';
  @Select(EngagementState) state$: Observable<EngagementStateModel>;
  model: UserTeamReviewer;

  private sub$: Subscription;

  constructor(
    private readonly appService: AppService,
    private readonly store: Store,
    private readonly modalRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.sub$ = this.state$.subscribe(state => {
      this.model = UserTeamReviewer.fromJS(state.userReviewManager || { user_Id: this.appService.currentUser.id });
    });
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  saveChanges(model: UserTeamReviewer) {
    model.user_Id = this.appService.currentUser.id;
    const action = (!!model.id && new EngagementActions.UpdateUserReviewManager(model)) ||
      new EngagementActions.AddedUserReviewManager(model);
    this.store.dispatch(action).pipe(take(1)).subscribe(_d => this.modalRef.close());
  }
}