'use client'
import { Htag } from '@/app/components'
import { MenuData } from '@/app/data/menu'
import Menu from '@/app/components/menu/menu'
import styles from './page.module.css'
import { DocumentsData } from '@/app/data/documents'
import Journal from '@/app/components/journal/journal'
import { ContentType, DashboardSettings } from '../../interfaces/general.interface'
import { useEffect, useState } from 'react'
import ReportWindow from '@/app/components/reportWindow/reportWindow'
import { getReportTypeByTitle } from '@/app/utils/getReportTypeByTitle'
import ReferenceJournal from '@/app/components/referenceJournal/referenceJournal'
import { useAppContext } from '@/app/context/app.context'

const defaultSettingsDashboard: DashboardSettings = {
  mainPage: true,
  activeMenuKey: '',
  activeMenuTitle: '',
  activeMenuType: 'document',
  userId: ''
}

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

  // const [settingsDashboard, setSettingsDashboard] = useState<DashboardSettings>(defaultSettingsDashboard) 
  
  const {mainData, setMainData} = useAppContext()

  // const changeSettings = (keyItem: string, titleItem:string, contentType: ContentType) =>{
  //   let newSettings = {
  //     mainPage: false,
  //     activeMenuKey: keyItem,
  //     activeMenuTitle: titleItem,
  //     activeMenuType: contentType,
  //     userId: 'Шавкат ака',
  //     visibilityNewElement: false
  //   }
  //   setSettingsDashboard(newSettings)
  // }

  // const {mainPage, activeMenuKey, activeMenuTitle, activeMenuType, userId} = settingsDashboard

  return (
    <div className={styles.dashboard}>
      <div className={styles.menu}>
        <Menu menuData={MenuData}/>
        {logo}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h2'>Ассалому алайкум, Шавкат Ака</Htag>
        </div>  

        {mainData.mainPage && infoBlock}
 
        <div className={styles.journalBox}>
          {/* {
            <Journal documents={ConvertDocuments(DocumentsData)}/>
          } */}
        </div>

        <div className={styles.journalBox}>
          {
            mainData.menu.contentType=='reference' && 
            <ReferenceJournal
              contentTitle={mainData.menu.contentTitle} 
              contentType={mainData.menu.contentType}
              />
          }
        </div>

        <div className={styles.journalBox}>
          {
            mainData.menu.contentType == 'report' &&
            <ReportWindow reportsType={getReportTypeByTitle(mainData.menu.contentTitle)} />
          }
        </div>


      </div>
    </div>
  )
}
