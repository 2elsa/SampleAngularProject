import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ImageSources } from '@shared/resource.utils';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  @Input() alertType?: 'error' | 'success' | 'warning' = 'error';
  @Input() message?: SafeHtml | string = 'error occurred';
  @Input() styles: {[key:string]: string} = {};

  images = ImageSources;
  
  constructor() { }

  ngOnInit(): void {
  }

}
