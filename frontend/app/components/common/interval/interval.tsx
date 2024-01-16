import { IntervalProps } from "./interval.props";
import styles from './interval.module.css';
import cn from 'classnames';
import { Button } from '../button/Button';
import { useAppContext } from '@/app/context/app.context';

export const Interval = ({className, ...props}: IntervalProps): JSX.Element => {

  const {mainData, setMainData} = useAppContext()

  return (
      <>
          { false && 
            <div className={styles.box}>
              <div>Интервал санасини киритинг</div>
              <input type='date' className={styles.input}/>
              <input type='date' className={styles.input}/>
              <div className={styles.btnBox}>
                <Button appearance='primary' onClick={() => console.log()}> Саклаш </Button>
                <Button appearance='ghost'> Чикиш </Button>
              </div>
            </div>
          }
          
      </>
  )
}