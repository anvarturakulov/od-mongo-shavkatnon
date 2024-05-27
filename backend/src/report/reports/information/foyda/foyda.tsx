import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { EntryItem } from 'src/interfaces/report.interface';
import { foydaItem } from './foydaItem';
import { Document } from 'src/document/models/document.model';
import { ReferenceDocument } from 'src/reference/models/referense.model';
import { zpItemToFoyda } from './zpItemToFoyda';

export const foyda = (
    data: any,
    startDate: number,
    endDate: number,
    globalEntrys: Array<EntryItem> | undefined,
    docs: Document[],
    deliverys: ReferenceDocument[] ) => {
    
    let result = [];
    let zpUmumBulim = 0;
    if (data && data.length>0) {
        let arrUmumBulim = data.filter((item: any) => item.umumBulim)
        zpUmumBulim = zpItemToFoyda(startDate, endDate, arrUmumBulim[0]._id, globalEntrys)
    }   

    data && 
    data.length > 0 &&
    data
    .filter((item: any) => item?.typeReference == TypeReference.STORAGES)
    .filter((item: any) => {
        if ( item.filial ) return true
        return false;
    })
    .forEach((item: ReferenceModel) => {
        let element = foydaItem(data, startDate, endDate, item._id, item.name, globalEntrys, docs, deliverys, zpUmumBulim);
        if (Object.keys(element).length) {
            result.push(element)
        }
    })
    
    return {
        reportType: 'FOYDA',
        values : [...result]
    }
} 

