'use client'
import { Htag } from '@/app/components'
import { MenuData } from '@/app/data/menu'
import Menu from '@/app/components/menu/menu'
import styles from './page.module.css'
import Journal from '@/app/components/journal/journal'
import ReportWindow from '@/app/components/reportWindow/reportWindow'
import { getReportTypeByTitle } from '@/app/utils/getReportTypeByTitle'
import ReferenceJournal from '@/app/components/referenceJournal/referenceJournal'
import { useAppContext } from '@/app/context/app.context'
import { Message } from '@/app/components/message/message'

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
  const {contentTitle, contentType} = mainData

  return (
    
    <div className={styles.dashboard}>
      
      <div className={styles.menu}>
        <Menu menuData={MenuData}/>
        {logo}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h2'>{`Ассалому алайкум, ${mainData.user}`}</Htag>
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
