import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AppCrypto } from "@shared/app-crypto";
import { LocalStorageService } from "ngx-webstorage";
import { User } from "./flxwealthmanager.api.client";
import { TokenStateManagement } from "./token-state";

@Injectable({ providedIn: 'root' })
export class TokenHelperService {

    public static accessTokenKey = 'api___access__token';
    public static loginUserKey = 'user___login';

    constructor(private readonly store: Store,
        private readonly localStorageService: LocalStorageService) { }

    getToken(): string | undefined {
        let token = this.store.selectSnapshot(TokenStateManagement.LoginTokenState.token);
        if (!token) {
            token = this.localStorageService.retrieve(TokenHelperService.accessTokenKey) as string;
            if (token) {
                return AppCrypto.Decrypt(token);
            }
        }
        return undefined;
    }

    getUser(): User | undefined {
        const cipherText = this.localStorageService.retrieve(TokenHelperService.loginUserKey) as string;
        return cipherText && AppCrypto.Decrypt<User>(cipherText) || undefined;
    }

    storeToken(token: string): void {
        const encryptedToken = AppCrypto.Encrypt(token);        
        this.localStorageService.store(TokenHelperService.accessTokenKey, encryptedToken);
    }
    
    storeUser(user: User): void {
        const encryptedUser = AppCrypto.Encrypt(user.toJSON());
        this.localStorageService.store(TokenHelperService.loginUserKey, encryptedUser);
    }

    clearLoginInformation(): void {
        this.localStorageService.clear(TokenHelperService.accessTokenKey);
        this.localStorageService.clear(TokenHelperService.loginUserKey);
    }
}