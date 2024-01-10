'use client'
import { useEffect, useState } from 'react';
import { DocProps } from './doc.props';
import styles from './doc.module.css';
import cn from 'classnames';
import { Button, Info, Input, DocTable, SelectReferenceInForm } from '@/app/components';
import AddIco from './ico/add.svg'
import { DocumentType, OptionsForDocument } from '../../../interfaces/document.interface';
import { TypeReference } from '../../../interfaces/reference.interface';
import { useAppContext } from '@/app/context/app.context';
import { defaultDocumentFormItems, defaultDocumentTableItem } from '@/app/context/app.context.constants';
import { InputInForm } from '../inputs/inputInForm/inputInForm';
import { InputForData } from '../inputs/inputForData/inputForData';
import { addItems, cancelSubmit, onSubmit, saveDocumentType, saveNumber } from './helpers/doc.functions';
import { getOptionOfDocumentElements } from '@/app/service/documents/getOptionOfDocumentElements';
import { getEntrysJournal } from '@/app/service/reports/getEntrysJournal';


export const Doc = ({className, ...props }: DocProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const [numberDoc, setNumberDoc] = useState<number>(0);
    const {contentName, contentTitle, currentDocument, isNewDocument} = mainData;
    
    let options: OptionsForDocument = getOptionOfDocumentElements(contentName)
    let hasWorkers = (contentName == DocumentType.LeaveCash || contentName == DocumentType.ZpCalculate)
    let hasPartners = contentName == DocumentType.LeaveCash;
    let defaultNewItemForTable = {...defaultDocumentTableItem}

    useEffect(()=>{
        if (isNewDocument) {
            getEntrysJournal(setMainData, mainData, currentDocument.date);
        }
    },[currentDocument.date, currentDocument.senderId])

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
                    hasPartners={hasPartners}
                    items={currentDocument.tableItems} 
            />}
            
            <div className={styles.paybox}>
                <Input placeholder='Кушимча изох' label={''}/>
                {options.tableIsVisible && 
                    <div className={cn(styles.add, {[styles.notView] : false == false})}>
                        <AddIco onClick={() => addItems(setMainData, mainData ,defaultNewItemForTable)}/>
                    </div>
                }
            </div>

            <div className={styles.boxBtn}>
                <Button appearance='primary' onClick={() => 
                    onSubmit( mainData, setMainData )}
                    >Саклаш</Button>
                <Button appearance='ghost' onClick={() => cancelSubmit(setMainData)}>Бекор килиш</Button>

            </div>
        </div>   
    )
} 