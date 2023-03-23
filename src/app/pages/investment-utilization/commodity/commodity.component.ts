import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { FlxWealthManagerApiClient, UserCommodity } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { investmentUtilizationOptionIdMapper } from '@shared/user-selection-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestmentUtilizationActions } from '../investment-utilization-state-management/investment-utilization.actions';
import { InvestmentUtilizationState, InvestmentUtilizationStateModel } from '../investment-utilization-state-management/investment-utilization.state';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommodityComponent extends UserSelectionComponentHelper<UserCommodity> implements OnInit {
  
  title = 'Edit Commodity';

  @Select(InvestmentUtilizationState) investmentUtlizationState$: Observable<InvestmentUtilizationStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.investmentUtlizationState$.pipe(map(m => m.commodityOptions)),
      this.investmentUtlizationState$.pipe(map(s => s.userCommodities))], investmentUtilizationOptionIdMapper.commodity, {
      fromJsConverter: UserCommodity.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserCommodity) => {
        return this.store.dispatch(new InvestmentUtilizationActions.AddedUserCommodity(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new InvestmentUtilizationActions.DeletedUserCommodity(model))
      }
    });
  }

}
