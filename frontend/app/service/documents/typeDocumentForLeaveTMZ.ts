import { DocumentType } from "../../interfaces/document.interface";

export const typeDocumentForLeaveTMZ = (documentType: string): Boolean => {

  const documentsWithTypelLeaveTMZ = [
    `${DocumentType.SaleProd}`,
    `${DocumentType.SaleMaterial}`,
    `${DocumentType.LeaveProd}`,
    `${DocumentType.LeaveMaterial}`,
    `${DocumentType.LeaveHalfstuff}`,
    `${DocumentType.MoveProd}`,
    `${DocumentType.MoveMaterial}`,
    `${DocumentType.MoveHalfstuff}`,
    `${DocumentType.ComeHalfstuff}`,
  ]

  if (documentsWithTypelLeaveTMZ.includes(documentType)) {
    return true
  }

  return false

}