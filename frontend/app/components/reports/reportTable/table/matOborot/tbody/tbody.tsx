import { getPropertySubconto } from '@/app/service/reports/getPropertySubconto'
import styles from './tbody.module.css';
import { numberValue } from '@/app/service/common/converters'
import { query } from '@/app/service/reports/querys/query'
import { useAppContext } from '@/app/context/app.context';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { TbodyProps } from './tbody.props';
import { getTitleBySchet } from '@/app/service/reports/getTitleBySchet';

export function TBody ({ firstSubcontoId, listSecondSubconts, data, schet, className, ...props}:TbodyProps):JSX.Element {
  
  const { mainData } = useAppContext();
  return (
    <>
      <div className={styles.title}>{getTitleBySchet(schet)}</div>
      {
        listSecondSubconts && 
        listSecondSubconts.map((item: string, key) => {

        const MPRICE = query(mainData, schet, TypeQuery.MPRICE, firstSubcontoId, item, false );
        const PDSUM = query(mainData, schet, TypeQuery.PDSUM, firstSubcontoId, item, false);
        const PDKOL = query(mainData, schet, TypeQuery.PDKOL, firstSubcontoId, item, false);
        const PKSUM = query(mainData, schet, TypeQuery.PKSUM, firstSubcontoId, item, false);
        const PKKOL = query(mainData, schet, TypeQuery.PKKOL, firstSubcontoId, item, false);
        const TDSUM = query(mainData, schet, TypeQuery.TDSUM, firstSubcontoId, item, false);
        const TDKOL = query(mainData, schet, TypeQuery.TDKOL, firstSubcontoId, item, false);
        const TKSUM = query(mainData, schet, TypeQuery.TKSUM, firstSubcontoId, item, false);
        const TKKOL = query(mainData, schet, TypeQuery.TKKOL, firstSubcontoId, item, false);
        
        if (!PDSUM && !PDKOL && !PKSUM && !PKKOL 
            && !TDSUM  && !TDKOL  && !TKSUM  && !TKKOL ) return <></>
        
        return (
          <>
            <tr key={key} className={styles.trRow} >
              <tr>
                <td className={styles.tdNumber}>{key + 1} </td>
                <td className={styles.name}>{getPropertySubconto(data, item).name}</td>
                <td className={styles.unit}>{getPropertySubconto(data, item)._id}</td>
                <td className={styles.price}>{numberValue(MPRICE)}</td>
                <td className={styles.numberValue}>
                    {numberValue(PDKOL-PKKOL)}
                </td>
                <td className={styles.numberValue}>
                    {numberValue(PDSUM-PKSUM)}
                </td>
                <td className={styles.numberValue}>
                    {numberValue(TDKOL)}
                </td>
                <td className={styles.numberValue}>
                    {numberValue(TDSUM)}
                </td>
                <td className={styles.numberValue}>
                    {numberValue(TKKOL)}
                </td>
                <td className={styles.numberValue}>
                    {numberValue(TKSUM)}
                </td>
                <td className={styles.numberValue}>
                    {numberValue(PDKOL-PKKOL+TDKOL-TKKOL)}
                </td>
                <td className={styles.numberValue}>
                    {numberValue(PDSUM-PKSUM+TDSUM-TKSUM)}
                </td>
              </tr>
            </tr>
          </>
        )
      })
    }
    </>
  )
}