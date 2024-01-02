import { checkBoxInTableProps } from './checkBoxInTable.props';
import styles from './checkBoxInTable.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { DocTableItem } from '@/app/interfaces/document.interface';

export const CheckBoxInTable = ({ className, itemIndexInTable, ...props }: checkBoxInTableProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { currentDocument } = mainData;
    let currentVal
    if (currentDocument.tableItems) {
        currentVal = currentDocument.tableItems[itemIndexInTable]['isWorker']
    }

    const changeElements = (e: React.FormEvent<HTMLInputElement>, itemIndex: number, setMainData: Function | undefined, items: Array<DocTableItem> | undefined) => {
        let target = e.currentTarget;
        if (items) {
            let currentItem = {...items[itemIndex]}
            currentItem.isWorker = target.checked
            let newItems = [...items]
            newItems[itemIndex] = {...currentItem}
            if ( setMainData ) {
                setMainData('docTable', {items: [...newItems]})
            }
        }
    }

    return (
        <div className={styles.box}>
            <input
                className={cn(className, styles.input)}
                {...props}
                onChange={(e) => changeElements(e, itemIndexInTable, setMainData, currentDocument.tableItems)}
                type='checkbox'
                checked={currentVal}
            />
        </div>
    );
};
