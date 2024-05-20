'use client'
import { FoydaProps } from './foyda.props';
import { FoydaItem } from './foydaItem/foydaItem';
import styles from './foyda.module.css';
import { useEffect, useState } from 'react';
import { numberValue } from '@/app/service/common/converters';
import { totalByKey } from '../inform';


export const Foyda = ({className, data, ...props }: FoydaProps) :JSX.Element => {

    useEffect(()=> {
    }, [data])
    
    let datas = data ? data.filter((item: any) => item?.reportType == 'FOYDA')[0]?.values : []

    return (
       <>
            <div className={styles.title}>
                ФOЙДА ХИСОБИ
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td >Цех</td>
                        <td>Ишлаб чикар. нон сони</td>
                        <td>Хамир сони</td>
                        <td>Цехдага сав. нон сони</td>
                        <td>Юк етк. нон сони</td>
                        <td>Умум савдо пули</td>
                        <td>Ун харажати</td>
                        <td>Хом ашёлар хараж.</td>
                        <td>Иш хаки хараж.</td>
                        <td>Бошкарув иш хаки</td>
                        <td>Коммунал ва бошка хараж.</td>
                        <td>Кунлик пуллик хараж.</td>
                        <td>Жорий фойда</td>
                        <td>Фойда коэф (%)</td>
                        <td>Ойлик пуллик хараж</td>
                        <td>Соф фойда</td>
                    </tr>
                </thead>
                {
                    datas && datas.length &&
                    datas
                    .map((element: any, key: number) => {
                        return <FoydaItem 
                            key={key}
                            item={element}
                        />
                    })
                }
                <thead>
                    <tr>
                        <td>Жами</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('productionCount', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('productionDocsCount', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('saleCountWithOutMove', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('countDeleviry', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('saleWithMove', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('zagatovka', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('materials', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('zp', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('addingZp', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('services', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('currentPayment', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('currentEarning', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('koefCurrentEarningToOneProduct', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('longPayment', datas))}</td>
                        <td className={styles.totalTd}>{numberValue(totalByKey('realEarning', datas))}</td>
                    </tr>
                </thead>
            </table>
       </>
    )
} 

