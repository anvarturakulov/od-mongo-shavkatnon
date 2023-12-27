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


export interface DocTableItem {
    referenceId: string,
    referenceName: string,
    count: number,
    price: number,
    total: number
}

export interface DocumentModel {
    _id: string,
    date: number,
    docNumber: number,
    senderId: string,
    receiverId: string,
    tableItems: Array<DocTableItem> | undefined,
    documentType: string,
    payValue: number,
    deleted?: boolean;
};

export interface DocumentBody {
    date: number,
    docNumber: number,
    senderId: string,
    receiverId: string,
    tableItems: Array<DocTableItem> | undefined,
    documentType: string,
    payValue: number,
    deleted?: boolean;
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