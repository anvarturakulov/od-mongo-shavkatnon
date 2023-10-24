'use client'
import styles from './menu.module.css'
import cn from 'classnames';
import {MenuProps} from './menu.props'
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { MenuItem } from '@/app/interfaces/menu.interface';

export default function Menu({menuData, className, ...props}:MenuProps):JSX.Element {
    
    const [menu, setMenu] = useState<Array<MenuItem>>([])
    
    const onClickItem = (e:any,currentTitle:string) => {
        console.log(e.target)
        let newMenu = [...menu]
        newMenu.map(item => {
            if (item.title == currentTitle) {
                return item.isOpened = !item.isOpened
            }
        })
        setMenu(newMenu)
    }

    const onClickSubItem = (currentTitle: string) => {
        let newMenu = [...menu]
        newMenu.map(item => {
            if (item.title == currentTitle) {
                return item.isOpened = !item.isOpened
            }
        })
        setMenu(newMenu)
    }


    useEffect(()=> {
       setMenu(menuData) 
    },[menuData])

    return (
        <>
            {menu.map((item, i) => (
                <>
                    <ul className={styles.ul}>
                        <li
                            className={cn(styles.item)}
                            onClick={(e)=>onClickItem(e,item.title)}
                            key={i}
                        >
                            {item.title}
                        </li>
                        {item.subMenu.length && (
                            item.subMenu.map((elem,k)=> (
                                <>
                                    <li 
                                        className={cn(styles.subItem, {
                                            [styles.isOpened]: item.isOpened
                                        })
                                    }
                                        onClick={() => onClickSubItem(item.title)}
                                        key={k}
                                    >
                                        {elem.title}
                                    </li>
                                </>
                            ))
                        )}
                    </ul>
                </>
                
            ))}
        </>
    )
}
