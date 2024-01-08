import { getPropertySubconto } from '@/app/service/reports/getPropertySubconto'
import styles from './tbody.module.css';
import { numberValue } from '@/app/service/common/converters'
import { query } from '@/app/service/reports/querys/query'
import { useAppContext } from '@/app/context/app.context';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { TbodyProps } from './tbody.props';
import { getTitleBySchet } from '@/app/service/reports/getTitleBySchet';

export function TBody ({ listSecondSubconts, bodyByFirstSunconto, fixedFirstSuncont, data, schet, className, ...props}:TbodyProps):JSX.Element {
  
  const { mainData } = useAppContext();
  
  const PDSUMTotal = query(schet, TypeQuery.PDSUM, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);
  const PKSUMTotal = query(schet, TypeQuery.PKSUM, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);
  const TDSUMTotal = query(schet, TypeQuery.TDSUM, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);
  const TKSUMTotal = query(schet, TypeQuery.TKSUM, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);
  
  if (!PDSUMTotal &&  !PKSUMTotal && !TDSUMTotal && !TKSUMTotal) return <></>
        
  return (
    <>
      {
        <tr  className={styles.trRowMain} >
          <tr>
            <td className={styles.tdNumber}>{} </td>
            <td className={styles.name}>{getPropertySubconto(data, fixedFirstSuncont).name}</td>
            <td className={styles.numberValue}>
                {numberValue(PDSUMTotal-PKSUMTotal)}
            </td>
            <td className={styles.numberValue}>
                {numberValue(TDSUMTotal)}
            </td>
            <td className={styles.numberValue}>
                {numberValue(TKSUMTotal)}
            </td>
            <td className={styles.numberValue}>
                {numberValue(PDSUMTotal-PKSUMTotal+TDSUMTotal-TKSUMTotal)}
            </td>
          </tr>
        </tr>
      }

      {
        listSecondSubconts && 
        listSecondSubconts.map((item: string, key) => {
        // console.log(getPropertySubconto(data, item).name+'---')
        const TDSUM = query(schet, TypeQuery.TDSUM, item, mainData, bodyByFirstSunconto, fixedFirstSuncont);
        const TKSUM = query(schet, TypeQuery.TKSUM, item, mainData, bodyByFirstSunconto, fixedFirstSuncont);
        
        if (!TDSUM && !TKSUM) return <></>
        
        return (
          <>
            <tr key={key} className={styles.trRow} >
              <tr>
                <td className={styles.tdNumber}>{key + 1} </td>
                <td className={styles.name}>{getPropertySubconto(data, item).name}</td>
                <td className={styles.numberValue}>
                    {/* {numberValue(PDSUM-PKSUM)} */}
                </td>
                <td className={styles.numberValue}>
                    {numberValue(TDSUM)}
                </td>
                <td className={styles.numberValue}>
                    {numberValue(TKSUM)}
                </td>
                <td className={styles.numberValue}>
                    {/* {numberValue(PDSUM-PKSUM+TDSUM-TKSUM)} */}
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