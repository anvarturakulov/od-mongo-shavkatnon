import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { queryKor } from 'src/report/helpers/querys/queryKor';
import { query } from 'src/report/helpers/querys/query';

export const foydaItem = ( 
  startDate: number,
  endDate: number,
  currentSectionId: string, 
  title: string, 
  globalEntrys: Array<EntryItem> | undefined ) => {


  let idForBuxanka = '65e7048b5c54490bbc335ca2';
  const productionCount = queryKor(Schet.S28, Schet.S20, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  
  const moveOutCount = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const moveOutCountBux = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);
  const moveIncomeCount = queryKor(Schet.S28, Schet.S28, TypeQuery.ODK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const moveIncomeCountBux = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);
  
  const saleCount = queryKor(Schet.S40, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const saleCountBux = queryKor(Schet.S40, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);
  const sale = queryKor(Schet.S40, Schet.S28, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  
  const saleCountWithMove = saleCount - moveOutCount + moveIncomeCount;
  
  const saleForMoveIncomeNon = (moveIncomeCount-moveIncomeCountBux) ? (moveIncomeCount-moveIncomeCountBux) : 0;
  const saleForMoveIncomeBux =  moveIncomeCountBux ? moveIncomeCountBux : 0;
  const saleWithMove = sale + saleForMoveIncomeNon*3500+saleForMoveIncomeBux*2000;
  
  const zagatovka = queryKor(Schet.S20, Schet.S21, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const materials = queryKor(Schet.S20, Schet.S10, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const zp = queryKor(Schet.S20, Schet.S67, TypeQuery.ODS, startDate, endDate, String(currentSectionId), '', globalEntrys);;
  const currentPayment = queryKor(Schet.S20, Schet.S50, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const currentCharges = zagatovka + materials + zp + currentPayment;
  const currentEarning = sale - zagatovka - currentCharges;
  const koefCurrentEarningToOneProduct = 0;
  const longPayment =  150;//queryKor(Schet.S25, Schet.S50, TypeQuery.OKS, currentSectionId, undefined, mainData, true);;
  const realEarning = sale - currentCharges - longPayment;

  return (
    {
      section: title,
      productionCount,
      saleCountWithMove,
      saleWithMove,
      zagatovka,
      materials,
      zp,
      currentPayment,
      currentEarning,
      koefCurrentEarningToOneProduct,
      longPayment,
      realEarning
    }
      
  )
} 