import { OborotType, ReportType } from '@/app/interfaces/report.interface'
import { TypeReference } from '../../interfaces/reference.interface'


interface Result {
    label: string,
    typeReference: TypeReference
}

export const getOptionsByReportType = (reportType:string, oborotType: OborotType):Result => {
    switch (reportType) {
        case ReportType.Personal:
            return {label:'Ходим', typeReference: TypeReference.WORKERS}
        case ReportType.MatOborot:
            return { label: 'Булим ёки цех', typeReference: TypeReference.STORAGES }
        case ReportType.Oborotka:
            if (oborotType == OborotType.S40) {
                return { label: 'Хамкор', typeReference: TypeReference.PARTNERS }    
            }
            return { label: 'Булим ёки цех', typeReference: TypeReference.STORAGES }
        default:
            return { label: 'Корхона', typeReference: TypeReference.PARTNERS }
    }
}