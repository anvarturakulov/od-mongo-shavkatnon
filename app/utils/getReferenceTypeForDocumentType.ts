import { DocumentType } from "../interfaces/documents/mainDocument.interface";
import { ContentType, ReportsType, ServiceType } from "../interfaces/general.interface";
import { ReferenceType } from "../interfaces/references/mainReference.interface";

export const getReferenceTypeForDocumentType = (documentType:string): ReferenceType => {
    switch (documentType) {
        case DocumentType.LeaveCash:
            return ReferenceType.Charges
        default:
            return ReferenceType.Charges
    }
}