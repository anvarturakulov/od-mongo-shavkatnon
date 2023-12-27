'use client'
import { useEffect, useState } from 'react';
import { DocProps } from './doc.props';
import styles from './doc.module.css';
import cn from 'classnames';
import { Button, Info, Input, DocTable, SelectReferenceInForm } from '@/app/components';
import AddIco from './ico/add.svg'
import { DocTableItem, DocumentBody, DocumentType, OptionsForDocument } from '../../../interfaces/document.interface';
import { TypeReference } from '../../../interfaces/reference.interface';
import { getOptionOfDocumentElements } from '@/app/utils/getOptionOfDocumentElements';
import { useAppContext } from '@/app/context/app.context';
import { getRandomID } from '@/app/utils/getRandomID';
import { defaultDocumentFormItems, defaultDocumentTableItem } from '@/app/context/app.context.constants';
import { InputInForm } from '../inputs/inputInForm/inputInForm';
import { InputForData } from '../inputs/inputForData/inputForData';
import { addItems, cancelSubmit, onSubmit, saveNumber } from './helpers/doc.functions';


export const Doc = ({className, ...props }: DocProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const [numberDoc, setNumberDoc] = useState<number>(0);
    const {user, contentName, contentType, contentTitle, docTable, currentDocument} = mainData;
    
    let options: OptionsForDocument = getOptionOfDocumentElements(contentName)
    let hasWorkers = (contentName == DocumentType.LeaveCash || contentName == DocumentType.ZpCalculate)
    let defaultNewItemForTable = {...defaultDocumentTableItem}

    const defaultBody: DocumentBody = {
        date: 0,
        docNumber: 0,
        senderId: '',
        receiverId: '',
        tableItems: [{...defaultDocumentTableItem}],
        documentType: '',
        payValue: 0,
    }

    const [body, setBody] = useState<DocumentBody>(defaultBody) 

    useEffect(() => {
        if (currentDocument.docNumber == 0) {
            saveNumber(setNumberDoc, setMainData, mainData)   
        } else {
            setNumberDoc(currentDocument.docNumber);
        }
    },[])

    return (
            <div className={styles.docBox}>
                <div className={styles.infoBox}>
                    <InputForData label='Сана'/>
                    <Info content={numberDoc.toString()} label='Номер'/>
                    <Info content={contentTitle} label='Хужжат тури'/>
                </div>

                <div className={styles.partnersBox}>
                    <SelectReferenceInForm 
                        label={options.receiverLabel} 
                        typeReference={options.receiverType}
                        visibile={options.recieverIsVisible}
                        currentItemId={currentDocument?.receiverId}
                        type='receiver'
                    />
                    
                    <SelectReferenceInForm 
                        label={options.senderLabel} 
                        typeReference={options.senderType}
                        visibile={options.senderIsVisible}
                        currentItemId={currentDocument?.senderId}
                        type='sender'
                    />
                    
                    <InputInForm 
                        label={options.paymentLabel}
                        type='number' 
                        visible={options.paymentIsVisible}
                        payValue = {currentDocument.payValue}
                    />
                    
                </div>
                
            {options.tableIsVisible && 
                <DocTable 
                    typeReference={contentName == DocumentType.LeaveCash ? TypeReference.CHARGES : TypeReference.TMZ}
                    hasWorkers={hasWorkers}
                    items={docTable.items} 
            />}
            
            <div className={styles.paybox}>
                <Input placeholder='Кушимча изох' label={''}/>
                {options.tableIsVisible && 
                    <div className={cn(styles.add, {[styles.notView] : false == false})}>
                        <AddIco onClick={() => addItems(setMainData, defaultNewItemForTable, docTable.items)}/>
                    </div>
                }
            </div>

            <div className={styles.boxBtn}>
                <Button appearance='primary' onClick={() => 
                    onSubmit(body, 
                             mainData.currentReference?._id, 
                             typeReference, 
                             isNewReference,
                             setMainData,
                             user?.access_token)}
                    >Саклаш</Button>
                <Button appearance='ghost' onClick={() => cancelSubmit(setMainData)}>Бекор килиш</Button>
                <Button appearance='ghost' onClick={()=> console.log(mainData.currentDocument)}>Show</Button>
            </div>
        </div>   
    )
} 