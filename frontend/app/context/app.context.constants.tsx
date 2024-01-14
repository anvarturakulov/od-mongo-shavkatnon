import { DocTableItem } from '../interfaces/document.interface'
import { OborotType, ReportOptions } from '../interfaces/report.interface'
import { Maindata } from './app.context.interfaces'

export const defaultDocumentTableItem: DocTableItem = {
    isWorker: false,
    isPartner: false,
    referenceId: '',
    referenceName: '',
    count: 0,
    price: 0,
    total: 0,
    comment: '',
    balance: 0,
    receiverId: '',
    recieverPayment: 0,
}

export const defaultDocumentFormItems = {
    _id: '',
    date: 0,
    docNumber: 0,
    senderId: '',
    receiverId: '',
    tableItems: [defaultDocumentTableItem], 
    documentType: '',
    payValue: 0,
    deleted: false,
}

export const defaultReportOptions: ReportOptions =  {
    startDate: 0,
    endDate: 0,
    firstReferenceId: '',
    secondReferenceId: '',
    showReport: false,
    entrys: [],
    startReport: false,
    oborotType: OborotType.S20,
}

export const defaultMainData: Maindata = {
    activeMenuKey: '',
    contentType: 'document',
    contentName: '',
    contentTitle: '',
    user: undefined,
    mainPage: true,
    showMessageWindow: false,
    message: 'Маълумотлар сакланди',
    messageType: 'error',
    showDocumentWindow: false,
    isNewDocument: false,
    updateDataForDocumentJournal: false,
    currentDocument: {...defaultDocumentFormItems},
    clearControlElements: false,
    showReferenceWindow: false,
    isNewReference: false,
    updateDataForRefenceJournal: false,
    currentReference: undefined,
    reportOption: {...defaultReportOptions}
  }