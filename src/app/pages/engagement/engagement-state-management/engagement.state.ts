import {
    Client, FlxWealthManagerApiClient, User, UserClientFocus,
    UserContactFrequency,
    UserContactTime, UserDesiredSolutionService, UserInvestmentImplementation,
    UserPreferredEngagement, UserTeamReviewer
} from "@services/flxwealthmanager.api.client";
import { ExtendedNamedModel } from "@shared/extended-named-model";
import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { EngagementActions } from './engagement.actions';
import { AppService } from "@services/app.service";
import { forkJoin, of } from "rxjs";
import { patch, updateItem, removeItem } from "@ngxs/store/operators";
import { engagementUserOptionIdMapper, UserSelectionHelper } from "@shared/user-selection-helper";
import { tap } from "rxjs/operators";
import { produce } from 'immer';
import { ToastService } from "@services/toast.service";

export interface EngagementStateModel {
    userClientFocuses: UserClientFocus[];
    userContactTimes: UserContactTime[];
    userContactFrequencies: UserContactFrequency[];
    userDesiredSolutions: UserDesiredSolutionService[];
    userInvestmentImplementations: UserInvestmentImplementation[];
    userPreferredEngagements: UserPreferredEngagement[];
    userReviewManager?: UserTeamReviewer;
    clientFocusOptions: ExtendedNamedModel[];
    contactFrequencyOptions: ExtendedNamedModel[];
    contactTimeOptions: ExtendedNamedModel[];
    desiredSolutionOptions: ExtendedNamedModel[];
    preferredEngagementOptions: ExtendedNamedModel[];
    investmentImplementationOptions: ExtendedNamedModel[];
}

@State<EngagementStateModel>({
    name: 'engagement',
    defaults: {
        userClientFocuses: [],
        userContactTimes: [],
        userContactFrequencies: [],
        userDesiredSolutions: [],
        userInvestmentImplementations: [],
        userPreferredEngagements: [],
        clientFocusOptions: [],
        contactFrequencyOptions: [],
        contactTimeOptions: [],
        desiredSolutionOptions: [],
        preferredEngagementOptions: [],
        investmentImplementationOptions: []
    }
})
@Injectable()
export class EngagementState {
    constructor(
        private readonly apiClient: FlxWealthManagerApiClient,
        private readonly appService: AppService,
        private readonly toast: ToastService) { }

