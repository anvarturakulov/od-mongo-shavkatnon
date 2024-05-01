
import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { query } from 'src/report/helpers/querys/query';

export const skladItem = ( 
  data: any,
  startDate: number,
  endDate: number,
  currentSectionId: string, 
  title: string, 
  globalEntrys: Array<EntryItem> | undefined ) => {    

    let result = []
    
    data && 
    data.length > 0 &&
    data
    .filter((item: any) => item?.typeReference == TypeReference.TMZ)
    .forEach((item: ReferenceModel) => {

      const PDKOL = query(Schet.S10, TypeQuery.PDKOL, startDate, endDate, currentSectionId, item._id, globalEntrys)+
                    query(Schet.S21, TypeQuery.PDKOL, startDate, endDate, currentSectionId, item._id, globalEntrys);
      const PKKOL = query(Schet.S10, TypeQuery.PKKOL, startDate, endDate, currentSectionId, item._id, globalEntrys)+
                    query(Schet.S21, TypeQuery.PKKOL, startDate, endDate, currentSectionId, item._id, globalEntrys);
      const TDKOL = query(Schet.S10, TypeQuery.TDKOL, startDate, endDate, currentSectionId, item._id, globalEntrys)+
                    query(Schet.S21, TypeQuery.TDKOL, startDate, endDate, currentSectionId, item._id, globalEntrys);
      const TKKOL = query(Schet.S10, TypeQuery.TKKOL, startDate, endDate, currentSectionId, item._id, globalEntrys)+
                    query(Schet.S21, TypeQuery.TKKOL, startDate, endDate, currentSectionId, item._id, globalEntrys);;
      
      const value = PDKOL - PKKOL + TDKOL - TKKOL
      if (value == 0) return {}

      let element = {
        name: item.name,
        value: value
      }
      
      if (Object.keys(element).length) {
          result.push(element)
      }
    })
    
    return ( 
        {
        section: title,
        items: result
        }
    )
    
} 