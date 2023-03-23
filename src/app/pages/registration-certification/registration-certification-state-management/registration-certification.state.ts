import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { patch, removeItem, updateItem } from "@ngxs/store/operators";
import { AppService } from "@services/app.service";
import {
    FlxWealthManagerApiClient, UserCertification, UserCrd,
    UserIndustryExperience, UserRegistration
} from "@services/flxwealthmanager.api.client";
import { ExtendedNamedModel } from "@shared/extended-named-model";
import {
    registrationCertificationOptionIdMapper
        as optionIdMapper, UserSelectionHelper
} from "@shared/user-selection-helper";
import produce from "immer";
import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { RegistrationCertificationActions } from "./registration-certification.actions";

export namespace registrationCertificationStateNs {

    export interface RegistrationCertificationStateModel {
        certificationOptions: ExtendedNamedModel[];
        registrationOptions: ExtendedNamedModel[];
        userCertifications: UserCertification[];
        userRegistrations: UserRegistration[];
        userCrd?: UserCrd;
        industryExperienceOptions: ExtendedNamedModel[],
        userIndustryExperience: UserIndustryExperience[];
    }

    @State<RegistrationCertificationStateModel>({
        name: 'registration_certification',
        defaults: {
            certificationOptions: [],
            registrationOptions: [],
            userCertifications: [],
            userRegistrations: [],
            industryExperienceOptions: [],
            userIndustryExperience: []
        }
    })
    @Injectable()
    export class RegistrationCertificationState {
        constructor(private readonly apiClient: FlxWealthManagerApiClient,
            private readonly appService: AppService) { }


