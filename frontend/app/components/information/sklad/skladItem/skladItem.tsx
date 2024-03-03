'use client'
import { SkladItemProps } from './skladItem.props';
import styles from './skladItem.module.css';
import cn from 'classnames';
import { Htag } from '@/app/components';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { useAppContext } from '@/app/context/app.context';
import { query } from '@/app/service/reports/querys/query';
import { numberValue } from '@/app/service/common/converters';
import { queryKor } from '@/app/service/reports/querys/queryKor';
import { getListSecondSubconts } from '@/app/service/reports/getListSecondSubconts';
import { getPropertySubconto } from '@/app/service/reports/getPropertySubconto';

export const SkladItem = ({className, data, currentId, title, sectionType,  ...props }: SkladItemProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext()

    let startDateFromStorage: string | undefined | null, endDateFromStorage : string | undefined | null

    if (typeof window !== 'undefined') {
      startDateFromStorage = localStorage.getItem('dateStartToInterval');
      endDateFromStorage = localStorage.getItem('dateEndToInterval');
    }
    let listSecondSubconts
    if (currentId) {
        listSecondSubconts = getListSecondSubconts(mainData.reportOption.entrys, [Schet.S10, Schet.S21], currentId);
    }

    return (
       <>
          <div className={styles.item}>
            <Htag tag='h1'>{title}</Htag>
            <Htag tag='h2' className={styles.h2}>Сон буйича</Htag>
            {
                listSecondSubconts &&
                listSecondSubconts.length &&
                listSecondSubconts.map((item: string) => {
                    const PDKOL = query(Schet.S10, TypeQuery.PDKOL, item, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);
                    const PKKOL = query(Schet.S10, TypeQuery.PKKOL, item, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);
                    const TDKOL = query(Schet.S10, TypeQuery.TDKOL, item, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);
                    const TKKOL = query(Schet.S10, TypeQuery.TKKOL, item, mainData, true, currentId, true, startDateFromStorage, endDateFromStorage);

                    return (
                        <div className={styles.row}>
                            <div className={styles.title}>{getPropertySubconto(data, item).name}</div>
                            <div className={styles.value}>{numberValue(PDKOL - PKKOL + TDKOL - TKKOL)}</div>
                        </div>
                    )
                })

            }
            
            
          </div>
      </>
    )
} 