import { EntryItem, Schet, TypeQuery } from 'src/interfaces/report.interface';
import { queryKor } from 'src/report/helpers/querys/queryKor';
import { query } from 'src/report/helpers/querys/query';
import { ReferenceModel, TypeReference } from 'src/interfaces/reference.interface';
import { Document } from 'src/document/models/document.model';
import { DocumentType } from 'src/interfaces/document.interface';
import { ReferenceService } from 'src/reference/reference.service';
import { Reference, ReferenceDocument } from 'src/reference/models/referense.model';

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
  deliverys: ReferenceDocument[] ) => {

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
  let countOutToDelivery = 0;
  let countIncomeFromDelivery = 0; 
  

  if (docs && docs.length > 0) {
    
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

  // console.log('countOutToDelivery-',countOutToDelivery)
  // console.log('countIncomeFromDelivery-',countIncomeFromDelivery)

  let idForBuxanka = '65e7048b5c54490bbc335ca2';
  const productionCount = queryKor(Schet.S28, Schet.S20, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const brakCount = queryKor(Schet.S20, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  
  const moveOutCount = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, startDate, endDate, String(currentSectionId), '', globalEntrys);
  const moveIncomeCount = queryKor(Schet.S28, Schet.S28, TypeQuery.ODK, startDate, endDate, String(currentSectionId), '', globalEntrys);

  const sale = queryKor(Schet.S40, Schet.S28, TypeQuery.OKS, startDate, endDate, String(currentSectionId), '', globalEntrys);
  
  const countDeleviry = (countOutToDelivery-countIncomeFromDelivery) <= 0 ? 0 : (countOutToDelivery-countIncomeFromDelivery)   
  
  const saleCountWithOutMove = productionCount - brakCount - moveOutCount + moveIncomeCount;
  
  const saleWithMove = sale +countDeleviry * 3500;
  
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
      saleCountWithOutMove,
      countDeleviry,
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