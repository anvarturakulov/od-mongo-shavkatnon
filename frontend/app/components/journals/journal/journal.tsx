'use client'
import styles from './journal.module.css'
import IcoTrash from './ico/trash.svg'
import IcoSave from './ico/save.svg'
import {JournalProps} from './journal.props'
import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import cn from 'classnames';
import Header from '../../common/header/header';
import { Doc } from '../../documents/doc/doc';
import { secondsToDateString } from '../../documents/doc/helpers/doc.functions';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { deleteItemDocument, getDocument, getNameReference, setProvodkaToDoc } from '../helpers/journal.functions';
import { getDescriptionDocument } from '@/app/service/documents/getDescriptionDocument';
import { DocumentModel, Interval } from '@/app/interfaces/document.interface';
import { getDateFromStorageExceptNull } from '@/app/service/documents/getDateFromStorageExceptNull';
import { dashboardUsersList } from '@/app/interfaces/general.interface';


export default function Journal({ className, ...props}:JournalProps):JSX.Element {
    
    let dateStartInString = getDateFromStorageExceptNull(localStorage.getItem('dateStartToInterval'));
    let dateEndInString = getDateFromStorageExceptNull(localStorage.getItem('dateEndToInterval'));
    
    let dateStartInNumber = Date.parse(dateStartInString)
    let dateEndInNumber = Date.parse(dateEndInString) +86399999
    
    const {mainData, setMainData} = useAppContext();
    const { contentName, user, showDocumentWindow } = mainData;
    const role = mainData.user?.role;
    const dashboardUsers = role && dashboardUsersList.includes(role);

    const token = user?.access_token;
    let url = process.env.NEXT_PUBLIC_DOMAIN+'/api/document/byType/'+contentName;
    
    if (contentName) {
    let url = process.env.NEXT_PUBLIC_DOMAIN+'/api/document/getAll/';
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
            {dashboardUsers && <Header windowFor='document'/>}  
            <div className={styles.newElement}>
                {showDocumentWindow && <Doc/>}
            </div>
            {
                dashboardUsers && 
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
                                <th key='11' className={styles.rowAction}>Амал</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {documents && documents.length>0 && 
                            documents
                            .filter((item:DocumentModel, key: number) => (item.date >= dateStartInNumber && item.date <= dateEndInNumber))
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
                                        <td className={cn(styles.documentType, {
                                                [styles.proveden]: item.proveden
                                            })}>
                                                {getDescriptionDocument(item.documentType)}
                                        </td>
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
                                        <td className={styles.rowAction}>
                                            <IcoSave className={styles.icoSave}
                                            onClick = {() => setProvodkaToDoc(item._id, token, item.proveden ,setMainData, mainData, item.receiverId)}
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
