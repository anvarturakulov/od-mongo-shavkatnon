'use client'
import styles from './journal.module.css'
import {JournalProps} from './journal.props'
import Header from '../header/header';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/app.context';
import { Doc } from '../doc/doc';
import useSWR from 'swr';


export default function Journal({ className, ...props}:JournalProps):JSX.Element {

    const {mainData, setMainData} = useAppContext();
    const { contentName, user } = mainData;
    const referenceType = getTypeReference(contentName);
    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/document/byType/'+referenceType;

    const getData = async (url:string, token: string | undefined) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await fetch(url, config);
        return await response.json();
    };
    
    const { data, mutate } = useSWR(url, (url) => getData(url, token));

    useEffect(() => {
        mutate()
        setMainData && setMainData('updateDataForRefenceJournal', false);
    }, [mainData.showReferenceWindow, mainData.updateDataForRefenceJournal])

    const deleteItem = (id: string | undefined, name: string, token: string | undefined) => {
        markToDeleteReference(id, name,setMainData, token)
    }

    const getReference = async (
                                id: string | undefined,
                                setMainData: Function | undefined,
                                token: string | undefined
                            ) => {
        if (id) {
            const reference = await getReferenceById(id, setMainData, token);
        }
        setMainData && setMainData('isNewReference', false);
    }

    return (
        <>
            <Header/>  
            <div className={styles.newElement}>
                <Doc/>
            </div>
            <div className={styles.container} >
                {/* <div>{mainData.menu.contentType}</div> */}
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr key='0'>
                            <th key='1' className={styles.rowId}>_id </th>
                            <th key='2' className={styles.rowDate}>Сана</th>
                            <th key='3'>Хужжат холати</th>
                            <th key='4'>Хужжат тури</th>
                            <th key='5' className={styles.rowSumma}>Сумма</th>
                            <th key='6'>Олувчи</th>
                            <th key='7'>Берувчи</th>
                            <th key='8'>Изох 2</th>
                            <th key='9' className={styles.rowAction}>Амал</th>
                        </tr>
                    </thead>
                    {/* <tbody className={styles.tbody}>
                        {documents?.map((item, key) => (
                            <>
                                <tr 
                                    key={key} 
                                    onDoubleClick={() => {alert(item.receiverId)}} 
                                    className={styles.trRow}    
                                >
                                    <td className={styles.rowId}>{item._id}</td>
                                    <td className={styles.rowDate}>{item.date}</td>
                                    <td
                                        className={cn(className, {
                                            [styles.deleted]: item.state == DocumentState.Deleted,
                                            [styles.proveden]: item.state == DocumentState.Proveden,
                                            [styles.error]: item.state == DocumentState.Error,
                                            [styles.saved]: item.state == DocumentState.Saved,
                                        })}
                                    >{item.state}</td>
                                    <td
                                        className={cn(className, {
                                            [styles.error]: item.documentType == DocumentType.Error,
                                        })}
                                    >{item.documentType}</td>
                                    <td className={cn(styles.rowSumma, styles.tdSumma)}>1.200.000</td>
                                    <td>{item.senderId}</td>
                                    <td>{item.receiverId}</td>
                                    <td>Изох</td>
                                    <td className={styles.rowAction}>
                                        <IcoTrash className={styles.icoTrash}/>
                                    </td>
                                </tr>
                            </>    
                        ))}
                    </tbody> */}
                </table>
            </div>
        </>
    )
}
