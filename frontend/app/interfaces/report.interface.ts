
export enum ReportType {
    MatOborot = 'MatOborot',
    DebitorKreditor = 'DebitorKreditor',
    AktSverka = 'AktSverka',
    CashOborot = 'CashOborot',
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