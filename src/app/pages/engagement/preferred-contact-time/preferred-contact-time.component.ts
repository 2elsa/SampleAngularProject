import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnInit
} from '@angular/core';
import { AppService } from '@services/app.service';
import { FlxWealthManagerApiClient, UserContactTime } from '@services/flxwealthmanager.api.client';
import { UserSelectionComponentHelper } from '@shared-components/user-selection-component.helper';
import { Store, Select } from '@ngxs/store';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { EngagementActions } from '../engagement-state-management/engagement.actions';
import { EngagementState, EngagementStateModel } from '../engagement-state-management/engagement.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { engagementUserOptionIdMapper } from '@shared/user-selection-helper';

@Component({
  selector: 'app-preferred-contact-time',
  templateUrl: './preferred-contact-time.component.html',
  styleUrls: ['./preferred-contact-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferredContactTimeComponent extends UserSelectionComponentHelper<UserContactTime> implements OnInit {

  title = 'Edit Wealth Manager Preferred Contact Time';

  @Select(EngagementState) engagementState$: Observable<EngagementStateModel>;

  constructor(protected readonly apiClient: FlxWealthManagerApiClient,
    protected readonly cdr: ChangeDetectorRef,
    protected readonly appService: AppService,
    private readonly store: Store) {
    super(cdr, appService);
  }

  ngOnInit(): void {
    this.init(
      [this.engagementState$.pipe(map(m => m.contactTimeOptions)),
      this.engagementState$.pipe(map(s => s.userContactTimes))], engagementUserOptionIdMapper.contactTime, {
      fromJsConverter: UserContactTime.fromJS,
      onUserSelected: (option: ExtendedNamedModel, model: UserContactTime) => {
        return this.store.dispatch(new EngagementActions.AddedUserPreferredContactTime(option, model));
      },
      onUserDeleted: (model: ExtendedNamedModel) => {
        return this.store.dispatch(new EngagementActions.DeletedUserPreferredContactTime(model))
      }
    });
  }
}
