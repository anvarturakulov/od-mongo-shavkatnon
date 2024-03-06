export type ContentType = 'document' | 'reference' | 'servis' | 'report'

export interface DashboardSettings {
    mainPage: boolean,
    activeMenuKey: string,
    activeMenuTitle: string,
    activeMenuType: ContentType,
    userId: string
}

export enum ServiceType {
    Users = 'Фойдаланувчилар',
    Options = 'Дастур хусусиятлари',
    DeleteDocs = 'Хужжатларни учириш',
}

export type MessageType = 'success' | 'error' | 'warm'

export enum UserRoles {
    ADMIN = 'ADMIN',
    HEADCOMPANY = 'HEADCOMPANY',
    GLBUX = 'GLBUX',
    ZAMGLBUX = 'ZAMGLBUX',
    ELAKCHI = 'ELAKCHI',
    HAMIRCHI = 'HAMIRCHI',
    TANDIR = 'TANDIR',
    HEADSECTION = 'HEADSECTION',
    DELIVERY = 'DELIVERY',
    SELLER = 'SELLER',
    GUEST = 'GUEST',
}

export interface User {
    email: string,
    access_token: string;
    role: UserRoles,
    name: string,
    storageId: string,
    tandirId: string
}

export interface BodyForLogin {
    login: string,
    password: string,
}

export const dashboardUsersList = [UserRoles.ADMIN, UserRoles.HEADCOMPANY, UserRoles.GUEST, UserRoles.GLBUX];
export const workersUsersList = [UserRoles.DELIVERY, UserRoles.SELLER, UserRoles.ELAKCHI, UserRoles.HAMIRCHI, UserRoles.HEADSECTION, UserRoles.TANDIR, UserRoles.ZAMGLBUX] 
export const adminAndHeadCompany = [UserRoles.ADMIN, UserRoles.HEADCOMPANY]