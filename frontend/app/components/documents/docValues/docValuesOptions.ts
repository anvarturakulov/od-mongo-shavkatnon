import { DocumentModel, DocumentType, OptionsForDocument } from '@/app/interfaces/document.interface'
import { UserRoles } from '@/app/interfaces/general.interface'
import { TypeReference } from '@/app/interfaces/reference.interface'

export const getLabelForAnalitic = (currentDocument: DocumentModel, options: OptionsForDocument):string => {
  if (currentDocument && currentDocument.values.isPartner) {
    return 'Хамкор'
  }
  if (currentDocument && currentDocument.values.isWorker) {
    'Ходим'
  }
  return options.analiticLabel
}

export const getTypeReferenceForAnalitic = (currentDocument: DocumentModel, options: OptionsForDocument) => {
  if (currentDocument && currentDocument.values.isPartner) {
    return TypeReference.PARTNERS
  }
  if (currentDocument && currentDocument.values.isWorker) {
    return TypeReference.WORKERS 
  }
  return options.analiticType
}

export const getDefinedItemIdForReceiver = (role: UserRoles | undefined, storageIdFromUser: string | undefined, contentName: string) => {
  if (role && (role == UserRoles.ZUVALACHI || (role == UserRoles.ELAKCHI && contentName == DocumentType.ComeHalfstuff))) {
    return storageIdFromUser
  } 
  if (role && role !== UserRoles.ADMIN && role !== UserRoles.HEADCOMPANY && contentName == DocumentType.ComeCashFromPartners) {
    return storageIdFromUser
  }
  if (role && role == UserRoles.HAMIRCHI) {
    return '659d1ff7523a48fdeb6ada6d' 
  }
  return ''
}

export const getDefinedItemIdForSender = (role: UserRoles | undefined, storageIdFromUser: string | undefined, contentName: string) => {
  if (role && role !== UserRoles.ADMIN && role !== UserRoles.HEADCOMPANY && contentName != DocumentType.ComeCashFromPartners) {
    return storageIdFromUser
  }
  return ''
}