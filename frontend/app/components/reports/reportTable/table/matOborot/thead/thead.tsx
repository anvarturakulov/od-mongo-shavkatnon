import styles from './thead.module.css'
import { TheadProps } from './thead.props'

export function Thead ({ className, ...props}:TheadProps ):JSX.Element {
  return (
    <>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.thNumber}>№ </th>
          <th className={styles.name}>ТМБ</th>
          <th className={styles.unit}>улч. бир.</th>
          <th className={styles.price}>уртача нарх</th>
          <th>
              <div className={styles.big}>Колдик сон</div>
              <div className={styles.little}>хисобот бошига</div>
          </th>
          <th>
              <div className={styles.big}>Колдик сумма</div>
              <div className={styles.little}>хисобот бошига</div>
          </th>
          <th>
              <div className={styles.big}>Кирим сон</div>
              <div className={styles.little}>хисобот даврида</div>
          </th>
          <th>
              <div className={styles.big}>Кирим сумма</div>
              <div className={styles.little}>хисобот даврида</div>
          </th>
          <th>
              <div className={styles.big}>Чиким сон</div>
              <div className={styles.little}>хисобот даврида</div>
          </th>
          <th>
              <div className={styles.big}>Чиким </div>
              <div className={styles.little}>хисобот даврида</div>
          </th>
          <th>
              <div className={styles.big}>Колдик сон</div>
              <div className={styles.little}>хисобот охирига</div>
          </th>
          <th>
              <div className={styles.big}>Колдик сумма</div>
              <div className={styles.little}>хисобот охирига</div>
          </th>
        </tr>
      </thead>
    </>
    
  )
}