import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AppService } from "@services/app.service";
import {
    FlxWealthManagerApiClient
} from "@services/flxwealthmanager.api.client";
import produce from "immer";
import { tap } from "rxjs/operators";
import { AccountActions } from "./account.actions";

export interface AccountStateModel {
}

@State<AccountStateModel>({
    name: "account_state"
})
@Injectable()
export class AccountState {
    constructor(private readonly apiClient: FlxWealthManagerApiClient,
        private readonly appService: AppService) { }

    @Action(AccountActions.AuthenticateUser)
    authenticateUser(ctx: StateContext<AccountStateModel>, action: AccountActions.AuthenticateUser) {
        return this.apiClient.login(action.model)
            .pipe(tap(d => {
                ctx.setState(produce((state: AccountStateModel) => {
                    this.appService.saveLoginUser(d);
                }));
            }));
    }
}