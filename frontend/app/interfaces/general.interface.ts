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
    ELAKCHI = 'ELAKCHI',
    HAMIRCHI = 'HAMIRCHI',
    ZUVALACHI = 'ZUVALACHI',
    HEADSECTION = 'HEADSECTION',
    DELIVERY = 'DELIVERY',
    GUEST = 'GUEST',
}

export interface User {
    email: string,
    access_token: string;
    role: UserRoles,
    name: string,
    storageId: string
}

export interface BodyForLogin {
    login: string,
    password: string,
}

export const dashboardUsersList = [UserRoles.ADMIN, UserRoles.HEADCOMPANY, UserRoles.GUEST, UserRoles.GLBUX];
export const workersUsersList = [UserRoles.DELIVERY, UserRoles.ELAKCHI, UserRoles.HAMIRCHI, UserRoles.HEADSECTION, UserRoles.ZUVALACHI] 
export const adminAndHeadCompany = [UserRoles.ADMIN, UserRoles.HEADCOMPANY]