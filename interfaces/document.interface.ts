import { TypeReference } from './reference.interface'

export enum DocumentType {

    ComeMaterial = 'Хом ашё кирими',
    ComeProduct = 'Махсулот кирими',
    ComeHalfstuff = 'Я.Т.М кирими',

    SaleProd = 'Махсулот сотуви',
    SaleMaterial = 'Хом ашё сотуви',

    LeaveProd = 'Махсулот чикими',
    LeaveMaterial = 'Материал чикими',
    LeaveHalfstuff = 'Я.Т.М чикими',

    MoveProd = 'Махсулот силжиши',
    MoveMaterial = 'Хом ашё силжиши',
    MoveHalfstuff = 'Я.Т.М силжиши',

    ComeCashFromPartners = 'Пул кирими (м/т)',
    MoveCash = 'Пул силжиши',
    LeaveCash = 'Пул харажати',
    ZpCalculate = 'Иш хаки хисоби',

    Error = 'Хатолик бор'
}

export interface DocumentModel {
    _id: string
    date: Date,
    senderReferenceId: string,
    receiverReferenceId: string,
    tableData: {},
    documentType: DocumentType,
}

export interface DocumentTableItem {
    referenceId: string,
    quantity: number,
    price: number,
    total: number
}

export interface OptionsForDocument {
    sendertypeReference: TypeReference,
    senderLabel: string,
    senderVisible: boolean,
    receivetypeReference: TypeReference,
    receiveLabel: string,
    recieveVisible: boolean
    paymentLabel: string,
    paymentVisible: boolean,
    tableVisible: boolean,
}

