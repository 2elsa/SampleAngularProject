import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CheckboxDisplaylistComponent
} from './checkbox-displaylist/checkbox-displaylist.component';
import { FormsModule } from '@angular/forms';
import { DialogDisplayComponent } from './dialog-display/dialog-display.component';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ChecklistDialogDisplayComponent
} from './checklist-dialog-display/checklist-dialog-display.component';
import {
  RadiobuttonDialogDisplayComponent
} from './radiobutton-dialog-display/radiobutton-dialog-display.component';
import {
  RadiobuttonDisplaylistComponent
} from './radiobutton-displaylist/radiobutton-displaylist.component';
import { ParseHtmlPipe } from 'src/app/core/pipes/parse-html.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ByteToImagePipe } from 'src/app/core/pipes/byte-to-image.pipe';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { ToastComponent } from './toast/toast.component';
import { ConfirmService } from '@services/confirm.service';
import { CountryStateFormatterPipe } from 'src/app/core/pipes/country-state-formatter.pipe';



@NgModule({
  declarations: [CheckboxDisplaylistComponent, DialogDisplayComponent,
    ChecklistDialogDisplayComponent, RadiobuttonDialogDisplayComponent,
    RadiobuttonDisplaylistComponent, ParseHtmlPipe, ConfirmDialogComponent,
    ByteToImagePipe, AlertMessageComponent, ToastComponent, CountryStateFormatterPipe],
  providers: [ConfirmService],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [CheckboxDisplaylistComponent, DialogDisplayComponent,
    ChecklistDialogDisplayComponent, RadiobuttonDialogDisplayComponent,
    RadiobuttonDisplaylistComponent, AlertMessageComponent,
    ParseHtmlPipe, ByteToImagePipe, MatDialogModule, CountryStateFormatterPipe]
})
export class SharedComponentsModule { }
