import { DocTableItem, DocumentModel, DocumentType, OptionsForDocument } from "../../interfaces/document.interface";
import { TypeReference } from '../../interfaces/reference.interface';
import { hasDocumentTablePart } from './hasDocumentTableType';

export const validateBody = (body: DocumentModel): Boolean => {
  let {date, docNumber, documentType, receiverId, senderId, tableItems, payValue } = body

  if (!date || !docNumber || !documentType) return false

  const documentsForComeMaterial = [
    `${DocumentType.ComeMaterial}`,
    `${DocumentType.ComeProduct}`,
    `${DocumentType.ComeHalfstuff}`,
    `${DocumentType.SaleProd}`,
    `${DocumentType.SaleMaterial}`,
    `${DocumentType.LeaveProd}`,
    `${DocumentType.LeaveMaterial}`,
    `${DocumentType.LeaveHalfstuff}`,
    `${DocumentType.MoveProd}`,
    `${DocumentType.MoveMaterial}`,
    `${DocumentType.MoveHalfstuff}`,
  ]

  if (documentsForComeMaterial.includes(documentType)) {
    if (!receiverId || !senderId || tableItems?.length == 0) return false
  }

  const documentsForCashFromPartners = [
    `${DocumentType.ComeCashFromPartners}`,
    `${DocumentType.MoveCash}`,
  ]

  if (documentsForCashFromPartners.includes(documentType)) {
    if (!receiverId || !senderId || !payValue) return false
  }

  const documentsForCashLeave = [
    `${DocumentType.LeaveCash}`,
  ]

  if (documentsForCashLeave.includes(documentType)) {
    if (!senderId || !tableItems?.length) return false
  }

  let flag: boolean = true;
  let hasTablePart = hasDocumentTablePart(documentType)
  body.tableItems?.forEach((item: DocTableItem) => {
    if (hasTablePart && ( item.referenceId == '' || item.count <= 0 )) flag = false
  } )

  if (!flag) return false

  // const documentsForZp = [
  //   `${DocumentType.ZpCalculate}`,
  // ]

  // if (documentsForZp.includes(documentType)) {
  //   senderType = TypeReference.STORAGES
  //   senderLabel = '-----'
  //   receiverType = TypeReference.STORAGES
  //   receiverLabel = 'Булим'
  //   paymentLabel = '------'
  //   paymentIsVisible = false
  //   tableIsVisible = true
  //   senderIsVisible = false
  //   recieverIsVisible = true
  // }

  return true

}