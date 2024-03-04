import { DocumentType } from "../interfaces/document.interface";
import {ServiceType, UserRoles } from "../interfaces/general.interface";
import { MenuItem } from "../interfaces/menu.interface";
import { TypeReference } from "../interfaces/reference.interface";
import { ReportType } from "../interfaces/report.interface";

export const MenuData:Array<MenuItem> = [
    {
        title: 'Хужжатлар',
        isOpened: true,
        subMenu: [
            { 
                title: DocumentType.ComeMaterial, description:'Хом ашё кирими', 
                type: 'document', active: false, 
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.ZAMGLBUX]
            },
            { 
                title: DocumentType.MoveMaterial, description:'Хом ашё силжиши', 
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.ZAMGLBUX]
            },
            { 
                title: DocumentType.LeaveMaterial, description:'Хом ашё чикими',
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.ELAKCHI, UserRoles.HEADSECTION]
            },
            { 
                title: DocumentType.SaleMaterial, description:'Хом ашё сотуви',
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN]
            },
            { 
                title: DocumentType.ComeHalfstuff, description:'Я.Т.М ишлаб чикариш', 
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.ELAKCHI]
            },
            { 
                title: DocumentType.MoveHalfstuff, description:'Я.Т.М силжиши',
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.ELAKCHI]
            },
            { 
                title: DocumentType.LeaveHalfstuff, description:'Я.Т.М чикими',
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.HAMIRCHI]
            },
            { 
                title: DocumentType.ComeProduct, description:'Махсулот тайёрлаш',
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.ZUVALACHI]
            },
            { 
                title: DocumentType.MoveProd, description:'Махсулот силжиши',
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.HEADSECTION, UserRoles.DELIVERY, UserRoles.SELLER]
            },
            { 
                title: DocumentType.LeaveProd, description:'Махсулот чикими (брак / истемол)', 
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.HEADSECTION]
            },
            { 
                title: DocumentType.SaleProd, description:'Махсулот сотуви',
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.HEADSECTION, UserRoles.DELIVERY, UserRoles.SELLER]
            },
            { 
                title: DocumentType.ComeCashFromPartners, description:'Пул кирими (мижоз ва таъминотчи)',
                type: 'document', active: false,
                roles: []
                // [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.HEADSECTION, UserRoles.DELIVERY, UserRoles.GLBUX]
            },
            { 
                title: DocumentType.MoveCash, description:'Пул силжиши',
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.HEADSECTION, UserRoles.DELIVERY, UserRoles.GLBUX, UserRoles.ZAMGLBUX]
            },
            { 
                title: DocumentType.LeaveCash, description:'Пул харажати',
                type: 'document', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.HEADSECTION, UserRoles.GLBUX, UserRoles.ZAMGLBUX]
            },
            // { title: DocumentType.ZpCalculate, description:'Иш хаки хисоби', type: 'document', active: false },
        ]
    },
    {
        title: 'Руйхатлар',
        isOpened: false,
        subMenu: [
            { 
                title: TypeReference.TMZ, description:'Товар моддий бойликлар', 
                type: 'reference', active:false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GUEST]
            },
            { 
                title: TypeReference.STORAGES, description:'Цех ва омборхоналар',
                type: 'reference', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GUEST] 
            },
            { 
                title: TypeReference.PARTNERS, description:'Хамкорлар', 
                type: 'reference', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GUEST]
            },
            { 
                title: TypeReference.WORKERS, description:'Ходимлар',
                type: 'reference', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GUEST]
            },
            { 
                title: TypeReference.CHARGES, description:'Харажатлар',
                type: 'reference', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GUEST]
            },
            { 
                title: TypeReference.PRICES, description:'Нархлар',
                type: 'reference', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GUEST]
            },
        ]
    },
    {
        title: 'Хисоботлар',
        isOpened: false,
        subMenu: [
            { 
                title: ReportType.MatOborot, description:'ТМБ харакати',
                type: 'report', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.GUEST]
            },
            { 
                title: ReportType.Oborotka, description:'Умумий айланма',
                type: 'report', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.GUEST]
            },
            { 
                title: ReportType.AktSverka, description:'Хамкор билан солиштирма',
                type: 'report', active: false,
                roles: 
                [UserRoles.HEADCOMPANY, UserRoles.ADMIN, UserRoles.GLBUX, UserRoles.GUEST]
            },
        ]
    },
    {
        title: 'Дастур',
        isOpened: false,
        subMenu: [
            { title: ServiceType.DeleteDocs, description:'Хужжатларни учириш', type: 'servis', active: false, roles: [UserRoles.ADMIN]},
            { title: ServiceType.Users, description:'Фойдаланувчилар', type: 'servis', active: false, roles: [UserRoles.ADMIN] },
            { title: ServiceType.Options, description:'Дастур хусусиятлари', type: 'servis', active: false, roles: [UserRoles.ADMIN] },
        ]
    }
]