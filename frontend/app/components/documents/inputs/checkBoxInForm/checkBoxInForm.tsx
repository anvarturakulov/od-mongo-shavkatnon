import { checkBoxInFormProps } from './checkBoxInForm.props';
import styles from './checkBoxInForm.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { Maindata } from '@/app/context/app.context.interfaces';

export const CheckBoxInTable = ({ className, isPartner, itemIndexInTable, label, ...props }: checkBoxInFormProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { currentDocument } = mainData;
    let currentVal
    if (currentDocument) {
        if (isPartner) {
            currentVal = currentDocument['isPartner']
        } else {
            currentVal = currentDocument['isWorker']
        }
    }

    const changeElements = (e: React.FormEvent<HTMLInputElement>, itemIndex: number, setMainData: Function | undefined, mainData: Maindata, isPartner: boolean) => {
        let target = e.currentTarget;
        let currentValues = {...currentDocument}
        if (currentDocument) {
            if (isPartner) {
                currentValues.isPartner = target.checked
                if (target.checked) {
                    currentValues.isWorker = false
                }
            } else {
                currentValues.isWorker = target.checked
                if (target.checked) {
                    currentValues.isPartner = false
                }
            }
            
            if ( setMainData ) {
                setMainData('currentDocument', {...currentValues})
            }
        }
    }

    const idInput = isPartner ? 'partner': 'worker'

    return (
        <div className={styles.box}>
            <input
                className={cn(className, styles.input)}
                {...props}
                onChange={(e) => changeElements(e, itemIndexInTable, setMainData, mainData, isPartner)}
                type='checkbox'
                checked={currentVal}
                id={idInput}
                />
            {label !='' && <label htmlFor={idInput} className={styles.label}>{label}</label>}
        </div>
    );
};
