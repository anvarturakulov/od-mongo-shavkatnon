'use client'
import { useEffect, useState } from 'react';
import { RefreshPanelProps } from './resfreshPanel.props';
import styles from './refreshPanel.module.css';
import { useAppContext } from '@/app/context/app.context';
import { getEntrysJournal } from '@/app/service/reports/getEntrysJournal';
import { Button } from '../../common/button/Button';
import { Maindata } from '@/app/context/app.context.interfaces';
import DateIco from './date.svg'
import { dateNumberToString } from '@/app/service/common/converterForDates';

export const RefreshPanel = ({className, ...props }: RefreshPanelProps) :JSX.Element => {
    const {mainData, setMainData} = useAppContext();
    const {dateStart, dateEnd} = mainData.interval

    const refreshReport = (mainData: Maindata, setMainData: Function | undefined) => {
        setMainData && setMainData('updateDataForDocumentJournal', true)
        getEntrysJournal(setMainData, mainData,true);
        // clearInterval(interval);
        // setSeconts(0)
    }
    
    // const [seconds, setSeconts] = useState(0);

    // useEffect(() => {
    //     const tick = (num: number) => setSeconts(seconds + num);
    //     interval = setInterval(() => tick(1), 1000);
    //     const cleanup = () => {
    //         clearInterval(interval);
    //     };
    //     return cleanup;
    // });

    // const getTime= () => {
    //     let secondsRemain = seconds % 60
    //     let minutes = (seconds-secondsRemain) / 60
    //     let hoursRemain = seconds % 3600
    //     let hours = (seconds - hoursRemain) / 3600
    //     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsRemain.toString().padStart(2, '0')}`;
    // }
    let dateStartInStr = dateNumberToString(dateStart)
    let dateEndInStr = dateNumberToString(dateEnd)
    return (
       <>
            <div className={styles.btnBox}>
                {/* <div className={styles.timer}>
                    {getTime()}
                </div> */}
                {
                    <div>{`оралик сана: ${dateStartInStr} дан ${dateEndInStr} гача`}</div>
                }
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
       </>
    )
} 