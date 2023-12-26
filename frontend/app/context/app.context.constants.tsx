import { DocumentType } from '../interfaces/document.interface'
import { Maindata } from './app.context.interfaces'

export const defaultDocumentTableItem = {
    referenceId: '',
    referenceName: '',
    count: 0,
    price: 0,
    total: 0
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
    docTable: {items: [defaultDocumentTableItem]},
    currentDocument: {
        _id: '',
        date: new Date(Date.UTC(0, 0, 0, 0, 0, 0)),
        docNumber: 0,
        senderId: '',
        receiverId: '',
        tableItems: [defaultDocumentTableItem], // не пользуемся им
        documentType: DocumentType.ComeMaterial,
        payValue: 0,
    },
    clearControlElements: false,
    showReferenceWindow: false,
    isNewReference: false,
    updateDataForRefenceJournal: false,
    currentReference: undefined,
    
  }