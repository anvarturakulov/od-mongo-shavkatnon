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
import { getReport, onChangeInputOptionsBox } from './helpers/optionsBox.functions';


export default function OptionsBox({ className, ...props }: OptionsBoxProps): JSX.Element {
    
    const {mainData, setMainData} = useAppContext();
    const {contentName, contentTitle} = mainData;
    const result = getOptionsByReportType(contentName)

    return (

        <div className={styles.box}>
            <div className={styles.title}>{`${contentTitle} буйича хисобот`}</div>
            <div className={styles.dataBox}>
                <Input label='Бошлангич сана' type='date' id='startDate' onChange={(e)=> onChangeInputOptionsBox(e, setMainData, mainData)}/>
                <Input label='Охирги сана' type='date' id='endDate' onChange={(e) => onChangeInputOptionsBox(e, setMainData, mainData)} />
            </div>
            
            <div className={styles.dataBoxBottom}>
                <SelectReference 
                    label={result.label} 
                    typeReference={result.typeReference} 
                    id={'firstReferenceId'}
                    visible={true}
                />
            </div>

            <div className={styles.dataBoxBottom}>
                <SelectReference 
                    label='222' 
                    typeReference={TypeReference.WORKERS} 
                    id={'secondReferenceId'}
                    visible={false}
                />
            </div>
            
            <button 
                className={styles.button}
                onClick={()=> getReport(setMainData, mainData)}>
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