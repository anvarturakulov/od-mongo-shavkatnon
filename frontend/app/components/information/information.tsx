'use client'
import { useEffect, useState } from 'react';
import { InformationProps } from './information.props';
import styles from './information.module.css';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { getEntrysJournal } from '@/app/service/reports/getEntrysJournal';
import { Button } from '../common/button/Button';
import { Maindata } from '@/app/context/app.context.interfaces';
import { Section } from './section/section';
import { Cash } from './cash/cash';
import DateIco from './date.svg'

export const Information = ({className, ...props }: InformationProps) :JSX.Element => {
    const {mainData, setMainData} = useAppContext();
    
    const { user } = mainData;
    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/getAll/';
    const { data, mutate } = useSWR(url, (url) => getDataForSwr(url, token));
    let interval: any;
    const refreshReport = (mainData: Maindata, setMainData: Function | undefined) => {
        getEntrysJournal(setMainData, mainData);
        clearInterval(interval);
        setSeconts(0)
    }
    
    const [seconds, setSeconts] = useState(0);

    useEffect(() => {
        const tick = (num: number) => setSeconts(seconds + num);

        interval = setInterval(() => tick(1), 1000);

        const cleanup = () => {
            clearInterval(interval);
        };
        return cleanup;
    });

    const getTime= () => {
        let secondsRemain = seconds % 60
        let minutes = (seconds-secondsRemain) / 60
        let hoursRemain = seconds % 3600
        let hours = (seconds - hoursRemain) / 3600
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsRemain.toString().padStart(2, '0')}`;
    }
    
    return (
       <>
            <div className={styles.btnBox}>
                <div className={styles.timer}>
                    {getTime()}
                </div>
                <DateIco 
                    className={styles.ico}
                    onClick={(mainData: Maindata) => {
                        if (setMainData) {
                            setMainData('showIntervalWindow', true);
                            }
                        }}
                />
                <Button appearance='ghost' onClick={(e) => refreshReport(mainData, setMainData)}>Янгилаш</Button>
                
            </div>
            <Cash data={data}/>
            <Section data={data} sectionType='delivery'/>
            <Section data={data} sectionType='filial'/>
       </>
    )
} 