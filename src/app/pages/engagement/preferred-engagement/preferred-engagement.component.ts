import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { FlxWealthManagerApiClient, UserContactTime, UserPreferredEngagement } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { Store, Select } from '@ngxs/store';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { EngagementActions } from '../engagement-state-management/engagement.actions';
import { EngagementState, EngagementStateModel } from '../engagement-state-management/engagement.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { engagementUserOptionIdMapper } from '@shared/user-selection-helper';

@Component({
  selector: 'app-preferred-engagement',
  templateUrl: './preferred-engagement.component.html',
  styleUrls: ['./preferred-engagement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferredEngagementComponent extends UserSelectionComponentHelper<UserPreferredEngagement> implements OnInit {

  title = 'Edit Wealth Manager Preferred Engagement';
    @Select(EngagementState) engagementState$: Observable<EngagementStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.engagementState$.pipe(map(m => m.preferredEngagementOptions)),
      this.engagementState$.pipe(map(s => s.userPreferredEngagements))],  engagementUserOptionIdMapper.preferredEngagement, {
      fromJsConverter: UserPreferredEngagement.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserPreferredEngagement) => {
        return this.store.dispatch(new EngagementActions.AddedUserPreferredEngagement(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new EngagementActions.DeletedUserPreferredEngagement(model))
      }
    });
  }

}
