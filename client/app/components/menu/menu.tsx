'use client'
import styles from './menu.module.css'
import cn from 'classnames';
import {MenuProps} from './menu.props'
import { useEffect, useState } from 'react';
import { MenuItem } from '@/client/app/interfaces/menu.interface';
import { getKeyEnum } from '@/client/app/utils/getKeyEnum';
import { ContentType } from '@/client/app/interfaces/general.interface';

export default function Menu({menuData, changeSettings,className, ...props}:MenuProps):JSX.Element {
    
    const [menu, setMenu] = useState<Array<MenuItem>>([])

    const onClickItem = (e:any,currentTitle:string) => {
        let newMenu = [...menu]
        newMenu.map(item => {
            if (item.title == currentTitle) {
                return item.isOpened = !item.isOpened
            }
        })
        setMenu(newMenu)
    }

    const onClickSubItem = (titleItem: string, contentType: ContentType) => {
        const keyItem = getKeyEnum(titleItem, contentType)
        changeSettings(keyItem, titleItem, contentType)
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
                            data-type = {'firstLevel'}
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
                                        onClick={() => onClickSubItem(elem.title, elem.type)}
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
