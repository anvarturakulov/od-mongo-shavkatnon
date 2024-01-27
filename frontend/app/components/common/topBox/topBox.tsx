'use client'
import styles from './topBox.module.css'
import cn from 'classnames';
import {TopBoxProps} from './topBox.props';
import Menu from '../../menu/menu';
import { Htag } from '../htag/Htag';
import { useAppContext } from '@/app/context/app.context';
import User from './user/user';

export default function TopBox({className, ...props}:TopBoxProps):JSX.Element {
    
  const {mainData} = useAppContext()

  return (
    <div className={styles.topBox}>
      <Menu/>
      <div className={styles.logo}>
       QALAM: <span>Ишлаб чикаришни онлайн бошкаринг</span>
      </div>
      <User/>
    </div>
  )
}
