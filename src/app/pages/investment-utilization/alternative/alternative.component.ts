import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { FlxWealthManagerApiClient, UserAlternative } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { investmentUtilizationOptionIdMapper } from '@shared/user-selection-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestmentUtilizationActions } from '../investment-utilization-state-management/investment-utilization.actions';
import { InvestmentUtilizationState, InvestmentUtilizationStateModel } from '../investment-utilization-state-management/investment-utilization.state';

@Component({
  selector: 'app-alternative',
  templateUrl: './alternative.component.html',
  styleUrls: ['./alternative.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlternativeComponent extends UserSelectionComponentHelper<UserAlternative> implements OnInit {
  
  title = 'Edit Alternative';

  @Select(InvestmentUtilizationState) investmentUtlizationState$: Observable<InvestmentUtilizationStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.investmentUtlizationState$.pipe(map(m => m.alternativeOptions)),
      this.investmentUtlizationState$.pipe(map(s => s.userAlternatives))], investmentUtilizationOptionIdMapper.alternative, {
      fromJsConverter: UserAlternative.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserAlternative) => {
        return this.store.dispatch(new InvestmentUtilizationActions.AddedUserAlternative(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new InvestmentUtilizationActions.DeletedUserAlternative(model))
      }
    });
  }
}
