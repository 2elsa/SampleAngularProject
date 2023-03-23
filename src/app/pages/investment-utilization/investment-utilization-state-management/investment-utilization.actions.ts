import { UserAllocation, UserAlternative, 
    UserCommodity, UserEquity, UserInternationalEquity, 
    UserMoneyMarket, UserMunicipalBond, UserProduct, 
    UserSectorEquity, UserTaxableBond 
} from "@services/flxwealthmanager.api.client";
import { ExtendedNamedModel } from "@shared/extended-named-model";

export namespace InvestmentUtilizationActions{
    export class AddedUserAllocation {
        static readonly type = '[Investment-Utilization] Added UserAllocation';
        constructor(public option: ExtendedNamedModel, public userAllocation: UserAllocation) { }
    }

    export class DeletedUserAllocation {
        static readonly type = '[Investment-Utilization] Deleted UserAllocation';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserAlternative {
        static readonly type = '[Investment-Utilization] Added UserAlternative';
        constructor(public option: ExtendedNamedModel, public userAlternative: UserAlternative) { }
    }

    export class DeletedUserAlternative {
        static readonly type = '[Investment-Utilization] Deleted UserAlternative';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserCommodity {
        static readonly type = '[Investment-Utilization] Added UserCommodity';
        constructor(public option: ExtendedNamedModel, public userCommodity: UserCommodity) { }
    }

    export class DeletedUserCommodity {
        static readonly type = '[Investment-Utilization] Deleted UserCommodity';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserEquity {
        static readonly type = '[Investment-Utilization] Added UserEquity';
        constructor(public option: ExtendedNamedModel, public userEquity: UserEquity) { }
    }

    export class DeletedUserEquity {
        static readonly type = '[Investment-Utilization] Deleted UserEquity';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserInternationalEquity {
        static readonly type = '[Investment-Utilization] Added UserInternationalEquity';
        constructor(public option: ExtendedNamedModel, public userInternationalEquity: UserInternationalEquity) { }
    }

    export class DeletedUserInternationalEquity {
        static readonly type = '[Investment-Utilization] Deleted UserInternationalEquity';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserMoneyMarket {
        static readonly type = '[Investment-Utilization] Added UserMoneyMarket';
        constructor(public option: ExtendedNamedModel, public userMoneyMarket: UserMoneyMarket) { }
    }

    export class DeletedUserMoneyMarket {
        static readonly type = '[Investment-Utilization] Deleted UserMoneyMarket';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserMunicipalBond {
        static readonly type = '[Investment-Utilization] Added UserMunicipalBond';
        constructor(public option: ExtendedNamedModel, public userMunicipalBond: UserMunicipalBond) { }
    }

    export class DeletedUserMunicipalBond {
        static readonly type = '[Investment-Utilization] Deleted UserMunicipalBond';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserProduct {
        static readonly type = '[Investment-Utilization] Added UserProduct';
        constructor(public option: ExtendedNamedModel, public userProduct: UserProduct) { }
    }

    export class DeletedUserProduct {
        static readonly type = '[Investment-Utilization] Deleted UserProduct';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserSectorEquity {
        static readonly type = '[Investment-Utilization] Added UserSectorEquity';
        constructor(public option: ExtendedNamedModel, public userSectorEquity: UserSectorEquity) { }
    }

    export class DeletedUserSectorEquity {
        static readonly type = '[Investment-Utilization] Deleted UserSectorEquity';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserTaxableBond {
        static readonly type = '[Investment-Utilization] Added UserTaxableBond';
        constructor(public option: ExtendedNamedModel, public userTaxableBond: UserTaxableBond) { }
    }

    export class DeletedUserTaxableBond {
        static readonly type = '[Investment-Utilization] Deleted UserTaxableBond';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class GetAllocationOptions {
        static readonly type = '[Investment-Utilization] Get AllocationOptions';
    }

    export class GetAlternativeOptions {
        static readonly type = '[Investment-Utilization] Get AlternativeOptions';
    }

    export class GetCommodityOptions {
        static readonly type = '[Investment-Utilization] Get CommodityOptions';
    }

    export class GetEquityOptions {
        static readonly type = '[Investment-Utilization] Get EquityOptions';
    }

    export class GetInternationalEquityOptions {
        static readonly type = '[Investment-Utilization] Get InternationalEquityOptions';
    }

    export class GetMoneyMarketOptions {
        static readonly type = '[Investment-Utilization] Get MoneyMarketOptions';
    }

    export class GetMunicipalBondOptions {
        static readonly type = '[Investment-Utilization] Get MunicipalBondOptions';
    }

    export class GetProductOptions {
        static readonly type = '[Investment-Utilization] Get ProductOptions';
    }

    export class GetSectorEquityOptions {
        static readonly type = '[Investment-Utilization] Get SectorEquityOptions';
    }

    export class GetTaxableBondOptions {
        static readonly type = '[Investment-Utilization] Get TaxableBondOptions';
    }

    export class GetAllUserInvestmentUtilizationInfo{
        static readonly type = '[Investment-Utilization] Get All Options';
    }
}