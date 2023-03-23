import { Component, OnInit } from '@angular/core';
import { ImageSources } from '@shared/resource.utils';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  imageSources = ImageSources;

  constructor() { }

  ngOnInit(): void {
  }

}
