import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { patch } from "@ngxs/store/operators";
import { AppService } from "@services/app.service";
import {
    Client, FlxWealthManagerApiClient, User,
    UserProfilePicture
} from "@services/flxwealthmanager.api.client";
import { stat } from "fs";
import produce from "immer";
import { forkJoin, of } from "rxjs";
import { tap } from "rxjs/operators";
import { DashboardActions } from "./dashboard.actions";

export interface DashboardStateModel {
    user?: User;
    client?: Client;
    profilePicture?: UserProfilePicture;
}

@State<DashboardStateModel>({
    name: 'dashboard_state',
    defaults: {}
})
@Injectable()
export class DashboardState {
    constructor(private readonly apiClient: FlxWealthManagerApiClient,
        private readonly appService: AppService) { }

    @Action(DashboardActions.GetClient)
    GetClient(ctx: StateContext<DashboardStateModel>, action: DashboardActions.GetClient) {
        const state = ctx.getState();
        if (state.client) {
            return of(state.client);
        }
        const client = state.client || state.user?.client;
        const clientId = this.appService.currentUser.clientId;
        return (client && of(client) || this.apiClient.getClient(clientId!))
            .pipe(
                tap(d => {
                    ctx.patchState({
                        client: d
                    });
                }));
    }

    @Action(DashboardActions.UpdateClient)
    UpdateClient(ctx: StateContext<DashboardStateModel>, action: DashboardActions.UpdateClient) {
        return this.apiClient.clients(action.client)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: DashboardStateModel) => {
                        state.client = d;
                        let userClient = state.user?.client;
                        userClient = d;
                    }));
                }));
    }

    @Action(DashboardActions.SaveProfilePicture)
    SaveProfilePicture(ctx: StateContext<DashboardStateModel>, action: DashboardActions.SaveProfilePicture) {
        const picture = action.picture;
        if (!picture.id) {
            picture.id = this.appService.currentUser?.id;
        }
        return this.apiClient.saveProfilePicture(action.picture)
            .pipe(
                tap(d => {
                    ctx.setState(patch<DashboardStateModel>({
                        profilePicture: d
                    }));
                }));
    }

    @Action(DashboardActions.GetUserProfilePicture)
    GetProfilePicture(ctx: StateContext<DashboardStateModel>, action: DashboardActions.GetUserProfilePicture) {
        const state = ctx.getState();
        if(state.profilePicture){
            return of(state.profilePicture);
        }
        const userId = this.appService.currentUser.id;
        return (this.apiClient.getProfilePicture(userId!))
            .pipe(
                tap(d => {
                    ctx.patchState({
                        profilePicture: d
                    });
                }));
    }

    @Action(DashboardActions.LoadDashboardData)
    LoadData(ctx: StateContext<DashboardStateModel>) {
        const state = ctx.getState();
        const userId = this.appService.currentUser.id!!;
        const clientId = this.appService.currentUser.clientId!!;
        const loadActions = [
            state.user ? of(state.user) : this.apiClient.getUser(userId),
            state.client ? of(state.client) : this.apiClient.getClient(clientId),
            state.profilePicture ? of(state.profilePicture) : this.apiClient.getProfilePicture(userId)
        ];

        return forkJoin(loadActions).pipe(tap(resultSet => {
            ctx.patchState({
                user: resultSet[0],
                client: resultSet[1],
                profilePicture: resultSet[2]
            })
        }));
    }
}