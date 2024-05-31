'use client'
import { OborotkaItemProps } from './oborotkaItem.props';
import styles from './oborotkaItem.module.css';
import { numberValue } from '@/app/service/common/converters';
import { totalByKey } from '@/app/components/inform/inform';

export const OborotkaItem = ({className, item, ...props }: OborotkaItemProps) :JSX.Element => {
    let PDKOL = totalByKey('PDKOL', item?.items)
    let PKKOL = totalByKey('PKKOL', item?.items);
    let PDSUM = totalByKey('PDSUM', item?.items)
    let PKSUM = totalByKey('PKSUM', item?.items)
    let TDKOL = totalByKey('TDKOL', item?.items)
    let TDSUM = totalByKey('TDSUM', item?.items)
    let TKKOL = totalByKey('TKKOL', item?.items)
    let TKSUM = totalByKey('TKSUM', item?.items)

    return (
       <>
        <thead>
          <tr className={styles.sectionName}>
            <td></td>
            <td className={styles.title}>{item?.name}</td>
            <td className={styles.totalTd}>{numberValue(item?.PDSUM-item?.PKSUM)}</td>
            <td className={styles.totalTdKol}>{numberValue(item?.PDKOL-item?.PKKOL)}</td>
            <td className={styles.totalTd}>{numberValue(item?.TDSUM)}</td>
            <td className={styles.totalTdKol}>{numberValue(item?.TDKOL)}</td>
            <td className={styles.totalTd}>{numberValue(item?.TKSUM)}</td>
            <td className={styles.totalTdKol}>{numberValue(item?.TKKOL)}</td>
            <td className={styles.totalTd}>{numberValue(item?.PDSUM-item?.PKSUM+item?.TDSUM-item?.TKSUM)}</td>
            <td className={styles.totalTdKol}>{numberValue(item?.PDKOL-item?.PKKOL+item?.TDKOL-item?.TKKOL)}</td>

          </tr>
        </thead>
        <tbody className={styles.tbody}>
            {
                item?.subItems &&
                item?.subItems.length &&
                item?.subItems.map((element:any, key:number) => {
                    return (
                        <tr key={key}>
                          <td className={styles.number}>{key+1}</td>
                          <td id='itemName' className={styles.title}>{element?.name}</td>

                          <td>{numberValue(element?.subPDSUM-element?.subPKSUM)}</td>
                          <td className={styles.count}>{numberValue(element?.subPDKOL-element?.subPKKOL)}</td>
                          <td>{numberValue(element?.subTDSUM)}</td>
                          <td className={styles.count}>{numberValue(element?.subTDKOL)}</td>
                          <td>{numberValue(element?.subTKSUM)}</td>
                          <td className={styles.count}>{numberValue(element?.subTKKOL)}</td>
                          <td>{numberValue(element?.subPDSUM-element?.subPKSUM+element?.subTDSUM-element?.subTKSUM)}</td>
                          <td className={styles.count}>{numberValue(element?.subPDKOL-element?.subPKKOL+element?.subTDKOL-element?.subTKKOL)}</td>
                        </tr>
                    )
                })

            }
            
        </tbody>
        {/* <thead>
          <tr className={styles.total}>
              <td></td>
              <td>Жами</td>

              <td className={styles.totalTd}>{numberValue(item?.PDKOL-item?.PKKOL)}</td>
              <td className={styles.totalTd}>{numberValue(item?.PDSUM-item?.PKSUM)}</td>
              <td className={styles.totalTd}>{numberValue(item?.TDKOL)}</td>
              <td className={styles.totalTd}>{numberValue(item?.TDSUM)}</td>
              <td className={styles.totalTd}>{numberValue(item?.TKKOL)}</td>
              <td className={styles.totalTd}>{numberValue(item?.TKSUM)}</td>
              <td className={styles.totalTd}>{numberValue(item?.PDKOL-item?.PKKOL+item?.TDKOL-item?.TKKOL)}</td>
              <td className={styles.totalTd}>{numberValue(item?.PDSUM-item?.PKSUM+item?.TDSUM-item?.TKSUM)}</td>

              </tr>
      </thead> */}
      </>
    )
} 