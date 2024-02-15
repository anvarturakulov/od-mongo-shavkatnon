import { TypeReference } from './reference.interface'

export enum DocumentType {

    ComeMaterial = 'ComeMaterial',
    ComeProduct = 'ComeProduct',
    ComeHalfstuff = 'ComeHalfstuff',

    SaleProd = 'SaleProd',
    SaleMaterial = 'SaleMaterial',

    LeaveProd = 'LeaveProd',
    LeaveMaterial = 'LeaveMaterial',
    LeaveHalfstuff = 'LeaveHalfstuff',

    MoveProd = 'MoveProd',
    MoveMaterial = 'MoveMaterial',
    MoveHalfstuff = 'MoveHalfstuff',

    ComeCashFromPartners = 'ComeCashFromPartners',
    MoveCash = 'MoveCash',
    LeaveCash = 'LeaveCash',
    ZpCalculate = 'ZpCalculate',

    Error = 'Error'
}


export interface DocValues {
    senderId: string,
    receiverId: string,
    payment: number,
    isWorker: boolean,
    isPartner: boolean,
    referenceId: string,
    referenceName: string,
    count: number,
    balance?: number,
    price: number,
    total: number,
    comment?: string,
}

export interface DocumentModel {
    _id?: string,
    date: number,
    docNumber: number,
    documentType: string,
    deleted: boolean,
    values: DocValues,
    comment?: string,
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
}

export type DocumentTypeForReference = 'MATERIAL' | 'PRODUCT' | 'HALFSTUFF' | 'OTHER'

export interface Interval {
    dateStart: string,
    dateEnd: string
}

export type NameControl = 'count' | 'price' | 'total' | 'comment' | 'payment'