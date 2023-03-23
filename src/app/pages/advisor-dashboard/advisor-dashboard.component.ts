import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { DashboardActions } from './dash-board-state-management/dashboard.actions';

@Component({
  selector: 'app-advisor-dashboard',
  templateUrl: './advisor-dashboard.component.html',
  styleUrls: ['./advisor-dashboard.component.scss']
})
export class AdvisorDashboardComponent implements OnInit {
  showQuickLinks: boolean = false;
  constructor(private readonly store: Store,
    private readonly appService: AppService,
   ) {
    this.showQuickLinks = this.appService.isLoggedIn;
  }

  ngOnInit(): void {
    this.store.dispatch(new DashboardActions.LoadDashboardData());
  }  

}
