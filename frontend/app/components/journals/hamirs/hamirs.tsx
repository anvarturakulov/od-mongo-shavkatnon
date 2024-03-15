'use client'
import styles from './miniJournal.module.css'
import { HamirsProps } from './hamirs.props'
import { use, useEffect } from 'react';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import cn from 'classnames';
import { secondsToDateString } from '../../documents/doc/helpers/doc.functions';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { HamirModel } from '@/app/interfaces/hamir.interface';
import { User } from '@/app/interfaces/general.interface';
import { createHamirsForDayByUser } from '../../../service/documents/hamirs';

export default function MiniJournal({ className, ...props} : HamirsProps ):JSX.Element {
    
    const {mainData, setMainData} = useAppContext();
    const { contentName, user } = mainData;
    const userName = user?.name
    
    let dateNowPlussedInNumber = Date.now() + 14400000
    let dateNowPlussedInString = new Date(dateNowPlussedInNumber);
    let dateStr = dateNowPlussedInString.toISOString().split('T')[0]

    const token = user?.access_token;
    let url = process.env.NEXT_PUBLIC_DOMAIN+'/api/hamir/getForDate/'+dateStr;
    const { data : hamirs, mutate } = useSWR(url, (url) => getDataForSwr(url, token));
    
    useEffect(() => {
        mutate()
        setMainData && setMainData('updateHamirJournal', false);
    }, [mainData.updateHamirJournal])

    const createHamirs = (date: number, userName: string | undefined) => {
        if (date && userName) {
            createHamirsForDayByUser(date);
        } 
    }

    return (
        <>
            <div className={styles.title}>Хамирлар руйхати</div>
            
            <button onClick={() => createHamirs(dateNowPlussedInNumber, userName)}>Янги кун учун хамирларни тулдириш</button>
            {
                <div className={styles.container} >
                    <table className={styles.table}>
                        <tbody className={styles.tbody}>
                            {hamirs && hamirs.length>0 && 
                            hamirs
                            .filter((item:HamirModel, key: number) => {
                                return (item.user == user?.name)
                            })
                            .sort((a:HamirModel, b:HamirModel) => a.date - b.date)
                            .map((item:HamirModel, key: number) => (
                                <>
                                    <tr 
                                        key={key} 
                                        className={cn(className, {
                                                [styles.proveden]: item.proveden,
                                                [styles.trRow]: 1,
                                            })}>
                                        <td className={styles.rowDate}>{secondsToDateString(item.date)}</td>
                                        <td className={styles.rowDate}>{`${item.order} хамир` }</td>
                                        <td>
                                            <button>Жунатиш</button>
                                        </td>
                                    </tr>
                                </>    
                            ))}
                        </tbody>
                    </table>
                </div>
            }
       
        </>
    )
}
