'use client'
import { FinancialProps } from './financial.props';
import { CashItem } from './financialItem/financialItem';
import styles from './cash.module.css';
import { useContext, useEffect, useState } from 'react';
import { numberValue } from '@/app/service/common/converters';
import { totalByKey } from '../inform';



export const Financial = ({className, data, ...props }: FinancialProps) :JSX.Element => {
    
    useEffect(()=> {

    }, [data])
    
    let datas = data ? data.filter((item: any) => item?.reportType == 'FINANCIAL')[0]?.values : []

    return (
       <>
            <div className={styles.title}>
                Пул окими
            </div>

            <div className={styles.box}>
                <div className={styles.main}>
                    <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>Давр бошига колдик пуллар</td>
                            <td className={styles.totalTd}>{numberValue(totalByKey('startBalans', datas))}</td>
                        </tr>
                        <tr>
                            <td>Пул кирими</td>
                            <td className={styles.totalTd}></td>
                        </tr>
                    </thead>
                </table>
                </div>
                <div className={styles.inner}>
                </div>
            </div>

            
            
       </>
    )
} 

