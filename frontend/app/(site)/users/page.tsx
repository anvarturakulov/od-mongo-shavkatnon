'use client'
import { Button, Htag } from '@/app/components'
import styles from './page.module.css'
import cn from 'classnames';
import TopBox from '@/app/components/common/topBox/topBox';
import { MenuData } from '@/app/data/menu';
import MenuItems from '@/app/components/menu/menuItems/menuItems';

export default function Users() {
  return (
    <>
      <div className={styles.container}>
        <TopBox/>
        <div className={styles.box}>
          <MenuItems menuData={MenuData}/>
        </div>
      </div>
    </>
  )
}
