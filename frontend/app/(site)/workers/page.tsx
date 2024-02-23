'use client'
import styles from './page.module.css'
import cn from 'classnames';
import TopBox from '@/app/components/common/topBox/topBox';
import { MenuData } from '@/app/data/menu';
import { useAppContext } from '@/app/context/app.context';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import UserMenu from '@/app/components/userMenu/userMenu';
import ReportWindow from '@/app/components/reports/reportWindow/reportWindow';
import Journal from '@/app/components/documents/journal/journal';
import { Message } from '@/app/components/common/message/message';

export default function Users() {
  
  const {mainData} = useAppContext()
  const {contentType, contentTitle} = mainData
  
  useEffect(() => {
    if (mainData.user == undefined) {
      redirect('/');
    }
  }, [mainData.user]);

  return (
    <>
      <div className={styles.container}>
        <TopBox/>
        {
          mainData.mainPage &&
          <div className={styles.box}>
            <UserMenu menuData={MenuData}/>
          </div>
        }
        

        <div className={styles.journalBox}>
            { !mainData.mainPage && contentType=='document' && <Journal/> }
        </div>

        <div className={styles.journalBox}>
          { 
            contentType == 'report' &&
            <ReportWindow />
          }
        </div>
      <Message/>
      </div>
    </>
  )
}
