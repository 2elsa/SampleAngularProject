import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { patch, removeItem, updateItem } from "@ngxs/store/operators";
import { AppService } from "@services/app.service";
import {
    CountryState,
    FlxWealthManagerApiClient,
    NamedModel,
    UserBiography, UserEducation,
    UserHonorAndAward,
    UserJobHistory, UserLinkedIn,
    UserProfessionalAssociation
} from "@services/flxwealthmanager.api.client";
import { produce } from "immer";
import { forkJoin, of } from "rxjs";
import { tap } from "rxjs/operators";
import { ProfessionalExperienceActions } from "./professional-experience.actions";

export interface ProfessionalExperienceStateModel {
    biography?: UserBiography;
    educations: UserEducation[];
    honorsAndAwards: UserHonorAndAward[];
    jobHistories: UserJobHistory[];
    linkedIn?: UserLinkedIn;
    professionalAssociations: UserProfessionalAssociation[];
    selectedEducation?: UserEducation;
    selectedJobHistory?: UserJobHistory;
    selectedHonorAward?: UserHonorAndAward;
    selectedProfessionalAssociation?: UserProfessionalAssociation;
    countries: NamedModel[];
    states: CountryState[];
}

@State<ProfessionalExperienceStateModel>({
    name: 'professional_experience_state',
    defaults: {
        educations: [],
        honorsAndAwards: [],
        jobHistories: [],
        professionalAssociations: [],
        countries: [],
        states: []
    }
})
@Injectable()
export class ProfessionalExperienceState {
    constructor(private readonly apiClient: FlxWealthManagerApiClient,
        private readonly appService: AppService) { }

    @Action(ProfessionalExperienceActions.AddBiography)
    addUserBio(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.AddBiography) {
        return this.apiClient.saveUserBiography(action.bio)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.biography = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetBiography)
    getUserBio(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetBiography) {
        return this.apiClient.getUserBiography(action.userId)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.biography = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.UpdateBiography)
    updateUserBio(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.UpdateBiography) {
        return this.apiClient.updateUserBiography(action.bio)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.biography = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.DeleteBiography)
    deleteUserBio(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.DeleteBiography) {
        return this.apiClient.deleteUserBiography(action.userId)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        if (d) {
                            state.biography = undefined;
                        }
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.ResetBiography)
    resetBiograhy(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.ResetBiography) {
        ctx.patchState({
            biography: action.bio
        });
    }

    //--- education

