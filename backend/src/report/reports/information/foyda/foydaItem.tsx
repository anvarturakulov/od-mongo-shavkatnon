import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { queryKor } from 'src/report/helpers/querys/queryKor';
import { query } from 'src/report/helpers/querys/query';
import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { Document } from 'src/document/models/document.model';
import { DocumentType } from 'src/interfaces/document.interface';
import { ReferenceDocument } from 'src/reference/models/referense.model';

const isDelivery = (deliverys:ReferenceDocument[],id:string) => {
  if (deliverys && deliverys.length) {
    let length = deliverys.filter((item:ReferenceDocument)=> String(item._id) == id).length
    if (length) return true
  }
  return false
}

export const foydaItem = ( 
  data: any,
  startDate: number,
  endDate: number,
  currentSectionId: string, 
  title: string, 
  globalEntrys: Array<EntryItem> | undefined,
  docs: Document[],
  deliverys: ReferenceDocument[],
  zpUmumBulim: number,
  longeChargeUmumBulim: number, 
  currentPaymentUmumBulim: number ) => {

  let longeCharge:number = 0;

  data && data.length &&
  data
  .filter((item: ReferenceModel)=> {
    return item.typeReference == TypeReference.CHARGES && item.longCharge
  })
  .forEach((item: ReferenceModel) => {
    // console.log(item.name)
    longeCharge += queryKor(Schet.S20, Schet.S50, TypeQuery.ODS, startDate, endDate, String(currentSectionId), String(item._id), globalEntrys)
  })


  let productionDocsCount = 0;
  let productionAllDocsCount = 0;
  let countOutToDelivery = 0;
  let countIncomeFromDelivery = 0; 
  

  if (docs && docs.length > 0) {
    
    productionAllDocsCount = docs.filter((item: Document) => {
      return (item.date>= startDate && item.date <= endDate && item.documentType == DocumentType.ComeProduct)
    }).length

    productionDocsCount = docs.filter((item: Document) => {
      return (item.date>= startDate && item.date <= endDate && String(item.senderId) == currentSectionId && item.documentType == DocumentType.ComeProduct)
    }).length
    
    countOutToDelivery = docs.filter((item:Document) => {
      return (
        item.date>= startDate && 
        item.date <= endDate && 
        item.documentType == DocumentType.MoveProd &&
        String(item.senderId) == String(currentSectionId)  &&
        isDelivery(deliverys, String(item.receiverId)) )
    }).reduce((total, item:Document) => total + item.count, 0)

    countIncomeFromDelivery = docs.filter((item:Document) => {
      return (
        item.date>= startDate && 
        item.date <= endDate && 
        item.documentType == DocumentType.MoveProd &&
        String(item.receiverId) == String(currentSectionId)  &&
        isDelivery(deliverys, String(item.senderId)) )
    }).reduce((total, item:Document) => total + item.count, 0)

  }


  const PDKOL = query(Schet.S28, TypeQuery.PDKOL, startDate, endDate, currentSectionId, '', globalEntrys)
  const PKKOL = query(Schet.S28, TypeQuery.PKKOL, startDate, endDate, currentSectionId, '', globalEntrys)
  const TDKOL = query(Schet.S28, TypeQuery.TDKOL, startDate, endDate, currentSectionId, '', globalEntrys)
  const TKKOL = query(Schet.S28, TypeQuery.TKKOL, startDate, endDate, currentSectionId, '', globalEntrys)
  
  const startCount = PDKOL-PKKOL;
  const endCount = startCount+TDKOL-TKKOL;

  let idForBuxanka = '65e7048b5c54490bbc335ca2';
  
  const productionCount = queryKor(Schet.S28, Schet.S20, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const brakCount = queryKor(Schet.S20, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  
  const moveOutCount = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const moveIncomeCount = queryKor(Schet.S28, Schet.S28, TypeQuery.ODK, startDate, endDate, String(currentSectionId), '', globalEntrys);

  const sale = queryKor(Schet.S40, Schet.S28, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  
  const countDeleviry = (countOutToDelivery-countIncomeFromDelivery) <= 0 ? 0 : (countOutToDelivery-countIncomeFromDelivery)   
  
  const saleCountWithOutMove = startCount + productionCount - brakCount - moveOutCount + moveIncomeCount - endCount;
  
  // const saleWithMove = sale + countDeleviry * 3500 
  //                           + (endCount-startCount)*3500 
  //                           - (moveIncomeCount-countIncomeFromDelivery)*3500
  //                           + (moveOutCount - countOutToDelivery )*3500;
  let d = countDeleviry > 0 ? countDeleviry : 0
  let i = (moveIncomeCount-countIncomeFromDelivery) > 0 ? (moveIncomeCount-countIncomeFromDelivery) : 0
  let o = (moveOutCount - countOutToDelivery ) > 0 ? (moveOutCount - countOutToDelivery ) : 0
  
  const saleWithMove = sale + d * 3500 - i*3500 + o * 3500;
  
  const zagatovka = queryKor(Schet.S20, Schet.S21, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const materials = queryKor(Schet.S20, Schet.S10, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const zp = queryKor(Schet.S20, Schet.S67, TypeQuery.ODS, startDate, endDate, String(currentSectionId), '', globalEntrys);

  const addingZp = productionAllDocsCount>0 ? zpUmumBulim * productionDocsCount / productionAllDocsCount : 0; 
  const addingLongeCharge = productionAllDocsCount>0 ? longeChargeUmumBulim * productionDocsCount / productionAllDocsCount : 0;
  const addingCurrentPayment = productionAllDocsCount>0 ? currentPaymentUmumBulim * productionDocsCount / productionAllDocsCount : 0;

  const services = queryKor(Schet.S20, Schet.S60, TypeQuery.ODS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  
  const currentPayment = queryKor(Schet.S20, Schet.S50, TypeQuery.ODS, startDate, endDate, String(currentSectionId), '', globalEntrys) - longeCharge;
  
  const currentCharges = zagatovka + materials + zp + addingZp + currentPayment + services + addingCurrentPayment;
  const currentEarning = saleWithMove - currentCharges;
  const koefCurrentEarningToOneProduct = 0;
  const longPayment =  longeCharge;
  const realEarning = saleWithMove - currentCharges - longPayment - addingLongeCharge;

  return (
    {
      section: title,
      sectionId: currentSectionId,
      productionAllDocsCount,
      productionDocsCount,
      productionCount,
      saleCountWithOutMove,
      countDeleviry,
      saleWithMove,
      zagatovka,
      materials,
      zp,
      addingZp,
      services,
      addingCurrentPayment,
      currentPayment,
      currentEarning,
      koefCurrentEarningToOneProduct,
      addingLongeCharge,
      longPayment,
      realEarning
    }
      
  )
} 