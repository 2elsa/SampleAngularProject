import { Component, OnInit } from '@angular/core';
import { ImageSources } from '@shared/resource.utils';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent implements OnInit {

  Images = ImageSources;
  
  constructor() { }

  ngOnInit(): void {
  }

}
