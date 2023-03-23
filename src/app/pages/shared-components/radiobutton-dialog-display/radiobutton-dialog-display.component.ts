import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ExtendedNamedModel } from '@shared/extended-named-model';
import { Utils } from '@shared/utils';

@Component({
  selector: 'app-radiobutton-dialog-display',
  templateUrl: './radiobutton-dialog-display.component.html',
  styleUrls: ['./radiobutton-dialog-display.component.scss']
})
export class RadiobuttonDialogDisplayComponent {
  @Input() title: string;
  @Input() optionList: ExtendedNamedModel[];
  @Input() columnWidth = 4;  
  @Input() contentTemplate: TemplateRef<any>;
  @Output() selectionChanged = new EventEmitter<ExtendedNamedModel>();

  splitIntoGroups(arr: ExtendedNamedModel[]): ExtendedNamedModel[][] {
    return Utils.splitIntoTwoGroups<ExtendedNamedModel>(arr);
  }
  
  onSelectionChanged = ($event: ExtendedNamedModel) => this.selectionChanged.emit($event);
}
