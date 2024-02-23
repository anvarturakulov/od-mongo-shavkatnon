import { DocumentModel, DocumentType } from "../../interfaces/document.interface";

export const validateBody = (body: DocumentModel): Boolean => {
  let { date, docNumber, documentType } = body

  let { analiticId, senderId, receiverId, total, count } = body
  // console.log(senderId)
  if (!date || !docNumber || !documentType) return false

  const documentsWithAnalitic = [
    `${DocumentType.ComeMaterial}`,
    `${DocumentType.ComeProduct}`,
    `${DocumentType.ComeHalfstuff}`,
    `${DocumentType.LeaveProd}`,
    `${DocumentType.LeaveMaterial}`,
    `${DocumentType.LeaveHalfstuff}`,
    `${DocumentType.MoveProd}`,
    `${DocumentType.MoveMaterial}`,
    `${DocumentType.MoveHalfstuff}`,
    `${DocumentType.SaleProd}`,
    `${DocumentType.SaleMaterial}`
  ]

  if (documentsWithAnalitic.includes(documentType)) {
    if (!analiticId || !senderId || !receiverId || !count) {
      return false
    } 
  }

  const documentsForCashFromPartners = [
    `${DocumentType.ComeCashFromPartners}`,
    `${DocumentType.MoveCash}`,
  ]

  if (documentsForCashFromPartners.includes(documentType)) {
    if (receiverId && senderId && total) return true 
    else return false
  }

  const documentsForCashLeave = [
    `${DocumentType.LeaveCash}`,
  ]

  if (documentsForCashLeave.includes(documentType)) {
    if (!senderId || !analiticId) return false
  }

  return true

}