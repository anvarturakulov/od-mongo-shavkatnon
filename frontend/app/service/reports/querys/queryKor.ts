import { Maindata } from '@/app/context/app.context.interfaces';
import { EntryItem, Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { getDateFromStorageExceptNull } from '../../documents/getDateFromStorageExceptNull';

export const queryKor = (
  debetSchet: Schet,
  kreditSchet: Schet,
  typequery: TypeQuery,
  firstSubconto: string | undefined,
  secondSubconto: string | undefined,
  mainData: Maindata,
  forDashboard? : boolean,
  dateStartForDashboard?: string | null,
  endStartForDashboard?: string | null,
): number => {

  const { reportOption } = mainData;
  let { startDate, endDate, entrys } = reportOption;
  endDate = endDate + 86399999
  
  let startDateFromStorage = Date.parse(getDateFromStorageExceptNull(dateStartForDashboard));
  let endDateFromStorage = Date.parse(getDateFromStorageExceptNull(endStartForDashboard)) + 86399999;


  let flagFirstSubconoto = true
  let flagSecondSubconto = true

  if (firstSubconto) flagFirstSubconoto = false
  if (secondSubconto) flagSecondSubconto = false

  let newEntrys = [...entrys]

  if (forDashboard) {
    let dateNowInNumber = Date.now();
    let dateNowInString = new Date(dateNowInNumber);
    let dateStr = dateNowInString.toISOString().split('T')[0];

    startDate = Date.parse(dateStr);
    endDate = Date.parse(dateStr) + 86399999;

    // startDate = startDateFromStorage;
    // endDate = endDateFromStorage;
  }

  switch (typequery) {
    case TypeQuery.ODS:
      return newEntrys.filter((item: EntryItem) => {
        return (
          item.debet == debetSchet &&
          item.kredit == kreditSchet &&
          (flagFirstSubconoto || item.debetFirstSubcontoId == firstSubconto) &&
          (flagSecondSubconto || item.debetSecondSubcontoId == secondSubconto) &&
          item.date >= startDate && 
          item.date <= endDate  
        )
      })
        .reduce((acc, item: EntryItem) => acc + item.summa, 0)

    case TypeQuery.ODK:
      return newEntrys.filter((item: EntryItem) => {
        return (
          item.debet == debetSchet &&
          item.kredit == kreditSchet &&
          (flagFirstSubconoto || item.debetFirstSubcontoId == firstSubconto) &&
          (flagSecondSubconto || item.debetSecondSubcontoId == secondSubconto) &&
          item.date >= startDate &&
          item.date <= endDate
        )
      })
        .reduce((acc, item: EntryItem) => acc + item.count, 0)
      
    case TypeQuery.OKS:
      return newEntrys.filter((item: EntryItem) => {
        return (
          item.debet == debetSchet &&
          item.kredit == kreditSchet &&
          (flagFirstSubconoto || item.kreditFirstSubcontoId == firstSubconto) &&
          (flagSecondSubconto || item.kreditSecondSubcontoId == secondSubconto) &&
          item.date >= startDate &&
          item.date <= endDate
        )
      })
        .reduce((acc, item: EntryItem) => acc + item.summa, 0)
      
    case TypeQuery.OKK:
      return newEntrys.filter((item: EntryItem) => {
        return (
          item.debet == debetSchet &&
          item.kredit == kreditSchet &&
          (flagFirstSubconoto || item.kreditFirstSubcontoId == firstSubconto) &&
          (flagSecondSubconto || item.kreditSecondSubcontoId == secondSubconto) &&
          item.date >= startDate &&
          item.date <= endDate
        )
      })
        .reduce((acc, item: EntryItem) => acc + item.count, 0)
  }

  return 0
}