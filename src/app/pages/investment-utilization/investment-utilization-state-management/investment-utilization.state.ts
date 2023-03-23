import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { patch, removeItem, updateItem } from "@ngxs/store/operators";
import { AppService } from "@services/app.service";
import { FlxWealthManagerApiClient, UserAllocation, UserAlternative, UserCommodity, UserEquity, UserInternationalEquity, UserMoneyMarket, UserMunicipalBond, UserProduct, UserSectorEquity, UserTaxableBond } from "@services/flxwealthmanager.api.client";
import { ExtendedNamedModel } from "@shared/extended-named-model";
import { investmentUtilizationOptionIdMapper, UserSelectionHelper } from "@shared/user-selection-helper";
import produce from "immer";
import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { InvestmentUtilizationActions } from "./investment-utilization.actions";

export interface InvestmentUtilizationStateModel {
    userAllocations: UserAllocation[],
    userAlternatives: UserAlternative[],
    userCommodities: UserCommodity[],
    userEquities: UserEquity[],
    userInternationalEquities: UserInternationalEquity[],
    userMoneyMarkets: UserMoneyMarket[],
    userMunicipalBonds: UserMunicipalBond[],
    userProducts: UserProduct[],
    userSectorEquities: UserSectorEquity[],
    userTaxableBonds: UserTaxableBond[],
    allocationOptions: ExtendedNamedModel[],
    alternativeOptions: ExtendedNamedModel[],
    commodityOptions: ExtendedNamedModel[],
    equityOptions: ExtendedNamedModel[],
    internationalEquityOptions: ExtendedNamedModel[],
    moneyMarketOptions: ExtendedNamedModel[],
    municipalBondOptions: ExtendedNamedModel[],
    productOptions: ExtendedNamedModel[],
    sectorEquityOptions: ExtendedNamedModel[],
    taxableBondOptions: ExtendedNamedModel[]
}

@State<InvestmentUtilizationStateModel>({
    name: 'investment_utilization',
    defaults: {
        userAllocations: [],
        userAlternatives: [],
        userCommodities: [],
        userEquities: [],
        userInternationalEquities: [],
        userMoneyMarkets: [],
        userMunicipalBonds: [],
        userProducts: [],
        userSectorEquities: [],
        userTaxableBonds: [],
        allocationOptions: [],
        alternativeOptions: [],
        commodityOptions: [],
        equityOptions: [],
        internationalEquityOptions: [],
        moneyMarketOptions: [],
        municipalBondOptions: [],
        productOptions: [],
        sectorEquityOptions: [],
        taxableBondOptions: []
    }
})
@Injectable()
export class InvestmentUtilizationState {
    constructor(private readonly apiClient: FlxWealthManagerApiClient,
        private readonly appService: AppService) { }

