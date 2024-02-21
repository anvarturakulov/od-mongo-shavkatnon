import { InputInFormProps } from './inputInForm.props';
import styles from './inputInForm.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { Maindata } from '@/app/context/app.context.interfaces';
import { DocumentModel, NameControl } from '@/app/interfaces/document.interface';


export const InputInForm = ({visible, label, className, nameControl, ...props }: InputInFormProps): JSX.Element => {
    
    if (visible == false) return <></>;

    const {mainData, setMainData} = useAppContext();
    const { currentDocument } = mainData;

    let currentVal = currentDocument.values[nameControl]

    const changeElements = (e: React.FormEvent<HTMLInputElement>, setMainData: Function | undefined, mainData: Maindata, nameControl: NameControl) => {
        let target = e.currentTarget;
        let value = target.value;
        let {currentDocument} = mainData;
        let newValues = {
            ...currentDocument.values
        }

        if ( nameControl=='count') {
            newValues = {
                ...currentDocument.values,
                [`${nameControl}`]: +value,
                total : +(+value * currentDocument.values.price).toFixed(2)
            }
        }

        if ( nameControl=='price') {
            newValues = {
                ...currentDocument.values,
                [`${nameControl}`]: value,
                total : +(+value* currentDocument.values.count).toFixed(2)
            }
        }

         if ( nameControl=='total') {
            newValues = {
                ...currentDocument.values,
                total : +value
            }
        }

        // if (nameControl=='count' || nameControl=='price') {
        //     newValues = {
        //         ...currentDocument.values,
        //         [nameControl]: +value,
        //         total: (currentDocument.values.count * currentDocument.values.price).toFixed(2)
        //     }
        // }

        if (nameControl=='comment') {
            newValues = {
                ...currentDocument.values,
                [nameControl]: value
            }
        }
        
        let newObj:DocumentModel = {
            ...currentDocument,
            values: {...newValues}
        }

        if ( setMainData ) {
            setMainData('currentDocument', {...newObj})
        }
    }

    return (
        <div className={styles.box}>
            {label !='' && <div className={styles.label}>{label}</div>}
            <input
                className={cn(className, styles.input, {
                    [styles.comment]: nameControl=='comment'
                })}
                {...props}
                onChange={(e) => changeElements(e, setMainData, mainData, nameControl)}
                value={currentVal}
            />
        </div>
    );
};
