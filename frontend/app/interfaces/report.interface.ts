
export enum ReportsType {
    MatOborot = 'MatOborot',
    DebitorKreditor = 'DebitorKreditor',
    AktSverka = 'AktSverka',
    CashObotot = 'CashObotot',
    ChargesOborot = 'ChargesOborot',
    ZpOborot = 'ZpOborot',
}

export interface OptionsToGenerateReport {
    startDate: Date,
    endDate: Date,
    reportsType: ReportsType
    referenceId: string
}