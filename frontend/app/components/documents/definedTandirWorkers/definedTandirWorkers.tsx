'use client'
import { DefinedTandirWorkersProps } from './definedTandirWorkers.props';
import styles from './definedTandirWorkers.module.css';
import { useAppContext } from '@/app/context/app.context';
import { SelectWorkers } from './selectWorkers/selectWorkers';

export const DefinedTandirWorkers = ({className, ...props }: DefinedTandirWorkersProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const {definedTandirWorkers} = mainData

    return (
        <div className={styles.box}>
            <SelectWorkers 
              label='Тандирчи' 
              type='firstWorker'
              currentItemId={definedTandirWorkers?.firstWorker}
              />   
            
            <SelectWorkers 
              label='Биринчи зувалачи' 
              type='secondWorker'
              currentItemId={definedTandirWorkers?.secondWorker}
              />   
            
            <SelectWorkers 
              label='Иккинчи зувалачи' 
              type='thirdWorker'
              currentItemId={definedTandirWorkers?.thirdWorker}
              />   
        </div>   
    )
} 