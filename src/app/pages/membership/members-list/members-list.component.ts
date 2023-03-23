import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmService } from '@services/confirm.service';
import { Client, NamedModel, User } from '@services/flxwealthmanager.api.client';
import { ImageSources } from '@shared/resource.utils';
import { Utils } from '@shared/utils';
import { take } from 'rxjs/operators';
import { MembershipActions } from '../membership-state-management/membership.actions';
import { MembershipStateModel } from '../membership-state-management/membership.state';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersListComponent implements OnInit {
  displayMode: 'grid' | 'editor' = 'grid';
  loading: boolean;
  editModel: User | undefined;
  Images = ImageSources;
  members: User[] = [];
  filteredMembers: User[] = [];
  clients: Client[] = [];
  permissions: NamedModel[] = [];

  constructor(private readonly store: Store,
    private readonly cdr: ChangeDetectorRef,
    private readonly confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.loading = true;
    this.store.dispatch(new MembershipActions.LoadAllMembershipData())
      .pipe(take(1)).subscribe(data => {
        const membershipState = <MembershipStateModel>data.Membership_state;
        this.clients = membershipState.clients;
        this.permissions = membershipState.permissions
        this.setUsers(membershipState.users);
        this.cdr.detectChanges();
      },
        _err => this.loading = false);
  }

  edit(model: User | null) {
    this.editModel = model || undefined;
    this.displayMode = 'editor';
    this.cdr.detectChanges();
  }

  cancel() {
    this.editModel = undefined;
    this.store.select(s => s).subscribe(s => {
      const membershipState = <MembershipStateModel>s.Membership_state;
      this.setUsers(membershipState.users);
      this.displayMode = 'grid';
      this.cdr.detectChanges();
    });
  }

  delete(model: User) {
    if (!model) {
      return;
    }
    this.confirmService.openConfirmDialog('Do you really want to delete this user?').then(confirmed => {
      if (confirmed) {
        this.store.dispatch(new MembershipActions.DeleteUser(model)).subscribe(_ => {
          this.filteredMembers = this.filteredMembers.filter(m => m.id !== model.id);
        })
      }
      this.cdr.detectChanges();
    });
  }

  applyFilterToMembers(query: string, propertyName: string): void {
    if (!(query).trim()) {
      this.filteredMembers = this.members;
    } else {
      this.filteredMembers = this.members.filter((u: any) => {
        return u[propertyName]?.toString().toLowerCase().indexOf(query.toString().toLowerCase()) !== -1;
      });
    }
    this.cdr.detectChanges();
  }

  setUsers(users: User[]) {
    this.members = users.map((u: User) => {
      u.client = this.clients.find(c => c.id === u.client_Id);
      u.permission = this.permissions.find(p => p.id === u.permission_Id);
      return u;
    });
    Utils.sort(this.members, m => m.first_Name);
    this.filteredMembers = [...this.members];
    this.loading = false;
  }

}
