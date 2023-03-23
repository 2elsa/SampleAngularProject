import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  OnInit
} from '@angular/core';
import { AppService } from '@services/app.service';
import { FlxWealthManagerApiClient, UserDesiredSolutionService } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { Store, Select } from '@ngxs/store';
import { EngagementState, EngagementStateModel } from '../engagement-state-management/engagement.state';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { EngagementActions } from '../engagement-state-management/engagement.actions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { engagementUserOptionIdMapper } from '@shared/user-selection-helper';

@Component({
  selector: 'app-desired-solution',
  templateUrl: './desired-solution.component.html',
  styleUrls: ['./desired-solution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesiredSolutionComponent extends UserSelectionComponentHelper<UserDesiredSolutionService> implements OnInit {

    @Select(EngagementState) engagementState$: Observable<EngagementStateModel>;

  title = 'Edit Wealth Manager Desired Solutions and Services';

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.engagementState$.pipe(map(m => m.desiredSolutionOptions)),
      this.engagementState$.pipe(map(s => s.userDesiredSolutions))],  engagementUserOptionIdMapper.desiredSolutionService, {
      fromJsConverter: UserDesiredSolutionService.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserDesiredSolutionService) => {
        return this.store.dispatch(new EngagementActions.AddedUserDesiredSolutionService(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new EngagementActions.DeletedUserDesiredSolutionService(model))
      }
    });
  }

}
