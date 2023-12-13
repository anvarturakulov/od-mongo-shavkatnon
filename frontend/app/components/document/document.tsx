'use client'
import { useState } from 'react';
import { DocumentProps } from './document.props';
import styles from './document.module.css';
import cn from 'classnames';
import { Button, Htag, Info, Input, Select, DocTable } from '@/app/components';
import TrashIco from './ico/trash.svg';
import AddIco from './ico/add.svg'
import { DocumentTableItem, DocumentType, OptionDocumentElements } from '../../interfaces/documents/mainDocument.interface';
import { ReferenceType } from '../../interfaces/references/mainReference.interface';
import { getOptionOfDocumentElements } from '@/app/utils/getOptionOfDocumentElements';

export const Document = ({document, documentType, documentTableArray, className, ...props }: DocumentProps) :JSX.Element => {

    const defaultDocumentTableItem = {
        itemId: '',
        referenceType: documentType == DocumentType.LeaveCash ? ReferenceType.Charges : ReferenceType.TMZ,
        quantity: 0,
        price: 0,
        total: 0
    }

    let options: OptionDocumentElements = getOptionOfDocumentElements(documentType)

    const [tableArray, setTableArray] = useState<Array<DocumentTableItem>>(documentTableArray ? documentTableArray:[defaultDocumentTableItem])
    
    let dateNow = new Date()
    let hasWorkers = (documentType == DocumentType.LeaveCash || documentType == DocumentType.ZpCalculate)

    return (
            <div className={styles.docBox}>
                <div className={styles.infoBox}>
                    <Info content={documentType} label='Хужжат тури'/>
                    <Info content={'005599'} label='Номер'/>
                    <Info content={dateNow.toISOString().split('T')[0]} label='Сана' />
                </div>

                <div className={styles.partnersBox}>
                    <Select 
                        label={options.receiveLabel} 
                        referenceType={options.receiveReferenceType}
                        visibile={options.recieveVisible}
                    />
                    
                    <Select 
                        label={options.senderLabel} 
                        referenceType={options.senderReferenceType}
                        visibile={options.senderVisible}
                    />
                    
                    <Input 
                        label={options.paymentLabel} 
                        type='number'
                        visible={options.paymentVisible}
                    />
                </div>
                
            {options.tableVisible && <DocTable 
                referenceType={documentType == DocumentType.LeaveCash ? ReferenceType.Charges : ReferenceType.TMZ}
                hasWorkers={hasWorkers} 
                tableArray={tableArray}
                setTableArray={setTableArray} 
            />}
            
            <div className={styles.paybox}>
                <Input placeholder='Кушимча изох' label={''}/>
                {options.tableVisible && 
                    <div className={cn(styles.add, {[styles.notView] : false == false})}>
                        <AddIco/>
                    </div>
                }
            </div>

            <div className={styles.boxBtn}>
                <Button appearance='primary'>Жунатиш</Button>
                <Button appearance='ghost'>Бекор килиш</Button>
            </div>
        </div>   
    )
} 