import styles from './personal.module.css'
import { Thead } from './thead/thead';
import { TBody } from './tbody/tbody';
import { PersonalProps } from './personal.props';
import { useAppContext } from '@/app/context/app.context';
import { Schet } from '@/app/interfaces/report.interface';

export default function Personal({ className, listFirstSubconts, data, ...props} : PersonalProps):JSX.Element {
    const { setMainData, mainData } = useAppContext()
    const { oborotType } = mainData.reportOption;
    return (
        <>
          <table className={styles.table}>
              <Thead/>
              <tbody className={styles.tbody}>
                  {listFirstSubconts && listFirstSubconts.map((item:string)=>{
                      return (
                          <>
                            <TBody 
                                data={data} 
                                schet={Schet.S67}
                                fixedFirstSuncont = {item}
                                bodyByFirstSunconto = {true}
                            />
                          </>
                      )
                  })}

                  
              </tbody>
          </table>
        </>
    )
}
