'use client'
import { SectionItemProps } from './sectionItem.props';
import styles from './sectionItem.module.css';
import cn from 'classnames';
import { Htag } from '@/app/components';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { useAppContext } from '@/app/context/app.context';
import { query } from '@/app/service/reports/querys/query';
import { numberValue } from '@/app/service/common/converters';
import { queryKor } from '@/app/service/reports/querys/queryKor';

export const SectionItem = ({className, data, currentId, title, sectionType,  ...props }: SectionItemProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext()
    let startDateFromStorage, endDateFromStorage
    if (typeof window !== 'undefined') {
      startDateFromStorage = localStorage.getItem('dateStartToInterval');
      endDateFromStorage = localStorage.getItem('dateEndToInterval');
    }

    const PDKOL = query(Schet.S28, TypeQuery.PDKOL, null, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);
    const PKKOL = query(Schet.S28, TypeQuery.PKKOL, null, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);

    const OBKOLD2828 = queryKor(Schet.S28, Schet.S28, TypeQuery.ODK, currentId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);
    const OBKOLD2820 = queryKor(Schet.S28, Schet.S20, TypeQuery.ODK, currentId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);;
    
    const OBKOLK2828 = queryKor(Schet.S28, Schet.S28, TypeQuery.OKK, currentId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);
    const OBKOLK2028 = queryKor(Schet.S20, Schet.S28, TypeQuery.OKK, currentId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);;
    const OBKOLK4028 = queryKor(Schet.S40, Schet.S28, TypeQuery.OKK, currentId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);;
   
    const TDKOL = query(Schet.S28, TypeQuery.TDKOL, null, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);
    const TKKOL = query(Schet.S28, TypeQuery.TKKOL, null, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);

    const PDSUM = query(Schet.S50, TypeQuery.PDSUM, null, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);
    const PKSUM = query(Schet.S50, TypeQuery.PKSUM, null, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);

    const TDSUM = query(Schet.S50, TypeQuery.TDSUM, null, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);
    const TKSUM = query(Schet.S50, TypeQuery.TKSUM, null, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);

    const MOVEOUT = queryKor(Schet.S50, Schet.S50, TypeQuery.OKS, currentId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);
    
    
    return (
       <>
          <div className={styles.item}>
            <Htag tag='h1'>{title}</Htag>
            <Htag tag='h2' className={styles.h2}>Сон буйича</Htag>
            <div className={styles.row}>
                <div className={styles.title}>Кун бошига колдик нони</div>
                <div className={styles.value}>{numberValue(PDKOL-PKKOL)}</div>
            </div>
            {
                OBKOLD2820 != 0 &&
                <div className={styles.row}>
                    <div className={styles.title}>Ишлаб. чик. кирим</div>
                    <div className={styles.value}>{numberValue(OBKOLD2820)}</div>
                </div>
            }
            
            <div className={styles.row}>
                <div className={styles.title}>Ички силжиш. кирим</div>
                <div className={styles.value}>{numberValue(OBKOLD2828)}</div>
            </div>
            
            <div className={styles.row}>
                <div className={styles.title}>Сотилган нон</div>
                <div className={styles.value}>{numberValue(OBKOLK4028)}</div>
            </div>
            {
                OBKOLK2028 != 0 &&
                <div className={styles.row}>
                    <div className={styles.title}>Брак(истем.) нон</div>
                    <div className={styles.value}>{numberValue(OBKOLK2028)}</div>
                </div>
            }
            <div className={styles.row}>
                <div className={styles.title}>Ички сил. чиким</div>
                <div className={styles.value}>{numberValue(OBKOLK2828)}</div>
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
                <div className={styles.title}>Пул силжиш</div>
                <div className={styles.value}>{numberValue(MOVEOUT)}</div>
            </div>
            {
                sectionType == 'filial' &&
                <div className={styles.row}>
                    <div className={styles.title}>Пул сарфлади</div>
                    <div className={styles.value}>{numberValue(TKSUM-MOVEOUT)}</div>
                </div>
            }
            
            <div className={styles.row}>
                <div className={styles.title}>Охирги карзи</div>
                <div className={styles.value}>{numberValue(PDSUM-PKSUM+TDSUM-TKSUM)}</div>
            </div>
          </div>
      </>
    )
} 