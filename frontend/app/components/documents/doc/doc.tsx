'use client'
import { useEffect, useState } from 'react';
import { DocProps } from './doc.props';
import styles from './doc.module.css';
import cn from 'classnames';
import { Button, DocValues, Info } from '@/app/components';
import { useAppContext } from '@/app/context/app.context';
import { InputForData } from '../inputs/inputForData/inputForData';
import { cancelSubmit, onSubmit, saveDocumentType, saveNumber } from './helpers/doc.functions';
import { getEntrysJournal } from '@/app/service/reports/getEntrysJournal';


export const Doc = ({className, ...props }: DocProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const [numberDoc, setNumberDoc] = useState<number>(0);
    const { contentTitle, currentDocument, isNewDocument } = mainData;
    
    
    useEffect(()=>{
        if (isNewDocument) {
            getEntrysJournal(setMainData, mainData, currentDocument.date);
        }
    },[currentDocument.date, currentDocument.values.senderId])

    useEffect(() => {
        if (currentDocument.docNumber == 0) {
            saveNumber(setNumberDoc, setMainData, mainData)   
        } else {
            setNumberDoc(currentDocument.docNumber);
        }
    },[])

    useEffect(() => {
        if (currentDocument.docNumber != 0) {
            saveDocumentType(setMainData, mainData);
        }
    },[currentDocument.docNumber])

    return (
        <div className={styles.docBox}>
            <div className={styles.infoBox}>
                <div className={styles.dataBox}>
                    <InputForData label={contentTitle}/>
                    <Info content={numberDoc.toString()} label='№' className={styles.docNumber}/>
                </div>
            </div>

            <DocValues/>

            <div className={styles.boxBtn}>
                <Button appearance='primary' onClick={() => 
                    onSubmit( mainData, setMainData )}
                    >Саклаш</Button>
                <Button appearance='ghost' onClick={() => cancelSubmit(setMainData)}>Бекор килиш</Button>
            </div>
        </div>   
    )
} 