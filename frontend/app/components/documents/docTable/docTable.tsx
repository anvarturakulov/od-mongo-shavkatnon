import { DocTableProps } from './docTable.props';
import styles from './docTable.module.css';
import cn from 'classnames';
import {Input } from '@/app/components';
import TrashIco from './ico/trash.svg';
import { useAppContext } from '@/app/context/app.context';
import { SelectReferenceInTable } from '../selects/selectReferenceInTable/selectReferenceInTable';
import { DocTableItem } from '@/app/interfaces/document.interface';
import { InputInTable } from '../inputs/inputInTable/inputInTable';
import { useState } from 'react';
import { CheckBoxInTable } from '../inputs/checkBoxInTable/checkBoxInTable';

export const DocTable = ({ hasWorkers, hasPartners, typeReference, items,  className, ...props }: DocTableProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const deleteItem = (index: number, setMainData: Function | undefined, items: Array<DocTableItem>) => {

        if ( setMainData && items.length>1 ) {
            let newItems = [...items.slice(0, index),...items.slice(index+1)]
            setMainData('docTable', {items: [...newItems]})
        }
    }

    return (
        <>
            <div className={cn(styles.box,styles.titleBox, {[styles.boxWithWorkers]: !hasWorkers})}>
                { hasWorkers && <div>Ходим</div> }
                { hasPartners && <div>Хамкор</div> }
                <div>Номи</div>
                <div>Сони</div>
                <div>Нархи</div>
                <div>Суммаси</div>
                <div></div>
            </div>
            {items && items.map((item: DocTableItem, index)  => (
                <div key = {index} className={cn(styles.box, {[styles.boxWithWorkers]: !hasWorkers})}>
                    
                    { 
                        hasWorkers &&                   
                        <CheckBoxInTable 
                            itemIndexInTable={index}
                            isPartner={false}
                        /> 
                    }

                    { 
                        hasPartners &&                   
                        <CheckBoxInTable 
                            itemIndexInTable={index}
                            isPartner={true}
                        /> 
                    }
                    
                    <SelectReferenceInTable 
                        itemIndexInTable={index}
                        typeReference={typeReference}
                        currentItemId={item.referenceId}
                    />

                    <InputInTable nameControl='count' itemIndexInTable={index}/>
                    <InputInTable nameControl='price' itemIndexInTable={index}/>
                    <InputInTable nameControl='total' itemIndexInTable={index}/>
                    <div className={styles.ico} onClick={() => deleteItem(index, setMainData, items)}> <TrashIco/> </div>
                </div>
            ))}
        </>
    )
}


