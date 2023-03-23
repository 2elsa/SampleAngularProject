import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExtendedNamedModel } from '@shared/extended-named-model';

@Component({
  selector: 'app-radiobutton-displaylist',
  templateUrl: './radiobutton-displaylist.component.html',
  styleUrls: ['./radiobutton-displaylist.component.scss']
})
export class RadiobuttonDisplaylistComponent implements OnInit {

  @Input() dataList: ExtendedNamedModel[];
  @Input() displayType: 'inline' | 'row' = 'row';
  @Output() selectionChanged = new EventEmitter<ExtendedNamedModel>();

  constructor() { }

  ngOnInit(): void {
  }

  triggerSelectionChange(selection: ExtendedNamedModel) {
    this.selectionChanged.emit(selection);
  }
}
