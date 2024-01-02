import { TypeReference } from '../../interfaces/reference.interface'
import { ReportsType } from "../../interfaces/report.interface"

interface Result {
    label: string,
    typeReference: TypeReference
}

export const getOptionsByReportType = (reportsType:string):Result => {
    switch (reportsType) {
        case ReportsType.AktSverka:
            return {label:'Корхона', typeReference: TypeReference.PARTNERS}
        case ReportsType.DebitorKreditor:
            return { label: 'Корхона', typeReference: TypeReference.PARTNERS }
        case ReportsType.CashObotot:
            return { label: 'Булим', typeReference: TypeReference.STORAGES }
        case ReportsType.ChargesOborot:
            return { label: 'Булим', typeReference: TypeReference.STORAGES }
        case ReportsType.MatOborot:
            return { label: 'Булим ёки цех', typeReference: TypeReference.STORAGES }
        case ReportsType.ZpOborot:
            return { label: 'Ходим', typeReference: TypeReference.WORKERS }
        default:
            return { label: 'Корхона', typeReference: TypeReference.PARTNERS }
    }
}