import { typeReference } from "../interfaces/reference.interface"
import { ReportsType } from "../interfaces/report.interface"

interface Result {
    label: string,
    typeReference: typeReference
}

export const getOptionsByReportType = (reportsType:ReportsType):Result => {
    switch (reportsType) {
        case ReportsType.AktSverka:
            return {label:'Корхона', typeReference: typeReference.PARTNERS}
        case ReportsType.DebitorKreditor:
            return { label: 'Корхона', typeReference: typeReference.PARTNERS }
        case ReportsType.CashObotot:
            return { label: 'Харажат', typeReference: typeReference.CHARGES }
        case ReportsType.ChargesOborot:
            return { label: 'Харажат', typeReference: typeReference.CHARGES }
        case ReportsType.MatOborot:
            return { label: 'Товар моддий бойлик', typeReference: typeReference.TMZ }
        case ReportsType.ZpOborot:
            return { label: 'Ходим', typeReference: typeReference.WORKERS }
        default:
            return { label: 'Корхона', typeReference: typeReference.PARTNERS }
    }
}