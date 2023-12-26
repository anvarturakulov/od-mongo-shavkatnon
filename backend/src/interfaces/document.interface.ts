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
