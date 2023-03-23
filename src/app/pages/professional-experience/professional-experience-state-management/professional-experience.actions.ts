import {
    UserBiography, UserEducation,
    UserHonorAndAward,
    UserJobHistory,
    UserLinkedIn,
    UserProfessionalAssociation
} from "@services/flxwealthmanager.api.client";

export namespace ProfessionalExperienceActions {

    export class AddBiography {
        static readonly type = '[ProfessionalExperience] Add UserBiography';
        constructor(public bio: UserBiography) { }
    }

    export class GetBiography {
        static readonly type = '[ProfessionalExperience] Get UserBiography';
        constructor(public userId: number) { }
    }

    export class UpdateBiography {
        static readonly type = '[ProfessionalExperience] Update UserBiography';
        constructor(public bio: UserBiography) { }
    }

    export class DeleteBiography {
        static readonly type = '[ProfessionalExperience] Delete UserBiography';
        constructor(public userId: number) { }
    }

    export class ResetBiography {
        static readonly type = '[ProfessionalExperience] SetBiography';
        constructor(public bio?: UserBiography){}
    }

    export class AddEducation {
        static readonly type = '[ProfessionalExperience] Add UserEducation';
        constructor(public education: UserEducation) { }
    }

    export class GetEducation {
        static readonly type = '[ProfessionalExperience] Get UserEducation';
        constructor(public id: number) { }
    }

    export class GetAllUserEducation {
        static readonly type = '[ProfessionalExperience] Get All UserEducation';
        constructor(public userId: number) { }
    }

    export class UpdateEducation {
        static readonly type = '[ProfessionalExperience] Update UserEducation';
        constructor(public education: UserEducation) { }
    }

    export class DeleteEducation {
        static readonly type = '[ProfessionalExperience] Deleted UserEducation';
        constructor(public id: number) { }
    }

    export class ResetSelectedEducation {
        static readonly type = '[ProfessionalExperience] Reset UserEducation'
        constructor(public education?: UserEducation){}
    }

    export class AddHonorAward {
        static readonly type = '[ProfessionalExperience] Add UserHonorAward';
        constructor(public award: UserHonorAndAward) { }
    }

    export class GetHonorAward {
        static readonly type = '[ProfessionalExperience] Get UserHonorAward';
        constructor(public id: number) { }
    }

    export class GetAllUserHonorsAwards {
        static readonly type = '[ProfessionalExperience] Get All UserHonorsAwards';
        constructor(public userId: number) { }
    }

    export class UpdateHonorAward {
        static readonly type = '[ProfessionalExperience] Update UserHonorAward';
        constructor(public award: UserHonorAndAward) { }
    }

    export class DeleteHonorAward {
        static readonly type = '[ProfessionalExperience] Deleted UserHonorAward';
        constructor(public id: number) { }
    }

    export class ResetSelectedHonorAward {
        static readonly type = '[ProfessionalExperience] Reset UserHonorAward'
        constructor(public award?: UserHonorAndAward){}
    }

    export class AddJobHistory {
        static readonly type = '[ProfessionalExperience] Add UserJobHistory';
        constructor(public jobHistory: UserJobHistory) { }
    }

    export class GetJobHistory {
        static readonly type = '[ProfessionalExperience] Get UserJobHistory';
        constructor(public id: number) { }
    }

    export class GetAllUserJobHistory {
        static readonly type = '[ProfessionalExperience] Get All UserJobHistory';
        constructor(public userId: number) { }
    }

    export class UpdateJobHistory {
        static readonly type = '[ProfessionalExperience] Update UserJobHistory';
        constructor(public jobHistory: UserJobHistory) { }
    }

    export class DeleteJobHistory {
        static readonly type = '[ProfessionalExperience] Deleted UserJobHistory';
        constructor(public id: number) { }
    }

    export class ResetSelectedJobHistory {
        static readonly type = '[ProfessionalExperience] Reset UserJobHistory'
        constructor(public jobHistory?: UserJobHistory){}
    }

    export class AddLinkedIn {
        static readonly type = '[ProfessionalExperience] Add UserLinkedIn';
        constructor(public linkedIn: UserLinkedIn) { }
    }

    export class GetLinkedIn {
        static readonly type = '[ProfessionalExperience] Get UserLinkedIn';
        constructor(public userId: number) { }
    }

    export class UpdateLinkedIn {
        static readonly type = '[ProfessionalExperience] Update UserLinkedIn';
        constructor(public linkedIn: UserLinkedIn) { }
    }

    export class ResetLinkedIn {
        static readonly type = '[ProfessionalExperience] Reset UserLinkedIn';
        constructor(public linkedIn?: UserLinkedIn) { }
    }

    export class DeleteLinkedIn {
        static readonly type = '[ProfessionalExperience] Deleted UserLinkedIn';
        constructor(public userId: number) { }
    }

    export class AddProfessionalAssociation {
        static readonly type = '[ProfessionalExperience] Add UserProfessionalAssociation';
        constructor(public profAssoc: UserProfessionalAssociation) { }
    }

    export class GetProfessionalAssociation {
        static readonly type = '[ProfessionalExperience] Get UserProfessionalAssociation';
        constructor(public id: number) { }
    }

    export class GetAllUserProfessionalAssociations {
        static readonly type = '[ProfessionalExperience] Get All UserProfessionalAssociations';
        constructor(public userId: number) { }
    }

    export class UpdateProfessionalAssociation {
        static readonly type = '[ProfessionalExperience] Update UserProfessionalAssociation';
        constructor(public profAssoc: UserProfessionalAssociation) { }
    }
    
    export class ResetSelectedProfessionalAssociation {
        static readonly type = '[ProfessionalExperience] Reset UserProfessionalAssociation'
        constructor(public profAssoc?: UserProfessionalAssociation){}
    }

    export class DeleteProfessionalAssociation {
        static readonly type = '[ProfessionalExperience] Deleted UserProfessionalAssociation';
        constructor(public id: number) { }
    }

    export class GetAllCountries {
        static readonly type ='[ProfessionalExperience] GetAllCountries';
    }

    export class GetAllStatesForCountry {
        static readonly type = '[ProfessionalExperience] GetAllStatesForCountry';
        constructor(public countryId: number){}
    }

    export class LoadAllProfessionalExperienceData {
        static readonly type= '[ProfessionalExperience] Load All ProfessionalExperience Data'        
    }
}