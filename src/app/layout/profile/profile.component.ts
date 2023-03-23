import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, OnDestroy, OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { AppService } from '@services/app.service';
import { Client, UserProfilePicture } from '@services/flxwealthmanager.api.client';
import { ImageSources } from '@shared/resource.utils';
import { Utils } from '@shared/utils';
import { Observable, Subscription } from 'rxjs';
import { DashboardState, DashboardStateModel } from 'src/app/pages/advisor-dashboard/dash-board-state-management/dashboard-state';
import { DashboardActions } from 'src/app/pages/advisor-dashboard/dash-board-state-management/dashboard.actions';
import { AddPictureComponent } from './add-picture/add-picture.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  Images = ImageSources;

  inEditMode = false;
  client: Client;
  profilePicture: UserProfilePicture;


  private _savedTagLine?: string;
  private clientSub$: Subscription;
  private pictureSub$: Subscription;

  @Select(DashboardState) state$: Observable<DashboardStateModel>;

  constructor(private readonly store: Store,
    private readonly cdr: ChangeDetectorRef,
    private readonly modal: MatDialog,
    private readonly sanitizer: DomSanitizer,
    private readonly appService: AppService) { }

  ngOnInit(): void {
    this.clientSub$ = this.state$.subscribe(s => {
      if (s && s.client) {
        this.client = <Client>{ ...s.client!! };
        this._savedTagLine = this.client?.tagline;
        this.triggerUIUpdate();
      }
    });
    this.pictureSub$ = this.state$.subscribe(s => {
      if (s && s.profilePicture) {
        this.profilePicture = <UserProfilePicture>({ ...s.profilePicture });
        this.triggerUIUpdate();
      }
    });

    this.store.dispatch(new DashboardActions.GetClient());
    this.store.dispatch(new DashboardActions.GetUserProfilePicture());
  }

  ngOnDestroy() {
    this.clientSub$ && this.clientSub$.unsubscribe();
    this.pictureSub$ && this.pictureSub$.unsubscribe();
  }

  toggleEditMode() {
    if(this.hasTaglineEditPermission){
      this.inEditMode = !this.inEditMode;
    }
  }

  saveTagline() {
    this.store.dispatch(new DashboardActions.UpdateClient(Client.fromJS(this.client)))
      .subscribe(() => {
        this.inEditMode = false;
        this.triggerUIUpdate();
      });
  }

  addProfilePicture() {
    this.modal.open(AddPictureComponent, {
      minHeight: '400px',
      minWidth: '400px'
    });
  }

  get hasTaglineEditPermission(){
    return this.appService.isSuperAdmin || this.appService.isAdmin;
  }

  get hasChanged() {
    return !!(this.client && (this.client?.tagline !== this._savedTagLine))
  }

  private triggerUIUpdate() {
    this.cdr.detectChanges();
  }

  get profilePictureUrl() {
    let picture = '';
    let contentType = '';
    if (this.profilePicture.picture?.startsWith('data:')) {
      const parsed = Utils.splitBase64ImageIntoParts(this.profilePicture.picture);
      picture = parsed.base64Str;
      contentType = parsed.contentType;
    } else {
      contentType = <any>this.profilePicture.image_Type?.split(':').pop();
      picture = <any>this.profilePicture.picture;
    }
    const imgUrl = Utils.convertBase64ToUrl(picture, contentType);
    const safeUrl = imgUrl && this.sanitizer.bypassSecurityTrustUrl(imgUrl) || this.Images.logo;
    return safeUrl;
  }
}
