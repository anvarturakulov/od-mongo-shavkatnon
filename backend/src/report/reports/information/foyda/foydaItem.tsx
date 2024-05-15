import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { queryKor } from 'src/report/helpers/querys/queryKor';
import { query } from 'src/report/helpers/querys/query';
import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { Document } from 'src/document/models/document.model';
import { DocumentType } from 'src/interfaces/document.interface';

export const foydaItem = ( 
  data: any,
  startDate: number,
  endDate: number,
  currentSectionId: string, 
  title: string, 
  globalEntrys: Array<EntryItem> | undefined,
  dosc: Document[] ) => {

  let longeCharge:number = 0;

  data && data.length &&
  data
  .filter((item: ReferenceModel)=> {
    return item.typeReference == TypeReference.CHARGES && item.longCharge
  })
  .forEach((item: ReferenceModel) => {
    console.log(item.name)
    longeCharge += queryKor(Schet.S20, Schet.S50, TypeQuery.OKS, startDate, endDate, String(currentSectionId), String(item._id), globalEntrys)
  })


  let productionDocsCount = 0; 

  if (dosc && dosc.length > 0) {
    productionDocsCount = dosc.filter((item: Document) => {
      return (item.date>= startDate && item.date <= endDate && String(item.senderId) == currentSectionId && item.documentType == DocumentType.ComeProduct)
    }).length
  }

  let idForBuxanka = '65e7048b5c54490bbc335ca2';
  const productionCount = queryKor(Schet.S28, Schet.S20, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const brakCount = queryKor(Schet.S20, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  
  const moveOutCount = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const moveOutCountBux = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);
  const moveIncomeCount = queryKor(Schet.S28, Schet.S28, TypeQuery.ODK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const moveIncomeCountBux = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);
  
  const saleCount = queryKor(Schet.S40, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const saleCountBux = queryKor(Schet.S40, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), idForBuxanka, globalEntrys);
  
  const sale = queryKor(Schet.S40, Schet.S28, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  
  const saleCountWithMove = productionCount - brakCount - moveOutCount + moveIncomeCount;
  
  const saleForMoveIncomeNon = (moveIncomeCount-moveIncomeCountBux) ? (moveIncomeCount-moveIncomeCountBux) : 0;
  
  const saleForMoveIncomeBux =  moveIncomeCountBux ? moveIncomeCountBux : 0;
  
  const saleWithMove = sale + saleForMoveIncomeNon*3500+saleForMoveIncomeBux*2000;
  
  const zagatovka = queryKor(Schet.S20, Schet.S21, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const materials = queryKor(Schet.S20, Schet.S10, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const zp = queryKor(Schet.S20, Schet.S67, TypeQuery.ODS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const currentPayment = queryKor(Schet.S20, Schet.S50, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys) - longeCharge;
  const currentCharges = zagatovka + materials + zp + currentPayment;
  const currentEarning = sale - zagatovka - currentCharges;
  const koefCurrentEarningToOneProduct = 0;
  const longPayment =  longeCharge;
  const realEarning = sale - currentCharges - longPayment;

  return (
    {
      section: title,
      productionDocsCount,
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