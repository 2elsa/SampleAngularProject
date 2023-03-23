import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import {
  FlxWealthManagerApiClient, UserClientFocus
} from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { Store, Select } from '@ngxs/store';
import { EngagementActions } from '../engagement-state-management/engagement.actions';
import { Observable } from 'rxjs';
import { EngagementState, EngagementStateModel } from '../engagement-state-management/engagement.state';
import { map } from 'rxjs/operators';
import { engagementUserOptionIdMapper } from '@shared/user-selection-helper';

@Component({
  selector: 'app-client-focus',
  templateUrl: './client-focus.component.html',
  styleUrls: ['./client-focus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientFocusComponent extends UserSelectionComponentHelper<UserClientFocus> implements OnInit {

  title = 'Edit Wealth Manager Client Focus';

  @Select(EngagementState) engagementState$: Observable<EngagementStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.engagementState$.pipe(map(m => m.clientFocusOptions)),
      this.engagementState$.pipe(map(s => s.userClientFocuses))], engagementUserOptionIdMapper.clientFocus, {
      fromJsConverter: UserClientFocus.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserClientFocus) => {
        return this.store.dispatch(new EngagementActions.AddedUserClientFocus(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new EngagementActions.DeletedUserClientFocus(model))
      }
    });
  }
}
