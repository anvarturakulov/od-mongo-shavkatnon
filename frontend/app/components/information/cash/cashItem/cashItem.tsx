'use client'
import { CashItemProps } from './cashItem.props';
import styles from './cashItem.module.css';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { useAppContext } from '@/app/context/app.context';
import { query } from '@/app/service/reports/querys/query';
import { numberValue } from '@/app/service/common/converters';
import { queryKor } from '@/app/service/reports/querys/queryKor';

export const CashItem = ({className, data, currentSectionId, title, ...props }: CashItemProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext()
    let startDateFromStorage, endDateFromStorage
    if (typeof window !== 'undefined') {
      startDateFromStorage = localStorage.getItem('dateStartToInterval');
      endDateFromStorage = localStorage.getItem('dateEndToInterval');
    }
    
    const PDSUM = query(Schet.S50, TypeQuery.PDSUM, null, mainData, true, currentSectionId, true, startDateFromStorage, endDateFromStorage);
    const PKSUM = query(Schet.S50, TypeQuery.PKSUM, null, mainData, true, currentSectionId, true, startDateFromStorage, endDateFromStorage);
    const TRADEINCOME = queryKor(Schet.S50, Schet.S40, TypeQuery.ODS, currentSectionId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);
    const MOVEINCOME = queryKor(Schet.S50, Schet.S50, TypeQuery.ODS, currentSectionId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);
    const MOVEOUT = queryKor(Schet.S50, Schet.S50, TypeQuery.OKS, currentSectionId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);
    const CHARGES = queryKor(Schet.S20, Schet.S50, TypeQuery.OKS, currentSectionId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);
    const FORPARTNERS = queryKor(Schet.S40, Schet.S50, TypeQuery.OKS, currentSectionId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);
    const FORFOUNDER = queryKor(Schet.S66, Schet.S50, TypeQuery.OKS, currentSectionId, undefined, mainData, true, startDateFromStorage, endDateFromStorage);
    const TDSUM = query(Schet.S50, TypeQuery.TDSUM, null, mainData, true, currentSectionId, true, startDateFromStorage, endDateFromStorage);
    const TKSUM = query(Schet.S50, TypeQuery.TKSUM, null, mainData, true, currentSectionId, true, startDateFromStorage, endDateFromStorage);

    // if ( !(PDSUM-PKSUM) && !(TRADEINCOME+MOVEINCOME) && !(CHARGES+FORPARTNERS+MOVEOUT+FORFOUNDER) 
    //     && !(PDSUM-PKSUM+TDSUM-TKSUM)) return <></>
    return (
       <>
        <tbody>
            <tr>
              <td className={styles.title}>{title}</td>
              <td>{numberValue(PDSUM-PKSUM)}</td>
              <td>{numberValue(TRADEINCOME)}</td>
              <td>{numberValue(MOVEINCOME)}</td>
              <td >{numberValue(TRADEINCOME+MOVEINCOME)}</td>
              <td>{numberValue(CHARGES)}</td>
              <td>{numberValue(FORPARTNERS)}</td>
              <td>{numberValue(MOVEOUT)}</td>
              <td>{numberValue(FORFOUNDER)}</td>
              <td>{numberValue(CHARGES+FORPARTNERS+MOVEOUT+FORFOUNDER)}</td>
              <td>{numberValue(PDSUM-PKSUM+TDSUM-TKSUM)}</td>
            </tr>
        </tbody>
      </>
    )
} 