import { Button, Htag } from '@/app/components'
import styles from './journal.module.css'
import cn from 'classnames';
import {JournalProps} from './journal.props'

export default function Journal() {
    return (
        <>
            <div className={styles.container}>
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
