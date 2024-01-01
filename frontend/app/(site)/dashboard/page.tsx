'use client'
import { Htag } from '@/app/components';
import { MenuData } from '@/app/data/menu';
import Menu from '@/app/components/menu/menu';
import styles from './page.module.css';
import ReportWindow from '@/app/components/reports/reportWindow/reportWindow';
import ReferenceJournal from '@/app/components/references/referenceJournal/referenceJournal';
import { useAppContext } from '@/app/context/app.context';
import { Message } from '@/app/components/common/message/message';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Journal from '@/app/components/documents/journal/journal';
import { getReportTypeByTitle } from '@/app/service/reports/getReportTypeByTitle';

const infoBlock = (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <Htag tag='h1'>89,935</Htag>
          <Htag tag='h2'>Total users </Htag>
          <Htag tag='h3'>+1.01% this week</Htag>
        </div>
        <div className={styles.box}>
          <Htag tag='h1'>89,935</Htag>
          <Htag tag='h2'>Total users </Htag>
          <Htag tag='h3'>+1.01% this week</Htag>
        </div>
        <div className={styles.box}>
          <Htag tag='h1'>89,935</Htag>
          <Htag tag='h2'>Total users </Htag>
          <Htag tag='h3'>+1.01% this week</Htag>
        </div>
        <div className={styles.box}>
          <Htag tag='h1'>89,935</Htag>
          <Htag tag='h2'>Total users </Htag>
          <Htag tag='h3'>+1.01% this week</Htag>
        </div>
      </div>
    </>
  )


  const logo = (
    <div
      className={styles.logo}
      // onClick={() => setSettingsDashboard(defaultSettingsDashboard)}
    >
      <div className={styles.logoTitle}>
        Карандаш v 1.0
      </div>
      <div className={styles.logoComment}>
        онлайн учет
      </div>
    </div>
  )


export default function Dashboard() {

  const {mainData} = useAppContext()
  const {contentName, contentType, contentTitle} = mainData
  
  useEffect(() => {
    if (mainData.user == undefined) {
      redirect('/');
    }
  }, [mainData.user]);

  return (
    
    <div className={styles.dashboard}>
      
      <div className={styles.menu}>
        <Menu menuData={MenuData}/>
        {logo}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h2'>{`Ассалому алайкум, ${mainData.user?.email}`}</Htag>
        </div>  
        
        {mainData.mainPage && infoBlock}
        <div className={styles.journalBox}>
          { contentType=='document' && <Journal/> }
        </div>

        <div className={styles.journalBox}>
          { contentType=='reference' && <ReferenceJournal/> }
        </div>

        <div className={styles.journalBox}>
          { 
            contentType == 'report' &&
            <ReportWindow reportsType={getReportTypeByTitle(contentTitle)} />
          }
        </div>
      </div>
      <Message/>
    </div>
  )
}
