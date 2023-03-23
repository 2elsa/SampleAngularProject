import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { UserProfilePicture } from '@services/flxwealthmanager.api.client';
import { Utils } from '@shared/utils';
import { Subscription } from 'rxjs';
import { DashboardActions } from 'src/app/pages/advisor-dashboard/dash-board-state-management/dashboard.actions';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPictureComponent implements OnInit, OnDestroy {

  fileSrc: string;

  private fileToUpload: File;
  private sub$: Subscription;

  permittedFileSize = {size: 500, desc: 'Kb'};
  fileSizeInfo: { size: number, desc: string, order: number };

  constructor(
    private readonly store: Store,
    private readonly cdr: ChangeDetectorRef,
    private readonly modalRef: MatDialogRef<any>) { }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

  onFileLoaded($event: any) {
    const files = $event.target.files as FileList;
    this.fileToUpload = files[0];
    Utils.readFile<string>(this.fileToUpload).then(str => {
      this.fileSrc = str;
      this.cdr.detectChanges();
    })
      .catch(err => console.error(err));
    this.fileSizeInfo = Utils.bytesToSize(files[0].size);
  }

  canSaveFile(){
    return this.fileSizeInfo && (this.fileSizeInfo.order < 2 && this.fileSizeInfo.size <= this.permittedFileSize.size) || false;
  }

  uploadImage() {
    Utils.readFile<ArrayBuffer>(this.fileToUpload)
      .then(resp => {
        this.sub$ = this.store.dispatch(
          new DashboardActions.SaveProfilePicture(UserProfilePicture.fromJS({ picture: resp })))
          .subscribe(s => this.modalRef.close())
      }).catch(err => console.error(err));
  }

}
