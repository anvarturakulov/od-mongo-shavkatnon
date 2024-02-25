import { getPropertySubconto } from '@/app/service/reports/getPropertySubconto'
import styles from './tbody.module.css';
import { numberValue } from '@/app/service/common/converters'
import { query } from '@/app/service/reports/querys/query'
import { useAppContext } from '@/app/context/app.context';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { TbodyProps } from './tbody.props';
import { getTitleBySchet } from '@/app/service/reports/getTitleBySchet';

export function TBody ({ listSecondSubconts, data, schet, className, ...props}:TbodyProps):JSX.Element {
  
  const { mainData } = useAppContext();
  return (
    <>
      <div className={styles.title}>{getTitleBySchet(schet)}</div>
      {
        listSecondSubconts && 
        listSecondSubconts.map((item: string, key) => {
        
        const MPRICE = query(schet, TypeQuery.MPRICE, item, mainData);
        const PDSUM = query(schet, TypeQuery.PDSUM, item, mainData);
        const PDKOL = query(schet, TypeQuery.PDKOL, item, mainData);
        const PKSUM = query(schet, TypeQuery.PKSUM, item, mainData);
        const PKKOL = query(schet, TypeQuery.PKKOL, item, mainData);
        const TDSUM = query(schet, TypeQuery.TDSUM, item, mainData);
        const TDKOL = query(schet, TypeQuery.TDKOL, item, mainData);
        const TKSUM = query(schet, TypeQuery.TKSUM, item, mainData);
        const TKKOL = query(schet, TypeQuery.TKKOL, item, mainData);
        
        if (!MPRICE && !PDSUM && !PDKOL && !PKSUM && !PKKOL 
            && !TDSUM  && !TDKOL  && !TKSUM  && !TKKOL ) return <></>
        
        return (
          <>
            <tr key={key} className={styles.trRow} >
              <tr>
                <td className={styles.tdNumber}>{key + 1} </td>
                <td className={styles.name}>{getPropertySubconto(data, item).name}</td>
                <td className={styles.unit}>{getPropertySubconto(data, item).unit}</td>
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