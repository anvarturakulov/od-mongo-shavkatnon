import { ReportsType } from "../interfaces/report.interface"

export const getReportTypeByTitle = (title: string): ReportsType => {
    switch (title) {
        case ReportsType.AktSverka:
            return ReportsType.AktSverka
        case ReportsType.DebitorKreditor:
            return ReportsType.DebitorKreditor
        case ReportsType.CashObotot:
            return ReportsType.CashObotot
        case ReportsType.ChargesOborot:
            return ReportsType.ChargesOborot
        case ReportsType.MatOborot:
            return ReportsType.MatOborot
        case ReportsType.ZpOborot:
            return ReportsType.ZpOborot
        default:
            return ReportsType.ZpOborot
    }
}