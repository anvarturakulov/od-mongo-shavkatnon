import { ReportType } from '@/app/interfaces/report.interface'
import { TypeReference } from '../../interfaces/reference.interface'


interface Result {
    label: string,
    typeReference: TypeReference
}

export const getOptionsByReportType = (reportType:string):Result => {
    switch (reportType) {
        case ReportType.AktSverka:
            return {label:'Корхона', typeReference: TypeReference.PARTNERS}
        case ReportType.DebitorKreditor:
            return { label: 'Корхона', typeReference: TypeReference.PARTNERS }
        case ReportType.CashOborot:
            return { label: 'Булим', typeReference: TypeReference.STORAGES }
        case ReportType.ChargesOborot:
            return { label: 'Булим', typeReference: TypeReference.STORAGES }
        case ReportType.MatOborot:
            return { label: 'Булим ёки цех', typeReference: TypeReference.STORAGES }
        case ReportType.ZpOborot:
            return { label: 'Ходим', typeReference: TypeReference.WORKERS }
        default:
            return { label: 'Корхона', typeReference: TypeReference.PARTNERS }
    }
}