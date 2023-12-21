import { TypeReference } from '../../../interfaces/reference.interface'
import { ReportsType } from "../../../interfaces/report.interface"

interface Result {
    label: string,
    typeReference: TypeReference
}

export const getOptionsByReportType = (reportsType:ReportsType):Result => {
    switch (reportsType) {
        case ReportsType.AktSverka:
            return {label:'Корхона', typeReference: TypeReference.PARTNERS}
        case ReportsType.DebitorKreditor:
            return { label: 'Корхона', typeReference: TypeReference.PARTNERS }
        case ReportsType.CashObotot:
            return { label: 'Харажат', typeReference: TypeReference.CHARGES }
        case ReportsType.ChargesOborot:
            return { label: 'Харажат', typeReference: TypeReference.CHARGES }
        case ReportsType.MatOborot:
            return { label: 'Товар моддий бойлик', typeReference: TypeReference.TMZ }
        case ReportsType.ZpOborot:
            return { label: 'Ходим', typeReference: TypeReference.WORKERS }
        default:
            return { label: 'Корхона', typeReference: TypeReference.PARTNERS }
    }
}