import { ReferenceType } from "../interfaces/reference.interface"
import { ReportsType } from "../interfaces/report.interface"

interface Result {
    label: string,
    referenceType: ReferenceType
}

export const getOptionsByReportType = (reportsType:ReportsType):Result => {
    switch (reportsType) {
        case ReportsType.AktSverka:
            return {label:'Корхона', referenceType: ReferenceType.PARTNERS}
        case ReportsType.DebitorKreditor:
            return { label: 'Корхона', referenceType: ReferenceType.PARTNERS }
        case ReportsType.CashObotot:
            return { label: 'Харажат', referenceType: ReferenceType.CHARGES }
        case ReportsType.ChargesOborot:
            return { label: 'Харажат', referenceType: ReferenceType.CHARGES }
        case ReportsType.MatOborot:
            return { label: 'Товар моддий бойлик', referenceType: ReferenceType.TMZ }
        case ReportsType.ZpOborot:
            return { label: 'Ходим', referenceType: ReferenceType.WORKERS }
        default:
            return { label: 'Корхона', referenceType: ReferenceType.PARTNERS }
    }
}