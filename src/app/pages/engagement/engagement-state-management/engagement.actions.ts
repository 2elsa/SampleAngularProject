import {
    UserClientFocus, UserContactFrequency,
    UserContactTime, UserDesiredSolutionService,
    UserInvestmentImplementation,
    UserPreferredEngagement, UserTeamReviewer
} from "@services/flxwealthmanager.api.client";
import { ExtendedNamedModel } from "@shared/extended-named-model";

export namespace EngagementActions {


    export class AddedUserClientFocus {
        static readonly type = '[Engagement] Added UserClientFocus';
        constructor(public option: ExtendedNamedModel, public userClientFocus: UserClientFocus) { }
    }

    export class DeletedUserClientFocus {
        static readonly type = '[Engagement] Deleted UserClientFocus';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserPreferredContactTime {
        static readonly type = '[Engagement] Added UserPreferredContactTime';
        constructor(public option: ExtendedNamedModel, public userPreferredContactTime: UserContactTime) { }
    }

    export class DeletedUserPreferredContactTime {
        static readonly type = '[Engagement] Deleted UserPreferredContactTime';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserContactFrequency {
        static readonly type = '[Engagement] Added UserContactFrequency';
        constructor(public option: ExtendedNamedModel, public userContactFrequency: UserContactFrequency) { }
    }

    export class AddedUserDesiredSolutionService {
        static readonly type = '[Engagement] Added UserDesiredSolutionService';
        constructor(public option: ExtendedNamedModel, public userDesiredSolutionService: UserDesiredSolutionService) { }
    }

    export class DeletedUserDesiredSolutionService {
        static readonly type = '[Engagement] Deleted UserDesiredSolutionService';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserInvestment {
        static readonly type = '[Engagement] Added UserInvestment';
        constructor(public option: ExtendedNamedModel, public userInvestment: UserInvestmentImplementation) { }
    }

    export class DeletedUserInvestment {
        static readonly type = '[Engagement] Deleted UserInvestment';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserPreferredEngagement {
        static readonly type = '[Engagement] Added UserPreferredEngagement';
        constructor(public option: ExtendedNamedModel, public userPreferredEngagement: UserPreferredEngagement) { }
    }

    export class DeletedUserPreferredEngagement {
        static readonly type = '[Engagement] Deleted UserPreferredEngagement';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserReviewManager {
        static readonly type = '[Engagement] Added UserReviewManager';
        constructor(public userReviewManager: UserTeamReviewer) { }
    }

    export class UpdateUserReviewManager {
        static readonly type = '[Engagement] Update UserReviewManager';
        constructor(public userReviewManager: UserTeamReviewer) { }
    }

    export class DeletedUserReviewManager {
        static readonly type = '[Engagement] Deleted UserReviewManager';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class GetClientFocusOptions {
        static readonly type = '[Engagement] Get ClientFocusOptions';
    }

    export class GetContactTimeOptions {
        static readonly type = '[Engagement] Get ContactTimeOptions';
    }

    export class GetContactFrequncyOptions {
        static readonly type = '[Engagement] Get ContactFrequncyOptions';
    }
    export class GetDesiredSolutionOptions {
        static readonly type = '[Engagement] Get DesiredSolutionOptions';
    }
    export class GetPreferredEngagementOptions {
        static readonly type = '[Engagement] Get PreferredEngagementOptions';
    }
    export class GetInvestmentImplOptions {
        static readonly type = '[Engagement] Get InvestmentImplOptions';
    }
    export class GetTeamReviewer {
        static readonly type = '[Engagement] Get TeamReviewer';
    }

    export class GetAllUserEngagementInfo {
        static readonly type = '[Engagement] Get All Options And Reviewer';
    }
}