import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnInit
} from '@angular/core';
import { AppService } from '@services/app.service';
import { FlxWealthManagerApiClient, UserInvestmentImplementation } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { Store, Select } from '@ngxs/store';
import { EngagementState, EngagementStateModel } from '../engagement-state-management/engagement.state';
import { EngagementActions } from '../engagement-state-management/engagement.actions';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { engagementUserOptionIdMapper } from '@shared/user-selection-helper';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentComponent extends UserSelectionComponentHelper<UserInvestmentImplementation> implements OnInit {

  title = 'Edit Wealth Manager Investment Implementation';
  @Select(EngagementState) engagementState$: Observable<EngagementStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.engagementState$.pipe(map(m => m.investmentImplementationOptions)),
      this.engagementState$.pipe(map(s => s.userInvestmentImplementations))],
      engagementUserOptionIdMapper.investmentImplementation, {
      fromJsConverter: UserInvestmentImplementation.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserInvestmentImplementation) => {
        return this.store.dispatch(new EngagementActions.AddedUserInvestment(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new EngagementActions.DeletedUserInvestment(model))
      }
    });
  }
}
