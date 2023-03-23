import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { UserProduct, FlxWealthManagerApiClient } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { investmentUtilizationOptionIdMapper } from '@shared/user-selection-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestmentUtilizationActions } from '../investment-utilization-state-management/investment-utilization.actions';
import { InvestmentUtilizationState, InvestmentUtilizationStateModel } from '../investment-utilization-state-management/investment-utilization.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent extends UserSelectionComponentHelper<UserProduct> implements OnInit {
  
  title = 'Edit Product';

  @Select(InvestmentUtilizationState) investmentUtlizationState$: Observable<InvestmentUtilizationStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.investmentUtlizationState$.pipe(map(m => m.productOptions)),
      this.investmentUtlizationState$.pipe(map(s => s.userProducts))], investmentUtilizationOptionIdMapper.product, {
      fromJsConverter: UserProduct.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserProduct) => {
        return this.store.dispatch(new InvestmentUtilizationActions.AddedUserProduct(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new InvestmentUtilizationActions.DeletedUserProduct(model))
      }
    });
  }
}
