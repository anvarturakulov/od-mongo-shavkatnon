import { DocTableItem, Document } from 'src/document/models/document.model';
import { Schet } from 'src/interfaces/report.interface';
import { DocumentType } from 'src/interfaces/document.interface';

export interface ResultgetValuesForEntry { 
  debet: Schet, 
  kredit: Schet,
  debetFirstSubcontoId: string, 
  debetSecondSubcontoId: string,
  kreditFirstSubcontoId: string,
  kreditSecondSubcontoId: string,
  count: number,
  summa: number,
}

export const getValuesForEntry = (item: Document, tableItem?: DocTableItem): ResultgetValuesForEntry => {
  
  let documentType = item.documentType;

  const leaveComeTMZObj = {
    debetFirstSubcontoId: item.receiverId.toString(),
    debetSecondSubcontoId: tableItem?.referenceId.toString(),
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: tableItem?.referenceId.toString(),
    count: tableItem?.count,
    summa: tableItem?.total,
  }

  let leaveCashObj20106710 = {
    debetFirstSubcontoId: item.senderId.toString(),
    debetSecondSubcontoId: tableItem?.referenceId.toString(),
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: tableItem?.referenceId.toString(),
    count: 0,
    summa: tableItem?.total,
  }

  let leaveCashObj4010 = {
    debetFirstSubcontoId: tableItem?.referenceId.toString(),
    debetSecondSubcontoId: item.senderId.toString(),
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: tableItem?.referenceId.toString(),
    count: 0,
    summa: tableItem?.total,
  }

  let MoveCashObj = {
    debetFirstSubcontoId: item.receiverId.toString(),
    debetSecondSubcontoId: item.senderId.toString(),
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: item.receiverId.toString(),
    count: 0,
    summa: item.payValue,
  }

  switch (documentType) {
    case DocumentType.ComeCashFromPartners:
      return {
        debet: Schet.S5010,
        kredit: Schet.S4010,
        ...MoveCashObj
      };
    case DocumentType.ComeHalfstuff:
      return {
        debet: Schet.S2110,
        kredit: Schet.S2010,
        ...leaveComeTMZObj
      };
    case DocumentType.ComeMaterial:
      return {
        debet: Schet.S1010,
        kredit: Schet.S4010,
        ...leaveComeTMZObj
      };
    case DocumentType.ComeProduct:
      return {
        debet: Schet.S2810,
        kredit: Schet.S2010,
        ...leaveComeTMZObj,
      };
    case DocumentType.LeaveCash:
      if (tableItem.isPartner) {
        return {
          debet: Schet.S4010,
          kredit: Schet.S5010,
          ...leaveCashObj4010
        };  
      }
      if (tableItem.isWorker) {
        return {
          debet: Schet.S6710,
          kredit: Schet.S5010,
          ...leaveCashObj20106710,
        };
      }  
      return {
        debet: Schet.S2010,
        kredit: Schet.S5010,
        ...leaveCashObj20106710,
      };
    case DocumentType.LeaveHalfstuff:
      return {
        debet: Schet.S2010,
        kredit: Schet.S2110,
        ...leaveComeTMZObj,
      };
    case DocumentType.LeaveMaterial:
      return {
        debet: Schet.S2010,
        kredit: Schet.S1010,
        ...leaveComeTMZObj,
      };
    case DocumentType.LeaveProd:
      return {
        debet: Schet.S2010,
        kredit: Schet.S2810,
        ...leaveComeTMZObj,
      };
    case DocumentType.MoveCash:
      return {
        debet: Schet.S5010,
        kredit: Schet.S5010,
        ...MoveCashObj,
      };
    case DocumentType.MoveHalfstuff:
      return {
        debet: Schet.S2110,
        kredit: Schet.S2110,
        ...leaveComeTMZObj,
      };
    case DocumentType.MoveMaterial:
      return {
        debet: Schet.S1010,
        kredit: Schet.S1010,
        ...leaveComeTMZObj
      };
    case DocumentType.MoveProd:
      return {
        debet: Schet.S2810,
        kredit: Schet.S2810,
        ...leaveComeTMZObj
      };
    case DocumentType.SaleMaterial:
      return {
        debet: Schet.S4010,
        kredit: Schet.S1010,
        ...leaveComeTMZObj
      };
    case DocumentType.SaleProd:
      return {
        debet: Schet.S4010,
        kredit: Schet.S2810,
        ...leaveComeTMZObj
      };
    case DocumentType.ZpCalculate:
      // шу хужжатни проводкаси хакида кайта бир уйлаб куриш керак
      return {
        debet: Schet.S2010,
        kredit: Schet.S6710,
        ...leaveComeTMZObj
      };
  }
  
}