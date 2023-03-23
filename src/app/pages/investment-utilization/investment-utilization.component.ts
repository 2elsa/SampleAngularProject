import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { dialogOptions, investmentUtilizationDialogTypes } from '@shared/dialog.config';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { ImageSources } from '@shared/resource.utils';
import { Observable, Subscription } from 'rxjs';
import { AllocationComponent } from './allocation/allocation.component';
import { AlternativeComponent } from './alternative/alternative.component';
import { CommodityComponent } from './commodity/commodity.component';
import { EquityComponent } from './equity/equity.component';
import { InternationalEquityComponent } from './international-equity/international-equity.component';
import { InvestmentUtilizationActions } from './investment-utilization-state-management/investment-utilization.actions';
import { InvestmentUtilizationState, InvestmentUtilizationStateModel } from './investment-utilization-state-management/investment-utilization.state';
import { MoneyMarketComponent } from './money-market/money-market.component';
import { MunicipalBondComponent } from './municipal-bond/municipal-bond.component';
import { ProductComponent } from './product/product.component';
import { SectorEquityComponent } from './sector-equity/sector-equity.component';
import { TaxableBondComponent } from './taxable-bond/taxable-bond.component';

@Component({
  selector: 'app-investment-utilization',
  templateUrl: './investment-utilization.component.html',
  styleUrls: ['./investment-utilization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentUtilizationComponent implements OnInit, OnDestroy {

  dialogType = investmentUtilizationDialogTypes;

  private dialogConfig = {
    minHeight: dialogOptions.height,
    minWidth: '40vw',
    maxWidth: dialogOptions.width
  };

  Images = ImageSources;

  private subs$: Subscription;

  constructor(private readonly title: Title,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly store: Store) { }

  model: {
    allocation: ExtendedNamedModel[],
    alternative: ExtendedNamedModel[],
    commodity: ExtendedNamedModel[],
    equity: ExtendedNamedModel[],
    internationalEquity: ExtendedNamedModel[],
    moneyMarket: ExtendedNamedModel[],
    municipalBond: ExtendedNamedModel[],
    product: ExtendedNamedModel[],
    sectorEquity: ExtendedNamedModel[],
    taxableBond: ExtendedNamedModel[],
  } = {
      allocation: [], alternative: [], commodity: [], equity: [], internationalEquity: [],
      moneyMarket: [], municipalBond: [], product: [], sectorEquity: [], taxableBond: []
    }

  @Select(InvestmentUtilizationState) state$: Observable<InvestmentUtilizationStateModel>;

  ngOnInit(): void {
    this.title.setTitle('Investment Utilization');
    this.loadUserInvestmentUtilizationData();
    this.handleStateChanges();
  }

  ngOnDestroy(): void {
    this.subs$ && this.subs$.unsubscribe();
  }

  openDialog(dialogType?: investmentUtilizationDialogTypes) {
    switch (dialogType) {
      case investmentUtilizationDialogTypes.allocation:
        this.dialog.open(AllocationComponent, this.dialogConfig);
        break;
      case investmentUtilizationDialogTypes.alternative:
        this.dialog.open(AlternativeComponent, this.dialogConfig);
        break;
      case investmentUtilizationDialogTypes.commodity:
        this.dialog.open(CommodityComponent, this.dialogConfig);
        break;
      case investmentUtilizationDialogTypes.equity:
        this.dialog.open(EquityComponent, this.dialogConfig);
        break;
      case investmentUtilizationDialogTypes.internationalEquity:
        this.dialog.open(InternationalEquityComponent, this.dialogConfig);
        break;
      case investmentUtilizationDialogTypes.moneyMarket:
        this.dialog.open(MoneyMarketComponent, this.dialogConfig);
        break;
      case investmentUtilizationDialogTypes.municipalBond:
        this.dialog.open(MunicipalBondComponent, this.dialogConfig);
        break;
      case investmentUtilizationDialogTypes.product:
        this.dialog.open(ProductComponent, this.dialogConfig);
        break;
      case investmentUtilizationDialogTypes.sectorEquity:
        this.dialog.open(SectorEquityComponent, this.dialogConfig);
        break;
      case investmentUtilizationDialogTypes.taxableBond:
        this.dialog.open(TaxableBondComponent, this.dialogConfig);
        break;
      default:
        throw new Error(`No dialog setup for ${dialogType}`);
    }
  }

  private handleStateChanges() {
    this.subs$ = this.state$.subscribe(s => {
      this.model.allocation = s.allocationOptions.filter(c => c.checked);
      this.model.alternative = s.alternativeOptions.filter(c => c.checked);
      this.model.commodity = s.commodityOptions.filter(c => c.checked);
      this.model.equity = s.equityOptions.filter(c => c.checked);
      this.model.internationalEquity = s.internationalEquityOptions.filter(c => c.checked);
      this.model.moneyMarket = s.moneyMarketOptions.filter(c => c.checked);
      this.model.municipalBond = s.municipalBondOptions.filter(c => c.checked);
      this.model.product = s.productOptions.filter(c => c.checked);
      this.model.sectorEquity = s.sectorEquityOptions.filter(c => c.checked);
      this.model.taxableBond = s.taxableBondOptions.filter(c => c.checked);
      this.cdr.detectChanges();
    });
  }

  private loadUserInvestmentUtilizationData() {
    this.store.dispatch(new InvestmentUtilizationActions.GetAllUserInvestmentUtilizationInfo());
  }
}
