
import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { queryKor } from 'src/report/helpers/querys/queryKor';

export const takingItem = ( 
  startDate: number,
  endDate: number,
  currentSectionId: string, 
  title: string, 
  globalEntrys: Array<EntryItem> | undefined ) => {    

    const OBSUMK5050 = queryKor(Schet.S50, Schet.S50, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
    if (!OBSUMK5050) return {}
    return ( 
        {
        section: title,
        taking: OBSUMK5050
        }
    )
    
} 