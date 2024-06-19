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
    globalEntrys: Array<EntryItem> | undefined,
    docs: Document[],
    deliverys: ReferenceDocument[]
    ) => {
    
    let result = [];
    let cashResult = cash(data, startDate, endDate, globalEntrys)
    result.push(cashResult);

    let takingResult = taking(data, startDate, endDate, globalEntrys)
    result.push(takingResult);

    let givingResult = giving(data, startDate, endDate, globalEntrys)
    result.push(givingResult);

    let sectionBuxResult = section('BUXGALTER', data, startDate, endDate, globalEntrys)
    result.push(sectionBuxResult);

    let sectionFilResult = section('FILIAL', data, startDate, endDate, globalEntrys)
    result.push(sectionFilResult);

    let sectionDelResult = section('DELIVERY', data, startDate, endDate, globalEntrys)
    result.push(sectionDelResult);

    let sectionFounderResult = section('FOUNDER', data, startDate, endDate, globalEntrys)
    result.push(sectionFounderResult);

    let skladResult = sklad(data, startDate, endDate, globalEntrys)
    result.push(skladResult);

    // let productionResult = production(data, startDate, endDate, globalEntrys, hamirs)
    // result.push(productionResult);
    
    // let zpResult = zp(data, startDate, endDate, globalEntrys, hamirs)
    // result.push(zpResult);

    let foydaResult = foyda(data, startDate, endDate, globalEntrys, docs, deliverys)
    result.push(foydaResult);

    let normaResult = norma(data, startDate, endDate, globalEntrys)
    result.push(normaResult);

    let materialResult = material(data, startDate, endDate, globalEntrys)
    result.push(materialResult);

    let financialResult = financial(data, startDate, endDate, globalEntrys)
    result.push({'reportType': 'FINANCIAL', 'values': financialResult});

    return result
    
} 