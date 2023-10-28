import { DocumentType } from "../interfaces/documents/mainDocument.interface";
import { ContentType, ReportsType, ServiceType } from "../interfaces/general.interface";
import { ReferenceType } from "../interfaces/references/mainReference.interface";

export const getKeyEnum = (val:string, contentType: ContentType):string =>{
    switch (contentType) {
        case 'document':
            return Object.keys(DocumentType)[Object.values(DocumentType).indexOf(val as unknown as DocumentType)]
        case 'reference':
            return Object.keys(ReferenceType)[Object.values(ReferenceType).indexOf(val as unknown as ReferenceType)]
        case 'servis':
            return Object.keys(ServiceType)[Object.values(ServiceType).indexOf(val as unknown as ServiceType)]
        case 'report':
            return Object.keys(ReportsType)[Object.values(ReportsType).indexOf(val as unknown as ReportsType)]
        default:
            return 'Error'
    }

    
}

