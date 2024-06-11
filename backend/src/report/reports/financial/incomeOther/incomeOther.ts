import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { queryKor } from 'src/report/helpers/querys/queryKor';

export const incomeOther = (
    data: any,
    startDate: number,
    endDate: number,
    globalEntrys: Array<EntryItem> | undefined ) => {
    
    let result = [];
    let total = queryKor(Schet.S50, Schet.S60, TypeQuery.OKS, startDate, endDate, '', '', globalEntrys);
    
    data && 
    data.length > 0 &&
    data
    .filter((item: any) => item?.typeReference == TypeReference.PARTNERS)
    .forEach((item: ReferenceModel) => {
        let value = queryKor(Schet.S50, Schet.S60, TypeQuery.OKS, startDate, endDate, String(item._id), '', globalEntrys);
        let element = {
            name: item.name,
            value
        }
        
        if (value) {
            result.push(element)
        }
    })
    
    return {
        reportType: `incomeOther`,
        total,
        values : [...result]
    }
} 
