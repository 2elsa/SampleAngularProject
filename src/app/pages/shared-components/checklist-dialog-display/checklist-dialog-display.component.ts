import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { Utils } from '@shared/utils';

@Component({
  selector: 'app-checklist-dialog-display',
  templateUrl: './checklist-dialog-display.component.html',
  styleUrls: ['./checklist-dialog-display.component.scss']
})
export class ChecklistDialogDisplayComponent {
  @Input() title: string;
  @Input() optionList: ExtendedNamedModel[];
  @Input() columnWidth = 4;
  @Input() checkboxType: 'checkbox' | 'radio' = 'checkbox';
  @Input() contentTemplate: TemplateRef<any>;
  @Output() selectionChanged = new EventEmitter<ExtendedNamedModel>();

  splitIntoGroups(arr: ExtendedNamedModel[]): ExtendedNamedModel[][] {
    return Utils.splitIntoTwoGroups<ExtendedNamedModel>(arr);
  }
  
  onSelectionChanged = ($event: ExtendedNamedModel) => this.selectionChanged.emit($event);
}
