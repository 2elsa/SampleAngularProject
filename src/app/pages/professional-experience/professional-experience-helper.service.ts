import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmService } from "@services/confirm.service";
import { dialogOptions, professionalExperienceDialogTypes } from "@shared/dialog.config";
import { BiographyComponent } from "./biography/biography.component";
import { EducationComponent } from "./education/education.component";
import { HonorAndAwardComponent } from "./honor-and-award/honor-and-award.component";
import { JobHistoryComponent } from "./job-history/job-history.component";
import { LinkedInComponent } from "./linked-in/linked-in.component";
import { ProfessionalAssociationComponent } from "./professional-association/professional-association.component";

@Injectable()
export class ProfessionalExperienceHelperService {

    dialogType = professionalExperienceDialogTypes;

    private dialogConfig = {
        minHeight: dialogOptions.height,
        minWidth: '35vw',
        maxWidth: dialogOptions.width,
        disableClose: true
    };
    constructor(private readonly dialog: MatDialog,
        private readonly confirmService: ConfirmService) { }

    openDialog(dialogType?: professionalExperienceDialogTypes) {
        switch (dialogType) {
            case professionalExperienceDialogTypes.bio:
                this.dialog.open(BiographyComponent, this.dialogConfig);
                break;
            case professionalExperienceDialogTypes.education:
                this.dialog.open(EducationComponent, this.dialogConfig);
                break;
            case professionalExperienceDialogTypes.honorAward:
                this.dialog.open(HonorAndAwardComponent, this.dialogConfig);
                break;
            case professionalExperienceDialogTypes.jobHistory:
                this.dialog.open(JobHistoryComponent, this.dialogConfig);
                break;
            case professionalExperienceDialogTypes.linkedIn:
                this.dialog.open(LinkedInComponent, this.dialogConfig);
                break;
            case professionalExperienceDialogTypes.professionalAssociation:
                this.dialog.open(ProfessionalAssociationComponent, this.dialogConfig);
                break;
            default:
                throw new Error(`No dialog setup for ${dialogType}`);
        }
    }

    openConfirmDialog(message?: string): Promise<boolean> {
        return this.confirmService.openConfirmDialog(message);
    }
}