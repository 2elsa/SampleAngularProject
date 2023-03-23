import { Component, OnInit } from '@angular/core';
import { ImageSources } from '@shared/resource.utils';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.scss']
})
export class ProfileCompletionComponent implements OnInit {
  Images = ImageSources;
  
  constructor() { }

  ngOnInit(): void {
  }

}
