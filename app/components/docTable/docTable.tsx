import { DocTableProps } from './docTable.props';
import styles from './docTable.module.css';
import cn from 'classnames';
import {Input, Select } from '@/app/components';
import TrashIco from './ico/trash.svg';
import { ReferenceType } from '@/app/interfaces/references/mainReference.interface';

export const DocTable = ({ hasWorkers,referenceType, className, ...props }: DocTableProps): JSX.Element => {

    return (

        
        <div className={cn(styles.box, {
            [styles.boxWithWorkers]: !hasWorkers,
        })}>
            {
                hasWorkers &&
                <Input label='Ходим' type='checkbox'/>
            }
            <Select referenceType={ReferenceType.TMZ} label='ТМЗ'/>
            <Input label='Сони' type='number'/>
            <Input label='Нархи' type='number' />
            <Input label='Суммаси' type='number' />
            <div className={styles.ico}>
                <TrashIco />
            </div>
        </div>
    )
}


