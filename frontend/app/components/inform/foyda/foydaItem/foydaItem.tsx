'use client'
import { FoydaItemProps } from './foydaItem.props';
import styles from './foydaItem.module.css';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { useAppContext } from '@/app/context/app.context';
import { query } from '@/app/service/reports/querys/query';
import { numberValue } from '@/app/service/common/converters';
import { queryKor } from '@/app/service/reports/querys/queryKor';

export const FoydaItem = ({className, item, ...props }: FoydaItemProps) :JSX.Element => {
    
    
    return (
       <>
        <tbody>
            <tr>
              <td className={styles.title}>{item?.section}</td>
              <td>{numberValue(item?.productionCount)}</td>
              <td>{numberValue(item?.productionDocsCount)}</td>
              <td>{numberValue(item?.saleCountWithMove)}</td>
              <td>{numberValue(item?.saleWithMove)}</td>
              <td>{numberValue(item?.zagatovka)}</td>
              <td >{numberValue(item?.materials)}</td>
              <td>{numberValue(item?.zp)}</td>
              <td>{numberValue(item?.currentPayment)}</td>
              <td>{numberValue(item?.currentEarning)}</td>
              <td>{numberValue(item?.koefCurrentEarningToOneProduct)}</td>
              <td>{numberValue(item?.longPayment)}</td>
              <td>{numberValue(item?.realEarning)}</td>
            </tr>
        </tbody>
      </>
    )
} 