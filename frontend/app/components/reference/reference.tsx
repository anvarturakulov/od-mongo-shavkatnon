'use client'
import { useState } from 'react';
import { ReferenceProps } from './reference.props';
import styles from './reference.module.css';
import cn from 'classnames';
import { Button, Htag, Info, Input, Select, DocTable } from '@/app/components';
import AddIco from './ico/add.svg'
import { ReferenceType } from '../../interfaces/reference.interface';
import { getOptionOfDocumentElements } from '@/app/utils/getOptionOfDocumentElements';

export const Reference = ({reference, referenceType, className, ...props }: ReferenceProps) :JSX.Element => {

    // const defaultDocumentTableItem = {
    //     itemId: '',
    //     referenceType: documentType == DocumentType.LeaveCash ? ReferenceType.CHARGES : ReferenceType.TMZ,
    //     quantity: 0,
    //     price: 0,
    //     total: 0
    // }

    
    let dateNow = new Date()
    // let hasWorkers = (documentType == DocumentType.LeaveCash || documentType == DocumentType.ZpCalculate)

    return (
            <div className={styles.docBox}>
                {/* <div className={styles.infoBox}>
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
                referenceType={documentType == DocumentType.LeaveCash ? ReferenceType.CHARGES : ReferenceType.TMZ}
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
            </div> */}
        </div>   
    )
} 