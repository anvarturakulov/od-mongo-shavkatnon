import { Maindata } from './app.context.interfaces'

export const defaultDocumentTableItem = {
    referenceId: '',
    referenceName: '',
    quantity: 0,
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
    clearControlElements: false,
    showReferenceWindow: false,
    isNewReference: false,
    updateDataForRefenceJournal: false,
    currentReferenceForShow: undefined,
  }