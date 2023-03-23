import { NamedModel } from "@services/flxwealthmanager.api.client";
import { ExtendedNamedModel } from "./extended-named-model";

export class UserSelectionHelper {

    static convertToExtendedNamedModel<T extends NamedModel>(models: T[], selections: any[], matchingProperty: string): ExtendedNamedModel[] {
        if (!models) {
            return [];
        }

        const selectionMap = models.filter(m => selections.some(s => +s[matchingProperty] === m.id))
            .map(m => {
                const userSelection = selections.find(s => +s[matchingProperty] === m.id);
                return { optionId: m.id!!, userOptionId: userSelection && +userSelection['id'] || 0 };
            });

        return models.map(m => new ExtendedNamedModel({
            ...m,
            ...{
                checked: selectionMap.some(s => s.optionId === m.id),
                userOptionId: this.userOptionRetriever(m.id!!, selectionMap)
            }
        }));
    }


    private static userOptionRetriever = (id: number, selectionMap: { optionId: number, userOptionId: number }[]): number => {
        const found = selectionMap.find(m => m.optionId === id);
        return found && found.userOptionId || 0;
    };
}

export const engagementUserOptionIdMapper = {
    clientFocus: 'client_Focus_Id',
    contactTime: 'contact_Time_Id',
    contactFrequency: 'frequency_Id',
    desiredSolutionService: 'desired_Solution_Service_Id',
    investmentImplementation: 'investment_Implementation_Id',
    preferredEngagement: 'preferred_Engagement_Id'
};

export const registrationCertificationOptionIdMapper = {
    registration: 'registration_Id',
    certification: 'certificate_Id',
    industryExperience: 'experience_Id'
}

export const investmentUtilizationOptionIdMapper = {
    allocation: 'allocation_Id',
    alternative: 'alternative_Id',
    commodity: 'commodity_Id',
    equity: 'equity_Id',
    intl_Equity: 'intl_Equity_Id',
    money_Market: 'money_Market_Id',
    municipal_Bond: 'municipal_Bond_Id',
    product: 'product_Id',
    sector_Equity: 'sector_Equity_Id',
    taxable_Bond: 'taxable_Bond_Id'
}