import { DocumentType } from "../../interfaces/document.interface";

export const hasDocumentTablePart = (documentType: string): Boolean => {
  
  const documentsWithTableItems = [
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
    `${DocumentType.LeaveCash}`,
  ]

  if (documentsWithTableItems.includes(documentType)) {
    return true
  }

  const documentsWithOutTableItems = [
    `${DocumentType.ComeCashFromPartners}`,
    `${DocumentType.MoveCash}`,
  ]

  if (documentsWithOutTableItems.includes(documentType)) {
    return false
  }

  return false

}