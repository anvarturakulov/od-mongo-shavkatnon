import { SelectOborotProps } from './selectOborot.props';
import styles from './selectOborot.module.css';
import { useAppContext } from '@/app/context/app.context';
import { Maindata } from '@/app/context/app.context.interfaces';
import { OborotType } from '@/app/interfaces/report.interface';

export const SelectOborot = ({ label, visible , className, ...props }: SelectOborotProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();

    const OborotTypeData = [
        { title: OborotType.S20 },
        { title: OborotType.S40 },
        { title: OborotType.S50 },
        { title: OborotType.S67 },
    ]

    const changeElements = (e: React.FormEvent<HTMLSelectElement>, setMainData: Function | undefined, mainData: Maindata) => {
        let target = e.currentTarget;
        let {reportOption} = mainData;
        let dataType = target[target.selectedIndex].getAttribute('data-type')
        
        let newObj = {
            ...reportOption,
            oborotType: dataType,
        }
        
        if (setMainData) {
            setMainData('reportOption', {...newObj})
        }
    }
    
    if (visible == false) return <></>
    
    return (
        <div className={styles.box}>

            {label !='' && <div className={styles.label}>{label}</div>}
            
            <select
                className={styles.select}
                {...props}
                onChange={(e) => changeElements(e, setMainData, mainData)}
            >   
                {OborotTypeData.map((item, key:number) => (
                    <>
                        <option 
                            value={item.title}
                            data-type={item.title}    
                            >
                                {item.title}
                        </option>
                    </>
                ))}
            </select>
        </div>
    );
};
