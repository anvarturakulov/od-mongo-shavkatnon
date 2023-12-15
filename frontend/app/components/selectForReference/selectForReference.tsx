import { SelectForReferenceProps } from './selectForReference.props';
import styles from './selectForReference.module.css';
import cn from 'classnames';
import { ReferencesData } from '@/app/data';


export const SelectForReference = ({ label, typeReference, visibile=true , className, ...props }: SelectForReferenceProps): JSX.Element => {
    
    if (visibile == false) return <></>
    
    return (
        <div className={styles.box}>
            {label !='' && <div className={styles.label}>{label}</div>}
            <select
                className={styles.select}
                {...props}
            >
                {ReferencesData.filter(item => item.typeReference == typeReference).map(elem => (
                    <>
                        <option value={elem.name} data-type={elem.typeReference}>{elem.name}</option>
                    </>
                ))}
            </select>
        </div>
    );
};
