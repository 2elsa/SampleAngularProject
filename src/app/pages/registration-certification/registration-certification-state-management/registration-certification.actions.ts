import {
    UserCertification,
    UserCrd, UserIndustryExperience,
    UserRegistration
} from "@services/flxwealthmanager.api.client";
import { ExtendedNamedModel } from "@shared/extended-named-model";

export namespace RegistrationCertificationActions {

    export class AddedUserCertification {
        static readonly type = '[RegistrationCertification] Added UserCertification';
        constructor(public option: ExtendedNamedModel, public userCertification: UserCertification) { }
    }

    export class DeletedUserCertification {
        static readonly type = '[RegistrationCertification] Deleted UserCertification';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserRegistration {
        static readonly type = '[RegistrationCertification] Added UserRegistration';
        constructor(public option: ExtendedNamedModel, public userRegistration: UserRegistration) { }
    }

    export class DeletedUserRegistration {
        static readonly type = '[RegistrationCertification] Deleted UserRegistration';
        constructor(public option: ExtendedNamedModel) { }
    }

    export class AddedUserIndustryExperience {
        static readonly type = '[RegistrationCertification] Added UserIndustryExperience';
        constructor(public options: ExtendedNamedModel, public userIndustryExperience: UserIndustryExperience) { }
    }

    export class UpdateUserIndustryExperience {
        static readonly type = '[RegistrationCertification] Update UserIndustryExperience';
        constructor(public userIndustryExperience: UserIndustryExperience) { }
    }

    export class AddedUserCrd {
        static readonly type = '[RegistrationCertification] Added UserCrd';
        constructor(public userCrd: UserCrd) { }
    }

    export class UpdateUserCrd {
        static readonly type = '[RegistrationCertification] Update UserCrd';
        constructor(public userCrd: UserCrd) { }
    }


    export class GetRegistrationOptions {
        static readonly type = '[RegistrationCertification] Get RegistrationOptions';
    }

    export class GetCertificationOptions {
        static readonly type = '[RegistrationCertification] Get CertificationOptions';
    }

    export class GetIndustryExperience {
        static readonly type = '[RegistrationCertification] Get IndustryExperience';
    }

    export class GetIndustryExperienceOptions {
        static readonly type = '[RegistrationCertification] Get IndustryExperienceOptions';
    }
    
    export class GetCrd {
        static readonly type = '[RegistrationCertification] Get Crd';
    }

    export class GetAllUserRegistrationCertificationInfo {
        static readonly type = '[RegistrationCertification] Get All Options, IndustryExperience And Crd';
    }
}