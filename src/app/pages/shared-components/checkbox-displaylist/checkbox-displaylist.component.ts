import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExtendedNamedModel } from '@shared/extended-named-model';

@Component({
  selector: 'app-checkbox-displaylist',
  templateUrl: './checkbox-displaylist.component.html',
  styleUrls: ['./checkbox-displaylist.component.scss']
})
export class CheckboxDisplaylistComponent implements OnInit {

  @Input() dataList: ExtendedNamedModel[];
  @Input() displayType: 'inline' | 'row' = 'row';
  @Input() checkboxType: 'checkbox' | 'radio' = 'checkbox';
  @Output() selectionChanged = new EventEmitter<ExtendedNamedModel>();

  constructor() { }

  ngOnInit(): void {
  }

  triggerSelectionChange(selection: ExtendedNamedModel) {
    this.selectionChanged.emit(selection);
  }

  triggerRadioButtonChanged(selection: ExtendedNamedModel) {
    this.dataList.filter(e => e.id !== selection.id).forEach(e => e.checked = false);
    this.selectionChanged.emit(selection);
  }
}
