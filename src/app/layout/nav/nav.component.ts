import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { NavItem } from '@shared/nav-item';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  canAddMembers: boolean = false;
  @Input()
  navItems: NavItem[] = [];

  constructor(
    private readonly router: Router,
    private readonly appService: AppService) { }

  ngOnInit(): void {
    this.canAddMembers = this.appService.isSuperAdmin;

    if (!this.navItems?.length) {
      this.navItems = [{
        label: 'Add Members',
        routerLink: ['/membership'],
        hidden: () => !this.canAddMembers
      }, {
        label: 'Sign Out',
        onClick: () => this.signOut()
      }];
    }
  }

  signOut() {
    this.appService.logOut().then(() => this.router.navigate(['/account']));
  }

  formatNavItemLabel(item: NavItem): string {
    return item.label instanceof Function ? item.label() : <string>item.label;
  }
}
