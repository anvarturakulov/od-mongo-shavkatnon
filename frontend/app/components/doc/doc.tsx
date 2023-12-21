'use client'
import { useState } from 'react';
import { DocProps } from './doc.props';
import styles from './doc.module.css';
import cn from 'classnames';
import { Button, Htag, Info, Input, DocTable, SelectForReference } from '@/app/components';
import AddIco from './ico/add.svg'
import { DocumentTableItem, DocumentType, OptionDocumentElements } from '../../interfaces/document.interface';
import { TypeReference } from '../../interfaces/reference.interface';
import { getOptionOfDocumentElements } from '@/app/utils/getOptionOfDocumentElements';
import { useAppContext } from '@/app/context/app.context';

export const Doc = ({className, ...props }: DocProps) :JSX.Element => {

    const {mainData, setMainData} = useAppContext();
    const {user, contentName, contentType} = mainData;

    const defaultDocumentTableItem = {
        itemId: '',
        typeReference: (contentName == DocumentType.LeaveCash) ? TypeReference.CHARGES : TypeReference.TMZ,
        quantity: 0,
        price: 0,
        total: 0
    }

    let options: OptionDocumentElements = getOptionOfDocumentElements(contentName)

    // const [tableArray, setTableArray] = useState<Array<DocumentTableItem>>(documentTableArray ? documentTableArray:[defaultDocumentTableItem])
    const [tableArray, setTableArray] = useState<Array<DocumentTableItem>>([defaultDocumentTableItem])
    
    let dateNow = new Date()
    let hasWorkers = (contentName == DocumentType.LeaveCash || contentName == DocumentType.ZpCalculate)

    return (
            <div className={styles.docBox}>
                <div className={styles.infoBox}>
                    <Info content={contentName} label='Хужжат тури'/>
                    <Info content={'005599'} label='Номер'/>
                    <Info content={dateNow.toISOString().split('T')[0]} label='Сана' />
                </div>

                <div className={styles.partnersBox}>
                    <SelectForReference 
                        label={options.receiveLabel} 
                        typeReference={options.receivetypeReference}
                        visibile={options.recieveVisible}
                    />
                    
                    <SelectForReference 
                        label={options.senderLabel} 
                        typeReference={options.sendertypeReference}
                        visibile={options.senderVisible}
                    />
                    
                    <Input 
                        label={options.paymentLabel} 
                        type='number'
                        visible={options.paymentVisible}
                    />
                </div>
                
            {options.tableVisible && <DocTable 
                typeReference={contentName == DocumentType.LeaveCash ? TypeReference.CHARGES : TypeReference.TMZ}
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