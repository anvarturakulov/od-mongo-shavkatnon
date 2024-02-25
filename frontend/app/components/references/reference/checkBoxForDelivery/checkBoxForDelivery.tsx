import { checkBoxForDeliveryProps } from './checkBoxForDelivery.props';
import styles from './checkBoxForDelivery.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { ReferenceBody } from '@/app/interfaces/reference.interface';

export const CheckBoxForDelivery = ({ className, checked, setCheckbox, label, ...props }: checkBoxForDeliveryProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    
    const changeElements = (e: React.FormEvent<HTMLInputElement>, setCheckbox: Function) => {
        let target = e.currentTarget;
        setCheckbox(target.checked)
    }

    return (
        <div className={styles.box}>
            <input
                className={cn(className, styles.input)}
                {...props}
                onChange={(e) => changeElements(e, setCheckbox)}
                type='checkbox'
                checked={checked}
                id='delivery'
                />
            {label !='' && <label htmlFor={'delivery'} className={styles.label}>{label}</label>}
        </div>
    );
};
