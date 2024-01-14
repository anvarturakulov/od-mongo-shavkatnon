import { DocumentModel, DocumentType } from "../../interfaces/document.interface";
import { hasDocumentTablePart } from './hasDocumentTableType';

export const validateBody = (body: DocumentModel): Boolean => {
  let { date, docNumber, documentType, receiverId, senderId, tableItems, payValue } = body

  if (!date || !docNumber || !documentType) return false

  const documentsForComeMaterial = [
    `${DocumentType.ComeMaterial}`,
    `${DocumentType.ComeProduct}`,
    `${DocumentType.ComeHalfstuff}`,
    `${DocumentType.LeaveProd}`,
    `${DocumentType.LeaveMaterial}`,
    `${DocumentType.LeaveHalfstuff}`,
    `${DocumentType.MoveProd}`,
    `${DocumentType.MoveMaterial}`,
    `${DocumentType.MoveHalfstuff}`,
  ]

  if (documentsForComeMaterial.includes(documentType)) {
    let flag = false;
    tableItems?.forEach(item => {
      if (!item.referenceId) {
        flag = true;
      }
    })

    if (!receiverId || !senderId || tableItems?.length == 0 || flag) {
      return false
    }
  }

  const documentsForSale = [
    `${DocumentType.SaleProd}`,
    `${DocumentType.SaleMaterial}`,
  ]

  if (documentsForSale.includes(documentType)) {
    let flag = false;
    tableItems?.forEach(item => {
      if (!item.receiverId || !item.referenceId) {
        flag = true;
      }
    })
    if (!senderId || tableItems?.length == 0 || flag) return false
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

  if (!flag) return false


  return true

}