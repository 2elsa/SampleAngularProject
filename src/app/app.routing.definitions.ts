import { Routes } from "@angular/router";
import { NotFoundComponent } from "@pages/account/not-found/not-found.component";
import { AuthorizedAccessGuard } from "./core/guards/authorized-access.guard";

export const appRoutes: Routes = [
    { path: '', redirectTo: 'account', pathMatch: 'full' },
    {
        path: 'advisor-dashboard',
        canActivate: [AuthorizedAccessGuard],
        loadChildren: () => import('./pages/advisor-dashboard/advisor-dashboard.module')
            .then(m => m.AdvisorDashboardModule)
    },
    {
        path: 'membership',
        loadChildren: () => import('./pages/membership/membership.module')
            .then(m => m.MembershipModule)
    }, {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module')
            .then(m => m.AccountModule)
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    }, {
        path: '**', redirectTo: 'not-found'
    }
];