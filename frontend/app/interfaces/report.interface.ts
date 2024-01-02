
export enum ReportsType {
    MatOborot = 'MatOborot',
    DebitorKreditor = 'DebitorKreditor',
    AktSverka = 'AktSverka',
    CashObotot = 'CashObotot',
    ChargesOborot = 'ChargesOborot',
    ZpOborot = 'ZpOborot',
}

export interface ReportOptions {
    startDate: number,
    endDate: number,
    firstReferenceId: string,
    secondReferenceId?: string,
    showReport: boolean
}