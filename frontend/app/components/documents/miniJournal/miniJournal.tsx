'use client'
import styles from './miniJournal.module.css'
import {MiniJournalProps} from './miniJournal.props'
import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import cn from 'classnames';
import { secondsToDateString } from '../doc/helpers/doc.functions';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { getNameReference } from './helpers/journal.functions';
import { getDescriptionDocument } from '@/app/service/documents/getDescriptionDocument';
import { DocumentModel, Interval } from '@/app/interfaces/document.interface';
import { UserRoles } from '@/app/interfaces/general.interface';


export default function MiniJournal({ className, ...props}:MiniJournalProps):JSX.Element {
    
    


    const {mainData, setMainData} = useAppContext();
    const { contentName, user } = mainData;
    const userName = user?.name

    const token = user?.access_token;
    let url = process.env.NEXT_PUBLIC_DOMAIN+'/api/document/getAll/';

    const urlReferences = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/getAll/';

    const { data : documents, mutate } = useSWR(url, (url) => getDataForSwr(url, token));
    const { data : references, mutate: mutateReferences } = useSWR(urlReferences, (urlReferences) => getDataForSwr(urlReferences, token));
    
    useEffect(() => {
        mutate()
        mutateReferences()
        setMainData && setMainData('updateDataForDocumentJournal', false);
    }, [mainData.showDocumentWindow, mainData.updateDataForDocumentJournal])

    let currentVal: string, today: number

    currentVal = (new Date()).toISOString().split('T')[0]
    today = Date.parse(currentVal)

    if (user?.role == UserRoles.TANDIR || user?.role == UserRoles.HAMIRCHI) {
        let dateNowPlussedInNumber = Date.now() + 36000000
        currentVal = (new Date(dateNowPlussedInNumber)).toISOString().split('T')[0]
        console.log('NY'+currentVal)
        today = Date.parse(currentVal)
    } 
    console.log('joriy'+currentVal)
    
    useEffect(()=> {
        // console.log('documents')
        // console.log(documents)
    }, [documents])
    // new Date(currentDocument.date) : 
    //     new Date();

    // let currentVal = dateDoc.toISOString().split('T')[0]
    

    return (
        <>
            <div className={styles.title}>Хужжатлар руйхати</div>
            {
                <div className={styles.container} >
                    <table className={styles.table}>
                        <tbody className={styles.tbody}>
                            {documents && documents.length>0 && 
                            documents
                            .filter((item:DocumentModel, key: number) => (item.date >= today && item.date <= today))
                            .filter((item:DocumentModel, key: number) => {
                                // let x
                                // if (item.user == 'Xasan' && user?.name == 'Xasan') let x= 1
                                return (item.user == user?.name)
                            })
                            .sort((a:DocumentModel, b:DocumentModel) => a.date - b.date)
                            .map((item:DocumentModel, key: number) => (
                                <>
                                    <tr 
                                        key={key} 
                                        className={cn(className, {
                                                [styles.deleted]: item.deleted,
                                                [styles.trRow]: 1,
                                            })}>
                                        <td className={cn(styles.documentType, {
                                            [styles.proveden]: item.proveden
                                        })}>
                                                {getDescriptionDocument(item.documentType)}
                                        </td>
                                        <td>{`${getNameReference(references,item.receiverId)}`}</td>
                                        <td>{getNameReference(references,item.senderId)}</td>
                                        <td className={styles.rowDate}>{secondsToDateString(item.date)}</td>
                                        <td className={cn(styles.rowSumma, styles.tdSumma)}>{item.total ? item.total:item.comment}</td>
                                        <td>{`${getNameReference(references,item.analiticId)? getNameReference(references,item.analiticId): ''} ${item.count ? `(${item.count})`: ''}`}</td>
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
