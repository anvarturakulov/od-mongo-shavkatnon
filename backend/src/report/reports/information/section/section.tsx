import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { EntryItem } from 'src/interfaces/report.interface';
import { sectionItem } from './sectionItem';

export const section = (
    sectionType: 'DELIVERY' | 'FILIAL' | 'BUXGALTER',
    data: any,
    startDate: number,
    endDate: number,
    globalEntrys: Array<EntryItem> | undefined ) => {
    
    let result = [];

    data && 
    data.length > 0 &&
    data
    .filter((item: any) => item?.typeReference == TypeReference.STORAGES)
    .filter((item: any) => {
        if (sectionType == 'DELIVERY') return item?.delivery
        if (sectionType == 'FILIAL') return item?.filial
        if (sectionType == 'BUXGALTER') return item?.buxgalter
        return false
    })
    .forEach((item: ReferenceModel) => {
        let element = sectionItem(startDate, endDate, item._id, item.name, globalEntrys)
        if (Object.keys(element).length) {
            result.push(element)
        }
    })
    
    return {
        reportType: `SECTION-${sectionType}`,
        values : [...result]
    }
} 

