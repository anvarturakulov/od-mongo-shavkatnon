'use client'
import { useEffect, useState } from 'react';
import { MaydaProps } from './mayda.props';
import styles from './mayda.module.css';
import { Button } from '@/app/components';
import { useAppContext } from '@/app/context/app.context';
import { saveUser } from '../doc/helpers/doc.functions';

export const Mayda = ({className, ...props }: MaydaProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const [definedValues, setDefinedValues] = useState({receiverId:'',senderId:''})
    const { contentTitle, currentDocument } = mainData;
    
    useEffect(() => {
        if (!currentDocument.user) {
            saveUser(setMainData, mainData)
        }
    },[])

    const cancelSubmit = (setMainData: Function | undefined) => {
        setMainData && setMainData('showMayda', false)
    }

    if (!mainData.showMayda) return <></>
    return (
        <div className={styles.container}>
            <div className={styles.maydaBox}>
                <div className={styles.label}>Сон</div>
                <input type='number' className={styles.input}/>
                <div className={styles.boxBtn} >
                    <Button className={styles.button} appearance='primary' > Саклаш</Button>
                    <Button className={styles.button} appearance='ghost' onClick={() => cancelSubmit(setMainData)}>Бекор килиш</Button>
                </div>
            </div>
            
            {/* <DocValues setDefinedValues={setDefinedValues}/> */}
            {/* <div className={styles.boxBtn}>
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
            </div> */}
        </div>   
    )
} 