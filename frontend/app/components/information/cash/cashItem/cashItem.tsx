'use client'
import { CashItemProps } from './cashItem.props';
import styles from './deliveryItem.module.css';
import cn from 'classnames';
import { Htag } from '@/app/components';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { useAppContext } from '@/app/context/app.context';
import { query } from '@/app/service/reports/querys/query';
import { numberValue } from '@/app/service/common/converters';

export const CashItem = ({className, data, currentDeliveryId, title,  ...props }: CashItemProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext()
    const PDKOL = query(Schet.S28, TypeQuery.PDKOL, null, mainData, true, currentDeliveryId, true);
    const PKKOL = query(Schet.S28, TypeQuery.PKKOL, null, mainData, true, currentDeliveryId, true);

    const TDKOL = query(Schet.S28, TypeQuery.TDKOL, null, mainData, true, currentDeliveryId, true);
    const TKKOL = query(Schet.S28, TypeQuery.TKKOL, null, mainData, true, currentDeliveryId, true);

    const PDSUM = query(Schet.S50, TypeQuery.PDSUM, null, mainData, true, currentDeliveryId, true);
    const PKSUM = query(Schet.S50, TypeQuery.PKSUM, null, mainData, true, currentDeliveryId, true);

    const TDSUM = query(Schet.S50, TypeQuery.TDSUM, null, mainData, true, currentDeliveryId, true);
    const TKSUM = query(Schet.S50, TypeQuery.TKSUM, null, mainData, true, currentDeliveryId, true);

    return (
       <>
          <div className={styles.item}>
            <Htag tag='h1'>{title}</Htag>
            <Htag tag='h2' className={styles.h2}>Сон буйича</Htag>
            <div className={styles.row}>
                <div className={styles.title}>Кун бошига колдик нони</div>
                <div className={styles.value}>{PDKOL-PKKOL}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Цехдан олинган нон</div>
                <div className={styles.value}>{TDKOL}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Сотилган ва кайтарилган нон</div>
                <div className={styles.value}>{TKKOL}</div>
            </div>

            <div className={styles.row}>
                <div className={styles.title}>Зиммасидаги колдик нон</div>
                <div className={styles.value}>{numberValue(PDKOL - PKKOL + TDKOL - TKKOL)}</div>
            </div>

            <Htag tag='h2' className={cn(styles.h2, styles.bottomTitle)}>Пул буйича</Htag>
            <div className={styles.row}>
                <div className={styles.title}>Бошлангич карзи</div>
                <div className={styles.value}>{numberValue(PDSUM-PKSUM)}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Махсулот сотди</div>
                <div className={styles.value}>{numberValue(TDSUM)}</div>
            </div>

            <div className={styles.row}>
                <div className={styles.title}>Пул топширди</div>
                <div className={styles.value}>{numberValue(TKSUM)}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Охирги карзи</div>
                <div className={styles.value}>{numberValue(PDSUM-PDKOL+TDSUM-TKSUM)}</div>
            </div>
          </div>
      </>
    )
} 