'use client'
import styles from './referenceJournal.module.css'
import cn from 'classnames';
import IcoTrash from './ico/trash.svg'
import Header from '../header/header';
import { useEffect, useRef, useState } from 'react';
import { Reference } from '../reference/reference';
import { ReferenceModel } from '@/app/interfaces/reference.interface';
import useSWR from 'swr';
import { getTypeReference } from '@/app/utils/getTypeReference';
import { ReferenceJournalProps } from './referenceJournal.props';
import { useAppContext } from '@/app/context/app.context';

export default function ReferenceJournal({className, ...props}:ReferenceJournalProps):JSX.Element {
    
    const {mainData, setMainData} = useAppContext();
    const { showReferenceWindow, contentTitle } = mainData;
    const referenceType = getTypeReference(contentTitle);

    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/byType/'+referenceType;

    const getData = async (url:string) => {
        const response = await fetch(url);
        return await response.json();
    };
    
    const { data, mutate } = useSWR(url, (url) => getData(url));

    useEffect(() => {
        mutate()
    }, [mainData.showReferenceWindow])
    return (
        <>  
            <Header/>  
            <div className={styles.newElement}>
                <Reference isNewReference={true}/>
            </div>
            <div className={styles.container} >
                <table className={styles.table}>
                    <thead className={styles.thead} key='22333'>
                        <tr key='0'>
                            <th className={styles.rowId} key='1'>№</th>
                            <th className={styles.name} key='2'>Номи</th>
                            {
                                referenceType == 'TMZ' &&
                                <>
                                    <th className={styles.types} key='3'>Ул. бир.</th>
                                    <th className={styles.types} key='5'>ТМБ тури</th>
                                </>
                            }
                            {
                                referenceType == 'PARTNERS' &&
                                <th className={styles.types} key='4'>Хамкор тури</th>
                            }
                            <th className={styles.comment} key='6'>Изох</th>
                            <th className={styles.rowAction} key='7'>Амал</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody} key='ssss'>
                        {data && data.length>0 && data.map((item:ReferenceModel, key:number) => (
                            <>
                                <tr 
                                    key={key+0} 
                                    onDoubleClick={() => {alert(item._id)}} 
                                    className={styles.trRow}    
                                >
                                    <td key={key+1} className={styles.rowId}>{key+1}</td>
                                    <td key={key+2} className={cn(className, {
                                            [styles.deleted]: item.deleted,
                                            [styles.name]: 1,
                                        })}
                                    >{item.name}</td>
                                    {
                                        referenceType == 'TMZ' &&
                                        <>
                                            <td key={key+3} className={styles.types}>{item.unit}</td>
                                            <td key={key+5} className={styles.types}>{item.typeTMZ}</td>
                                        </>
                                    }
                                    {
                                        referenceType == 'PARTNERS' &&
                                        <td key={key+4} className={styles.types}>{item.typePartners}</td>
                                    }
                                    <td key={key+6} className={styles.comment}>{item.comment}</td>
                                    <td key={key+7} className={styles.rowAction}>
                                        <IcoTrash className={styles.icoTrash}/>
                                    </td>
                                </tr>
                            </>    
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
