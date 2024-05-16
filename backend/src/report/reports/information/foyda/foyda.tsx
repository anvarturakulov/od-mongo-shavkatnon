import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { EntryItem } from 'src/interfaces/report.interface';
import { foydaItem } from './foydaItem';
import { Document } from 'src/document/models/document.model';
import { ReferenceService } from 'src/reference/reference.service';
import { Reference, ReferenceDocument } from 'src/reference/models/referense.model';

export const foyda = (
    data: any,
    startDate: number,
    endDate: number,
    globalEntrys: Array<EntryItem> | undefined,
    docs: Document[],
    deliverys: ReferenceDocument[] ) => {
    
    let result = [];

    data && 
    data.length > 0 &&
    data
    .filter((item: any) => item?.typeReference == TypeReference.STORAGES)
    .filter((item: any) => {
        if ( item.filial || item.umumBulim ) return true
        return false
    })
    .forEach((item: ReferenceModel) => {
        let element = foydaItem(data, startDate, endDate, item._id, item.name, globalEntrys, docs, deliverys)
        if (Object.keys(element).length) {
            result.push(element)
        }
    })
    
    return {
        reportType: 'FOYDA',
        values : [...result]
    }
} 

