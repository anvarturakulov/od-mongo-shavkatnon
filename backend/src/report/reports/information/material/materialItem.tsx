
import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { query } from 'src/report/helpers/querys/query';
import { queryKor } from 'src/report/helpers/querys/queryKor';

export const materialItem = ( 
  data: any,
  startDate: number,
  endDate: number,
  materialId: string, 
  title: string, 
  globalEntrys: Array<EntryItem> | undefined ) => {    

    let result = []
    const value = queryKor(Schet.S20, Schet.S10, TypeQuery.OKS, startDate, endDate, '', String(materialId), globalEntrys);
    
    if (value == 0) return {}

    let element = {
      name: title,
      value: value
    }
    
    if (Object.keys(element).length) {
        result.push(element)
    }
    
    return ( 
        {
        // section: title,
        // sectionId: currentSectionId,
        // items: result
        }
    )
    
} 