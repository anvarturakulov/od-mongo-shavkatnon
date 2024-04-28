import styles from './matOborot.module.css'
import { Thead } from './thead/thead';
import { TBody } from './tbody/tbody';
import { MatOborotProps } from './matOborot.props';
import { Schet } from '@/app/interfaces/report.interface';


export default function MatOborot({ className, firstSubcontoId, listSecondSubconts, data, ...props} : MatOborotProps):JSX.Element {
    
    return (
        <>
          <table className={styles.table}>
              <Thead/>
              <tbody className={styles.tbody}>
                  <TBody firstSubcontoId={firstSubcontoId} listSecondSubconts={listSecondSubconts} data={data} schet={Schet.S10}/>
                  <TBody firstSubcontoId={firstSubcontoId} listSecondSubconts={listSecondSubconts} data={data} schet={Schet.S21}/>
                  <TBody firstSubcontoId={firstSubcontoId} listSecondSubconts={listSecondSubconts} data={data} schet={Schet.S28}/>
              </tbody>
          </table>
        </>
    )
}
