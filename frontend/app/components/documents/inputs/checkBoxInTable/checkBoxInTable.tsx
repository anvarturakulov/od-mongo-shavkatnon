import { checkBoxInTableProps } from './checkBoxInTable.props';
import styles from './checkBoxInTable.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { DocTableItem } from '@/app/interfaces/document.interface';
import { Maindata } from '@/app/context/app.context.interfaces';

export const CheckBoxInTable = ({ className, isPartner, itemIndexInTable, ...props }: checkBoxInTableProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { currentDocument } = mainData;
    let currentVal
    if (currentDocument.tableItems) {
        if (isPartner) {
            currentVal = currentDocument.tableItems[itemIndexInTable]['isPartner']
        } else {
            currentVal = currentDocument.tableItems[itemIndexInTable]['isWorker']
        }
    }

    const changeElements = (e: React.FormEvent<HTMLInputElement>, itemIndex: number, setMainData: Function | undefined, mainData: Maindata, isPartner: boolean) => {
        let target = e.currentTarget;
        if (currentDocument && currentDocument.tableItems) {
            let currentItem = {...currentDocument.tableItems[itemIndex]}
            if (isPartner) {
                currentItem.isPartner = target.checked
                if (target.checked) {
                    currentItem.isWorker = false
                }
            } else {
                currentItem.isWorker = target.checked
                if (target.checked) {
                    currentItem.isPartner = false
                }
            }
            let newItems = [...currentDocument.tableItems]
            newItems[itemIndex] = {...currentItem}
            let newObj = {
                ...currentDocument,
                tableItems: [...newItems]
            }
            
            if ( setMainData ) {
                setMainData('currentDocument', {...newObj})
            }
        }
    }

    return (
        <div className={styles.box}>
            <input
                className={cn(className, styles.input)}
                {...props}
                onChange={(e) => changeElements(e, itemIndexInTable, setMainData, mainData, isPartner)}
                type='checkbox'
                checked={currentVal}
            />
        </div>
    );
};
