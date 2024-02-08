'use client'
import styles from './user.module.css'
import cn from 'classnames';
import {UserProps} from './user.props';
import { useAppContext } from '@/app/context/app.context';
import UserIco from './ico/user.svg';

export default function User({className, ...props}:UserProps):JSX.Element {
    
  const {mainData, setMainData} = useAppContext()
  const exit = ( setMaindata: Function | undefined ) => {
    setMainData && setMainData('user', undefined);
    setMainData && setMainData('mainPage', true);
  }

  return (
    <div className={styles.user}
      onClick={() => exit(setMainData)}
      >
      <div className={styles.ico}>
        <UserIco/>
      </div>
      <div className={styles.title}>
        {mainData.user?.name}
      </div>
    </div> 
  )
}
