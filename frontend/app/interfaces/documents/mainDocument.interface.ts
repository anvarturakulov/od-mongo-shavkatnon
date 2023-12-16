import { TypeReference } from '../reference.interface'

export enum DocumentState {
    Proveden = 'Ок',
    Saved = 'Хис. кушилмаган',
    Deleted = 'Учирилган',
    Error = 'Хатолик бор'
}

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
    date: string
    state: DocumentState
    senderId: string,
    receiverId: string,
    tableData: {},
    documentType: DocumentType,
}

export interface DocumentModelOnDataBase {
    _id: string
    date: string
    state: string
    senderId: string,
    receiverId: string,
    tableData: string,
    documentType: string,
}

export interface DocumentTableItem {
    itemId: string,
    typeReference: TypeReference,
    quantity: number,
    price: number,
    total: number
}

export interface OptionDocumentElements {
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

