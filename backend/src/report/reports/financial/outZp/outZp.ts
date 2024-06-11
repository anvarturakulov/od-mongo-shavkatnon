import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { queryKor } from 'src/report/helpers/querys/queryKor';

export const outZp = (
    data: any,
    startDate: number,
    endDate: number,
    globalEntrys: Array<EntryItem> | undefined ) => {
    
    let result = [];
    let total = queryKor(Schet.S67, Schet.S50, TypeQuery.OKS, startDate, endDate, '', '', globalEntrys);
    
    data && 
    data.length > 0 &&
    data
    .filter((item: any) => item?.typeReference == TypeReference.WORKERS)
    .forEach((item: ReferenceModel) => {
        let value = queryKor(Schet.S67, Schet.S50, TypeQuery.ODS, startDate, endDate, String(item._id), '', globalEntrys);
        let element = {
            name: item.name,
            value
        }
        
        if (value) {
            result.push(element)
        }
    })
    
    return {
        reportType: `outZp`,
        total,
        values : [...result]
    }
} 
