import { LoginModel, User } from "@services/flxwealthmanager.api.client";

export namespace MembershipActions {

    export class CreateNewUser {
        static readonly type = '[Membership] Create New User';
        constructor(public user: User) { }
    }

    export class UpdateUser {
        static readonly type = '[Membership] Update User';
        constructor(public user: User) { }
    }

    export class DeleteUser {
        static readonly type = '[Membership] Delete User';
        constructor(public user: User) { }
    }

    export class GetUsers {
        static readonly type = '[Membership] Get Users';
    }

    export class GetClients {
        static readonly type = '[Membership] Get Clients';
    }

    export class GetPermissions {
        static readonly type = '[Membership] Get Permissions';
    }

    export class AuthenticateUser {
        static readonly type = '[Membership] Authenticate User';
        constructor(public model: LoginModel) { }
    }

    export class LoadAllMembershipData {
        static readonly type = '[Membership] Load All Data';
    }
}