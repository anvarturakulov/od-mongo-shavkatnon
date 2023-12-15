import { SelectForReferenceProps } from './selectForReference.props';
import styles from './selectForReference.module.css';
import cn from 'classnames';
import { ReferencesData } from '@/app/data';


export const SelectForReference = ({ label, referenceType, visibile=true , className, ...props }: SelectForReferenceProps): JSX.Element => {
    
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
