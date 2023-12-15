'use client'
import styles from './referenceWindow.module.css'
import cn from 'classnames';
import {ReferenceWindowProps} from './referenceWindow.props'
import { DocumentState, DocumentType } from '../../interfaces/documents/mainDocument.interface';
import IcoTrash from './ico/trash.svg'
import Header from '../header/header';
import { useEffect, useRef, useState } from 'react';
import { Reference } from '../reference/reference';
import { ReferencesData } from '@/app/data';
import { ReferenceModel } from '@/app/interfaces/reference.interface';
import useSWR from 'swr';
import { getTypeReference } from '@/app/utils/getTypeReference';

export default function ReferenceWindow({ contentTitle, contentType, className, ...props}:ReferenceWindowProps):JSX.Element {
    
    const endpoint = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/byType/'+getTypeReference(contentTitle);

    const getData = async () => {
        const response = await fetch(endpoint);
        return await response.json();
    };
    
    const [visibilityNewElement, setVisibilityNewElement] = useState<boolean>(false)

    useEffect(()=> {
        setVisibilityNewElement(false)
    }, [contentTitle])

    const { data, error } = useSWR(endpoint, getData);
    
    return (
        <>  
            <Header contentType={contentType} contentTitle={contentTitle} setVisibilityNewElement={setVisibilityNewElement} visibilityNewElement={visibilityNewElement}/>  
            <div className={styles.newElement}>
                {visibilityNewElement && <Reference referenceTitle={contentTitle} isNewReference={true}/>}
            </div>
            <div className={styles.container} >
                <table className={styles.table}>
                    <thead className={styles.thead} key='22333'>
                        <tr key='0'>
                            <th className={styles.rowId} key='1'>№</th>
                            <th className={styles.name} key='2'>Номи</th>
                            <th className={styles.types} key='3'>Ул. бир.</th>
                            <th className={styles.types} key='4'>Хамкор тури</th>
                            <th className={styles.types} key='5'>ТМБ тури</th>
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
                                    <td key={key+3} className={styles.types}>{item.unit}</td>
                                    <td key={key+4} className={styles.types}>{item.typePartners}</td>
                                    <td key={key+5} className={styles.types}>{item.typeTMZ}</td>
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
