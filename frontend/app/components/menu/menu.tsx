'use client'
import styles from './menu.module.css'
import cn from 'classnames';
import {MenuProps} from './menu.props';
import IcoHome from './ico/home.svg';
import { MenuData } from '@/app/data/menu';
import MenuItems from './menuItems/menuItems';

export default function Menu({className, ...props}:MenuProps):JSX.Element {
    
    return (
        <>
           <div className={styles.menu}>
            <div className={styles.menuBtn}>
              <IcoHome className={styles.icoHome}/>
              Меню
            </div>
            <div className={styles.menuItems}>
              <MenuItems menuData={MenuData}/>
            </div>
          </div>
        </>
    )
}
