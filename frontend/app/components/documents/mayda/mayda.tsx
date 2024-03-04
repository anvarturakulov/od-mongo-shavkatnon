'use client'
import { useEffect, useState } from 'react';
import { MaydaProps } from './mayda.props';
import styles from './mayda.module.css';
import { Button } from '@/app/components';
import { useAppContext } from '@/app/context/app.context';
import { saveUser } from '../doc/helpers/doc.functions';
import { DocumentModel, DocumentType } from '@/app/interfaces/document.interface';
import { getRandomID } from '@/app/service/documents/getRandomID';
import { getDefinedItemIdForReceiver, getDefinedItemIdForSender } from '../docValues/docValuesOptions';
import { Maindata } from '@/app/context/app.context.interfaces';
import axios from 'axios';
import { showMessage } from '@/app/service/common/showMessage';

export const Mayda = ({className, ...props }: MaydaProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const [count, setCount] = useState<number>(0)


    let num = getRandomID()
    let dateDoc = new Date();
    let dateStr = dateDoc.toISOString().split('T')[0]

    let definedItemIdForReceiver = '659d292d630ca82ec3dcae1c'
    let definedItemIdForSender = getDefinedItemIdForSender(mainData.user?.role, mainData.user?.storageId, DocumentType.SaleProd)
    let receiverId = definedItemIdForReceiver ? definedItemIdForReceiver : ''
    let senderId = definedItemIdForSender ? definedItemIdForSender : ''
    let analiticId = '659d2778630ca82ec3dcadf8'
    let user = mainData.user?.name ? mainData.user?.name : '' 

    let newDocument: DocumentModel = {
        date: Date.parse(dateStr),
        docNumber: num,
        documentType: DocumentType.SaleProd,
        deleted: false,
        user: user,
        senderId: senderId,
        receiverId: receiverId,
        isWorker: false,
        isPartner: false,
        isFounder: false,
        analiticId: analiticId,
        count: 0,
        balance: 0,
        price: 4000,
        total: 0,
        cashFromPartner: 0,
        comment: '',
        proveden: true
    }   
    
    const cancelSubmit = (setMainData: Function | undefined) => {
        setMainData && setMainData('showMayda', false)
    }

    const setValue = (e: React.FormEvent<HTMLInputElement>) => {
        let target = e.currentTarget;
        let value = +target.value;
        
        if (value > -1 && value < 30) setCount(value) 
        else {
            alert('Ака сони куп эмасми')
            // setCount(0)
        }
    }

    const onSubmit = (newDocument: DocumentModel, count: number, mainData: Maindata, setMainData: Function | undefined) => {
        let body:DocumentModel = {
            ...newDocument,
            count,
            total: count * newDocument.price
        }
        const { user } = mainData
        delete body._id;
  
        const config = {
            headers: { Authorization: `Bearer ${user?.access_token}` }
        };
        console.log(body.proveden)
        const uriPost = process.env.NEXT_PUBLIC_DOMAIN + '/api/document/create';
        
        axios.post(uriPost, body, config)
        .then(function (request) {
            showMessage('Янги хужжат киритилди', 'success', setMainData)
        })
        .catch(function (error) {
            if (setMainData) {
            showMessage(error.message, 'error', setMainData)
            }
        });
        setMainData && setMainData('showMayda', false)
    } 

    if (!mainData.showMayda) return <></>
    return (
        <div className={styles.container}>
            <div className={styles.maydaBox}>
                <div className={styles.label}>Сон</div>
                <input type='number' className={styles.input} onChange={(e) => setValue(e)}/>
                <div className={styles.boxBtn} >
                    <Button 
                        className={styles.button} 
                        appearance='primary'
                        onClick={() => onSubmit( newDocument, count, mainData, setMainData )}
                        > Саклаш</Button>
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