'use client'
import { FoydaItemProps } from './foydaItem.props';
import styles from './foydaItem.module.css';
import { numberValue } from '@/app/service/common/converters';

export const FoydaItem = ({className, item, ...props }: FoydaItemProps) :JSX.Element => {
    return (
       <>
        <tbody>
            <tr>
              <td className={styles.title}>{item?.section}</td>
              <td>{numberValue(item?.productionCount)}</td>
              <td>{numberValue(item?.productionDocsCount)}</td>
              <td>{numberValue(item?.saleCountWithOutMove)}</td>
              <td>{numberValue(item?.countDeleviry)}</td>
              <td>{numberValue(item?.saleWithMove)}</td>
              <td>{numberValue(item?.zagatovka)}</td>
              <td >{numberValue(item?.materials)}</td>
              <td>{numberValue(item?.zp)}</td>
              <td>{numberValue(item?.addingZp)}</td>
              <td>{numberValue(item?.services)}</td>
              <td>{numberValue(item?.currentPayment)}</td>
              <td>{numberValue(item?.addingCurrentPayment)}</td>
              <td>{numberValue(item?.currentEarning)}</td>
              <td>{numberValue(item?.koefCurrentEarningToOneProduct)}</td>
              <td>{numberValue(item?.longPayment)}</td>
              <td>{numberValue(item?.addingLongeCharge)}</td>
              <td>{numberValue(item?.realEarning)}</td>
            </tr>
        </tbody>
      </>
    )
} 