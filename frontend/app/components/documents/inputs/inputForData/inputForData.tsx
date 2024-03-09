import { InputForDataProps } from './inputForData.props';
import styles from './inputForData.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { Maindata } from '@/app/context/app.context.interfaces';
import { useEffect } from 'react';
import { setDateForDocument } from '@/app/service/documents/setDateForDocument';
import { adminAndHeadCompany } from '@/app/interfaces/general.interface';



export const InputForData = ({label, className, ...props }: InputForDataProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { currentDocument } = mainData;
    const role = mainData.user?.role;
    const isAdminOrHeadCompany = role && adminAndHeadCompany.includes(role)
    
    let dateNowInNumber = Date.now();

    let dateDoc = currentDocument.date>0 ? 
        new Date(currentDocument.date) : 
        new Date();

    let currentVal = dateDoc.toISOString().split('T')[0]

    const changeElements = (e: React.FormEvent<HTMLInputElement>, setMainData: Function | undefined, mainData: Maindata) => {
        let target = e.currentTarget;
        let value = target.value;
        let {currentDocument} = mainData;
        let newObj = {
            ...currentDocument,
            date: Date.parse(value),
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
                type='date'
                value={currentVal}
                disabled = {!isAdminOrHeadCompany}
            />
        </div>
    );
};
