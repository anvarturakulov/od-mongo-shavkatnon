import { DocumentType } from "../interfaces/documents/mainDocument.interface";
import { MenuItem } from "../interfaces/menu.interface";
import { ReferenceType } from "../interfaces/references/mainReference.interface";

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
            { title: DocumentType.ComeCash, type: 'document', active: false },
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
        title: 'Дастур',
        isOpened: false,
        subMenu: [
            { title: 'Хужжатларни учириши', type: 'servis', active: false },
            { title: 'Фойдаланувчилар руйхати', type: 'servis',active: false },
            { title: 'Кушимча хусусиятлар', type: 'servis', active: false },
        ]
    }
]