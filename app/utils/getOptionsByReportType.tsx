import { ReferenceType } from "../interfaces/references/mainReference.interface"
import { ReportsType } from "../interfaces/report.interface"

interface Result {
    label: string,
    referenceType: ReferenceType
}

export const getOptionsByReportType = (reportsType:ReportsType):Result => {
    switch (reportsType) {
        case ReportsType.AktSverka:
            return {label:'Корхона', referenceType: ReferenceType.Partners}
        case ReportsType.DebitorKreditor:
            return { label: 'Корхона', referenceType: ReferenceType.Partners }
        case ReportsType.CashObotot:
            return { label: 'Харажат', referenceType: ReferenceType.Charges }
        case ReportsType.ChargesOborot:
            return { label: 'Харажат', referenceType: ReferenceType.Charges }
        case ReportsType.MatOborot:
            return { label: 'Товар моддий бойлик', referenceType: ReferenceType.TMZ }
        case ReportsType.ZpOborot:
            return { label: 'Ходим', referenceType: ReferenceType.Workers }
        default:
            return { label: 'Корхона', referenceType: ReferenceType.Partners }
    }
}