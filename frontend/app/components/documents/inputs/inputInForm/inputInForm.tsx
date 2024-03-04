import { InputInFormProps } from './inputInForm.props';
import styles from './inputInForm.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { Maindata } from '@/app/context/app.context.interfaces';
import { DocumentModel, NameControl } from '@/app/interfaces/document.interface';
import { UserRoles } from '@/app/interfaces/general.interface';
import { useEffect } from 'react';

export const InputInForm = ({visible, label, className, nameControl, isNewDocument, ...props }: InputInFormProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { currentDocument, user } = mainData;
    
    let currentVal = currentDocument[nameControl]
    console.log(currentVal)
    useEffect(() => {
        // console.log(isNewDocument)
        // if ( nameControl == 'price' && isNewDocument) {
        //     if (user?.role == UserRoles.DELIVERY) {
        //         console.log(currentDocument.price)
        //         currentVal = 3500
        //         let newObj: DocumentModel = {
        //             ... currentDocument,
        //             price: currentVal
        //         }

        //         setMainData && setMainData('currentDocument', {...newObj})
        //     }
        // }
    }, [])

    const changeElements = (e: React.FormEvent<HTMLInputElement>, setMainData: Function | undefined, mainData: Maindata, nameControl: NameControl) => {
        let target = e.currentTarget;
        let value = target.value;
        let {currentDocument} = mainData;
        let newValues = {
            ...currentDocument
        }
        
        if ( nameControl=='count' && (+value>0)) {
            
            newValues = {
                ...currentDocument,
                [`${nameControl}`]: +value,
                total : +(+value * currentDocument.price).toFixed(2)
            }
        }

        if ( nameControl=='price') {
            newValues = {
                ...currentDocument,
                [`${nameControl}`]: +value,
                total : +(+value* currentDocument.count).toFixed(2)
            }
        }

        if ( nameControl=='total' ) {
            newValues = {
                ...currentDocument,
                total : +value
            }
        }
        
        if (nameControl=='comment') {
            newValues = {
                ...currentDocument,
                [nameControl]: value
            }
        }

        if (nameControl=='cashFromPartner') {
            newValues = {
                ...currentDocument,
                [nameControl]: +value
            }
        }
                
        if ( setMainData ) {
            setMainData('currentDocument', {...newValues})
        }
    }
    
    if (visible == false) return <></>;
    
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
