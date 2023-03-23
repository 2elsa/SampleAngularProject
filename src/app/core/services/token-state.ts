import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from "./flxwealthmanager.api.client";

export module TokenStateManagement {
    export interface UserTokenStateModel {
        token?: string;
        user?: User
    }

    export class AddLoginToken {
        static readonly type = '[UserTokenState] Add Login Token';
        constructor(public token: string) { }
    }
    export class GetLoginToken {
        static readonly type = '[UserTokenState] Get Login Token';
    }
    export class AddLoginUserData {
        static readonly type = '[UserTokenState] Add User Data';
        constructor(public user: User) { }
    }
    export class GetLoginUserData {
        static readonly type = '[UserTokenState] Get User Token';
    }
    export class GetLoginInformation {
        static readonly type = '[UserTokenState] Get Login Information';
    }
    export class ResetLoginInformation {
        static readonly type = '[UserTokenState] Reset Login Information';
    }

    @State<UserTokenStateModel>({
        name: 'loginTokenState',
        defaults: {}
    })
    @Injectable({ providedIn: 'root' })
    export class LoginTokenState {

        @Selector()
        static user(state: UserTokenStateModel) {
            return state.user;
        }

        @Selector()
        static token(state: UserTokenStateModel) {
            return state.token;
        }

        @Action(AddLoginToken)
        AddLoginToken(state: StateContext<UserTokenStateModel>, { token }: AddLoginToken) {
            state.patchState({
                token: token
            });
        }

        @Action(GetLoginToken)
        GetLoginToken(state: StateContext<UserTokenStateModel>) {
            return state.getState().token;
        }

        @Action(AddLoginUserData)
        AddLoginUser(state: StateContext<UserTokenStateModel>, { user }: AddLoginUserData) {
            state.patchState({
                user: user
            });
        }

        @Action(GetLoginToken)
        GetLoginUser(state: StateContext<UserTokenStateModel>) {
            return state.getState().user;
        }

        @Action(GetLoginInformation)
        GetLoginInformation(state: StateContext<UserTokenStateModel>) {
            return state.getState();
        }

        @Action(ResetLoginInformation)
        Reset(state: StateContext<UserTokenStateModel>) {
            state.setState({});
        }
    }
}