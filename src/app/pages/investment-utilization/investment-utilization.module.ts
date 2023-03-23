import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentUtilizationComponent } from './investment-utilization.component';
import { RouterModule, Routes } from '@angular/router';
import { AllocationComponent } from './allocation/allocation.component';
import { AlternativeComponent } from './alternative/alternative.component';
import { CommodityComponent } from './commodity/commodity.component';
import { EquityComponent } from './equity/equity.component';
import { InternationalEquityComponent } from './international-equity/international-equity.component';
import { MoneyMarketComponent } from './money-market/money-market.component';
import { MunicipalBondComponent } from './municipal-bond/municipal-bond.component';
import { ProductComponent } from './product/product.component';
import { SectorEquityComponent } from './sector-equity/sector-equity.component';
import { TaxableBondComponent } from './taxable-bond/taxable-bond.component';
import { InvestmentUtilizationState } from './investment-utilization-state-management/investment-utilization.state';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { SharedComponentsModule } from '@shared-components/shared-components.module';

const routes: Routes = [
  { path: '', component: InvestmentUtilizationComponent }
]

@NgModule({
  declarations: [InvestmentUtilizationComponent,
    AllocationComponent,
    AlternativeComponent,
    CommodityComponent,
    EquityComponent,
    InternationalEquityComponent,
    MoneyMarketComponent,
    MunicipalBondComponent,
    ProductComponent,
    SectorEquityComponent,
    TaxableBondComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    SharedComponentsModule,
    NgxsModule.forFeature([InvestmentUtilizationState]),
    RouterModule.forChild(routes)
  ]
})
export class InvestmentUtilizationModule { }
