import { OptionsBoxProps } from './optionsBox.props';
import styles from './optionsBox.module.css';
import { Input } from '@/app/components';
import { useState } from 'react';
import { ReportsType } from '@/app/interfaces/report.interface';
import { getOptionsByReportType } from '@/app/service/reports/getOptionsByReportType';
import { SelectReference } from '../selectReference/selectReference';
import { TypeReference } from '@/app/interfaces/reference.interface';
import { useAppContext } from '@/app/context/app.context';
import { Maindata } from '@/app/context/app.context.interfaces';


export default function OptionsBox({ className, ...props }: OptionsBoxProps): JSX.Element {
    
    const {mainData, setMainData} = useAppContext();
    const {contentName, contentTitle} = mainData;

    const onChangeInput = (e: React.FormEvent<HTMLInputElement>, setMainData : Function | undefined, mainData: Maindata)=> {
        let target = e.currentTarget
        let {reportOption} = mainData;

        let newObj = {
            ...reportOption,
            [target.id]: Date.parse(target.value),
        }

        if (setMainData) {
            setMainData('reportOption', {...newObj})
        }
        
    }


    return (

        <div className={styles.box}>
            <div className={styles.title}>{`${contentTitle} буйича хисобот`}</div>
            <div className={styles.dataBox}>
                <Input label='Бошлангич сана' type='date' id='startDate' onChange={(e)=> onChangeInput(e, setMainData, mainData)}/>
                <Input label='Охирги сана' type='date' id='endDate' onChange={(e) => onChangeInput(e, setMainData, mainData)} />
            </div>
            <div className={styles.dataBoxBottom}>
                <SelectReference 
                    label='111' 
                    typeReference={TypeReference.STORAGES} 
                    id={'firstReferenceId'}
                />
            </div>
            
            <button 
                className={styles.button}>
                Хисоботни шакллантириш
            </button>
            <button 
                className={styles.button}
                onClick={()=> console.log(mainData.reportOption)}>
                Холатни куриш
            </button>
        </div>
    )
} 