import { InputInFormProps } from './inputInForm.props';
import styles from './inputInForm.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { DocTableItem } from '@/app/interfaces/document.interface';
import { Maindata } from '@/app/context/app.context.interfaces';


export const InputInForm = ({visible, label, className, ...props }: InputInFormProps): JSX.Element => {
    
    if (visible == false) return <></>;
    const {mainData, setMainData} = useAppContext();
    
    const { currentDocument } = mainData;
    let currentVal = currentDocument.payValue;

    const changeElements = (e: React.FormEvent<HTMLInputElement>, setMainData: Function | undefined, mainData: Maindata) => {
        let target = e.currentTarget;
        let value = target.value;
        let {currentDocument} = mainData;
        let newObj = {
            ...currentDocument,
            payValue: value,

        }

        if ( setMainData ) {
            setMainData('currentDocument', {...newObj})
        }
    }

    return (
        <div className={styles.box}>
            {label !='' && <div className={styles.label}>{label}</div>}
            <input
                className={cn(className, styles.input)}
                {...props}
                onChange={(e) => changeElements(e, setMainData, mainData)}
                type='number'
                value={currentVal}
            />
        </div>
    );
};
