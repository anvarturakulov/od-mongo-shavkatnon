'use client'
import { Htag } from '@/app/components'
import { MenuData } from '@/app/data/menu'
import Menu from '@/app/components/menu/menu'
import styles from './page.module.css'
import { DocumentsData } from '@/app/data/documents'
import { ConvertDocuments } from '@/app/utils/converters'
import Journal from '@/app/components/journal/journal'
import Report from '@/app/components/report/report'
import { ContentType, DashboardSettings } from '../../interfaces/general.interface'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ReportWindow from '@/app/components/reportWindow/reportWindow'
import { getReportTypeByTitle } from '@/app/utils/getReportTypeByTitle'
import { ReferencesData } from '@/app/data/references'
import ReferenceWindow from '@/app/components/referenceJournal/referenceWindow'

const defaultSettingsDashboard: DashboardSettings = {
  mainPage: true,
  activeMenuKey: '',
  activeMenuTitle: '',
  activeMenuType: 'document',
  userId: ''
}

export default function Dashboard() {

  const [settingsDashboard, setSettingsDashboard] = useState<DashboardSettings>(defaultSettingsDashboard) 

  const changeSettings = (keyItem: string, titleItem:string, contentType: ContentType) =>{
    let newSettings = {
      mainPage: false,
      activeMenuKey: keyItem,
      activeMenuTitle: titleItem,
      activeMenuType: contentType,
      userId: 'Шавкат ака',
      visibilityNewElement: false

    }
    setSettingsDashboard(newSettings)
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
      onClick={() => setSettingsDashboard(defaultSettingsDashboard)}
    >
      <div className={styles.logoTitle}>
        Карандаш v 1.0
      </div>
      <div className={styles.logoComment}>
        онлайн учет
      </div>
    </div>
  )

  const {mainPage, activeMenuKey, activeMenuTitle, activeMenuType, userId} = settingsDashboard
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.menu}>
        <Menu menuData={MenuData} changeSettings={changeSettings}/>
        {logo}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h2'>Ассалому алайкум, Шавкат Ака</Htag>
        </div>  

        {mainPage && infoBlock}
 
        <div className={styles.journalBox}>
          {
            activeMenuType=='document' && 
            <Journal 
              documents={ConvertDocuments(DocumentsData)} 
              contentTitle={activeMenuTitle} 
              contentType={activeMenuType}
              />
          }
        </div>

        <div className={styles.journalBox}>
          {
            activeMenuType=='reference' && 
            <ReferenceWindow
              contentTitle={activeMenuTitle} 
              contentType={activeMenuType}
              />
          }
        </div>

        <div className={styles.journalBox}>
          {
            activeMenuType == 'report' &&
            <ReportWindow reportsType={getReportTypeByTitle(activeMenuTitle)} />
          }
        </div>


      </div>
    </div>
  )
}
