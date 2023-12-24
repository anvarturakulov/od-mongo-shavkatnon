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
    SUPERVIZER = 'SUPERVIZER',
    OWNER = 'OWNER',
    GLBUX = 'GLBUX',
    KASSIR = 'KASSIR',
    DOSTAVSHIK = 'DOSTAVSHIK',
    GUEST = 'GUEST'
}

export interface User {
    email: string,
    access_token: string;
    role : UserRoles
}

export interface BodyForLogin {
    login: string,
    password: string,
}