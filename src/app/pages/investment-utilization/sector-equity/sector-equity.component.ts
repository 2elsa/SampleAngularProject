import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserSectorEquity, FlxWealthManagerApiClient } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { investmentUtilizationOptionIdMapper } from '@shared/user-selection-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestmentUtilizationActions } from '../investment-utilization-state-management/investment-utilization.actions';
import { InvestmentUtilizationState, InvestmentUtilizationStateModel } from '../investment-utilization-state-management/investment-utilization.state';

@Component({
  selector: 'app-sector-equity',
  templateUrl: './sector-equity.component.html',
  styleUrls: ['./sector-equity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectorEquityComponent extends UserSelectionComponentHelper<UserSectorEquity> implements OnInit {
  
  title = 'Edit Sector Equity';

  @Select(InvestmentUtilizationState) investmentUtlizationState$: Observable<InvestmentUtilizationStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.investmentUtlizationState$.pipe(map(m => m.sectorEquityOptions)),
      this.investmentUtlizationState$.pipe(map(s => s.userSectorEquities))], investmentUtilizationOptionIdMapper.sector_Equity, {
      fromJsConverter: UserSectorEquity.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserSectorEquity) => {
        return this.store.dispatch(new InvestmentUtilizationActions.AddedUserSectorEquity(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new InvestmentUtilizationActions.DeletedUserSectorEquity(model))
      }
    });
  }
}
