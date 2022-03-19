import { Group } from "./group.model";

export interface GetAllGroupsResponse {
    joined: JoinedGroup;
    others: Group[];
}

export interface JoinedGroup {
    admin: Group[];
    others: Group[];
}