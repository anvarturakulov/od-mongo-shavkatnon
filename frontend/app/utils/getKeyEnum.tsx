import { DocumentType } from "../interfaces/document.interface";
import { ContentType, ServiceType } from "../interfaces/general.interface";
import { TypeReference } from '../interfaces/reference.interface';
import { ReportsType} from "../interfaces/report.interface";

export const getKeyEnum = (val:string, contentType: ContentType):string =>{
    switch (contentType) {
        case 'document':
            return Object.keys(DocumentType)[Object.values(DocumentType).indexOf(val as unknown as DocumentType)]
        case 'reference':
            return Object.keys(TypeReference)[Object.values(TypeReference).indexOf(val as unknown as TypeReference)]
        case 'servis':
            return Object.keys(ServiceType)[Object.values(ServiceType).indexOf(val as unknown as ServiceType)]
        case 'report':
            return Object.keys(ReportsType)[Object.values(ReportsType).indexOf(val as unknown as ReportsType)]
        default:
            return 'Error'
    }
}

