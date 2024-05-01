import { DocumentType } from './document.interface';

export enum ReportType {
    MatOborot = 'MatOborot',
    Oborotka = 'Oborotka',
    Personal = 'Personal',
    AktSverka = 'AktSverka',
}

export enum Schet{
    S00 = 'S00', // СЧЕТА ДЛЯ ВВОДА ОСТАТКОВ И ЗАКРЫТИЯ ЗП
    S10 = 'S10', // СЧЕТА УЧЕТА МАТЕРИАЛОВ
    S20 = 'S20', // СЧЕТА УЧЕТА ОСНОВНОГО ПРОИЗВОДСТВА И СЧЕТА УЧЕТА РАСХОДОВ ПЕРИОДА
    S21 = 'S21', // СЧЕТА УЧЕТА ПОЛУФАБРИКАТОВ СОБСТВЕННОГО ПРОИЗВОДСТВА
    S28 = 'S28', // СЧЕТА УЧЕТА ГОТОВОЙ ПРОДУКЦИИ
    S29 = 'S29', // СЧЕТА УЧЕТА ТОВАРОВ 
    S40 = 'S40', // СЧЕТА К ПОЛУЧЕНИЮ И СЧЕТА К ОПЛАТЕ ПОСТАВЩИКАМ И ПОДРЯДЧИКАМ
    S50 = 'S50', // СЧЕТА УЧЕТА ДЕНЕЖНЫХ СРЕДСТВ В КАССЕ
    S51 = 'S51', // СЧЕТА УЧЕТА ДЕНЕЖНЫХ СРЕДСТВ НА РАСЧЕТНОМ СЧЕТЕ
    S66 = 'S66', // СЧЕТА УЧЕТА ЗАРОБОТНОЙ ПЛАТЫ СОТРУДНИКОВno
    S67 = 'S67', // СЧЕТА УЧЕТА ЗАРОБОТНОЙ ПЛАТЫ СОТРУДНИКОВno
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

export enum DEBETKREDIT {
    DEBET = 'DEBET',
    KREDIT = 'KREDIT'
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
    BALANCE = 'BALANCE',
    TDSUMEntrys = 'TDSUMEntrys',
    TKSUMEntrys = 'TKSUMEntrys',
    AllEntrys = 'AllEntrys',
    ODS = 'ODS',
    OKS = 'OKS',
    ODK = 'ODK',
    OKK = 'OKK',
}

export interface QueryObject {
    typeQuery: string, 
    schet: string,
    startDate: number, 
    endDate: number, 
    firstSubcontoId: string, 
    secondSubcontoId: string,
}

export interface QueryInformation {
    startDate: number,
    endDate: number,
}