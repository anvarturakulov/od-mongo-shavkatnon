
import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { query } from 'src/report/helpers/querys/query';
import { queryKor } from 'src/report/helpers/querys/queryKor';

export const materialItem = ( 
  data: any,
  startDate: number,
  endDate: number,
  title: string, 
  materialId: string, 
  un: boolean,
  globalEntrys: Array<EntryItem> | undefined ) => {    

  const idZagatovka27 = '659ce9a8523a48fdeb6ad92f';
  const countComeHS = queryKor(Schet.S21, Schet.S23, TypeQuery.OKK, startDate, endDate, '', '', globalEntrys);
  const countLeaveHS = queryKor(Schet.S20, Schet.S21, TypeQuery.OKK, startDate, endDate, '', '', globalEntrys);

  let count = queryKor(Schet.S20, Schet.S10, TypeQuery.OKK, startDate, endDate, '', String(materialId), globalEntrys);
  let summa = queryKor(Schet.S20, Schet.S10, TypeQuery.OKS, startDate, endDate, '', String(materialId), globalEntrys);
  
  if (un && countComeHS>0) {
    let koef = countLeaveHS/countLeaveHS
    if (koef <= 1) {
      count = count * koef;
      summa = summa * koef;
    }
  }

  if (count == 0 && summa == 0) return {}

  let element = {
    title,
    count,
    summa
  }
    
  return element
    
} 