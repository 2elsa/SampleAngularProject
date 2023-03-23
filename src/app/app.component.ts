import { Component, OnInit } from '@angular/core';
import { ImageSources } from '@shared/resource.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  images = ImageSources;
  title = 'Flx Wealth Manager';

  constructor() { }

  ngOnInit() {
  }

}