    @Action(ProfessionalExperienceActions.AddEducation)
    addUserEducation(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.AddEducation) {
        return this.apiClient.saveUserEducation(action.education)
            .pipe(
                tap(d => {
                    const state = ctx.getState();
                    d.country = state.countries.find(c => c.id === d.country_Id);
                    d.state = state.states.find(s => s.id === d.state_Id);
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.educations.push(d);
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetEducation)
    getUserEducation(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetEducation) {
        return this.apiClient.getUserEducation(action.id)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.selectedEducation = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetAllUserEducation)
    getAllUserEducations(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetAllUserEducation) {
        return this.apiClient.getAllUserEducations(action.userId)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.educations = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.UpdateEducation)
    updateUserEducation(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.UpdateEducation) {
        return this.apiClient.updateUserEducation(action.education)
            .pipe(
                tap(d => {
                    ctx.setState(patch<ProfessionalExperienceStateModel>({
                        educations: updateItem<UserEducation>(i => i?.id === d.id, patch<any>(d))
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.DeleteEducation)
    deleteUserEdu(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.DeleteEducation) {
        return this.apiClient.deleteUserEducation(action.id)
            .pipe(
                tap(d => {
                    ctx.setState(patch<ProfessionalExperienceStateModel>({
                        educations: removeItem(i => d && i?.id === action.id)
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.ResetSelectedEducation)
    setResetEducation(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.ResetSelectedEducation) {
        ctx.setState(patch<ProfessionalExperienceStateModel>({
            selectedEducation: action.education
        }))
    }

    //honors and awards

    @Action(ProfessionalExperienceActions.AddHonorAward)
    addUserHonorsAndAwards(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.AddHonorAward) {
        return this.apiClient.saveUserHonorAward(action.award)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.honorsAndAwards.push(d);
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetHonorAward)
    getUserHonorsAndAwards(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetHonorAward) {
        return this.apiClient.getUserHonorAward(action.id)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.selectedHonorAward = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetAllUserHonorsAwards)
    getAllUserHonorsAndAwards(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetAllUserHonorsAwards) {
        return this.apiClient.getAllUserHonorsAndAwards(action.userId)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.honorsAndAwards.push(...d);
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.UpdateHonorAward)
    updateUserHonorsAndAwards(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.UpdateHonorAward) {
        return this.apiClient.updateUserHonorAward(action.award)
            .pipe(
                tap(d => {
                    ctx.setState(patch<ProfessionalExperienceStateModel>({
                        honorsAndAwards: updateItem<UserHonorAndAward>(i => i?.id === d.id, patch<any>(d))
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.DeleteHonorAward)
    deleteUserHonorAward(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.DeleteHonorAward) {
        return this.apiClient.deleteUserHonorAward(action.id)
            .pipe(
                tap(d => {
                    ctx.setState(patch<ProfessionalExperienceStateModel>({
                        honorsAndAwards: removeItem(i => d && i?.id === action.id)
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.ResetSelectedHonorAward)
    setResetHonorAward(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.ResetSelectedHonorAward) {
        ctx.setState(patch<ProfessionalExperienceStateModel>({
            selectedHonorAward: action.award
        }))
    }

    //-- job history


    @Action(ProfessionalExperienceActions.AddJobHistory)
    addUserJobHistory(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.AddJobHistory) {
        return this.apiClient.saveUserJobHistory(action.jobHistory)
            .pipe(
                tap(d => {
                    const state = ctx.getState();
                    d.country = state.countries.find(c => c.id === d.country_Id);
                    d.state = state.states.find(s => s.id === d.state_Id);
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.jobHistories.push(d);
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetJobHistory)
    getUserJobHistory(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetJobHistory) {
        return this.apiClient.getUserJobHistory(action.id)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.selectedJobHistory = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetAllUserJobHistory)
    getAllJobHistories(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetAllUserJobHistory) {
        return this.apiClient.getAllUserJobHistories(action.userId)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.jobHistories = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.UpdateJobHistory)
    updateJobHistory(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.UpdateJobHistory) {
        return this.apiClient.updateUserJobHistory(action.jobHistory)
            .pipe(
                tap(d => {
                    ctx.setState(patch<ProfessionalExperienceStateModel>({
                        jobHistories: updateItem<UserJobHistory>(i => i?.id === d.id, patch<any>(d))
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.DeleteJobHistory)
    deleteUserJobHistory(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.DeleteJobHistory) {
        return this.apiClient.deleteUserJobHistory(action.id)
            .pipe(
                tap(d => {
                    ctx.setState(patch<ProfessionalExperienceStateModel>({
                        jobHistories: removeItem(i => d && i?.id === action.id)
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.ResetSelectedJobHistory)
    setResetJobHistory(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.ResetSelectedJobHistory) {
        ctx.setState(patch<ProfessionalExperienceStateModel>({
            selectedJobHistory: action.jobHistory
        }))
    }

    //-- linked in
    @Action(ProfessionalExperienceActions.AddLinkedIn)
    addUserLinkedIn(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.AddLinkedIn) {
        return this.apiClient.saveUserLinkedIn(action.linkedIn)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.linkedIn = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetLinkedIn)
    getUserLinkedIn(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetLinkedIn) {
        return this.apiClient.getUserLinkedIn(action.userId)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.linkedIn = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.UpdateLinkedIn)
    updateUserLinkedIn(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.UpdateLinkedIn) {
        return this.apiClient.updateUserLinkedIn(action.linkedIn)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.linkedIn = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.DeleteLinkedIn)
    deleteUserLinkedIn(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.DeleteLinkedIn) {
        return this.apiClient.deleteUserLinkedIn(action.userId)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        if (d) {
                            state.linkedIn = undefined;
                        }
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.ResetLinkedIn)
    resetUserLinkedIn(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.ResetLinkedIn) {
        ctx.patchState({
            linkedIn: action.linkedIn
        });
    }

    //-- professional assoc    

    @Action(ProfessionalExperienceActions.AddProfessionalAssociation)
    addUserProfessionalAssociation(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.AddProfessionalAssociation) {
        return this.apiClient.saveUserProfessionalAssociation(action.profAssoc)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.professionalAssociations.push(d);
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetProfessionalAssociation)
    getUserProfessionalAssociations(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetProfessionalAssociation) {
        return this.apiClient.getUserProfessionalAssociation(action.id)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.selectedProfessionalAssociation = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetAllUserProfessionalAssociations)
    getAllUserProfessionalAssociations(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetAllUserProfessionalAssociations) {
        return this.apiClient.getAllUserProfessionalAssociations(action.userId)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.professionalAssociations = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.UpdateProfessionalAssociation)
    updateProfessionalAssociation(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.UpdateProfessionalAssociation) {
        return this.apiClient.updateUserProfessionalAssociation(action.profAssoc)
            .pipe(
                tap(d => {
                    ctx.setState(patch<ProfessionalExperienceStateModel>({
                        professionalAssociations: updateItem<UserProfessionalAssociation>(i => i?.id === d.id, patch<any>(d))
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.DeleteProfessionalAssociation)
    deleteUserProfessionalAssociation(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.DeleteProfessionalAssociation) {
        return this.apiClient.deleteUserProfessionalAssociation(action.id)
            .pipe(
                tap(d => {
                    ctx.setState(patch<ProfessionalExperienceStateModel>({
                        professionalAssociations: removeItem(i => d && i?.id === action.id)
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.ResetSelectedProfessionalAssociation)
    setResetProfessionalAssociation(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.ResetSelectedProfessionalAssociation) {
        ctx.setState(patch<ProfessionalExperienceStateModel>({
            selectedProfessionalAssociation: action.profAssoc
        }))
    }

    // Countries

    @Action(ProfessionalExperienceActions.GetAllCountries)
    loadAllCountries(ctx: StateContext<ProfessionalExperienceStateModel>) {
        const countries = ctx.getState().countries;
        if (countries.length) {
            return of(countries);
        }
        return this.apiClient.getAllCountries()
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.countries = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.GetAllStatesForCountry)
    getStatesByCountryId(ctx: StateContext<ProfessionalExperienceStateModel>,
        action: ProfessionalExperienceActions.GetAllStatesForCountry) {
        const states = ctx.getState().states.filter(s => s.country_Id === action.countryId);
        if (states.length) {
            return of(states);
        }
        return this.apiClient.getAllStates(action.countryId)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                        state.states = d;
                    }));
                }));
    }

    @Action(ProfessionalExperienceActions.LoadAllProfessionalExperienceData)
    loadAllProExperienceData(ctx: StateContext<ProfessionalExperienceStateModel>) {
        const userId = this.appService.currentUser.id!!;
        return forkJoin([
            this.apiClient.getUserBiography(userId),
            this.apiClient.getAllUserEducations(userId),
            this.apiClient.getAllUserHonorsAndAwards(userId),
            this.apiClient.getAllUserJobHistories(userId),
            this.apiClient.getUserLinkedIn(userId),
            this.apiClient.getAllUserProfessionalAssociations(userId),
            this.apiClient.getAllCountries()
        ]).pipe(
            tap(resultSet => {
                ctx.setState(produce((state: ProfessionalExperienceStateModel) => {
                    state.biography = <UserBiography>resultSet[0];
                    state.educations = <UserEducation[]>resultSet[1];
                    state.honorsAndAwards = <UserHonorAndAward[]>resultSet[2];
                    state.jobHistories = <UserJobHistory[]>resultSet[3];
                    state.linkedIn = <UserLinkedIn>resultSet[4];
                    state.professionalAssociations = <UserProfessionalAssociation[]>resultSet[5];
                    state.countries = <NamedModel[]>resultSet[6];
                }));
            }));
    }
}