'use client'
import { Htag } from '@/app/components';
import styles from './page.module.css';
import ReportWindow from '@/app/components/reports/reportWindow/reportWindow';
import ReferenceJournal from '@/app/components/references/referenceJournal/referenceJournal';
import { useAppContext } from '@/app/context/app.context';
import { Message } from '@/app/components/common/message/message';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Journal from '@/app/components/documents/journal/journal';
import { IntervalWindow } from '@/app/components/common/intervalWindow/intervalWindow';
import TopBox from '@/app/components/common/topBox/topBox';
import { Information } from '@/app/components/information/information';

const infoBlock = (
    <>
    <div className={styles.titleD}>ЦЕХЛАР</div>
      <div className={styles.itemsBox}>
        <div className={styles.box}>
          <Htag tag='h2'>Ишлаб чикариш</Htag>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Цех</td>
                <td>Килинган хамир сони</td>
                <td>Ишлатилган загатовка</td>
                <td>Бир дона хамирга нис зувала</td>
                <td>Колдик нон</td>
                <td>Ишлаб чик. нон</td>
                <td>Брак нон</td>
                <td>Истемол килинган</td>
                <td>Сотилган нон</td>
                <td>Колдик нон</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Халкобод</td>
                <td>90</td>
                <td>32</td>
                <td>12</td>
                <td>50</td>
                <td>1520</td>
                <td>3</td>
                <td>10</td>
                <td>1550</td>
                <td>7</td>
              </tr>
              <tr>
                <td>Чашма</td>
                <td>90</td>
                <td>32</td>
                <td>12</td>
                <td>50</td>
                <td>1520</td>
                <td>3</td>
                <td>10</td>
                <td>1550</td>
                <td>7</td>
              </tr>
              <tr>
                <td>Контейнер</td>
                <td>90</td>
                <td>32</td>
                <td>12</td>
                <td>50</td>
                <td>1520</td>
                <td>3</td>
                <td>10</td>
                <td>1550</td>
                <td>7</td>
              </tr>
            </tbody>
          </table>

          
        </div>
      </div>
    </>
  )

export default function Dashboard() {

  const {mainData} = useAppContext()
  const {contentType, contentTitle} = mainData
  
  useEffect(() => {
    if (mainData.user == undefined) {
      redirect('/');
    }
  }, [mainData.user]);

  return (
    
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <TopBox/>
        <div className={styles.content}>

          {mainData.mainPage && <Information/>}
          {mainData.mainPage && infoBlock}
          
          <div className={styles.journalBox}>
            { !mainData.mainPage && contentType=='document' && <Journal/> }
          </div>

          <div className={styles.journalBox}>
            { contentType=='reference' && <ReferenceJournal/> }
          </div>

          <div className={styles.journalBox}>
            { 
              contentType == 'report' &&
              <ReportWindow />
            }
          </div>
        </div>
        <IntervalWindow/>
      </div>
      <Message/>
    </div>
  )
}
