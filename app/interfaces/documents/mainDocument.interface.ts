export enum DocumentState {
    Proveden,
    Saved,
    Deleted
}

export enum DocumentType {
    ComeTMZ = '/documents/route',
    LeaveTMZ = '/documents/route',
    ComeFinance ='/documents/route',
    LeaveFinance = '/documents/route',
    ProductMoving = '/documents/route'
}

export interface DocumentModel {
    _id: string
    date: Date
    state: DocumentState
    senderId: string,
    receiverId: string,
    tableData: string,
    documentType: DocumentType
}
