import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing.definitions';
import {
  API_BASE_URL,
  FlxWealthManagerApiClient
} from '@services/flxwealthmanager.api.client';
import {
  HttpClientModule, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppService } from '@services/app.service';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import {
  NgxWebstorageModule
} from 'ngx-webstorage';
import { AppRequestInterceptor } from './core/interceptors/app-request.interceptor';
import { AuthorizedAccessGuard } from './core/guards/authorized-access.guard';
import { SuperAdminGuard } from './core/guards/super-admin.guard';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from '@services/toast.service';
import {
  NgLoadingSpinnerModule,
  NgLoadingSpinnerInterceptor
} from 'ng-loading-spinner';
import { TokenStateManagement } from '@services/token-state';
import { TokenHelperService } from '@services/token-helper-service';

function tokenGetterFactory(tokenHelper: TokenHelperService) {
  return {
    tokenGetter: () => tokenHelper.getToken()
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([TokenStateManagement.LoginTokenState]),
    JwtModule.forRoot({
      config: {
        skipWhenExpired: true,
        allowedDomains: ['localhost:44330', 'xenophon.hhwgroup.com'],
        throwNoTokenError: true
      },
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: tokenGetterFactory,
        deps: [TokenHelperService]
      }
    }),
    NgxWebstorageModule.forRoot(),
    MatSnackBarModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgLoadingSpinnerModule
  ],
  providers: [
    FlxWealthManagerApiClient,
    AuthorizedAccessGuard,
    SuperAdminGuard,
    AppService,
    ToastService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: AppRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NgLoadingSpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