    @Action(InvestmentUtilizationActions.AddedUserAllocation)
    addUserAllocation(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserAllocation) {
        return this.apiClient.saveUserAllocation(action.userAllocation)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.allocationOptions = this.convertToExtended(state.allocationOptions, [...state.userAllocations, d],
                            investmentUtilizationOptionIdMapper.allocation);
                        state.userAllocations = [...state.userAllocations, d];
                    }));
                }));
    }
    @Action(InvestmentUtilizationActions.AddedUserAlternative)
    addUserAlternative(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserAlternative) {
        return this.apiClient.saveUserAlternative(action.userAlternative)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.alternativeOptions = this.convertToExtended(state.alternativeOptions, [...state.userAlternatives, d],
                            investmentUtilizationOptionIdMapper.alternative);
                        state.userAlternatives = [...state.userAlternatives, d];
                    }));
                }));
    }
    @Action(InvestmentUtilizationActions.AddedUserCommodity)
    addUserCommodity(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserCommodity) {
        return this.apiClient.saveUserCommodity(action.userCommodity)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.commodityOptions = this.convertToExtended(state.commodityOptions, [...state.userCommodities, d],
                            investmentUtilizationOptionIdMapper.commodity);
                        state.userCommodities = [...state.userCommodities, d];
                    }));
                }));
    }

    @Action(InvestmentUtilizationActions.AddedUserEquity)
    addUserEquity(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserEquity) {
        return this.apiClient.saveUserEquity(action.userEquity)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.equityOptions = this.convertToExtended(state.equityOptions, [...state.userEquities, d],
                            investmentUtilizationOptionIdMapper.equity);
                        state.userEquities = [...state.userEquities, d];
                    }));
                }));
    }

    @Action(InvestmentUtilizationActions.AddedUserInternationalEquity)
    addUserInternationalEquity(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserInternationalEquity) {
        return this.apiClient.saveUserInternationalEquity(action.userInternationalEquity)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.internationalEquityOptions = this.convertToExtended(state.internationalEquityOptions, [...state.userInternationalEquities, d],
                            investmentUtilizationOptionIdMapper.intl_Equity);
                        state.userInternationalEquities = [...state.userInternationalEquities, d];
                    }));
                }));
    }

    @Action(InvestmentUtilizationActions.AddedUserMoneyMarket)
    addUserMoneyMarket(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserMoneyMarket) {
        return this.apiClient.saveUserMoneyMarket(action.userMoneyMarket)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.moneyMarketOptions = this.convertToExtended(state.moneyMarketOptions, [...state.userMoneyMarkets, d],
                            investmentUtilizationOptionIdMapper.money_Market);
                        state.userMoneyMarkets = [...state.userMoneyMarkets, d];
                    }));
                }));
    }

    @Action(InvestmentUtilizationActions.AddedUserMunicipalBond)
    addUserMunicipalBond(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserMunicipalBond) {
        return this.apiClient.saveUserMunicipalBond(action.userMunicipalBond)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.municipalBondOptions = this.convertToExtended(state.municipalBondOptions, [...state.userMunicipalBonds, d],
                            investmentUtilizationOptionIdMapper.municipal_Bond);
                        state.userMunicipalBonds = [...state.userMunicipalBonds, d];
                    }));
                }));
    }

    @Action(InvestmentUtilizationActions.AddedUserProduct)
    addUserProduct(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserProduct) {
        return this.apiClient.saveUserProduct(action.userProduct)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.productOptions = this.convertToExtended(state.productOptions, [...state.userProducts, d],
                            investmentUtilizationOptionIdMapper.product);
                        state.userProducts = [...state.userProducts, d];
                    }));
                }));
    }

    @Action(InvestmentUtilizationActions.AddedUserSectorEquity)
    addUserSectorEquity(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserSectorEquity) {
        return this.apiClient.saveUserSectorEquity(action.userSectorEquity)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.sectorEquityOptions = this.convertToExtended(state.sectorEquityOptions, [...state.userSectorEquities, d],
                            investmentUtilizationOptionIdMapper.sector_Equity);
                        state.userSectorEquities = [...state.userSectorEquities, d];
                    }));
                }));
    }

    @Action(InvestmentUtilizationActions.AddedUserTaxableBond)
    addUserTaxableBond(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.AddedUserTaxableBond) {
        return this.apiClient.saveUserTaxableBond(action.userTaxableBond)
            .pipe(
                tap(d => {
                    ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                        state.taxableBondOptions = this.convertToExtended(state.taxableBondOptions, [...state.userTaxableBonds, d],
                            investmentUtilizationOptionIdMapper.taxable_Bond);
                        state.userTaxableBonds = [...state.userTaxableBonds, d];
                    }));
                }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserAllocation)
    deleteAllocation(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserAllocation) {
        return this.apiClient.deleteUserAllocation(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userAllocations: removeItem(i => i?.id === action.option.userOptionId),
                    allocationOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserAlternative)
    deleteAlternative(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserAlternative) {
        return this.apiClient.deleteUserAlternative(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userAlternatives: removeItem(i => i?.id === action.option.userOptionId),
                    alternativeOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserCommodity)
    deleteCommodity(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserCommodity) {
        return this.apiClient.deleteUserCommodity(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userCommodities: removeItem(i => i?.id === action.option.userOptionId),
                    commodityOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserEquity)
    deleteEquity(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserEquity) {
        return this.apiClient.deleteUserEquity(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userEquities: removeItem(i => i?.id === action.option.userOptionId),
                    equityOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserInternationalEquity)
    deleteInternationalEquity(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserInternationalEquity) {
        return this.apiClient.deleteUserInternationalEquity(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userInternationalEquities: removeItem(i => i?.id === action.option.userOptionId),
                    internationalEquityOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserMoneyMarket)
    deleteMoneyMarket(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserMoneyMarket) {
        return this.apiClient.deleteUserMoneyMarket(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userMoneyMarkets: removeItem(i => i?.id === action.option.userOptionId),
                    moneyMarketOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserMunicipalBond)
    deleteMunicipalBond(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserMunicipalBond) {
        return this.apiClient.deleteUserMunicipalBond(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userMunicipalBonds: removeItem(i => i?.id === action.option.userOptionId),
                    municipalBondOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserProduct)
    deleteProduct(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserProduct) {
        return this.apiClient.deleteUserProduct(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userProducts: removeItem(i => i?.id === action.option.userOptionId),
                    productOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserSectorEquity)
    deleteSectorEquity(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserSectorEquity) {
        return this.apiClient.deleteUserSectorEquity(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userSectorEquities: removeItem(i => i?.id === action.option.userOptionId),
                    sectorEquityOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.DeletedUserTaxableBond)
    deleteTaxableBond(ctx: StateContext<InvestmentUtilizationStateModel>, action: InvestmentUtilizationActions.DeletedUserTaxableBond) {
        return this.apiClient.deleteUserTaxableBond(action.option.userOptionId!!)
            .pipe(tap(d => {
                ctx.setState(patch<InvestmentUtilizationStateModel>({
                    userTaxableBonds: removeItem(i => i?.id === action.option.userOptionId),
                    taxableBondOptions: updateItem<ExtendedNamedModel>(i => i?.id === action.option.id, <any>patch({ checked: !d }))
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetAllocationOptions)
    getAllocationOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllAllocationOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.allocationOptions = d;
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetAlternativeOptions)
    getAlternativeOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllAlternativeOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.alternativeOptions = d;
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetCommodityOptions)
    getCommodityOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllCommodityOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.commodityOptions = d;
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetEquityOptions)
    getEquityOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllEquityOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.equityOptions = d;
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetInternationalEquityOptions)
    getInternationalEquityOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllInternationalEquityOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.internationalEquityOptions = d;
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetMoneyMarketOptions)
    getMoneyMarketOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllMoneyMarketOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.moneyMarketOptions = d;
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetMunicipalBondOptions)
    getMunicipalBondOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllMunicipalBondOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.municipalBondOptions = d;
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetProductOptions)
    getProductOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllProductOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.productOptions = d;
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetSectorEquityOptions)
    getSectorEquityOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllSectorEquityOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.sectorEquityOptions = d;
                }));
            }));
    }

    @Action(InvestmentUtilizationActions.GetTaxableBondOptions)
    getTaxableBondOptions(ctx: StateContext<InvestmentUtilizationStateModel>) {
        return this.apiClient.getAllTaxableBondOptions()
            .pipe(tap(d => {
                ctx.setState(produce((state: InvestmentUtilizationStateModel) => {
                    state.taxableBondOptions = d;
                }));
            }));
    }


    @Action(InvestmentUtilizationActions.GetAllUserInvestmentUtilizationInfo)
    getAllInvestmentUtilizationData(ctx: StateContext<InvestmentUtilizationStateModel>) {
        const userId = this.appService.currentUser.id!!;
        return forkJoin([
            this.apiClient.getAllAllocationOptions(),
            this.apiClient.getAllAlternativeOptions(),
            this.apiClient.getAllCommodityOptions(),
            this.apiClient.getAllEquityOptions(),
            this.apiClient.getAllInternationalEquityOptions(),
            this.apiClient.getAllMoneyMarketOptions(),
            this.apiClient.getAllMunicipalBondOptions(),
            this.apiClient.getAllProductOptions(),
            this.apiClient.getAllSectorEquityOptions(),
            this.apiClient.getAllTaxableBondOptions(),
            this.apiClient.getAllUserAllocations(userId),
            this.apiClient.getUserAllAlternatives(userId),
            this.apiClient.getAllCommodities(userId),
            this.apiClient.getAllUserEquities(userId),
            this.apiClient.getAllUserInternationalEquities(userId),
            this.apiClient.getAllUserMoneyMarkets(userId),
            this.apiClient.getAllUserMunicipalBonds(userId),
            this.apiClient.getAllUserProducts(userId),
            this.apiClient.getAllUserSectorEquities(userId),
            this.apiClient.getAllUserTaxableBonds(userId),
        ]).pipe(tap(resultSet => {
            const state = { ...ctx.getState() };
            state.userAllocations = resultSet[10] as any[];
            state.userAlternatives = resultSet[11] as any[];
            state.userCommodities = resultSet[12] as any[];
            state.userEquities = resultSet[13] as any[];
            state.userInternationalEquities = resultSet[14] as any[];
            state.userMoneyMarkets = resultSet[15] as any[];
            state.userMunicipalBonds = resultSet[16] as any[];
            state.userProducts = resultSet[17] as any[];
            state.userSectorEquities = resultSet[18] as any[];
            state.userTaxableBonds = resultSet[19] as any[];

            state.allocationOptions = this.convertToExtended(resultSet[0] as ExtendedNamedModel[],
                state.userAllocations, investmentUtilizationOptionIdMapper.allocation);

            state.alternativeOptions = this.convertToExtended(resultSet[1] as ExtendedNamedModel[],
                state.userAlternatives, investmentUtilizationOptionIdMapper.alternative);

            state.commodityOptions = this.convertToExtended(resultSet[2] as ExtendedNamedModel[],
                state.userCommodities, investmentUtilizationOptionIdMapper.commodity);

            state.equityOptions = this.convertToExtended(resultSet[3] as ExtendedNamedModel[],
                state.userEquities, investmentUtilizationOptionIdMapper.equity);

            state.internationalEquityOptions = this.convertToExtended(resultSet[4] as ExtendedNamedModel[],
                state.userInternationalEquities, investmentUtilizationOptionIdMapper.intl_Equity);

            state.moneyMarketOptions = this.convertToExtended(resultSet[5] as ExtendedNamedModel[],
                state.userMoneyMarkets, investmentUtilizationOptionIdMapper.money_Market);

            state.municipalBondOptions = this.convertToExtended(resultSet[6] as ExtendedNamedModel[],
                state.userMunicipalBonds, investmentUtilizationOptionIdMapper.municipal_Bond);

            state.productOptions = this.convertToExtended(resultSet[7] as ExtendedNamedModel[],
                state.userProducts, investmentUtilizationOptionIdMapper.product);

            state.sectorEquityOptions = this.convertToExtended(resultSet[8] as ExtendedNamedModel[],
                state.userSectorEquities, investmentUtilizationOptionIdMapper.sector_Equity);

            state.taxableBondOptions = this.convertToExtended(resultSet[9] as ExtendedNamedModel[],
                state.userTaxableBonds, investmentUtilizationOptionIdMapper.taxable_Bond);
            ctx.patchState(state);
        }));
    }

    private convertToExtended(dataList: ExtendedNamedModel[], userSelections: any[], userMatchingProperty: string): ExtendedNamedModel[] {
        return UserSelectionHelper.convertToExtendedNamedModel(dataList, userSelections, userMatchingProperty);
    }
}