import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from "@ngxs/store";
import { LoginToken } from "./flxwealthmanager.api.client";
import { TokenHelperService } from "./token-helper-service";
import { TokenStateManagement } from "./token-state";

@Injectable({ providedIn: 'root' })
export class AppService {

    constructor(private readonly jwtService: JwtHelperService,
        private readonly store: Store,
        private readonly tokenHelper: TokenHelperService) { }

    get isLoggedIn(): boolean {
        const token = this.jwtService.tokenGetter();
        return (token && !this.jwtService.isTokenExpired(token)) || false;
    }

    saveLoginUser(user: LoginToken): void {
        this.tokenHelper.storeToken(user.token!);
        this.tokenHelper.storeUser(user);
        this.store.dispatch(new TokenStateManagement.AddLoginToken(user.token!));
        this.store.dispatch(new TokenStateManagement.AddLoginUserData(user));
    }

    logOut(): Promise<void> {
        return new Promise((resolver, _reject) => {
            this.tokenHelper.clearLoginInformation();
            this.store.dispatch(new TokenStateManagement.ResetLoginInformation());
            resolver();
        });
    }

    get currentUser(): LoginToken {
        let user = this.store.selectSnapshot(TokenStateManagement.LoginTokenState.user);
        if (!user) {
            user = this.tokenHelper.getUser();
            if (user) {
                this.store.dispatch(new TokenStateManagement.AddLoginUserData(user));
            }
        }
        return user!;
    }

    get userClientId(): number | undefined {
        return this.currentUser?.clientId;
    }

    get isSuperAdmin(): boolean {
        if (!this.isLoggedIn) {
            return false;
        }
        const tokenObject = this.jwtService.decodeToken(this.jwtService.tokenGetter());
        return (tokenObject && JSON.parse((<string>tokenObject.IsSuperUser)?.toLowerCase())) || false;
    }

    get isAdmin(): boolean {
        if (!this.isLoggedIn) {
            return false;
        }
        const tokenObject = this.jwtService.decodeToken(this.jwtService.tokenGetter());
        return (tokenObject && JSON.parse((<string>tokenObject.IsAdmin)?.toLowerCase())) || false;
    }

    get isStandard(): boolean {
        if (!this.isLoggedIn) {
            return false;
        }
        const tokenObject = this.jwtService.decodeToken(this.jwtService.tokenGetter());
        return (tokenObject && JSON.parse((<string>tokenObject.IsStandardUser)?.toLowerCase())) || false;
    }
}