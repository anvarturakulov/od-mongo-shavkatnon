import { DocTableProps } from './docTable.props';
import styles from './docTable.module.css';
import cn from 'classnames';
import {Input } from '@/app/components';
import TrashIco from './ico/trash.svg';
import { useAppContext } from '@/app/context/app.context';
import { SelectReferenceInTable } from '../selects/selectReferenceInTable/selectReferenceInTable';
import { DocTableItem } from '@/app/interfaces/document.interface';

export const DocTable = ({ hasWorkers, typeReference, className, ...props }: DocTableProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const {docTable} = mainData;
    const deleteItem = (index: number, setMainData: Function | undefined, items: Array<DocTableItem>) => {
        console.log('index - '+index);
        if ( setMainData && items.length>1 ) {
            items.splice(index,1);
            console.log(items)
            setMainData('docTable', {items: [...items]})
        }
    }

    return (
        <>
            <div className={cn(styles.box,styles.titleBox, {[styles.boxWithWorkers]: !hasWorkers})}>
                { hasWorkers && <div>Ходим</div> }
                <div>{typeReference}</div>
                <div>Сони</div>
                <div>Нархи</div>
                <div>Суммаси</div>
                <div></div>
            </div>
            {docTable.items.map((item: DocTableItem, index)  => (
                <>
                    <div className={cn(styles.box, {[styles.boxWithWorkers]: !hasWorkers})}>
                        { hasWorkers && <Input label='' type='checkbox'/> }
                        <SelectReferenceInTable 
                            itemIndexInTable={index}
                            typeReference={typeReference}
                        />
                        <Input label='' type='number'/>
                        <Input label='' type='number' />
                        <Input label='' type='number' />
                        <div className={styles.ico} onClick={() => deleteItem(index, setMainData, docTable.items)}> <TrashIco/> </div>
                    </div>
                </>
            ))}
        </>
    )
}


