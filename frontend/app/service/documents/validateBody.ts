import { DocumentModel, DocumentType } from "../../interfaces/document.interface";

export const validateBody = (body: DocumentModel): Boolean => {
  let { date, docNumber, documentType } = body

  let { analiticId, senderId, receiverId, total, count,firstWorkerId, secondWorkerId, thirdWorkerId } = body
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

  const documentsToTotal = [
    `${DocumentType.ComeMaterial}`,
    `${DocumentType.LeaveMaterial}`,
    `${DocumentType.MoveMaterial}`,
    `${DocumentType.SaleProd}`,
  ]

  if (documentsToTotal.includes(documentType)) {
    if ( !total ) {
      return false
    }
  }

  const documentsComeProduct = [
    `${DocumentType.ComeProduct}`,
  ]

  if (documentsComeProduct.includes(documentType)) {
    if (!firstWorkerId || !secondWorkerId || !thirdWorkerId) {
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
    if (!senderId || !analiticId || !total) return false
  }

  return true

}