import { Component, OnInit } from '@angular/core';
import { ImageSources } from '@shared/resource.utils';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  Images = ImageSources;

  constructor() { }

  ngOnInit(): void {
  }

}
