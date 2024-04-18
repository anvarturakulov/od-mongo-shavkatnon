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

export function TBody ({ bodyByFirstSunconto, fixedFirstSuncont, data, schet, className, ...props}:TbodyProps):JSX.Element {
  
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
        <tr className={styles.trRowMain} >
          <tr>
            <td className={styles.tdNumber}>{} </td>
            <td className={styles.comment}>{getPropertySubconto(data, fixedFirstSuncont).name}</td>
            <td className={styles.comment}>-</td>
            <td className={styles.comment}>-</td>
            <td className={styles.comment}>-</td>  
            <td className={styles.numberValue}>
                {numberValue(0)}
            </td>
            <td className={styles.numberValue}>
                {numberValue(0)}
            </td>
            <td className={styles.numberValue}>
                {numberValue(0)}
            </td>
            <td className={styles.numberValue}>
                {numberValue(0)}
            </td>
          </tr>
        </tr>
      }

      
    </>
  )
}