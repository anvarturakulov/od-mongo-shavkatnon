import { SelectProps } from './select.props';
import styles from './select.module.css';
import cn from 'classnames';
import { ReferencesData } from '@/client/app/data';


export const Select = ({ label, referenceType, visibile=true , className, ...props }: SelectProps): JSX.Element => {
    
    if (visibile == false) return <></>
    
    return (
        <div className={styles.box}>
            {label !='' && <div className={styles.label}>{label}</div>}
            <select
                className={styles.select}
                {...props}
            >
                {ReferencesData.filter(item => item.referenceType == referenceType).map(elem => (
                    <>
                        <option value={elem.name} data-type={elem.referenceType}>{elem.name}</option>
                    </>
                ))}
            </select>
        </div>
    );
};