        @Action(RegistrationCertificationActions.AddedUserRegistration)
        addUserRegistration(ctx: StateContext<RegistrationCertificationStateModel>,
            action: RegistrationCertificationActions.AddedUserRegistration) {
            return this.apiClient.saveUserRegistration(action.userRegistration)
                .pipe(
                    tap(d => {
                        ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                            state.registrationOptions = this.convertToExtended(state.registrationOptions, [...state.userRegistrations, d],
                                optionIdMapper.registration);
                            state.userRegistrations = [...state.userRegistrations, d];
                        }));
                    }));
        }

        @Action(RegistrationCertificationActions.AddedUserCertification)
        addUserCertification(ctx: StateContext<RegistrationCertificationStateModel>,
            action: RegistrationCertificationActions.AddedUserCertification) {
            return this.apiClient.saveUserCertification(action.userCertification)
                .pipe(
                    tap(d => {
                        ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                            state.certificationOptions = this.convertToExtended(state.certificationOptions, [...state.userCertifications, d],
                                optionIdMapper.certification);
                            state.userCertifications = [...state.userCertifications, d];
                        }));
                    }));
        }

        @Action(RegistrationCertificationActions.DeletedUserRegistration)
        deleteRegistration(ctx: StateContext<RegistrationCertificationStateModel>, action: RegistrationCertificationActions.DeletedUserRegistration) {
            return this.apiClient.deleteUserRegistration(action.option.userOptionId!!)
                .pipe(tap(d => {
                    ctx.setState(patch<RegistrationCertificationStateModel>({
                        userRegistrations: removeItem(i => i?.id === action.option.userOptionId),
                        registrationOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.DeletedUserCertification)
        deleteCertification(ctx: StateContext<RegistrationCertificationStateModel>, action: RegistrationCertificationActions.DeletedUserCertification) {
            return this.apiClient.deleteUserCertification(action.option.userOptionId!!)
                .pipe(tap(d => {
                    ctx.setState(patch<RegistrationCertificationStateModel>({
                        userCertifications: removeItem(i => i?.id === action.option.userOptionId),
                        certificationOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.GetRegistrationOptions)
        getRegistrationOptions(ctx: StateContext<RegistrationCertificationStateModel>) {
            return this.apiClient.getAllRegistrationOptions()
                .pipe(tap(d => {
                    ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                        state.registrationOptions = d;
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.GetCertificationOptions)
        getCertificateOptions(ctx: StateContext<RegistrationCertificationStateModel>) {
            return this.apiClient.getAllCertificateOptions()
                .pipe(tap(d => {
                    ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                        state.certificationOptions = d;
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.GetIndustryExperienceOptions)
        getIndustryExperienceOptions(ctx: StateContext<RegistrationCertificationStateModel>) {
            return this.apiClient.getAllIndustryExperienceOptions()
                .pipe(tap(d => {
                    ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                        state.industryExperienceOptions = d;
                    }));
                }));
        }


        @Action(RegistrationCertificationActions.AddedUserCrd)
        addCrd(ctx: StateContext<RegistrationCertificationStateModel>,
            action: RegistrationCertificationActions.AddedUserCrd) {
            return this.apiClient.saveCrd(action.userCrd)
                .pipe(tap(d => {
                    ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                        state.userCrd = d;
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.AddedUserIndustryExperience)
        addIndustryExperience(ctx: StateContext<RegistrationCertificationStateModel>,
            action: RegistrationCertificationActions.AddedUserIndustryExperience) {
            return this.apiClient.saveUserIndustryExperience(action.userIndustryExperience)
                .pipe(tap(d => {
                    ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                        state.industryExperienceOptions = this.convertToExtended(state.industryExperienceOptions,
                            [d],
                            optionIdMapper.industryExperience);
                        state.userIndustryExperience = [d];
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.GetCrd)
        getCrd(ctx: StateContext<RegistrationCertificationStateModel>) {
            return this.apiClient.getCrd(this.appService.currentUser.id!!)
                .pipe(tap(d => {
                    ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                        state.userCrd = d;
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.GetIndustryExperience)
        getIndustryExperience(ctx: StateContext<RegistrationCertificationStateModel>) {
            return this.apiClient.getUserIndustryExperience(this.appService.currentUser.id!!)
                .pipe(tap(d => {
                    ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                        state.userIndustryExperience = [d];
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.UpdateUserCrd)
        updateCrd(ctx: StateContext<RegistrationCertificationStateModel>, action: RegistrationCertificationActions.UpdateUserCrd) {
            return this.apiClient.updateCrd(action.userCrd)
                .pipe(tap(d => {
                    ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                        state.userCrd = d;
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.UpdateUserIndustryExperience)
        updateIndustryExperience(ctx: StateContext<RegistrationCertificationStateModel>, action: RegistrationCertificationActions.UpdateUserIndustryExperience) {
            return this.apiClient.updateIndustryExperienceOption(action.userIndustryExperience)
                .pipe(tap(d => {
                    ctx.setState(produce((state: RegistrationCertificationStateModel) => {
                        state.userIndustryExperience = [d];
                    }));
                }));
        }

        @Action(RegistrationCertificationActions.GetAllUserRegistrationCertificationInfo)
        loadAllRegistrationCertificationData(ctx: StateContext<RegistrationCertificationStateModel>) {
            const userId = this.appService.currentUser.id!!;
            return forkJoin([
                this.apiClient.getAllRegistrationOptions(),
                this.apiClient.getAllCertificateOptions(),
                this.apiClient.getAllIndustryExperienceOptions(),
                this.apiClient.getAllUserRegistration(userId),
                this.apiClient.getAllUserCertification(userId),
                this.apiClient.getUserCrd(userId),
                this.apiClient.getAllUserIndustryExperience(userId)
            ]).pipe(tap(resultSet => {
                const state = { ...ctx.getState() };
                state.userRegistrations = resultSet[3] as any[];
                state.userCertifications = resultSet[4] as any[];
                state.userCrd = resultSet[5] as any;
                state.userIndustryExperience = resultSet[6] as any[];

                state.registrationOptions = this.convertToExtended(resultSet[0] as ExtendedNamedModel[],
                    state.userRegistrations, optionIdMapper.registration);

                state.certificationOptions = this.convertToExtended(resultSet[1] as ExtendedNamedModel[],
                    state.userCertifications, optionIdMapper.certification);

                state.industryExperienceOptions = this.convertToExtended(resultSet[2] as ExtendedNamedModel[],
                    state.userIndustryExperience, optionIdMapper.industryExperience);
                ctx.patchState(state);
            }));
        }

        private convertToExtended(dataList: ExtendedNamedModel[], userSelections: any[], userMatchingProperty: string): ExtendedNamedModel[] {
            return UserSelectionHelper.convertToExtendedNamedModel(dataList, userSelections, userMatchingProperty);
        }
    }
}