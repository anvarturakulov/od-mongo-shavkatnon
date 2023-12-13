import { DocumentType } from "../interfaces/documents/mainDocument.interface";
import {ServiceType } from "../interfaces/general.interface";
import { MenuItem } from "../interfaces/menu.interface";
import { ReferenceType } from "../interfaces/references/mainReference.interface";
import { ReportsType } from "../interfaces/report.interface";

export const MenuData:Array<MenuItem> = [
    {
        title: 'Хужжатлар',
        isOpened: true,
        subMenu: [
            { title: DocumentType.ComeMaterial, type: 'document', active: false },
            { title: DocumentType.MoveMaterial, type: 'document', active: false },
            { title: DocumentType.LeaveMaterial, type: 'document', active: false },
            { title: DocumentType.SaleMaterial, type: 'document', active: false },
            { title: DocumentType.ComeHalfstuff, type: 'document', active: false },
            { title: DocumentType.MoveHalfstuff, type: 'document', active: false },
            { title: DocumentType.LeaveHalfstuff, type: 'document', active: false },
            { title: DocumentType.ComeProduct, type: 'document', active: false },
            { title: DocumentType.MoveProd, type: 'document', active: false },
            { title: DocumentType.LeaveProd, type: 'document', active: false },
            { title: DocumentType.SaleProd, type: 'document', active: false },
            { title: DocumentType.ComeCashFromPartners, type: 'document', active: false },
            { title: DocumentType.MoveCash, type: 'document', active: false },
            { title: DocumentType.LeaveCash, type: 'document', active: false },
            { title: DocumentType.ZpCalculate, type: 'document', active: false },
        ]
    },
    {
        title: 'Руйхатлар',
        isOpened: false,
        subMenu: [
            { title: ReferenceType.TMZ, type: 'reference', active:false },
            { title: ReferenceType.Storages, type: 'reference', active: false },
            { title: ReferenceType.Partners, type: 'reference', active: false },
            { title: ReferenceType.Workers, type: 'reference', active: false },
            { title: ReferenceType.Charges, type: 'reference', active: false },
            { title: ReferenceType.Prices, type: 'reference', active: false },
        ]
    },
    {
        title: 'Хисоботлар',
        isOpened: false,
        subMenu: [
            { title: ReportsType.MatOborot, type: 'report', active: false },
            { title: ReportsType.DebitorKreditor, type: 'report', active: false },
            { title: ReportsType.AktSverka, type: 'report', active: false },
            { title: ReportsType.CashObotot, type: 'report', active: false },
            { title: ReportsType.ChargesOborot, type: 'report', active: false },
            { title: ReportsType.ZpOborot, type: 'report', active: false },
        ]
    },
    {
        title: 'Дастур',
        isOpened: false,
        subMenu: [
            { title: ServiceType.DeleteDocs, type: 'servis', active: false },
            { title: ServiceType.Users, type: 'servis', active: false },
            { title: ServiceType.Options, type: 'servis', active: false },
        ]
    }
]