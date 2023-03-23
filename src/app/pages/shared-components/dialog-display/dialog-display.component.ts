import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-display',
  templateUrl: './dialog-display.component.html',
  styleUrls: ['./dialog-display.component.scss']
})
export class DialogDisplayComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }
}
