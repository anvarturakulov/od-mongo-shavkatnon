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


export default function ReferenceWindow({ contentTitle, contentType, className, ...props}:ReferenceWindowProps):JSX.Element {
    
    const [visibilityNewElement, setVisibilityNewElement] = useState<boolean>(false)
    useEffect(()=> {
        setVisibilityNewElement(false)
    }, [contentTitle])

    const references = ReferencesData

    return (
        <>
            <Header contentType={contentType} contentTitle={contentTitle} setVisibilityNewElement={setVisibilityNewElement} visibilityNewElement={visibilityNewElement}/>  
            <div className={styles.newElement}>
                {visibilityNewElement && <Reference referenceType={contentTitle}/>}
            </div>
            <div className={styles.container} >
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.rowId}>_id</th>
                            <th className={styles.name}>name</th>
                            <th className={styles.types}>unit</th>
                            <th className={styles.types}>typePartners</th>
                            <th className={styles.types}>typeTMZ</th>
                            <th className={styles.comment}>comment</th>
                            <th className={styles.rowAction}>Амал</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {references?.map((item, key) => (
                            <>
                                <tr 
                                    key={key} 
                                    onDoubleClick={() => {alert(item._id)}} 
                                    className={styles.trRow}    
                                >
                                    <td className={styles.rowId}>{item._id}</td>
                                    <td className={cn(className, {
                                            [styles.deleted]: item.deleted,
                                            [styles.name]: 1,
                                        })}
                                    >{item.name}</td>
                                    <td className={styles.types}>{item.unit}</td>
                                    <td className={styles.types}>{item.typePartners}</td>
                                    <td className={styles.types}>{item.typeTMZ}</td>
                                    <td className={styles.comment}>{item.comment}</td>
                                    <td className={styles.rowAction}>
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
