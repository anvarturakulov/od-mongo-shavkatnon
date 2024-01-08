import styles from './matOborot.module.css'
import { Thead } from './thead/thead';
import { TBody } from './tbody/tbody';
import { MatOborotProps } from './matOborot.props';
import { Schet } from '@/app/interfaces/report.interface';


export default function MatOborot({ className, listSecondSubconts, data, ...props} : MatOborotProps):JSX.Element {
    
    return (
        <>
          <table className={styles.table}>
              <Thead/>
              <tbody className={styles.tbody}>
                  <TBody listSecondSubconts={listSecondSubconts} data={data} schet={Schet.S10}/>
                  <TBody listSecondSubconts={listSecondSubconts} data={data} schet={Schet.S21}/>
                  <TBody listSecondSubconts={listSecondSubconts} data={data} schet={Schet.S28}/>
              </tbody>
          </table>
        </>
    )
}
