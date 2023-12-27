'use client'
import styles from './menu.module.css'
import cn from 'classnames';
import {MenuProps} from './menu.props'
import { useEffect, useState } from 'react';
import { MenuItem } from '../../interfaces/menu.interface';
import { getKeyEnum } from '@/app/utils/getKeyEnum';
import { ContentType } from '../../interfaces/general.interface';
import { useAppContext } from '@/app/context/app.context';
import { defaultDocumentTableItem, defaultDocumentFormItems } from '@/app/context/app.context.constants';

export default function Menu({menuData, className, ...props}:MenuProps):JSX.Element {
    
    const [menu, setMenu] = useState<Array<MenuItem>>([])
    
    const {mainData, setMainData} = useAppContext()

    const onClickItem = (e:any,currentTitle:string) => {
        let newMenu = [...menu]
        newMenu.map(item => {
            if (item.title == currentTitle) {
                return item.isOpened = !item.isOpened
            }
        })
        
        setMenu(newMenu)
    }

    const onClickSubItem = (contentName: string, contentTitle: string, contentType: ContentType) => {
        const keyItem = getKeyEnum(contentName, contentType)
        
        if (setMainData) {
            setMainData('activeMenuKey', keyItem);
            setMainData('contentType', contentType);
            setMainData('contentTitle', contentTitle);
            setMainData('contentName', contentName);
            setMainData('mainPage', false);
            setMainData('showReferenceWindow', false);
            setMainData('isNewReference', false);
            setMainData('showDocumentWindow', false);
            setMainData('isNewDocument', false);
            setMainData('clearControlElements', true);
            let defaultTableItemsObj = {items: [defaultDocumentTableItem]}
            setMainData('docTable', {...defaultTableItemsObj});

            if (contentType = 'document') {
                let defValue = {...defaultDocumentFormItems} 
                defValue.documentType = contentName
                setMainData('currentDocument', {...defValue});
            }
        };
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
                                        onClick={() => onClickSubItem(elem.title, elem.description, elem.type)}
                                        key={elem.title}
                                    >
                                        {elem.description? elem.description : elem.title}
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
