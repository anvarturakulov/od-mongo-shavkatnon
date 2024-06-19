'use client'
import { EntryItem } from 'src/interfaces/report.interface';
// import { Section } from './section/section';
import { cash } from './cash/cash';
import { taking } from './taking/taking';
import { section } from './section/section';
import { sklad } from './sklad/sklad';

import { foyda } from './foyda/foyda';
import { norma } from './norma/norma';
import { Document } from 'src/document/models/document.model';
import { ReferenceDocument } from 'src/reference/models/referense.model';
import { material } from './material/material';
import { financial } from './financial/financial';
import { giving } from './giving/giving';


export const information = (
    data: any,
    startDate: number,
    endDate: number,
    reportType: string,
    globalEntrys: Array<EntryItem> | undefined,
    docs: Document[],
    deliverys: ReferenceDocument[]
    ) => {
    
    let result = [];
    
    if (reportType == 'Financial') {
        let financialResult = financial(data, startDate, endDate, globalEntrys)
        result.push({'reportType': 'FINANCIAL', 'values': financialResult});
    }
    if (reportType == 'Foyda') {
        let foydaResult = foyda(data, startDate, endDate, globalEntrys, docs, deliverys)
        result.push(foydaResult);
    }
    if (reportType == 'Cash') {
        let cashResult = cash(data, startDate, endDate, globalEntrys)
        result.push(cashResult);
    }
    if (reportType == 'Taking') {
        let takingResult = taking(data, startDate, endDate, globalEntrys)
        result.push(takingResult);
    }
    if (reportType == 'Giving') {
        let givingResult = giving(data, startDate, endDate, globalEntrys)
        result.push(givingResult);
    }
    if (reportType == 'Section-buxgalter') {
        let sectionBuxResult = section('BUXGALTER', data, startDate, endDate, globalEntrys)
        result.push(sectionBuxResult);
    }
    if (reportType == 'Section-filial') {
        let sectionFilResult = section('FILIAL', data, startDate, endDate, globalEntrys)
        result.push(sectionFilResult);
    }
    if (reportType == 'Section-delivery') {
        let sectionDelResult = section('DELIVERY', data, startDate, endDate, globalEntrys)
        result.push(sectionDelResult);
    }
    if (reportType == 'Sklad') {
        let skladResult = sklad(data, startDate, endDate, globalEntrys)
        result.push(skladResult);
    }
    if (reportType == 'Norma') {
        let normaResult = norma(data, startDate, endDate, globalEntrys)
        result.push(normaResult);
    }
    if (reportType == 'Material') {
        let materialResult = material(data, startDate, endDate, globalEntrys)
        result.push(materialResult); 
    }
    if (reportType == 'Section-founder') {
        let sectionFounderResult = section('FOUNDER', data, startDate, endDate, globalEntrys)
        result.push(sectionFounderResult);
    }

    // let productionResult = production(data, startDate, endDate, globalEntrys, hamirs)
    // result.push(productionResult);
    
    // let zpResult = zp(data, startDate, endDate, globalEntrys, hamirs)
    // result.push(zpResult);

    return result
    
} 