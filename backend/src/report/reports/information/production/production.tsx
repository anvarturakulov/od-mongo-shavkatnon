import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { EntryItem } from 'src/interfaces/report.interface';
import { productionItem } from './productionItem';
import { HamirService } from 'src/hamir/hamir.service';
import { Hamir } from 'src/hamir/models/hamir.model';

export const production = (
    data: any,
    startDate: number,
    endDate: number,
    globalEntrys: Array<EntryItem> | undefined,
    hamirs: Hamir[] ) => {
    
    let result = [];

    data && 
    data.length > 0 &&
    data
    .filter((item: any) => item?.typeReference == TypeReference.STORAGES)
    .filter((item: any) => {
        if ( item.filial ) return true
        return false
    })
    .forEach((item: ReferenceModel) => {
        let element = productionItem(startDate, endDate, item._id, item.name, globalEntrys, hamirs)

        if (Object.keys(element).length) {
            result.push(element)
        }
    })
    
    return {
        reportType: 'PRODUCTION',
        values : [...result]
    }
} 