    @Action(EngagementActions.AddedUserClientFocus)
    addUserClientFocus(ctx: StateContext<EngagementStateModel>, action: EngagementActions.AddedUserClientFocus) {
        return this.apiClient.saveUserClientFocus(action.userClientFocus)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: EngagementStateModel) => {
                        state.clientFocusOptions = this.convertToExtended(state.clientFocusOptions, [...state.userClientFocuses, d],
                            engagementUserOptionIdMapper.clientFocus);
                        state.userClientFocuses = [...state.userClientFocuses, d];
                    }));
                }));
    }

    @Action(EngagementActions.AddedUserContactFrequency)
    addUserContactFrequency(ctx: StateContext<EngagementStateModel>, action: EngagementActions.AddedUserContactFrequency) {
        return this.apiClient.saveUserContactFrequency(action.userContactFrequency)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: EngagementStateModel) => {
                        state.contactFrequencyOptions = this.convertToExtended(state.contactFrequencyOptions, [d],
                            engagementUserOptionIdMapper.contactFrequency);
                        state.userContactFrequencies = [d];
                    }));
                }));
    }

    @Action(EngagementActions.AddedUserDesiredSolutionService)
    addUserDesiredSolutions(ctx: StateContext<EngagementStateModel>, action: EngagementActions.AddedUserDesiredSolutionService) {
        return this.apiClient.saveUserDesiredSolution(action.userDesiredSolutionService)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: EngagementStateModel) => {
                        state.desiredSolutionOptions = this.convertToExtended(state.desiredSolutionOptions, [...state.userDesiredSolutions, d],
                            engagementUserOptionIdMapper.desiredSolutionService);
                        state.userDesiredSolutions = [...state.userDesiredSolutions, d];

                    }));
                }));
    }

    @Action(EngagementActions.AddedUserInvestment)
    addUserInvestment(ctx: StateContext<EngagementStateModel>, action: EngagementActions.AddedUserInvestment) {
        return this.apiClient.saveUserInvestmentImplementation(action.userInvestment)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: EngagementStateModel) => {
                        state.investmentImplementationOptions = this.convertToExtended(state.investmentImplementationOptions, [...state.userInvestmentImplementations, d],
                            engagementUserOptionIdMapper.investmentImplementation);
                        state.userInvestmentImplementations = [...state.userInvestmentImplementations, d];

                    }));
                }));
    }

    @Action(EngagementActions.AddedUserPreferredContactTime)
    addUserContactTime(ctx: StateContext<EngagementStateModel>, action: EngagementActions.AddedUserPreferredContactTime) {
        return this.apiClient.saveUserContactTime(action.userPreferredContactTime)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: EngagementStateModel) => {
                        state.contactTimeOptions = this.convertToExtended(state.contactTimeOptions, [...state.userContactTimes, d], engagementUserOptionIdMapper.contactTime);
                        state.userContactTimes = [...state.userContactTimes, d];
                    }));
                }));
    }

    @Action(EngagementActions.AddedUserPreferredEngagement)
    addUserPreferredEngagement(ctx: StateContext<EngagementStateModel>, action: EngagementActions.AddedUserPreferredEngagement) {
        return this.apiClient.saveUserPreferredEngagement(action.userPreferredEngagement)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: EngagementStateModel) => {
                        state.preferredEngagementOptions = this.convertToExtended(state.preferredEngagementOptions, [...state.userPreferredEngagements, d],
                            engagementUserOptionIdMapper.preferredEngagement);
                        state.userPreferredEngagements = [...state.userPreferredEngagements, d];

                    }));
                }));
    }

    @Action(EngagementActions.AddedUserReviewManager)
    addUserReviewManager(ctx: StateContext<EngagementStateModel>, action: EngagementActions.AddedUserReviewManager) {
        const apiCall = action.userReviewManager.id ? this.apiClient.updateReviewer.bind(this.apiClient) : this.apiClient.saveReviewer.bind(this.apiClient);
        return apiCall(action.userReviewManager)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: EngagementStateModel) => {
                        state.userReviewManager = d;
                    }));
                }));
    }

    @Action(EngagementActions.DeletedUserClientFocus)
    deleteClientFocus(ctx: StateContext<EngagementStateModel>, action: EngagementActions.DeletedUserClientFocus) {
        return this.apiClient.deleteUserClientFocus(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<EngagementStateModel>({
                    userClientFocuses: removeItem(i => i?.id === action.option.userOptionId),
                    clientFocusOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(EngagementActions.DeletedUserPreferredContactTime)
    deleteConctactTime(ctx: StateContext<EngagementStateModel>, action: EngagementActions.DeletedUserPreferredContactTime) {
        return this.apiClient.deleteUserContactTime(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<EngagementStateModel>({
                    userContactTimes: removeItem(i => i?.id === action.option.userOptionId),
                    contactTimeOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(EngagementActions.DeletedUserInvestment)
    deleteInvestment(ctx: StateContext<EngagementStateModel>, action: EngagementActions.AddedUserInvestment) {
        return this.apiClient.deleteUserInvestmentImplementation(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<EngagementStateModel>({
                    userInvestmentImplementations: removeItem(i => i?.id === action.option.userOptionId),
                    investmentImplementationOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(EngagementActions.DeletedUserDesiredSolutionService)
    deleteDesiredSolution(ctx: StateContext<EngagementStateModel>, action: EngagementActions.DeletedUserDesiredSolutionService) {
        return this.apiClient.deleteUserDesiredSolution(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<EngagementStateModel>({
                    userDesiredSolutions: removeItem(i => i?.id === action.option.userOptionId),
                    desiredSolutionOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(EngagementActions.DeletedUserPreferredEngagement)
    deletePreferredEngagement(ctx: StateContext<EngagementStateModel>, action: EngagementActions.DeletedUserPreferredEngagement) {
        return this.apiClient.deleteUserPreferredEngagement(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<EngagementStateModel>({
                    userPreferredEngagements: removeItem(i => i?.id === action.option.userOptionId),
                    preferredEngagementOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(EngagementActions.UpdateUserReviewManager)
    updateReviewer(ctx: StateContext<EngagementStateModel>, action: EngagementActions.UpdateUserReviewManager) {
        return this.apiClient.updateReviewer(action.userReviewManager)
            .pipe(tap(reviewer => {
                ctx.setState(produce((state: EngagementStateModel) => {
                    state.userReviewManager = reviewer;
                }));
            }));
    }

    @Action(EngagementActions.GetClientFocusOptions)
    getClientFocusOptions(ctx: StateContext<EngagementStateModel>) {
        return this.apiClient.getAllClientFocusOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: EngagementStateModel) => {
                    state.clientFocusOptions = d;
                }));
            }));
    }
    @Action(EngagementActions.GetContactFrequncyOptions)
    getContactFrequencyOptions(ctx: StateContext<EngagementStateModel>) {
        return this.apiClient.getAllContactFrequencyOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: EngagementStateModel) => {
                    state.contactFrequencyOptions = d;
                }));
            }));
    }

    @Action(EngagementActions.GetContactTimeOptions)
    getContactTimeOptions(ctx: StateContext<EngagementStateModel>) {
        return this.apiClient.getAllContactTimeOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: EngagementStateModel) => {
                    state.contactTimeOptions = d;
                }));
            }));
    }

    @Action(EngagementActions.GetDesiredSolutionOptions)
    getDesiredSolutionOptions(ctx: StateContext<EngagementStateModel>) {
        return this.apiClient.getAllDesiredSolutionOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: EngagementStateModel) => {
                    state.desiredSolutionOptions = d;
                }));
            }));
    }

    @Action(EngagementActions.GetInvestmentImplOptions)
    getInvestmentOptions(ctx: StateContext<EngagementStateModel>) {
        return this.apiClient.getAllInvestmentImplementationOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: EngagementStateModel) => {
                    state.investmentImplementationOptions = d;
                }));
            }));
    }

    @Action(EngagementActions.GetPreferredEngagementOptions)
    getPreferredEngagementOptions(ctx: StateContext<EngagementStateModel>) {
        return this.apiClient.getAllPreferredEngagementOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: EngagementStateModel) => {
                    state.preferredEngagementOptions = d;
                }));
            }));
    }

    @Action(EngagementActions.GetTeamReviewer)
    getReviewManager(ctx: StateContext<EngagementStateModel>) {
        return this.apiClient.getUserReviewer(this.appService.currentUser.id!!)
            .pipe(tap(d => {
                ctx.setState(produce((state: EngagementStateModel) => {
                    state.userReviewManager = d;
                }));
            }));
    }

    @Action(EngagementActions.GetAllUserEngagementInfo)
    getAllEngagementData(ctx: StateContext<EngagementStateModel>) {
        const userId = this.appService.currentUser.id!!;

        return forkJoin([
            this.apiClient.getAllClientFocusOptions(),
            this.apiClient.getAllContactTimeOptions(),
            this.apiClient.getAllContactFrequencyOptions(),
            this.apiClient.getAllInvestmentImplementationOptions(),
            this.apiClient.getAllPreferredEngagementOptions(),
            this.apiClient.getAllDesiredSolutionOptions(),
            this.apiClient.getUserReviewer(userId),
            this.apiClient.getAllUserClientFocus(userId),
            this.apiClient.getAllUserContactTime(userId),
            this.apiClient.getAllUserContactFrequency(userId),
            this.apiClient.getAllUserDesiredSolution(userId),
            this.apiClient.getAllUserInvestmentImplementation(userId),
            this.apiClient.getAllUserPreferredEngagement(userId)
        ]).pipe(tap(resultSet => {
            const state = { ...ctx.getState() };
            state.userReviewManager = resultSet[6] as UserTeamReviewer;
            state.userClientFocuses = resultSet[7] as any[];
            state.userContactTimes = resultSet[8] as any[];
            state.userContactFrequencies = resultSet[9] as any[];
            state.userDesiredSolutions = resultSet[10] as any[];
            state.userInvestmentImplementations = resultSet[11] as any[];
            state.userPreferredEngagements = resultSet[12] as any[];

            state.clientFocusOptions = this.convertToExtended(resultSet[0] as ExtendedNamedModel[],
                state.userClientFocuses, engagementUserOptionIdMapper.clientFocus);

            state.contactTimeOptions = this.convertToExtended(resultSet[1] as ExtendedNamedModel[],
                state.userContactTimes, engagementUserOptionIdMapper.contactTime);

            state.contactFrequencyOptions = this.convertToExtended(resultSet[2] as ExtendedNamedModel[],
                state.userContactFrequencies, engagementUserOptionIdMapper.contactFrequency);

            state.investmentImplementationOptions = this.convertToExtended(resultSet[3] as ExtendedNamedModel[],
                state.userInvestmentImplementations,
                engagementUserOptionIdMapper.investmentImplementation);

            state.preferredEngagementOptions = this.convertToExtended(resultSet[4] as ExtendedNamedModel[],
                state.userPreferredEngagements, engagementUserOptionIdMapper.preferredEngagement);

            state.desiredSolutionOptions = this.convertToExtended(resultSet[5] as ExtendedNamedModel[],
                state.userDesiredSolutions,
                engagementUserOptionIdMapper.desiredSolutionService);
            ctx.patchState(state);

            this.toast.notify('Data loaded!');
        }));
    }

    private convertToExtended(dataList: ExtendedNamedModel[], userSelections: any[], userMatchingProperty: string): ExtendedNamedModel[] {
        return UserSelectionHelper.convertToExtendedNamedModel(dataList, userSelections, userMatchingProperty);
    }
}