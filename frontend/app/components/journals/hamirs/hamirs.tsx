'use client'
import styles from './hamirs.module.css'
import { HamirsProps } from './hamirs.props'
import { useEffect } from 'react';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import cn from 'classnames';
import { secondsToDateString } from '../../documents/doc/helpers/doc.functions';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { HamirModel } from '@/app/interfaces/hamir.interface';
import { createHamirsForDayByUser } from '@/app/service/documents/createHamirsForDayByUser';
import { SelectForHamirs } from './selectForHamirs/selectForHamirs';
import { Maindata } from '@/app/context/app.context.interfaces';
import { getNameReference } from '../helpers/journal.functions';
import { TypeReference } from '@/app/interfaces/reference.interface';
import { changeStatusHamir } from '@/app/service/documents/changeStatusHamir';


export default function Hamirs({ className, ...props} : HamirsProps ):JSX.Element {
    
    const {mainData, setMainData} = useAppContext();
    const { contentName, user } = mainData;
    const userName = user?.name
    
    let dateNowPlussedInNumber = Date.now() + 14400000
    let dateNowPlussedInString = new Date(dateNowPlussedInNumber);
    let dateStr = dateNowPlussedInString.toISOString().split('T')[0]

    const token = user?.access_token;
    let url = process.env.NEXT_PUBLIC_DOMAIN+'/api/hamir/getForDate/'+dateStr;
    const { data : hamirs, mutate } = useSWR(url, (url) => getDataForSwr(url, token));
    
    const urlReferences = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/byType/'+TypeReference.STORAGES;
    const { data : references, mutate: mutateReferences } = useSWR(urlReferences, (urlReferences) => getDataForSwr(urlReferences, token));

    useEffect(() => {
        mutate()
        setMainData && setMainData('updateHamirJournal', false);
    }, [mainData.updateHamirJournal])

    const createHamirs = (date: number, userName: string | undefined, mainData: Maindata, setMainData: Function | undefined) => {
        if (date && userName) {
            createHamirsForDayByUser(date, mainData, setMainData);
            setMainData && setMainData('updateHamirJournal', true)
        } 
    }

    const refresh = () => mutate()
    let visibilityFillBtn = true

    if (hamirs && hamirs.length) {
        visibilityFillBtn = !hamirs.filter((item: HamirModel)=> {
            return (
                    item.sectionId == user?.storageId &&
                    item.user == user?.name
                )
        }).length
    }

    const sendHamir = (item: HamirModel, mainDate: Maindata, setMainData: Function | undefined) => {
        if (confirm(`${item.order} - хамирни цехга бердингизми`)) {
            changeStatusHamir(item, mainData, setMainData)
            setMainData && setMainData('updateHamirJournal', true)
        }
    }
    return (
        <>
            <div className={styles.title}>Хамирлар руйхати</div>
            {
                <div className={styles.container} >
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr key='0'>
                                <th key='2' className={styles.date}>Сана</th>
                                <th key='4' className={styles.order}>Хамир тартиби</th>
                                <th key='5' className={styles.section} >Булим</th>
                                <th key='6' className={styles.action}>Амал</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {hamirs && hamirs.length>0 && 
                            hamirs
                            .filter((item:HamirModel, key: number) => {
                                return (item.user == user?.name)
                            })
                            .filter((item:HamirModel) => {
                                return (
                                    item.sectionId == user?.storageId
                                    &&
                                    item.user == user.name
                                )
                            })
                            .sort((a:HamirModel, b:HamirModel) => {
                               if (a.order && b.order) {
                                return a?.order - b?.order
                               }
                            })
                            .map((item:HamirModel, key: number) => (
                                <>
                                    <tr 
                                        key={key} 
                                        className={cn(styles.trRow, {
                                                [styles.proveden]: item.proveden,
                                            })}>
                                        <td className={styles.date}>{secondsToDateString(item.date)}</td>
                                        <td className={styles.order}>{`-- ${item.order} --` }</td>
                                        <td className={styles.section}>{getNameReference(references,item.sectionId)}</td>
                                        
                                        <td className={styles.action}>
                                            <button className={cn(styles.sendBtn, {
                                                                [styles.notVisible]: item.proveden,
                                                              })}
                                                    onClick={() => sendHamir(item, mainData, setMainData)}
                                            >Жунатиш</button>
                                        </td>
                                    </tr>
                                </>    
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            <div className={styles.box}>
                {
                    visibilityFillBtn &&
                    <button className={styles.button} onClick={() => createHamirs(dateNowPlussedInNumber, userName, mainData, setMainData)}>Янги кун учун тулдириш</button>
                }
                <button className={styles.button} onClick={refresh}>Янгилаш</button>
            </div>
       
        </>
    )
}
