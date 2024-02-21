import { DocumentModel, DocumentType } from "../../interfaces/document.interface";
import { hasDocumentTablePart } from './hasDocumentTableType';

export const validateBody = (body: DocumentModel): Boolean => {
  let { date, docNumber, documentType } = body
  let { analiticId, senderId } = body.values

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
    // tableItems?.forEach(item => {
    //   if (!item.analiticId) {
    //     flag = true;
    //   }
    // })

    if (!analiticId || !senderId || flag) {
      return false
    }
  }

  const documentsForSale = [
    `${DocumentType.SaleProd}`,
    `${DocumentType.SaleMaterial}`,
  ]

  if (documentsForSale.includes(documentType)) {
    let flag = false;
    // tableItems?.forEach(item => {
    //   if (!item.receiverId || !item.analiticId) {
    //     flag = true;
    //   }
    // })
    if (!senderId || flag) return false
  }

  const documentsForCashFromPartners = [
    `${DocumentType.ComeCashFromPartners}`,
    `${DocumentType.MoveCash}`,
  ]

  if (documentsForCashFromPartners.includes(documentType)) {
    if (!analiticId || !senderId ) return false
  }

  const documentsForCashLeave = [
    `${DocumentType.LeaveCash}`,
  ]

  if (documentsForCashLeave.includes(documentType)) {
    if (!senderId ) return false
  }

  let flag: boolean = true;
  let hasTablePart = hasDocumentTablePart(documentType)

  if (!flag) return false


  return true

}