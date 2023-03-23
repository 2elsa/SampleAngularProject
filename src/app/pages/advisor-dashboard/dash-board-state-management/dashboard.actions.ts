import { Client, UserProfilePicture } from "@services/flxwealthmanager.api.client";

export namespace DashboardActions {

    export class GetClient {
        static readonly type = '[Dashboard] Get UserClient';
    }

    export class UpdateClient {
        static readonly type = '[Dashboard] Update UserClient';
        constructor(public client: Client) { }
    }

    export class SaveProfilePicture {
        static readonly type = '[Dashboard] UploadProfilePicture';
        constructor(public picture: UserProfilePicture){}
    }

    export class GetUserProfilePicture {
        static readonly type = '[Dashboard] Get UserProfilePicture';
    }

    export class LoadDashboardData{
        static readonly type = '[Dashboard] Get All Dashboard Data';
    }
}