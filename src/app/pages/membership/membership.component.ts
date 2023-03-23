import { Component } from '@angular/core';
import { NavItem } from '@shared/nav-item';
import { ImageSources } from '@shared/resource.utils';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent{
  imageSources = ImageSources;  
  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      routerLink: ['/advisor-dashboard']
    }
  ];
}
