'use client'
import { useEffect, useState } from 'react';
import { DocProps } from './doc.props';
import styles from './doc.module.css';
import { Button, DocValues, Info } from '@/app/components';
import { useAppContext } from '@/app/context/app.context';
import { InputForData } from '../inputs/inputForData/inputForData';
import { cancelSubmit, onSubmit, saveUser } from './helpers/doc.functions';
import { notAdmins } from '@/app/service/common/users';

export const Doc = ({className, ...props }: DocProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const [definedValues, setDefinedValues] = useState({receiverId:'',senderId:''})
    const { contentTitle, currentDocument, isNewDocument } = mainData;
    
    useEffect(() => {
        if (!currentDocument.user) {
            saveUser(setMainData, mainData)
        }
    },[])

    return (
        <div className={styles.docBox}>
            <div className={styles.infoBox}>
                <div className={styles.dataBox}>
                    <InputForData label={contentTitle}/>
                    <Info content={currentDocument.docNumber.toString()} label='№' className={styles.docNumber}/>
                </div>
            </div>

            <DocValues setDefinedValues={setDefinedValues}/>
            <div className={styles.boxBtn}>
                {
                (currentDocument.deleted || notAdmins(mainData.user)) &&
                   <>
                    <Button className={styles.button} appearance='primary' onClick={() => 
                        onSubmit( mainData, setMainData, definedValues)}>
                            Саклаш
                    </Button>
                    <Button className={styles.button} appearance='ghost' onClick={() => cancelSubmit(setMainData, mainData)}>Бекор килиш</Button>
                   </> 
                }
            </div>
        </div>   
    )
} 