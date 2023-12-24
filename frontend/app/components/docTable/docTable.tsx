import { DocTableProps } from './docTable.props';
import styles from './docTable.module.css';
import cn from 'classnames';
import {Input } from '@/app/components';
import TrashIco from './ico/trash.svg';

export const DocTable = ({ hasWorkers, typeReference, tableArray, setTableArray, className, ...props }: DocTableProps): JSX.Element => {
    
    return (
        <>
            <div className={cn(styles.box, {[styles.boxWithWorkers]: !hasWorkers})}>
                { hasWorkers && <div>Ходим</div> }
                <div>{typeReference}</div>
                <div>Сони</div>
                <div>Нархи</div>
                <div>Суммаси</div>
                <div></div>
            </div>
            {tableArray.map(item => (
                <>
                    <div className={cn(styles.box, {[styles.boxWithWorkers]: !hasWorkers})}>
                        { hasWorkers && <Input label='' type='checkbox'/> }
                        {/* <Select typeReference={typeReference} label='' /> */}
                        <Input label='' type='number'/>
                        <Input label='' type='number'/>
                        <Input label='' type='number' />
                        <Input label='' type='number' />
                        <div className={styles.ico}> <TrashIco/> </div>
                    </div>
                </>
            ))}
        </>
    )
}


