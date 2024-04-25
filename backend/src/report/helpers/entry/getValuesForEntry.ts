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

export const getValuesForEntry = (item: Document, newEntry?: boolean, tableItem?: DocTableItem,): ResultgetValuesForEntry => {
  if (item) {
    let documentType = item.documentType;
    let { receiverId, senderId, analiticId, count, total, cashFromPartner, isPartner, isWorker, isFounder } = item
    
    const leaveComeTMZObj = {
      debetFirstSubcontoId: receiverId.toString(),
      debetSecondSubcontoId: analiticId.toString(),
      kreditFirstSubcontoId: senderId.toString(),
      kreditSecondSubcontoId: analiticId.toString(),
      count: count,
      summa: total,
    }

    const leaveMaterial = {
      debetFirstSubcontoId: receiverId.toString(),
      debetSecondSubcontoId: (item.tableItems && item.tableItems != undefined && item.tableItems?.length && !newEntry) ? tableItem.referenceId?.toString() : '',
      kreditFirstSubcontoId: senderId.toString(),
      kreditSecondSubcontoId: (item.tableItems && item.tableItems != undefined && item.tableItems?.length && !newEntry) ? tableItem.referenceId?.toString(): '',
      count: (item.tableItems && item.tableItems != undefined && item.tableItems?.length && !newEntry) ? tableItem.count : 0,
      summa: (item.tableItems && item.tableItems != undefined && item.tableItems?.length && !newEntry) ? tableItem.total : 0,
    }

    const ZpCalculateObj = {
      debetFirstSubcontoId: receiverId.toString(),
      debetSecondSubcontoId: analiticId.toString(),
      kreditFirstSubcontoId: analiticId.toString(),
      kreditSecondSubcontoId: senderId.toString(),
      count: count,
      summa: total,
    }

    const saleTMZObj = {
      debetFirstSubcontoId: receiverId?.toString(),
      debetSecondSubcontoId: analiticId.toString(),
      kreditFirstSubcontoId: senderId.toString(),
      kreditSecondSubcontoId: analiticId.toString(),
      count: count,
      summa: total,
    }

    const salePaymentObj = {
      debetFirstSubcontoId: senderId.toString(),
      debetSecondSubcontoId: analiticId.toString(),
      kreditFirstSubcontoId: receiverId?.toString(),
      kreditSecondSubcontoId: analiticId.toString(),
      count: count,
      summa: total,
    }

    const leaveTMZ = {
      debetFirstSubcontoId: senderId.toString(),
      debetSecondSubcontoId: receiverId.toString(),
      kreditFirstSubcontoId: senderId.toString(),
      kreditSecondSubcontoId: analiticId.toString(),
      count: count,
      summa: total,
    }

    const comeHalfstuff = {
      debetFirstSubcontoId: senderId.toString(),
      debetSecondSubcontoId: analiticId.toString(),
      kreditFirstSubcontoId: receiverId.toString(),
      kreditSecondSubcontoId: analiticId.toString(),
      count: count,
      summa: total,
    }

    let leaveCashZp6750 = {
      debetFirstSubcontoId: analiticId.toString() ,
      debetSecondSubcontoId: senderId.toString(),
      kreditFirstSubcontoId: senderId.toString(),
      kreditSecondSubcontoId: analiticId.toString(),
      count: 0,
      summa: total,
    }

    let leaveCashObj4050 = {
      debetFirstSubcontoId: analiticId.toString(),
      debetSecondSubcontoId: senderId.toString(),
      kreditFirstSubcontoId: senderId.toString(),
      kreditSecondSubcontoId: analiticId.toString(),
      count: 0,
      summa: total,
    }

    let leaveCashOther = {
      debetFirstSubcontoId: senderId.toString(),
      debetSecondSubcontoId: analiticId.toString(),
      kreditFirstSubcontoId: senderId.toString(),
      kreditSecondSubcontoId: analiticId.toString(),
      count: 0,
      summa: total,
    }

    let MoveCashObj = {
      debetFirstSubcontoId: receiverId.toString(),
      debetSecondSubcontoId: senderId.toString(),
      kreditFirstSubcontoId: senderId.toString(),
      kreditSecondSubcontoId: receiverId.toString(),
      count: 0,
      summa: total,
    }

    switch (documentType) {
      case DocumentType.ComeCashFromPartners:
        return {
          debet: item.date > 86400001 ? Schet.S50 : Schet.S00,
          kredit: Schet.S40,
          ...MoveCashObj
        };

      case DocumentType.ComeHalfstuff:
        if (tableItem && !newEntry) {
          // console.log(item.docNumber)
          // leave mat to prod halfstuff
          return {
            debet: Schet.S20,
            kredit: Schet.S10,
            ...leaveMaterial
          };
        } else {
          return {
            debet: Schet.S21,
            kredit: Schet.S20,
            ...comeHalfstuff
          };
        }
        
      case DocumentType.ComeMaterial:
        return {
          debet: Schet.S10,
          kredit: item.date > 86400001 ? Schet.S40 : Schet.S00,
          ...leaveComeTMZObj
        };

      case DocumentType.ComeProduct:
        return {
          debet: Schet.S28,
          kredit: item.date > 86400001 ? Schet.S20 : Schet.S00,
          ...leaveComeTMZObj,
        };

      case DocumentType.LeaveCash:
        if (isPartner) {
          return {
            debet: Schet.S40,
            kredit: Schet.S50,
            ...leaveCashObj4050
          };
        }
        if (isWorker) {
          return {
            debet: Schet.S67,
            kredit: Schet.S50,
            ...leaveCashZp6750,
          };
        }

        if (isFounder) {
          // console.log(item.senderId)
          return {
            debet: Schet.S66,
            kredit: Schet.S50,
            ...leaveCashOther
          };
        }

        return {
          debet: Schet.S20,
          kredit: Schet.S50,
          ...leaveCashOther,
        };

      case DocumentType.LeaveHalfstuff:
        return {
          debet: Schet.S20,
          kredit: Schet.S21,
          ...leaveTMZ,
        };

      case DocumentType.LeaveMaterial:
        return {
          debet: Schet.S20,
          kredit: Schet.S10,
          ...leaveMaterial,
        };

      case DocumentType.LeaveProd:
        return {
          debet: Schet.S20,
          kredit: Schet.S28,
          ...leaveTMZ,
        };

      case DocumentType.MoveCash:
        return {
          debet: Schet.S50,
          kredit: item.date > 86400001 ? Schet.S50 : Schet.S00,
          ...MoveCashObj,
        };

      case DocumentType.MoveHalfstuff:
        return {
          debet: Schet.S21,
          kredit: Schet.S21,
          ...leaveComeTMZObj,
        };

      case DocumentType.MoveMaterial:
        return {
          debet: Schet.S10,
          kredit: Schet.S10,
          ...leaveComeTMZObj
        };

      case DocumentType.MoveProd:
        return {
          debet: Schet.S28,
          kredit: Schet.S28,
          ...leaveComeTMZObj
        };

      case DocumentType.SaleMaterial:
        if (!newEntry) {
          return {
            debet: Schet.S40,
            kredit: Schet.S10,
            ...saleTMZObj
          };
        } else if (newEntry) {
          return {
            debet: Schet.S50,
            kredit: Schet.S40,
            ...salePaymentObj
          };
        }

      case DocumentType.SaleProd:
        if (!newEntry) {
          return {
            debet: Schet.S40,
            kredit: Schet.S28,
            ...saleTMZObj
          };
        } else if (newEntry) {
          return {
            debet: Schet.S50,
            kredit: Schet.S40,
            ...salePaymentObj
          };
        }

      case DocumentType.ZpCalculate:
        // шу хужжатни проводкаси хакида кайта бир уйлаб куриш керак
        return {
          debet: Schet.S20,
          kredit: Schet.S67,
          ...ZpCalculateObj
        };
    }
  }
  
}