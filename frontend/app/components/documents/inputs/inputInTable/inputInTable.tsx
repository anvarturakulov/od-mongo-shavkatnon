import { InputInTableProps } from './inputInTable.props';
import styles from './inputInTable.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { DocTableItem } from '@/app/interfaces/document.interface';

export const InputInTable = ({ className, nameControl, itemIndexInTable, ...props }: InputInTableProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { user, docTable } = mainData;
    let currentVal = docTable.items[itemIndexInTable][nameControl]

    const changeElements = (e: React.FormEvent<HTMLInputElement>, nameControl:string, itemIndex: number, setMainData: Function | undefined, items: Array<DocTableItem>) => {
        let target = e.currentTarget;
        let currentItem = {...items[itemIndex]}
        let value = target.value

        if (value != null && (nameControl=='count' || nameControl=='price' || nameControl=='total')) {
            currentItem[nameControl] = +value
        }

        if (value != null && (nameControl=='count' || nameControl=='price')) {
            currentItem.total = currentItem.count * currentItem.price
        }

        let newItems = [...items]
        newItems[itemIndex] = {...currentItem}
        if ( setMainData ) {
            setMainData('docTable', {items: [...newItems]})
        }
    }

    return (
        <div className={styles.box}>
            <input
                className={cn(className, styles.input)}
                {...props}
                onChange={(e) => changeElements(e, nameControl, itemIndexInTable, setMainData, docTable.items)}
                type='number'
                value={currentVal}
            />
        </div>
    );
};
