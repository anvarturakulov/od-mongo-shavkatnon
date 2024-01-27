'use client'
import styles from './user.module.css'
import cn from 'classnames';
import {UserProps} from './user.props';
import { useAppContext } from '@/app/context/app.context';
import UserIco from './ico/user.svg';

export default function User({className, ...props}:UserProps):JSX.Element {
    
  const {mainData} = useAppContext()

  return (
    <div className={styles.user}>
      <div className={styles.ico}>
        <UserIco/>
      </div>
      <div className={styles.title}>
        Shavkat       
        {/* {mainData.user?.email} */}
      </div>
    </div> 
  )
}
