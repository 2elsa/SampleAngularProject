import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { patch, updateItem } from "@ngxs/store/operators";
import { AppService } from "@services/app.service";
import {
    Client, FlxWealthManagerApiClient,
    NamedModel, User
} from "@services/flxwealthmanager.api.client";
import produce from "immer";
import { forkJoin, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { MembershipActions } from "./membership.actions";

export interface MembershipStateModel {
    clients: Client[],
    permissions: NamedModel[],
    users: User[]
}

@State<MembershipStateModel>({
    name: "Membership_state",
    defaults: {
        clients: [],
        permissions: [],
        users: []
    }
})
@Injectable()
export class MembershipState {
    constructor(private readonly apiClient: FlxWealthManagerApiClient,
        private readonly appService: AppService) { }

    @Action(MembershipActions.GetClients)
    getClients(ctx: StateContext<MembershipStateModel>) {
        const clients = ctx.getState().clients;
        if (clients?.length) {
            return of(clients);
        }
        return this.apiClient.getAllClients()
            .pipe(tap(d => {
                ctx.setState(produce((state: MembershipStateModel) => {
                    state.clients = d;
                }));
            }));
    }

    @Action(MembershipActions.GetPermissions)
    getPermissions(ctx: StateContext<MembershipStateModel>) {
        const permissions = ctx.getState().permissions;
        if (permissions?.length) {
            return of(permissions);
        }
        return this.apiClient.getAllPermissionLevels()
            .pipe(tap(d => {
                ctx.setState(produce((state: MembershipStateModel) => {
                    state.permissions = d;
                }));
            }));
    }

    @Action(MembershipActions.GetUsers)
    getAllUsers(ctx: StateContext<MembershipStateModel>) {
        const users = ctx.getState().users.filter(u => u.client_Id === this.appService.userClientId);
        if (users?.length) {
            return of(users);
        }

        return this.apiClient.getAllUsers()
            .pipe(tap(d => {
                ctx.setState(produce((state: MembershipStateModel) => {
                    state.users = d;
                }));
            }));
    }

    @Action(MembershipActions.DeleteUser)
    DeleteUser(ctx: StateContext<MembershipStateModel>, action: MembershipActions.DeleteUser) {
        const user = action.user;
        if (!user) {
            return of(false);
        }
        return this.apiClient.deleteUser(user.id!!)
            .pipe(tap(_ => {
                ctx.setState(produce((state: MembershipStateModel) => {
                    state.users = state.users.filter(u => u.id !== user.id);
                }));
            }));
    }

    @Action(MembershipActions.CreateNewUser)
    createNewUser(ctx: StateContext<MembershipStateModel>, action: MembershipActions.CreateNewUser) {
        return this.apiClient.createNewUser(action.user)
            .pipe(catchError(err => {
                return throwError(new Error(err));
            }))
            .pipe(tap(d => {
                ctx.setState(produce((state: MembershipStateModel) => {
                    state.users.push(d);
                }));
            }));
    }

    @Action(MembershipActions.UpdateUser)
    updateUser(ctx: StateContext<MembershipStateModel>, action: MembershipActions.UpdateUser) {
        return this.apiClient.updateUser(action.user)
            .pipe(catchError(err => {
                return throwError(new Error(err));
            }))
            .pipe(tap(d => {
                ctx.setState(patch<MembershipStateModel>({
                    users: updateItem<User>(u => u?.id === d.id, patch<any>(d))
                }));
            }));
    }


    @Action(MembershipActions.AuthenticateUser)
    authenticateUser(ctx: StateContext<MembershipStateModel>, action: MembershipActions.AuthenticateUser) {
        return this.apiClient.login(action.model)
            .pipe(tap(d => {
                ctx.setState(produce((_state: MembershipStateModel) => {
                    this.appService.saveLoginUser(d);
                }));
            }));
    }

    @Action(MembershipActions.LoadAllMembershipData)
    loadAllData(ctx: StateContext<MembershipStateModel>) {
        const clientId = this.appService.userClientId;
        if (!clientId) {
            return;
        }
        return forkJoin([this.apiClient.getUsersByClientId(clientId),
        this.apiClient.getAllClients(),
        this.apiClient.getAllPermissionLevels()]).pipe(tap(resultSet => {
            ctx.setState(produce((state: MembershipStateModel) => {
                state.users = resultSet[0];
                state.clients = resultSet[1];
                state.permissions = resultSet[2];
            }));
        }));
    }
}