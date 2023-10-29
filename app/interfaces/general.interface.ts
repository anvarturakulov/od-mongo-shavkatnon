import { ReferenceType } from "./references/mainReference.interface";
import { DocumentType } from "./documents/mainDocument.interface";

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

export enum ReportsType {
    MatOborot = 'ТМБ харакати',
    CashObotot = 'Пул маблаг харакати',
    ExpenceOborot = 'Харажатлар хисоби',
    ZpOborot = 'Иш хаки хисоби'
}


