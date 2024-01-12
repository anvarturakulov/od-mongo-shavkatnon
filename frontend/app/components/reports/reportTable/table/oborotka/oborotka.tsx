import styles from './oborotka.module.css'
import { Thead } from './thead/thead';
import { TBody } from './tbody/tbody';
import { OborotkaProps } from './oborotka.props';
import { useAppContext } from '@/app/context/app.context';
import { getSchetForOborotType } from '@/app/service/reports/getSchetForOborotType';


export default function MatOborot({ className, listFirstSubconts, listSecondSubconts, data, ...props} : OborotkaProps):JSX.Element {
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
                                listSecondSubconts={listSecondSubconts}
                                data={data} 
                                schet={getSchetForOborotType(oborotType)}
                                fixedFirstSuncont = {item}
                                bodyByFirstSunconto = {true}
                            />
                          </>
                      )
                  })}

                  {
                  listFirstSubconts == undefined &&
                        <TBody 
                            listSecondSubconts={listSecondSubconts}
                            data={data} 
                            schet={getSchetForOborotType(oborotType)}
                            fixedFirstSuncont = {'45'}
                            bodyByFirstSunconto = {false}
                        />
                  }
              </tbody>
          </table>
        </>
    )
}
