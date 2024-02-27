'use client'
import styles from './journal.module.css'
import IcoTrash from './ico/trash.svg'
import {JournalProps} from './journal.props'
import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import cn from 'classnames';
import Header from '../../common/header/header';
import { Doc } from '../doc/doc';
import { secondsToDateString } from '../doc/helpers/doc.functions';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { deleteItemDocument, getDocument, getNameReference, getTotalValueForDocument } from './helpers/journal.functions';
import { getDescriptionDocument } from '@/app/service/documents/getDescriptionDocument';
import { DocumentModel, Interval } from '@/app/interfaces/document.interface';
import { getDateFromStorageExceptNull } from '@/app/service/documents/getDateFromStorageExceptNull';
import { dashboardUsersList } from '@/app/interfaces/general.interface';


export default function Journal({ className, ...props}:JournalProps):JSX.Element {
    
    let dateStart = getDateFromStorageExceptNull(localStorage.getItem('dateStartToInterval'));
    let dateEnd = getDateFromStorageExceptNull(localStorage.getItem('dateEndToInterval'));
   
    // console.log(Date.parse(dateStart))

    const {mainData, setMainData} = useAppContext();
    const { contentName, user, showDocumentWindow } = mainData;
    const role = mainData.user?.role;
    const admins = role && dashboardUsersList.includes(role);

    // const [interval, setInterval] = useState<Interval>({dateStart, dateEnd})
    
    const token = user?.access_token;
    let url = process.env.NEXT_PUBLIC_DOMAIN+'/api/document/byType/'+contentName;
    
    if (!contentName) {
        url = process.env.NEXT_PUBLIC_DOMAIN+'/api/document/getAll/';
    }

    const urlReferences = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/getAll/';

    const { data : documents, mutate } = useSWR(url, (url) => getDataForSwr(url, token));
    const { data : references, mutate: mutateReferences } = useSWR(urlReferences, (urlReferences) => getDataForSwr(urlReferences, token));

    
    useEffect(() => {
        mutate()
        mutateReferences()
        setMainData && setMainData('updateDataForDocumentJournal', false);
    }, [mainData.showDocumentWindow, mainData.updateDataForDocumentJournal])

    return (
        <>
            {admins && <Header windowFor='document'/>}  
            <div className={styles.newElement}>
                {showDocumentWindow && <Doc/>}
            </div>
            {
                admins && 
                <div className={styles.container} >
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr key='0'>
                                <th key='1' className={styles.rowId}>Раками </th>
                                <th key='2' className={styles.rowDate}>Сана</th>
                                <th key='4'>Хужжат тури</th>
                                <th key='5' className={styles.rowSumma}>Сумма</th>
                                <th key='6'>Олувчи</th>
                                <th key='7'>Берувчи</th>
                                <th key='8'>Изох</th>
                                <th key='9'>Фойдаланувчи</th>
                                <th key='10' className={styles.rowAction}>Амал</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {documents && documents.length>0 && 
                            documents
                            .filter((item:DocumentModel, key: number) => (item.date >= Date.parse(dateStart) && item.date <= Date.parse(dateEnd)))
                            .sort((a:DocumentModel, b:DocumentModel) => a.date - b.date)
                            .map((item:DocumentModel, key: number) => (
                                <>
                                    <tr 
                                        key={key} 
                                        className={cn(className, {
                                                [styles.deleted]: item.deleted,
                                                [styles.trRow]: 1,
                                            })}
                                        onDoubleClick={() => {getDocument(item._id, setMainData, token)}}    
                                    >
                                        <td className={styles.rowId}>{item.docNumber}</td>
                                        <td className={styles.rowDate}>{secondsToDateString(item.date)}</td>
                                        <td>{getDescriptionDocument(item.documentType)}</td>
                                        <td className={cn(styles.rowSumma, styles.tdSumma)}>{item.total}</td>
                                        <td>{getNameReference(references,item.receiverId)}</td>
                                        <td>{getNameReference(references,item.senderId)}</td>
                                        <td>{`${getNameReference(references,item.analiticId)? getNameReference(references,item.analiticId): ''} ${item.comment ? `(${item.comment})`: ''} ${item.count ? `(${item.count})`: ''}`}</td>
                                        <td>{item.user}</td>
                                        <td className={styles.rowAction}>
                                            <IcoTrash className={styles.icoTrash}
                                            onClick = {() => deleteItemDocument(item._id, token, setMainData, mainData)}
                                            />
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
