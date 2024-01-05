import styles from './matOborot.module.css'
import {MatOborotProps} from './matOborot.props'
import { useEffect, useRef } from 'react';
import {useReactToPrint} from 'react-to-print'
import PrintIco from './ico/print.svg'
import { numberValue } from '@/app/service/common/converters';
import { useAppContext } from '@/app/context/app.context';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { getListSecondSubconts } from '@/app/service/reports/getListSecondSubconts';
import { query } from '@/app/service/reports/querys/query';
import useSWR from 'swr';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { Thead } from './components/thead/thead';
import { TBody } from './components/tbody/tbody';
import { getPropertySubconto } from '@/app/service/reports/getPropertySubconto';

export default function MatOborot({ className, ...props}:MatOborotProps):JSX.Element {
    
    const {mainData, setMainData} = useAppContext();
    const {reportOption, contentName, contentTitle} = mainData;
    const {startDate, startReport, endDate, entrys, firstReferenceId} = reportOption;

    const schet = Schet.S1010;
    
    const { user } = mainData;
    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/getAll/';

    const { data, mutate } = useSWR(url, (url) => getDataForSwr(url, token));

    const componentRef = useRef<HTMLInputElement>(null)
    const handlePrint = useReactToPrint({
        content : () => componentRef.current,
        documentTitle: contentTitle
    })
    
    const listSecondSubconts = getListSecondSubconts(entrys, [Schet.S1010, Schet.S2110, Schet.S2810], firstReferenceId);
    
    // useEffect(()=>{console.log(startReport)}, [startReport])
    
    if (!startReport) return <></>

    return (
        <>
            <div className={styles.container} ref={componentRef} >
                <div className={styles.titleBox}>
                    <div className={styles.organization}>{`'Шавкат Нон' хусусий корхонаси`}</div>
                    <div className={styles.title}>{`${contentTitle} буйича хисобот`}</div>
                    <div>{`Хисобот даври: ${startDate} дан ${endDate}`}</div>
                    <div><span>{getPropertySubconto(data,firstReferenceId).name}</span> буйича</div>
                </div>
                <table className={styles.table}>
                    <Thead/>
                    <tbody className={styles.tbody}>
                        <TBody listSecondSubconts={listSecondSubconts} data={data} schet={Schet.S1010}/>
                        <TBody listSecondSubconts={listSecondSubconts} data={data} schet={Schet.S2110}/>
                        <TBody listSecondSubconts={listSecondSubconts} data={data} schet={Schet.S2810}/>
                    </tbody>
                </table>
            </div>
            <PrintIco onClick={handlePrint} className={styles.ico}/>
        </>
    )
}
