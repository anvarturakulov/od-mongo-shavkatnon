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

export const getValuesForEntry = (item: Document, tableItem?: DocTableItem, newEntry?: boolean): ResultgetValuesForEntry => {

  let documentType = item.documentType;
  const leaveComeTMZObj = {
    debetFirstSubcontoId: item.receiverId.toString(),
    debetSecondSubcontoId: tableItem?.referenceId.toString(),
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: tableItem?.referenceId.toString(),
    count: tableItem?.count,
    summa: tableItem?.total,
  }

  const saleTMZObj = {
    debetFirstSubcontoId: tableItem?.receiverId?.toString(),
    debetSecondSubcontoId: tableItem?.referenceId.toString(),
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: tableItem?.referenceId.toString(),
    count: tableItem?.count,
    summa: tableItem?.total,
  }

  const salePaymentObj = {
    debetFirstSubcontoId: item.senderId.toString(),
    debetSecondSubcontoId: tableItem?.referenceId.toString(),
    kreditFirstSubcontoId: tableItem?.receiverId?.toString(),
    kreditSecondSubcontoId: tableItem?.referenceId.toString(),
    count: tableItem?.count,
    summa: tableItem?.recieverPayment,
  }

  const leaveTMZ = {
    debetFirstSubcontoId: item.senderId.toString(),
    debetSecondSubcontoId: item.receiverId.toString(),
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: tableItem?.referenceId.toString(),
    count: tableItem?.count,
    summa: tableItem?.total,
  }

  let leaveCashZp2050 = {
    debetFirstSubcontoId: item.senderId.toString(),
    debetSecondSubcontoId: '659e4610d738d99baa2fe4ef',
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: tableItem?.referenceId.toString(),
    count: 0,
    summa: tableItem?.total,
  }

  let leaveCashZp6700 = {
    debetFirstSubcontoId: item.senderId.toString(),
    debetSecondSubcontoId: tableItem?.referenceId.toString(),
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: '659e4610d738d99baa2fe4ef',
    count: 0,
    summa: tableItem?.total,
  }

  let leaveCashObj4050 = {
    debetFirstSubcontoId: tableItem?.referenceId.toString(),
    debetSecondSubcontoId: item.senderId.toString(),
    kreditFirstSubcontoId: item.senderId.toString(),
    kreditSecondSubcontoId: tableItem?.referenceId.toString(),
    count: 0,
    summa: tableItem?.total,
  }

  let leaveCashOther = {
    debetFirstSubcontoId: item.senderId.toString(),
    debetSecondSubcontoId: tableItem?.referenceId.toString(),
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
        debet: item.date > 86400000 ? Schet.S50 : Schet.S00,
        kredit: Schet.S40,
        ...MoveCashObj
      };

    case DocumentType.ComeHalfstuff:
      return {
        debet: Schet.S21,
        kredit: Schet.S20,
        ...leaveComeTMZObj
      };

    case DocumentType.ComeMaterial:
      return {
        debet: Schet.S10,
        kredit: item.date > 86400000 ? Schet.S40 : Schet.S00,
        ...leaveComeTMZObj
      };

    case DocumentType.ComeProduct:
      return {
        debet: Schet.S28,
        kredit: item.date > 86400000 ? Schet.S20 : Schet.S00,
        ...leaveComeTMZObj,
      };

    case DocumentType.LeaveCash:
      if (tableItem.isPartner) {
        return {
          debet: Schet.S40,
          kredit: Schet.S50,
          ...leaveCashObj4050
        };
      }
      if (tableItem.isWorker && !newEntry) {
        return {
          debet: Schet.S20,
          kredit: Schet.S50,
          ...leaveCashZp2050,
        };
      }
      if (tableItem.isWorker && newEntry) {
        return {
          debet: Schet.S67,
          kredit: Schet.S00,
          ...leaveCashZp6700,
        }
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
        ...leaveTMZ,
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
        kredit: Schet.S50,
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
      if (tableItem && !newEntry) {
        return {
          debet: Schet.S40,
          kredit: Schet.S10,
          ...saleTMZObj
        };
      } else if (tableItem && newEntry) {
        return {
          debet: Schet.S50,
          kredit: Schet.S40,
          ...salePaymentObj
        };
      }

    case DocumentType.SaleProd:
      if (tableItem && !newEntry) {
        return {
          debet: Schet.S40,
          kredit: Schet.S28,
          ...saleTMZObj
        };
      } else if (tableItem && newEntry) {
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
        kredit: Schet.S00,
        ...leaveComeTMZObj
      };
  }
}