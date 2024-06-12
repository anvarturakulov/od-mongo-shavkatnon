import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { queryKor } from 'src/report/helpers/querys/queryKor';
import { query } from 'src/report/helpers/querys/query';

export const sectionItem = ( 
  startDate: number,
  endDate: number,
  currentSectionId: string, 
  title: string,
  sectionType: 'DELIVERY' | 'FILIAL' | 'BUXGALTER' | 'FOUNDER',
  globalEntrys: Array<EntryItem> | undefined ) => {

  
  let idForBuxanka = '65e7048b5c54490bbc335ca2';
  let schetCash = sectionType == 'FOUNDER' ? Schet.S66 : Schet.S50

  const PDKOL = query(Schet.S28, TypeQuery.PDKOL, startDate, endDate, currentSectionId, '', globalEntrys);
  const PDKOLbux = query(Schet.S28, TypeQuery.PDKOL, startDate, endDate, currentSectionId, idForBuxanka, globalEntrys);
  
  const PKKOL = query(Schet.S28, TypeQuery.PKKOL, startDate, endDate, currentSectionId, '', globalEntrys);
  const PKKOLbux = query(Schet.S28, TypeQuery.PKKOL, startDate, endDate, currentSectionId, idForBuxanka, globalEntrys);

  const OBKOLD2828 = queryKor(Schet.S28, Schet.S28, TypeQuery.ODK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const OBKOLD2828bux = queryKor(Schet.S28, Schet.S28, TypeQuery.ODK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);
  
  const OBKOLD2820 = queryKor(Schet.S28, Schet.S20, TypeQuery.ODK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const OBKOLD2820bux = queryKor(Schet.S28, Schet.S20, TypeQuery.ODK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);;
  
  const OBKOLK2828 = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const OBKOLK2828bux = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);
  
  const OBKOLK2028 = queryKor(Schet.S20, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);;
  const OBKOLK2028bux = queryKor(Schet.S20, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);

  const OBKOLK4028 = queryKor(Schet.S40, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const OBKOLK4028bux = queryKor(Schet.S40, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);
  
  const TDKOL = query(Schet.S28, TypeQuery.TDKOL, startDate, endDate, currentSectionId, '', globalEntrys);
  const TDKOLbux = query(Schet.S28, TypeQuery.TDKOL, startDate, endDate, currentSectionId, idForBuxanka, globalEntrys);
  
  const TKKOL = query(Schet.S28, TypeQuery.TKKOL, startDate, endDate, currentSectionId, '', globalEntrys);
  const TKKOLbux = query(Schet.S28, TypeQuery.TKKOL, startDate, endDate, currentSectionId, idForBuxanka, globalEntrys);

  const PDSUM = query(schetCash, TypeQuery.PDSUM, startDate, endDate, currentSectionId, '', globalEntrys);
  const PKSUM = query(schetCash, TypeQuery.PKSUM, startDate, endDate, currentSectionId, '', globalEntrys);

  const TDSUM = query(schetCash, TypeQuery.TDSUM, startDate, endDate, currentSectionId, '', globalEntrys);
  const TKSUM = query(schetCash, TypeQuery.TKSUM, startDate, endDate, currentSectionId, '', globalEntrys);

  const MOVEINN = queryKor(schetCash, schetCash, TypeQuery.ODS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const MOVEOUT = queryKor(schetCash, schetCash, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);

  
  return (
    {
      section: title,
      sectionId: currentSectionId,
      startBalansCountNon: PDKOL-PKKOL-(PDKOLbux-PKKOLbux),
      startBalansCountBux: PDKOLbux-PKKOLbux,
      prodCountNon: OBKOLD2820-OBKOLD2820bux,
      prodCountBux: OBKOLD2820bux,
      moveIncomeCountNon: OBKOLD2828-OBKOLD2828bux,
      moveIncomeCountBux: OBKOLD2828bux,
      saleCountNon: OBKOLK4028-OBKOLK4028bux,
      saleCountBux: OBKOLK4028bux,
      brakCountNon: OBKOLK2028-OBKOLK2028bux,
      brakCountBux: OBKOLK2028bux,
      moveOutNon: OBKOLK2828-OBKOLK2828bux,
      moveOutBux: OBKOLK2828bux,
      endBalansCountNon: PDKOL - PKKOL + TDKOL - TKKOL - (PDKOLbux - PKKOLbux + TDKOLbux - TKKOLbux),
      endBlanasCountBux: PDKOLbux - PKKOLbux + TDKOLbux - TKKOLbux, 
      startBalansSumma: PDSUM-PKSUM,
      incomeFromSaleSumma: TDSUM-MOVEINN,
      incomeFromMoveSumma: MOVEINN,
      outFromMoveSumma: MOVEOUT,
      chargesSumma: TKSUM-MOVEOUT,
      endBalansSumma: PDSUM-PKSUM+TDSUM-TKSUM  
    }
      
  )
} 