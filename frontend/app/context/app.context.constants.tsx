import { DocumentType } from '../interfaces/document.interface'
import { ReportsType } from '../interfaces/report.interface'
import { Maindata } from './app.context.interfaces'

export const defaultDocumentTableItem = {
    isWorker: false,
    referenceId: '',
    referenceName: '',
    count: 0,
    price: 0,
    total: 0,
    comment: ''
}

export const defaultDocumentFormItems = {
    _id: '',
    date: 0,
    docNumber: 0,
    senderId: '',
    receiverId: '',
    tableItems: [defaultDocumentTableItem], // не пользуемся им
    documentType: '',
    payValue: 0,
}

export const defaultReportOptions =  {
    startDate: 0,
    endDate: 0,
    firstReferenceId: '',
    secondReferenceId: '',
    showReport: false,
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