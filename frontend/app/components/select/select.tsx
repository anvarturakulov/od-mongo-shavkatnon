import { SelectProps } from './select.props';
import styles from './select.module.css';

export const Select = ({ label, data, className, ...props }: SelectProps): JSX.Element => {
    
    return (
        <div className={styles.box}>
            {label !='' && <div className={styles.label}>{label}</div>}
            <select
                className={styles.select}
                {...props}
            >
                {data.map(elem => (
                    <>
                       <option value={elem.name}>{elem.title}</option>
                    </>
                ))}
            </select>
        </div>
    );
};
