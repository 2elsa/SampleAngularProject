import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AppService } from "@services/app.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizedAccessGuard implements CanActivate {
    constructor(private readonly appService: AppService,
        private readonly router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.appService.isLoggedIn) {
            this.router.navigate(['/account'], { queryParams: { 'redirectURL': state.url } });
            return false;
        }
        return true;
    }

}