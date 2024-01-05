import { Maindata } from '@/app/context/app.context.interfaces';
import { EntryItem, Schet, TypeQuery } from '@/app/interfaces/report.interface';

export const query = (
    schet: Schet,
    typequery: TypeQuery, 
    secondSubcontoId: string,
    mainData: Maindata
  ): number => {

  const { reportOption } = mainData;
  const { startDate, endDate, entrys, firstReferenceId } = reportOption;
  // console.log(`first ref id ${firstReferenceId}`)
  // if (firstReferenceId == undefined ) console.log('noeniq')
  console.log(typeof firstReferenceId)
  let flag = (firstReferenceId == null || firstReferenceId.length == 0)
  let newEntrys = [...entrys]
  
  switch (typequery) {
    case TypeQuery.PDKOL:
      return newEntrys.filter((item: EntryItem) => {
                        return (
                          item.debet == schet &&
                          (flag || item.debetFirstSubcontoId == firstReferenceId) && 
                          item.debetSecondSubcontoId == secondSubcontoId &&
                          item.date < startDate
                        )
                    })
                    .reduce((acc, item: EntryItem) => acc + item.count,0)
    
    case TypeQuery.PDSUM:
      return newEntrys.filter((item: EntryItem) => {
                        return (
                          item.debet == schet &&
                          (flag || item.debetFirstSubcontoId == firstReferenceId) &&
                          item.debetSecondSubcontoId == secondSubcontoId &&
                          item.date < startDate
                        )
                      })
                      .reduce((acc, item: EntryItem) => acc + item.summa, 0)

    case TypeQuery.PKKOL:
                        return newEntrys.filter((item: EntryItem) => {
                          return (
                            item.kredit == schet &&
                            (flag || item.kreditFirstSubcontoId == firstReferenceId) &&
                            item.kreditSecondSubcontoId == secondSubcontoId &&
                            item.date < startDate
                          )
                        })
                        .reduce((acc, item: EntryItem) => acc + item.count, 0)

    case TypeQuery.PKSUM:
                        return newEntrys.filter((item: EntryItem) => {
                          return (
                            item.kredit == schet &&
                            (flag || item.kreditFirstSubcontoId == firstReferenceId) &&
                            item.kreditSecondSubcontoId == secondSubcontoId &&
                            item.date < startDate
                          )
                        })
                          .reduce((acc, item: EntryItem) => acc + item.summa, 0)

    case TypeQuery.TDKOL:
      return newEntrys.filter((item: EntryItem) => {
                        return (
                          item.debet == schet &&
                          (flag || item.debetFirstSubcontoId == firstReferenceId) &&
                          item.debetSecondSubcontoId == secondSubcontoId &&
                          item.date >= startDate &&
                          item.date <= endDate
                        )
                      })
                      .reduce((acc, item: EntryItem) => acc + item.count, 0)

    case TypeQuery.TDSUM:
        return newEntrys.filter((item: EntryItem) => {
                          return (
                            item.debet == schet &&
                            (flag || item.debetFirstSubcontoId == firstReferenceId) &&
                            item.debetSecondSubcontoId == secondSubcontoId &&
                            item.date >= startDate &&
                            item.date <= endDate
                          )
                        })
                        .reduce((acc, item: EntryItem) => acc + item.summa, 0)

    case TypeQuery.TKKOL:
      return newEntrys.filter((item: EntryItem) => {
                          return (
                            item.kredit == schet &&
                            (flag || item.kreditFirstSubcontoId == firstReferenceId) &&
                            item.kreditSecondSubcontoId == secondSubcontoId &&
                            item.date >= startDate &&
                            item.date <= endDate
                          )
                        })
                        .reduce((acc, item: EntryItem) => acc + item.count, 0)

    case TypeQuery.TKSUM:
      return newEntrys.filter((item: EntryItem) => {
                          return (
                            item.kredit == schet &&
                            (flag || item.kreditFirstSubcontoId == firstReferenceId) &&
                            item.kreditSecondSubcontoId == secondSubcontoId &&
                            item.date >= startDate &&
                            item.date <= endDate
                          )
                        })
                        .reduce((acc, item: EntryItem) => acc + item.summa, 0)

    case TypeQuery.MPRICE:
      let totalSumma = newEntrys.filter((item: EntryItem) => {
                                  return (
                                    item.debet == schet &&
                                    item.kredit != schet &&
                                    // item.debetFirstSubcontoId == firstReferenceId &&
                                    item.debetSecondSubcontoId == secondSubcontoId &&
                                    item.date <= endDate
                                  )
                                })
                                .reduce((acc, item: EntryItem) => acc + item.summa, 0)

      let totalCount = newEntrys.filter((item: EntryItem) => {
                              return (
                                    item.debet == schet &&
                                    item.kredit != schet &&
                                    // item.debetFirstSubcontoId == firstReferenceId &&
                                    item.debetSecondSubcontoId == secondSubcontoId &&
                                    item.date <= endDate
                                  )
                                })
                              .reduce((acc, item: EntryItem) => acc + item.count, 0)
      return totalCount ? +(totalSumma / totalCount).toFixed(2) : 0
    }
  
  return 0
}