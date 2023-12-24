import { TypeReference } from './reference.interface'

export enum DocumentType {

    ComeMaterial = 'Хом ашё кирими',
    ComeProduct = 'Махсулот кирими',
    ComeHalfstuff = 'Я.Т.М кирими',

    SaleProd = 'Махсулот сотуви',
    SaleMaterial = 'Хом ашё сотуви',

    LeaveProd = 'Махсулот чикими',
    LeaveMaterial = 'Хом ашё чикими',
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

export interface DocTableItem {
    referenceId: string,
    quantity: number,
    price: number,
    total: number
}

export interface DocumentModel {
    _id: string,
    date: Date,
    senderId: string,
    receiverId: string,
    tableItems: Array<DocTableItem> | undefined,
    documentType: DocumentType,
    payValue: number,
};

export interface OptionsForDocument {
    senderType: TypeReference,
    senderLabel: string,
    senderIsVisible: boolean,
    receiverType: TypeReference,
    receiverLabel: string,
    recieverIsVisible: boolean
    paymentLabel: string,
    paymentIsVisible: boolean,
    tableIsVisible: boolean,
}