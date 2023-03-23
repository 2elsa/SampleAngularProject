import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "@shared-components/confirm-dialog/confirm-dialog.component";

@Injectable()
export class ConfirmService {
    constructor(private readonly dialog: MatDialog) { }
    openConfirmDialog(message?: string): Promise<boolean> {
        return new Promise((resolve, _reject) => {
            const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
                minHeight: '14vh',
                minWidth: '20vh'
            });
            if (message) {
                confirmDialog.componentInstance.warningMsg = message;
            }
            confirmDialog.afterClosed().subscribe(e => resolve(e));
        });

    }

}