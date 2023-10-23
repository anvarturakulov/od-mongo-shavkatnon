export enum DocumentState {
    Proveden,
    Saved,
    Deleted
}

export enum GeneralDocTypes{
    ComeTMZ,
    LeaveTMZ,
    MoveTMZ,
    ComeCash,
    LeaveCash,
    MoveCash,
    ZpCalculate
}

export enum DocumentType {
    
    ComeMaterial = GeneralDocTypes.ComeTMZ,
    ComeProduct = GeneralDocTypes.ComeTMZ,
    ComeHalfstuff = GeneralDocTypes.ComeTMZ,
    
    SaleProd = GeneralDocTypes.LeaveTMZ,
    SaleMaterial = GeneralDocTypes.LeaveTMZ,
    
    LeaveProd = GeneralDocTypes.LeaveTMZ,
    LeaveMaterial = GeneralDocTypes.LeaveTMZ,
    LeaveHalfstuff = GeneralDocTypes.LeaveTMZ,

    MoveProd = GeneralDocTypes.MoveTMZ,
    MoveMaterial = GeneralDocTypes.MoveTMZ,
    MoveHalfstuff = GeneralDocTypes.MoveTMZ,

    ComeCash=GeneralDocTypes.ComeCash,
    MoveCash=GeneralDocTypes.MoveCash,
    LeaveCash=GeneralDocTypes.LeaveCash,
    ZpCalculate=GeneralDocTypes.ZpCalculate,
}

export interface DocumentModel {
    _id: string
    date: Date
    state: DocumentState
    senderId: string,
    receiverId: string,
    tableData: string,
    documentType: DocumentType,
}
