import { getPropertySubconto } from '@/app/service/reports/getPropertySubconto'
import styles from './tbody.module.css';
import cn from 'classnames';
import { numberValue } from '@/app/service/common/converters'
import { query } from '@/app/service/reports/querys/query'
import { useAppContext } from '@/app/context/app.context';
import { TypeQuery } from '@/app/interfaces/report.interface';
import { TbodyProps } from './tbody.props';
import { queryEntrys } from '@/app/service/reports/querys/queryEntrys';
import { showMessage } from '@/app/service/common/showMessage';

export function TBody ({ listSecondSubconts, bodyByFirstSunconto, fixedFirstSuncont, data, schet, className, ...props}:TbodyProps):JSX.Element {
  
  const { mainData, setMainData } = useAppContext();

  const PDSUMTotal = query(schet, TypeQuery.PDSUM, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);
  const PKSUMTotal = query(schet, TypeQuery.PKSUM, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);
  const TDSUMTotal = query(schet, TypeQuery.TDSUM, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);
  const TKSUMTotal = query(schet, TypeQuery.TKSUM, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);
  const TDSUMEntrysGlobal = queryEntrys(schet, TypeQuery.TDSUMEntrys, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);
  const TKSUMEntrysGlobal = queryEntrys(schet, TypeQuery.TKSUMEntrys, null, mainData, bodyByFirstSunconto, fixedFirstSuncont);


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
            <td 
              className={cn(styles.numberValue, styles.openValue)}
              onDoubleClick={() => showMessage(TDSUMEntrysGlobal, 'success', setMainData)}
              >
                {numberValue(TDSUMTotal)}
            </td>
            <td 
              className={cn(styles.numberValue, styles.openValue)}
              onDoubleClick={() => showMessage(TKSUMEntrysGlobal, 'success', setMainData)}
              >
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
        const TDSUMEntrys = queryEntrys(schet, TypeQuery.TDSUMEntrys, item, mainData, bodyByFirstSunconto, fixedFirstSuncont);
        const TKSUMEntrys = queryEntrys(schet, TypeQuery.TKSUMEntrys, item, mainData, bodyByFirstSunconto, fixedFirstSuncont);
        
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
                <td 
                  className={cn(styles.numberValue, styles.openValue)}
                  onDoubleClick={()=> showMessage(TDSUMEntrys, 'success', setMainData)}
                  >
                    {numberValue(TDSUM)}
                </td>
                <td 
                  className={cn(styles.numberValue, styles.openValue)}
                  onDoubleClick={()=> showMessage(TKSUMEntrys, 'success', setMainData)}
                  >
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