'use client'
import { useEffect, useState } from 'react';
import { DocProps } from './doc.props';
import styles from './doc.module.css';
import cn from 'classnames';
import { Button, Info, Input, DocTable, SelectReferenceInForm } from '@/app/components';
import AddIco from './ico/add.svg'
import { DocTableItem, DocumentType, OptionsForDocument } from '../../../interfaces/document.interface';
import { TypeReference } from '../../../interfaces/reference.interface';
import { getOptionOfDocumentElements } from '@/app/utils/getOptionOfDocumentElements';
import { useAppContext } from '@/app/context/app.context';
import { getRandomID } from '@/app/utils/getRandomID';
import { defaultDocumentTableItem } from '@/app/context/app.context.constants';
import { InputInForm } from '../inputInForm/inputInForm';


export const Doc = ({className, ...props }: DocProps) :JSX.Element => {

    const {mainData, setMainData} = useAppContext();
    const [numberDoc, setNumberDoc] = useState<number>(0);
    
    const {user, contentName, contentType, contentTitle, docTable, currentDocument} = mainData;

    let options: OptionsForDocument = getOptionOfDocumentElements(contentName)

    let dateNow = new Date()
    let hasWorkers = (contentName == DocumentType.LeaveCash || contentName == DocumentType.ZpCalculate)
    
    let defaultNewItemForTable = {...defaultDocumentTableItem}

    const addItems = (setMainData: Function | undefined, newItem: DocTableItem, items: Array<DocTableItem>) => {
        let newItems = [...items, newItem];
        if (setMainData) {
            setMainData('docTable', {items: newItems})
        }
    }

    useEffect(() => {
        if (currentDocument.docNumber == 0) {
            setNumberDoc(getRandomID());
        } else {
            setNumberDoc(currentDocument.docNumber);
        }
    },[])

    const cancelSubmit = () => {
        if (setMainData) {
            setMainData('clearControlElements', true);
            setMainData('showDocumentWindow', false);
            setMainData('isNewDocument', false);
            let defaultTableItemsObj = {items: [defaultDocumentTableItem]}
            setMainData('docTable', {...defaultTableItemsObj});
        }
    }

    return (
            <div className={styles.docBox}>
                <div className={styles.infoBox}>
                    <Input type='date' label='Сана' visible={true} defaultValue={dateNow.toISOString().split('T')[0]}/>
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
                <Button appearance='primary'>Жунатиш</Button>
                <Button appearance='ghost' onClick={cancelSubmit}>Бекор килиш</Button>
                <Button appearance='ghost' onClick={()=> console.log(mainData.currentDocument)}>Show</Button>
            </div>
        </div>   
    )
} 