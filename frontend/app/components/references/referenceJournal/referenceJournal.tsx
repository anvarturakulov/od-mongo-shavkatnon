'use client'
import styles from './referenceJournal.module.css'
import cn from 'classnames';
import IcoTrash from './ico/trash.svg'
import { useEffect, useRef, useState } from 'react';
import { Reference } from '../reference/reference';
import { ReferenceModel } from '../../../interfaces/reference.interface';
import useSWR from 'swr';
import { getTypeReference } from '@/app/utils/getTypeReference';
import { ReferenceJournalProps } from './referenceJournal.props';
import { useAppContext } from '@/app/context/app.context';
import { getReferenceById, markToDeleteReference } from '@/app/service/references.service';
import Header from '../../common/header/header';

export default function ReferenceJournal({className, ...props}:ReferenceJournalProps):JSX.Element {
    
    const {mainData, setMainData} = useAppContext();
    const { contentName, user } = mainData;
    const referenceType = getTypeReference(contentName);
    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/byType/'+referenceType;

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
            <Header windowFor='reference' />
            <div className={styles.newElement}>
                <Reference/>
            </div>
            <div className={styles.container} >
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.rowId}>№</th>
                            <th className={styles.name}>Номи</th>
                            {
                                referenceType == 'TMZ' &&
                                <>
                                    <th className={styles.types}>Ул. бир.</th>
                                    <th className={styles.types}>ТМБ тури</th>
                                </>
                            }
                            {
                                referenceType == 'PARTNERS' &&
                                <th className={styles.types}>Хамкор тури</th>
                            }
                            <th className={styles.comment}>Изох</th>
                            <th className={styles.rowAction}>Амал</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {data && data.length>0 && data.map((item:ReferenceModel, key:number) => (
                            <>
                                <tr 
                                    key={key+0} 
                                    onDoubleClick={() => {getReference(item._id, setMainData, token)}} 
                                    className={cn(className, {
                                            [styles.deleted]: item.deleted,
                                            [styles.trRow]: 1,
                                        })}   
                                >
                                    <td className={styles.rowId}>{key+1}</td>
                                    <td className={cn(className, {
                                            [styles.name]: 1,
                                        })}
                                    >{item.name}</td>
                                    {
                                        referenceType == 'TMZ' &&
                                        <>
                                            <td className={styles.types}>{item.unit}</td>
                                            <td className={styles.types}>{item.typeTMZ}</td>
                                        </>
                                    }
                                    {
                                        referenceType == 'PARTNERS' &&
                                        <td className={styles.types}>{item.typePartners}</td>
                                    }
                                    <td className={styles.comment}>{item.comment}</td>
                                    <td className={styles.rowAction}>
                                        <IcoTrash 
                                            // className={styles.icoTrash}
                                            className={cn(className,styles.icoTrash, {
                                                [styles.deleted]: item.deleted,
                                            })}  
                                            onClick = {() => deleteItem(item._id, item.name, token)}
                                            />
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
