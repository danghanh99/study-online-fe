import { User } from "./user.model";

export interface Group {
    code: string;
    description: string;
    id: number;
    members_number: number;
    name: string;
    url: string;
    admin_id: number;
}

export interface GroupDetail {
    id: number;
    name: string;
    description: string;
    membersNumber: number;
    users: User;
    category: Category;
    adminId: number;
    listBlackMembers: User;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}