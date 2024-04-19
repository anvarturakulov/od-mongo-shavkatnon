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
import { dateNumberToString } from '@/app/service/common/converterForDates'


interface FilterForJournal {
    summa: string,
    receiver: string,
    sender: string,
    comment: string,
    user: string
}
    
const defaultFilter: FilterForJournal = {
    summa: 'Сумма',
    receiver: 'Олувчи',
    sender: 'Берувчи',
    comment: 'Изох',
    user: 'Фойдаланувчи'
}

export default function Journal({ className, ...props}:JournalProps):JSX.Element {
    
    const {mainData, setMainData} = useAppContext();
    const {dateStart, dateEnd} = mainData.interval;
    let dateStartForUrl = dateStart
    let dateEndForUrl = dateEnd

    if (!dateStart && !dateEnd) {
        let now = Date.now()+18000000
        let nowInstr = dateNumberToString(now)
        dateStartForUrl = Date.parse(nowInstr)
        dateEndForUrl = Date.parse(nowInstr) + 86399999
    }
    
    const [filter, setFilter] = useState<FilterForJournal>(defaultFilter);

    const { contentName, user, showDocumentWindow } = mainData;
    const role = mainData.user?.role;
    const dashboardUsers = role && dashboardUsersList.includes(role);

    const token = user?.access_token;
    let url = process.env.NEXT_PUBLIC_DOMAIN+'/api/document/byTypeForDate'+'?documentType='+contentName+'&dateStart='+dateStartForUrl+'&dateEnd='+dateEndForUrl;
    
    if (!contentName) {
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

    const changeFilter = (target: string) => {
        let title: string = '';
        let defaulValue: string = '';
        if (target == 'summa') {
            title = 'Хужжат суммаси ?';
            defaulValue = 'Сумма';
        }
        if (target == 'receiver') {
            title = 'Олувчи ?';
            defaulValue = 'Олувчи';
        }
        if (target == 'sender') {
            title = 'Берувчи ?';
            defaulValue = 'Берувчи';
        }
        if (target == 'comment') {
            title = 'Изох ?'; 
            defaulValue = 'Изох';
        }
        if (target == 'user') {
            title = 'Фойдаланувчи ?';
            defaulValue = 'Фойдаланувчи';
        }
        
        let currentValue;
        if (target == 'summa') currentValue = Number(prompt(title))
        else currentValue = prompt(title)
        
        if (currentValue == '') currentValue = defaulValue

        setFilter(filter => {
            let newObj = {...filter}
            return {
                ...newObj,
                [target] : currentValue
            }
        })
    }   

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
                                <th key='5' 
                                    onDoubleClick={() => changeFilter('summa')} 
                                    className={cn(styles.rowSumma, {
                                        [styles.red]: filter.summa != 'Сумма'
                                    })}
                                    >{filter.summa}
                                </th>
                                <th key='6' 
                                    onDoubleClick={() => changeFilter('receiver')}
                                    className={cn(styles.longRow, {
                                        [styles.red]: filter.receiver != 'Олувчи'
                                    })}    
                                    >{filter.receiver}
                                </th>
                                <th key='7' 
                                    onDoubleClick={() => changeFilter('sender')}
                                    className={cn(styles.longRow, {
                                        [styles.red]: filter.sender != 'Берувчи'
                                    })}
                                    >{filter.sender}
                                </th>
                                <th key='8' 
                                    onDoubleClick={() => changeFilter('comment')}
                                    className={cn(styles.longRow, {
                                        [styles.red]: filter.comment != 'Изох'
                                    })}
                                >{filter.comment}</th>
                                <th key='9' 
                                    onDoubleClick={() => changeFilter('user')}
                                    className={cn(styles.longRow, {
                                        [styles.red]: filter.user != 'Фойдаланувчи'
                                    })}
                                    >{filter.user}
                                </th>
                                <th key='10' className={styles.rowAction}>Амал</th>
                                <th key='11' className={styles.rowAction}>Амал</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {documents && documents.length>0 && 
                            documents
                            .sort((a:DocumentModel, b:DocumentModel) => a.date - b.date)
                            .filter((item:DocumentModel) => {
                                const {user} = filter
                                if (user != 'Фойдаланувчи') {
                                    if (item.user.toLowerCase().includes(user)) return true
                                } else return true
                            })
                            .filter((item:DocumentModel) => {
                                const {comment} = filter
                                if (comment != 'Изох') {
                                    if (item.comment && (item.comment+getNameReference(references,item.analiticId)).toLowerCase().includes(comment)) return true
                                } else return true
                            })
                            .filter((item:DocumentModel) => {
                                const {sender} = filter
                                const itemSender = getNameReference(references,item.senderId)
                                if (sender != 'Берувчи') {
                                    if (itemSender && itemSender.toLowerCase().includes(sender)) return true
                                } else return true
                            })
                            .filter((item:DocumentModel) => {
                                const {receiver} = filter
                                const itemReceiver = getNameReference(references,item.receiverId)
                                if (receiver != 'Олувчи') {
                                    if (itemReceiver && itemReceiver.toLowerCase().includes(receiver)) return true
                                } else return true
                            })
                            .filter((item:DocumentModel) => {
                                const {summa} = filter
                                if (summa != 'Сумма') {
                                    if (item.total == +summa) return true
                                } else return true
                            })
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
