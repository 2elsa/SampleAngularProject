import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserTaxableBond, FlxWealthManagerApiClient } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { investmentUtilizationOptionIdMapper } from '@shared/user-selection-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestmentUtilizationActions } from '../investment-utilization-state-management/investment-utilization.actions';
import { InvestmentUtilizationState, InvestmentUtilizationStateModel } from '../investment-utilization-state-management/investment-utilization.state';

@Component({
  selector: 'app-taxable-bond',
  templateUrl: './taxable-bond.component.html',
  styleUrls: ['./taxable-bond.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxableBondComponent extends UserSelectionComponentHelper<UserTaxableBond> implements OnInit {
  
  title = 'Edit Taxable Bond';

  @Select(InvestmentUtilizationState) investmentUtlizationState$: Observable<InvestmentUtilizationStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.investmentUtlizationState$.pipe(map(m => m.taxableBondOptions)),
      this.investmentUtlizationState$.pipe(map(s => s.userTaxableBonds))], investmentUtilizationOptionIdMapper.taxable_Bond, {
      fromJsConverter: UserTaxableBond.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserTaxableBond) => {
        return this.store.dispatch(new InvestmentUtilizationActions.AddedUserTaxableBond(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new InvestmentUtilizationActions.DeletedUserTaxableBond(model))
      }
    });
  }
}
