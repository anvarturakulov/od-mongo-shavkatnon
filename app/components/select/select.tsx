import { SelectProps } from './select.props';
import styles from './select.module.css';
import cn from 'classnames';
import { ReferencesData } from '@/app/data';


export const Select = ({ label, referenceType, className, ...props }: SelectProps): JSX.Element => {
    return (
        <div className={styles.box}>
            {label !='' && <div className={styles.label}>{label}</div>}
            <select
                className={styles.select}
                // defaultValue={'dashboard'}
            >
                {ReferencesData.filter(item => item.referenceType == referenceType).map(elem => (
                    <>
                        <option value={elem._id} data-type={elem.referenceType}>{elem.name}</option>
                    </>
                ))}
            </select>
        </div>
    );
};
