import { DocumentModel, DocumentType } from '../interfaces/document.interface'
import { DefinedTandirWorkers } from '../interfaces/general.interface'
import { OborotType, ReportOptions } from '../interfaces/report.interface'
import { Maindata } from './app.context.interfaces'

export const defaultDocumentFormItems:DocumentModel = {
    _id: '',
    date: 0,
    docNumber: 0,
    documentType: '',
    deleted: false,
    user: '',
    senderId: '',
    receiverId: '',
    analiticId: '',
    isWorker: false,
    isPartner: false,
    isFounder: false,
    count: 0,
    balance: 0,
    price: 0,
    total: 0,
    cashFromPartner: 0,
    comment: '',
    proveden: true,
    firstWorkerId: '',
    secondWorkerId: '',
    thirdWorkerId: ''
}

export const defaultTandirWorkers: DefinedTandirWorkers = {
    firstWorker: '',
    secondWorker: '',
    thirdWorker: '',
}

export const defaultReportOptions: ReportOptions =  {
    startDate: 1708905600000,
    endDate: 1708905600000,
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
    reportOption: {...defaultReportOptions},
    showIntervalWindow: false,
    showMayda: false,
    definedTandirWorkers: defaultTandirWorkers,
    updateHamirJournal: false
  }