
export enum ReportsType {
    MatOborot = 'ТМБ харакати',
    DebitorKreditor = 'Дебитор ва кредитор',
    AktSverka = 'Хамкор билан солиштирма',
    CashObotot = 'Пул маблаг харакати',
    ChargesOborot = 'Харажатлар хисоби',
    ZpOborot = 'Иш хаки хисоби',
}

export interface OptionsToGenerateReport {
    startDate: Date,
    endDate: Date,
    reportsType: ReportsType
    referenceId: string
}