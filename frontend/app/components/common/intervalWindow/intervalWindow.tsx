import { IntervalProps } from "./intervalWindow.props";
import styles from './intervalWindow.module.css';
import { Button } from '../button/Button';
import { useState } from 'react';
import { Interval } from '@/app/interfaces/document.interface';
import { useAppContext } from '@/app/context/app.context';
import { getDateFromStorageExceptNull } from '@/app/service/documents/getDateFromStorageExceptNull';

export const IntervalWindow = ({className, ...props}: IntervalProps): JSX.Element => {
  let dateStart = getDateFromStorageExceptNull(localStorage.getItem('dateStartToInterval'));
  let dateEnd = getDateFromStorageExceptNull(localStorage.getItem('dateEndToInterval'));

  const {mainData, setMainData} = useAppContext();
  
  const [interval, setInterval] = useState<Interval>({dateStart, dateEnd})

  const saveData = (interval: Interval, setMainData: Function | undefined) => {
    const {dateStart, dateEnd} = interval

    if (Date.parse(dateStart) <= Date.parse(dateEnd)) {
      localStorage.setItem('dateStartToInterval', dateStart);
      localStorage.setItem('dateEndToInterval', dateEnd); 
      setMainData && setMainData('showIntervalWindow', false);
      setMainData && setMainData('updateDataForDocumentJournal', false);  
    }
    else {
      alert('Сана киритишда хатолик')
    }
  }

  const closeWindow = (setMainData: Function | undefined) => {
    setMainData && setMainData('showIntervalWindow', false);   
  }

  const changeElements = (e: React.FormEvent<HTMLInputElement>, setInterval: Function , interval:Interval) => {
        let target = e.currentTarget;
        let value = target.value;
        let id = target.id;
        let newInterval;
        if (id == 'dateStart') {
          newInterval = {
            ...interval,
            dateStart: value
          }
        } else {
          newInterval = {
            ...interval,
            dateEnd: value
          }
        }
        setInterval(newInterval)
    }

  return (
      <>
          { mainData.showIntervalWindow && 
            <div className={styles.box}>
              <div>Интервал саналарини киритинг</div>
              <input 
                type='date' 
                className={styles.input} 
                id='dateStart' 
                value={interval.dateStart}
                onChange={(e) => changeElements(e, setInterval, interval)}
              />
              <input 
                type='date' 
                className={styles.input} 
                id='dateEnd' 
                value={interval.dateEnd}
                onChange={(e) => changeElements(e, setInterval, interval)}
              />
              <div className={styles.btnBox}>
                <Button appearance='primary' onClick={() => saveData(interval, setMainData)}> Саклаш </Button>
                <Button appearance='ghost' onClick={() => closeWindow(setMainData)}> Чикиш </Button>
              </div>
            </div>
          }
      </>
  )
}