import { ChangeDetectorRef } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { Observable, of, Subscription } from "rxjs";
import { take } from "rxjs/operators";

export namespace ComponentFormHelper {

    export type formHandlers<TUserDataType> = {
        fromJs: (data: any) => TUserDataType,
        formDataSource(): Observable<TUserDataType>,
        onFormSave: (formData: TUserDataType) => Observable<TUserDataType>
    };

    export abstract class SharedFormComponentHelper<TUserDataModel> {

        form: FormGroup;
        protected dataToEdit: TUserDataModel;
        protected closeDialogAfterSave: boolean = true;
        protected configs: formHandlers<TUserDataModel>;
        private sub$: Subscription;

        constructor(
            protected readonly formBuilder: FormBuilder,
            protected readonly cdr: ChangeDetectorRef,
            protected readonly modalRef: MatDialogRef<any>,
            protected readonly store: Store) { }

        protected init(configs: formHandlers<TUserDataModel>): Promise<void> {
            return new Promise((resolve) => {
                this.configs = configs;
                this.sub$ = this.configs.formDataSource().pipe(take(1)).subscribe(s => {
                    if (!this.form) {
                        this.dataToEdit = { ...s };
                        this.form = this.formBuilder.group(this.getFormFields(s));
                        resolve();
                    }
                });
            });
        }


        saveForm() {
            if (this.form.valid) {
                const formValue = this.configs.fromJs(this.form.getRawValue());
                return this.configs.onFormSave(formValue)
                    .subscribe(_d => {
                        this.closeDialogAfterSave && this.modalRef.close();
                    }, (err) => console.error(err));
            } else {
                return of({ error: 'form is invalid' });
            }
        }

        cleanup() {
            this.sub$ && this.sub$.unsubscribe();
        }

        close = () => this.modalRef.close();
        detectChanges = () => this.cdr.detectChanges();

        protected abstract getFormFields(data: TUserDataModel): { [key: string]: FormControl; };

        protected noEmptyStringValidator = (ctrl: AbstractControl) => {
            const fieldValue = ctrl.value?.toString();
            if (fieldValue) {
                const value = (fieldValue.trim() || '').toString().replace('<p>', '').replace('</p>', '').trim();
                return value.length > 0 ? null : {
                    description: { message: 'required' }
                }
            }
            return null;
        };
    }
}