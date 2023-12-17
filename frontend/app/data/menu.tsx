import { DocumentType } from "../interfaces/documents/mainDocument.interface";
import {ServiceType } from "../interfaces/general.interface";
import { MenuItem } from "../interfaces/menu.interface";
import { TypeReference } from "../interfaces/reference.interface";
import { ReportsType } from "../interfaces/report.interface";

export const MenuData:Array<MenuItem> = [
    {
        title: 'Хужжатлар',
        isOpened: true,
        subMenu: [
            { title: DocumentType.ComeMaterial, description:'Хом ашё кирими', type: 'document', active: false},
            { title: DocumentType.MoveMaterial, description:'Хом ашё силжиши', type: 'document', active: false },
            { title: DocumentType.LeaveMaterial, description:'Материал чикими',  type: 'document', active: false },
            { title: DocumentType.SaleMaterial, description:'Хом ашё сотуви', type: 'document', active: false },
            { title: DocumentType.ComeHalfstuff, description:'Я.Т.М кирими', type: 'document', active: false },
            { title: DocumentType.MoveHalfstuff, description:'Я.Т.М силжиши', type: 'document', active: false },
            { title: DocumentType.LeaveHalfstuff, description:'Я.Т.М чикими', type: 'document', active: false },
            { title: DocumentType.ComeProduct, description:'Махсулот кирими', type: 'document', active: false },
            { title: DocumentType.MoveProd, description:'Махсулот силжиши', type: 'document', active: false },
            { title: DocumentType.LeaveProd, description:'Махсулот чикими', type: 'document', active: false },
            { title: DocumentType.SaleProd, description:'Махсулот сотуви', type: 'document', active: false },
            { title: DocumentType.ComeCashFromPartners, description:'Пул кирими (м/т)', type: 'document', active: false },
            { title: DocumentType.MoveCash, description:'Пул силжиши', type: 'document', active: false },
            { title: DocumentType.LeaveCash, description:'Пул харажати', type: 'document', active: false },
            { title: DocumentType.ZpCalculate, description:'Иш хаки хисоби', type: 'document', active: false },
        ]
    },
    {
        title: 'Руйхатлар',
        isOpened: false,
        subMenu: [
            { title: TypeReference.TMZ, description:'Товар моддий бойликлар', type: 'reference', active:false },
            { title: TypeReference.STORAGES, description:'Цех ва омборхоналар', type: 'reference', active: false },
            { title: TypeReference.PARTNERS, description:'Хамкорлар', type: 'reference', active: false },
            { title: TypeReference.WORKERS, description:'Ходимлар', type: 'reference', active: false },
            { title: TypeReference.CHARGES, description:'Харажатлар', type: 'reference', active: false },
            { title: TypeReference.PRICES, description:'Нархлар', type: 'reference', active: false },
        ]
    },
    {
        title: 'Хисоботлар',
        isOpened: false,
        subMenu: [
            { title: ReportsType.MatOborot, description:'ТМБ харакати', type: 'report', active: false },
            { title: ReportsType.DebitorKreditor, description:'Дебитор ва кредитор', type: 'report', active: false },
            { title: ReportsType.AktSverka, description:'Хамкор билан солиштирма', type: 'report', active: false },
            { title: ReportsType.CashObotot, description:'Пул маблаг харакати', type: 'report', active: false },
            { title: ReportsType.ChargesOborot, description:'Харажатлар хисоби', type: 'report', active: false },
            { title: ReportsType.ZpOborot, description:'Иш хаки хисоби', type: 'report', active: false },
        ]
    },
    {
        title: 'Дастур',
        isOpened: false,
        subMenu: [
            { title: ServiceType.DeleteDocs, description:'Хужжатларни учириш', type: 'servis', active: false },
            { title: ServiceType.Users, description:'Фойдаланувчилар', type: 'servis', active: false },
            { title: ServiceType.Options, description:'Дастур хусусиятлари', type: 'servis', active: false },
        ]
    }
]