import { Button, Htag } from '@/app/components'
import styles from './page.module.css'
import { LeaveTMZ } from '@/app/documents/tmz/leaveTMZ/leaveTMZ'

export default function Gild() {
  return (
    <>
      <div className={styles.container}>
        <Htag tag='h1'>Цех сотувчиси ойнаси</Htag>
        <div className={styles.actionBox}>
          <Htag tag='h2'>Янги амал киритиш</Htag>
          {/* <LeaveTMZ/> */}
          <LeaveTMZ/>
        </div>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>_id </th>
              <th>Сана</th>
              <th>Хужжат тури</th>
              <th>Сумма</th>
              <th>Олувчи</th>
              <th>Берувчи</th>
              <th>Изох 1</th>
              <th>Изох 2</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr>
              <td>12 </td>
              <td>10-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.200.000</td>
              <td>Фарида Опа</td>
              <td>Доставщик-Азамат</td>
              <td>нон, патир</td>
              <td>Изох 2</td>
            </tr>
            <tr>
              <td>14 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.403.000</td>
              <td>Саломат</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            <tr>
              <td>15 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.000.000</td>
              <td>Сиёб бозор</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            <tr>
              <td>12 </td>
              <td>10-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.200.000</td>
              <td>Фарида Опа</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 2</td>
            </tr>
            <tr>
              <td>14 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.403.000</td>
              <td>Саломат</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            <tr>
              <td>15 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.000.000</td>
              <td>Сиёб бозор</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            <tr>
              <td>12 </td>
              <td>10-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.200.000</td>
              <td>Фарида Опа</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 2</td>
            </tr>
            <tr>
              <td>14 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.403.000</td>
              <td>Саломат</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            <tr>
              <td>15 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.000.000</td>
              <td>Сиёб бозор</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            <tr>
              <td>12 </td>
              <td>10-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.200.000</td>
              <td>Фарида Опа</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 2</td>
            </tr>
            <tr>
              <td>14 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.403.000</td>
              <td>Саломат</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            <tr>
              <td>15 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.000.000</td>
              <td>Сиёб бозор</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            <tr>
              <td>12 </td>
              <td>10-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.200.000</td>
              <td>Фарида Опа</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 2</td>
            </tr>
            <tr>
              <td>14 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.403.000</td>
              <td>Саломат</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            <tr>
              <td>15 </td>
              <td>11-10-2023</td>
              <td>Махсулот сотиш</td>
              <td>1.000.000</td>
              <td>Сиёб бозор</td>
              <td>Доставщик-Азамат</td>
              <td></td>
              <td>Изох 22</td>
            </tr>
            
          </tbody>
        </table>
      </div>


      
      
    </>
  )
}
