import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserInternationalEquity, FlxWealthManagerApiClient } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { investmentUtilizationOptionIdMapper } from '@shared/user-selection-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestmentUtilizationActions } from '../investment-utilization-state-management/investment-utilization.actions';
import { InvestmentUtilizationState, InvestmentUtilizationStateModel } from '../investment-utilization-state-management/investment-utilization.state';

@Component({
  selector: 'app-international-equity',
  templateUrl: './international-equity.component.html',
  styleUrls: ['./international-equity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InternationalEquityComponent extends UserSelectionComponentHelper<UserInternationalEquity> implements OnInit {
  
  title = 'Edit International Equity';

  @Select(InvestmentUtilizationState) investmentUtlizationState$: Observable<InvestmentUtilizationStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.investmentUtlizationState$.pipe(map(m => m.internationalEquityOptions)),
      this.investmentUtlizationState$.pipe(map(s => s.userInternationalEquities))], investmentUtilizationOptionIdMapper.intl_Equity, {
      fromJsConverter: UserInternationalEquity.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserInternationalEquity) => {
        return this.store.dispatch(new InvestmentUtilizationActions.AddedUserInternationalEquity(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new InvestmentUtilizationActions.DeletedUserInternationalEquity(model))
      }
    });
  }
}
