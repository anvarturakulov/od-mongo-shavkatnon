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

// export interface DocumentTableItem {
//     isWorker: boolean;
//     referenceId: string;
//     referenceName?: string;
//     count: number;
//     price: number;
//     total: number;
// }

// export class DocumentItem {
//     _id: string;
//     date: number;
//     docNumber: number;
//     documentType: DocumentType;
//     senderId: string;
//     receiverId: string;
//     tableItems?: DocumentTableItem[];
//     payValue?: number;
//     deleted?: boolean;
//     comment?: string;
// }

