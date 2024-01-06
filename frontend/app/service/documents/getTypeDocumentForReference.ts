import { DocumentType, DocumentTypeForReference } from "../../interfaces/document.interface";

export const getTypeDocumentForReference = (contentName: string) : DocumentTypeForReference => {

  const documentsForMaterial = [
    `${DocumentType.ComeMaterial}`,
    `${DocumentType.SaleMaterial}`,
    `${DocumentType.LeaveMaterial}`,
    `${DocumentType.MoveMaterial}`,
  ]

  const documentsForProd = [
    `${DocumentType.ComeProduct}`,
    `${DocumentType.SaleProd}`,
    `${DocumentType.LeaveProd}`,
    `${DocumentType.MoveProd}`,
  ]

  const documentsForHalfstuff = [
    `${DocumentType.ComeHalfstuff}`,
    `${DocumentType.LeaveHalfstuff}`,
    `${DocumentType.MoveHalfstuff}`,
  ]

  if (documentsForMaterial.includes(contentName)) {
    return 'MATERIAL'
  }

  if (documentsForProd.includes(contentName)) {
    return 'PRODUCT'
  }

  if (documentsForHalfstuff.includes(contentName)) {
    return 'HALFSTUFF'
  }

  return 'OTHER'
}