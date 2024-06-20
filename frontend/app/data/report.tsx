import { UserRoles } from "../interfaces/general.interface";
import { DashboardReportItem } from "../interfaces/report.interface";

export const DashboardReportData:Array<DashboardReportItem> = [
    {
        title: 'Умум. пул окими',
        code: 'Financial',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN]
    },
    {
        title: 'Дебитор кредитор',
        code: 'DebitorKreditor',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX]
    },
    {
        title: 'Фойда хисоби',
        code: 'Foyda',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN]
    },
    {
        title: 'Касса-жавобгар шахслар',
        code: 'Cash',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN]
    },
    {
        title: 'Накд пул кирими',
        code: 'Taking',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX]
    },
    {
        title: 'Накд пул харажати',
        code: 'Giving',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX]
    },
    {
        title: 'Бухгалтерлар хисоби',
        code: 'Section-buxgalter',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.ZAMGLBUX]
    },
    {
        title: 'Филиаллар хисоби',
        code: 'Section-filial',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.HEADSECTION]
    },
    {
        title: 'Юк етказиб берувчилар хисоби',
        code: 'Section-delivery',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.HEADSECTION, UserRoles.DELIVERY]
    },
    {
        title: 'Омборхона',
        code: 'Sklad',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.ZAMGLBUX]
    },
    {
        title: 'Норма',
        code: 'Norma',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.ZAMGLBUX]
    },
    {
        title: 'Умум хом аше харажати',
        code: 'Material',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX]
    },
    {
        title: 'Таъсисчилар',
        code: 'Section-founder',
        roles: [UserRoles.HEADCOMPANY, UserRoles.ADMIN]
    },
           
]