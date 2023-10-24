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

    ComeCash = 'Пул кирми',
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
