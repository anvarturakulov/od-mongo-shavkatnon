'use client'
import { OborotkaProps } from './oborotka.props';
import { OborotkaItem } from './oborotkaItem/oborotkaItem';
import styles from './oborotka.module.css';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/app.context';


export const Oborotka = ({className, ...props }: OborotkaProps) :JSX.Element => {
    const { setMainData, mainData } = useAppContext()
    const { oborotka, reportOption } = mainData
    const { firstReferenceId } = reportOption

    useEffect(()=> {
        // console.log(oborotka)
    }, [oborotka])
    
    let datas = oborotka ? oborotka[0]?.values : []
    return (
       <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td >№</td>
                        <td className={styles.titleName}>Номи</td>
                        <td className={styles.titleValue}>Колдик сумма +</td>
                        <td className={styles.titleValue}>Колдик сумма -</td>
                        <td className={styles.titleValue}>Дебет сумма</td>
                        <td className={styles.titleValue}>Кредит сумма</td>
                        <td className={styles.titleValue}>Колдик сумма +</td>
                        <td className={styles.titleValue}>Колдик сумма -</td>
                    </tr>
                </thead>
                {
                    datas && datas.length &&
                    datas
                    .filter((item:any) => {
                        if (firstReferenceId) return item.sectionId == firstReferenceId
                        return true
                    })
                    .map((element: any, key: number) => {
                        // if (!element?.items.length) return <></>
                        return <OborotkaItem 
                            key={key}
                            item={element}
                        />
                    })
                }
                
            </table>
       </>
    )
} 

