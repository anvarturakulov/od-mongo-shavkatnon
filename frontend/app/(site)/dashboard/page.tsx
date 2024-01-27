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

          <Htag tag='h2'>Касса</Htag>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Цех</td>
                <td>Бошлангич колдик</td>
                <td>Мижозлардан кирим</td>
                <td>Ички кирим</td>
                <td>Харажат</td>
                <td>Таъсисчига бер.</td>
                <td>Ички чиким</td>
                <td>Охирги колдик</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Халкобод</td>
                <td>1,000,000</td>
                <td>15,800,000</td>
                <td>0</td>
                <td>10,000,000</td>
                <td>1,200,000</td>
                <td>4,800,000</td>
                <td>2,000,000</td>
              </tr>
              <tr>
                <td>Контейнер</td>
                <td>1,000,000</td>
                <td>1,200,000</td>
                <td>15,800,000</td>
                <td>0</td>
                <td>10,000,000</td>
                <td>4,800,000</td>
                <td>2,000,000</td>
              </tr>
              <tr>
                <td>Чашма</td>
                <td>1,000,000</td>
                <td>15,800,000</td>
                <td>0</td>
                <td>1,200,000</td>
                <td>10,000,000</td>
                <td>4,800,000</td>
                <td>2,000,000</td>
              </tr>
              <tr>
                <td>Самарканд</td>
                <td>1,000,000</td>
                <td>15,800,000</td>
                <td>0</td>
                <td>10,000,000</td>
                <td>4,800,000</td>
                <td>1,200,000</td>
                <td>2,000,000</td>
              </tr>
              <tr>
                <td>Хабибулла ака</td>
                <td>1,000,000</td>
                <td>1,200,000</td>
                <td>15,800,000</td>
                <td>0</td>
                <td>10,000,000</td>
                <td>4,800,000</td>
                <td>2,000,000</td>
              </tr>
              <tr>
                <td>Шавкат</td>
                <td>1,000,000</td>
                <td>15,800,000</td>
                <td>0</td>
                <td>10,000,000</td>
                <td>4,800,000</td>
                <td>2,000,000</td>
                <td>1,200,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.titleD}>Цехлардаги савдо</div>
      <div className={styles.savdoBox}>
        <div className={styles.box}>
          <Htag tag='h1'>Халкобод</Htag>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Мижоз</td>
                <td>Сон</td>
                <td>Сумма</td>
                <td>Олинган пул</td>
              </tr>
            </thead>
            <tbody className={styles.tbodyS}>
              <tr>
                <td>Комил доставщик</td>
                <td>800</td>
                <td>3,200,000</td>
                <td>2,800,000</td>
              </tr>
              <tr>
                <td>Бозор</td>
                <td>300</td>
                <td>1,200,000</td>
                <td>1,200,000</td>
              </tr>
              <tr>
                <td>Саломат опа</td>
                <td>300</td>
                <td>1,200,000</td>
                <td>1,200,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.box}>
          <Htag tag='h1'>Чашма</Htag>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Мижоз</td>
                <td>Сон</td>
                <td>Сумма</td>
                <td>Олинган пул</td>
              </tr>
            </thead>
            <tbody className={styles.tbodyS}>
              <tr>
                <td>Комил доставщик</td>
                <td>800</td>
                <td>3,200,000</td>
                <td>2,800,000</td>
              </tr>
              <tr>
                <td>Саломат опа</td>
                <td>300</td>
                <td>1,200,000</td>
                <td>1,200,000</td>
              </tr>
              <tr>
                <td>Бозор</td>
                <td>300</td>
                <td>1,200,000</td>
                <td>1,200,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.box}>
          <Htag tag='h1'>Контейнер</Htag>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Мижоз</td>
                <td>Сон</td>
                <td>Сумма</td>
                <td>Олинган пул</td>
              </tr>
            </thead>
            <tbody className={styles.tbodyS}>
              <tr>
                <td>Комил доставщик</td>
                <td>800</td>
                <td>3,200,000</td>
                <td>2,800,000</td>
              </tr>
              <tr>
                <td>Саломат опа</td>
                <td>300</td>
                <td>1,200,000</td>
                <td>1,200,000</td>
              </tr>
              <tr>
                <td>Бозор</td>
                <td>300</td>
                <td>1,200,000</td>
                <td>1,200,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.box}>
          <Htag tag='h1'>Самарканд</Htag>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Мижоз</td>
                <td>Сон</td>
                <td>Сумма</td>
                <td>Олинган пул</td>
              </tr>
            </thead>
            <tbody className={styles.tbodyS}>
              <tr>
                <td>Комил доставщик</td>
                <td>800</td>
                <td>3,200,000</td>
                <td>2,800,000</td>
              </tr>
              <tr>
                <td>Саломат опа</td>
                <td>300</td>
                <td>1,200,000</td>
                <td>1,200,000</td>
              </tr>
              <tr>
                <td>Бозор</td>
                <td>300</td>
                <td>1,200,000</td>
                <td>1,200,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.titleD}>ДОСТАВЩИКЛАР</div>
      <div className={styles.itemsBoxDost}>
        <div className={styles.box}>
          <Htag tag='h1'>Мусо</Htag>
          <Htag tag='h2'>Сон буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Кун бошига колдик нони</div>
            <div className={styles.value}>0</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехдан олинган нон</div>
            <div className={styles.value}>1590</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Сотилган нон</div>
            <div className={styles.value}>1500</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехга кайтарилган нон</div>
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Зиммасидаги колдик нон</div>
            <div className={styles.value}>80</div>
          </div>
          <Htag tag='h2'>Пул буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Бошлангич карзи</div>
            <div className={styles.value}>600,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот олди</div>
            <div className={styles.value}>14,500,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот кайтарди</div>
            <div className={styles.value}>100,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Пул олиб келди</div>
            <div className={styles.value}>13,200,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Охирги карзи</div>
            <div className={styles.value}>1,800,000</div>
          </div>
        </div>

        <div className={styles.box}>
          <Htag tag='h1'>Собир</Htag>
          <Htag tag='h2'>Сон буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Кун бошига колдик нони</div>
            <div className={styles.value}>0</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехдан олинган нон</div>
            <div className={styles.value}>1590</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Сотилган нон</div>
            <div className={styles.value}>1500</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехга кайтарилган нон</div>
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Зиммасидаги колдик нон</div>
            <div className={styles.value}>80</div>
          </div>
          <Htag tag='h2'>Пул буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Бошлангич карзи</div>
            <div className={styles.value}>600,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот олди</div>
            <div className={styles.value}>14,500,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот кайтарди</div>
            <div className={styles.value}>100,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Пул олиб келди</div>
            <div className={styles.value}>13,200,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Охирги карзи</div>
            <div className={styles.value}>1,800,000</div>
          </div>
        </div>


        <div className={styles.box}>
          <Htag tag='h1'>Равшан</Htag>
          <Htag tag='h2'>Сон буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Кун бошига колдик нони</div>
            <div className={styles.value}>0</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехдан олинган нон</div>
            <div className={styles.value}>1590</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Сотилган нон</div>
            <div className={styles.value}>1500</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехга кайтарилган нон</div>
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Зиммасидаги колдик нон</div>
            <div className={styles.value}>80</div>
          </div>
          <Htag tag='h2'>Пул буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Бошлангич карзи</div>
            <div className={styles.value}>600,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот олди</div>
            <div className={styles.value}>14,500,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот кайтарди</div>
            <div className={styles.value}>100,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Пул олиб келди</div>
            <div className={styles.value}>13,200,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Охирги карзи</div>
            <div className={styles.value}>1,800,000</div>
          </div>
        </div>

        <div className={styles.box}>
          <Htag tag='h1'>Бекзод</Htag>
          <Htag tag='h2'>Сон буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Кун бошига колдик нони</div>
            <div className={styles.value}>0</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехдан олинган нон</div>
            <div className={styles.value}>1590</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Сотилган нон</div>
            <div className={styles.value}>1500</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехга кайтарилган нон</div>
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Зиммасидаги колдик нон</div>
            <div className={styles.value}>80</div>
          </div>
          <Htag tag='h2'>Пул буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Бошлангич карзи</div>
            <div className={styles.value}>600,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот олди</div>
            <div className={styles.value}>14,500,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот кайтарди</div>
            <div className={styles.value}>100,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Пул олиб келди</div>
            <div className={styles.value}>13,200,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Охирги карзи</div>
            <div className={styles.value}>1,800,000</div>
          </div>
        </div>

        <div className={styles.box}>
          <Htag tag='h1'>ЙигитАли</Htag>
          <Htag tag='h2'>Сон буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Кун бошига колдик нони</div>
            <div className={styles.value}>0</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехдан олинган нон</div>
            <div className={styles.value}>1590</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Сотилган нон</div>
            <div className={styles.value}>1500</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехга кайтарилган нон</div>
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Зиммасидаги колдик нон</div>
            <div className={styles.value}>80</div>
          </div>
          <Htag tag='h2'>Пул буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Бошлангич карзи</div>
            <div className={styles.value}>600,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот олди</div>
            <div className={styles.value}>14,500,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот кайтарди</div>
            <div className={styles.value}>100,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Пул олиб келди</div>
            <div className={styles.value}>13,200,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Охирги карзи</div>
            <div className={styles.value}>1,800,000</div>
          </div>
        </div>

        <div className={styles.box}>
          <Htag tag='h1'>Мансур</Htag>
          <Htag tag='h2'>Сон буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Кун бошига колдик нони</div>
            <div className={styles.value}>0</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехдан олинган нон</div>
            <div className={styles.value}>1590</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Сотилган нон</div>
            <div className={styles.value}>1500</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Цехга кайтарилган нон</div>
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Зиммасидаги колдик нон</div>
            <div className={styles.value}>80</div>
          </div>
          <Htag tag='h2'>Пул буйича</Htag>
          <div className={styles.row}>
            <div className={styles.title}>Бошлангич карзи</div>
            <div className={styles.value}>600,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот олди</div>
            <div className={styles.value}>14,500,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Махсулот кайтарди</div>
            <div className={styles.value}>100,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Пул олиб келди</div>
            <div className={styles.value}>13,200,000</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Охирги карзи</div>
            <div className={styles.value}>1,800,000</div>
          </div>
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
