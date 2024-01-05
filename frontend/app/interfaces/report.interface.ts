
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
    showReport: boolean,
    entrys: Array<EntryItem>,
    startReport: boolean,
}

export enum Schet {
    S0000 = 'S0000', // СЧЕТА ДЛЯ ВВОДА ОСТАТКОВ
    S1010 = 'S1010', // СЧЕТА УЧЕТА МАТЕРИАЛОВ
    S2010 = 'S2010', // СЧЕТА УЧЕТА ОСНОВНОГО ПРОИЗВОДСТВА И СЧЕТА УЧЕТА РАСХОДОВ ПЕРИОДА
    S2110 = 'S2110', // СЧЕТА УЧЕТА ПОЛУФАБРИКАТОВ СОБСТВЕННОГО ПРОИЗВОДСТВА
    S2810 = 'S2810', // СЧЕТА УЧЕТА ГОТОВОЙ ПРОДУКЦИИ
    S2910 = 'S2910', // СЧЕТА УЧЕТА ТОВАРОВ 
    S4010 = 'S4010', // СЧЕТА К ПОЛУЧЕНИЮ И СЧЕТА К ОПЛАТЕ ПОСТАВЩИКАМ И ПОДРЯДЧИКАМ
    S5010 = 'S5010', // СЧЕТА УЧЕТА ДЕНЕЖНЫХ СРЕДСТВ В КАССЕ
    S5110 = 'S5110', // СЧЕТА УЧЕТА ДЕНЕЖНЫХ СРЕДСТВ НА РАСЧЕТНОМ СЧЕТЕ
    S6710 = 'S6710', // СЧЕТА УЧЕТА РАСЧЕТОВ С ПЕРСОНАЛОМ ПО ОПЛАТЕ ТРУДА
}

export interface EntryItem {
    date: number,
    docNumber: number,
    docId: string,
    documentType: DocumentType,
    debet: Schet,
    debetFirstSubcontoId: string,
    debetSecondSubcontoId: string,
    kredit: Schet,
    kreditFirstSubcontoId: string,
    kreditSecondSubcontoId: string,
    count: number,
    summa: number,
    comment: string,
}

export enum TypeQuery {
    PDSUM = 'PDSUM',
    PDKOL = 'PDKOL',
    PKSUM = 'PKSUM',
    PKKOL = 'PKKOL',
    TDSUM = 'TDSUM',
    TDKOL = 'TDKOL',
    TKSUM = 'TKSUM',
    TKKOL = 'TKKOL',
    MPRICE = 'MPRICE',
}