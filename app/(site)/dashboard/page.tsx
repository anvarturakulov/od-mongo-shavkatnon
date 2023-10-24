import { Htag } from '@/app/components'
import { MenuData } from '@/app/data/menu'
import Menu from '@/app/components/menu/menu'
import styles from './page.module.css'
import { DocumentsData } from '@/app/data/documents'
import { ConvertDocuments } from '@/app/utils/converters'
import Journal from '@/app/components/journal/journal'

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.menu}>
        <div className={styles.logo}>КАРАНДАШ v1.0</div>
        <Menu menuData={MenuData}/>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h1'>Ассалому алайкум, Шавкат Ака</Htag>
          <Htag tag='h3'>Here is the information about all your orders</Htag>
        </div>

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
        
        <div className={styles.journalBox}>
          <Journal documents={ConvertDocuments(DocumentsData)} />        
        </div>

      </div>
    </div>
  )
}
