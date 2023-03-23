import { LoginModel, User } from "@services/flxwealthmanager.api.client";

export namespace AccountActions {

    export class CreateNewUser {
        static readonly type = '[Account] Create New User';
        constructor(public user: User) { }
    }

    export class GetUsers {
        static readonly type = '[Account] Get Users';
    }

    export class GetClients {
        static readonly type = '[Account] Get Clients';
    }

    export class GetPermissions {
        static readonly type = '[Account] Get Permissions';
    }

    export class AuthenticateUser {
        static readonly type = '[Account] Authenticate User';
        constructor(public model: LoginModel){}
    }

    export class LoadAllMembershipData {
        static readonly type = '[Account] Load All Data';
    }

}