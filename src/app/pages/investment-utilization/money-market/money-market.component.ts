import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserMoneyMarket, FlxWealthManagerApiClient } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { investmentUtilizationOptionIdMapper } from '@shared/user-selection-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestmentUtilizationActions } from '../investment-utilization-state-management/investment-utilization.actions';
import { InvestmentUtilizationState, InvestmentUtilizationStateModel } from '../investment-utilization-state-management/investment-utilization.state';

@Component({
  selector: 'app-money-market',
  templateUrl: './money-market.component.html',
  styleUrls: ['./money-market.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoneyMarketComponent extends UserSelectionComponentHelper<UserMoneyMarket> implements OnInit {
  
  title = 'Edit Money Market';

  @Select(InvestmentUtilizationState) investmentUtlizationState$: Observable<InvestmentUtilizationStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.investmentUtlizationState$.pipe(map(m => m.moneyMarketOptions)),
      this.investmentUtlizationState$.pipe(map(s => s.userMoneyMarkets))], investmentUtilizationOptionIdMapper.money_Market, {
      fromJsConverter: UserMoneyMarket.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserMoneyMarket) => {
        return this.store.dispatch(new InvestmentUtilizationActions.AddedUserMoneyMarket(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new InvestmentUtilizationActions.DeletedUserMoneyMarket(model))
      }
    });
  }
}
