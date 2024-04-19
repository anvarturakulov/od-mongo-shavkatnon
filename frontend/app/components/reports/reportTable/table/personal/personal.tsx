import styles from './personal.module.css'
import { Thead } from './thead/thead';
import { TBody } from './tbody/tbody';
import { PersonalProps } from './personal.props';
import { useAppContext } from '@/app/context/app.context';
import { Schet } from '@/app/interfaces/report.interface';
import { getPropertySubconto } from '@/app/service/reports/getPropertySubconto';

function sortByName (a: string, b: string, data: any): Number {
  let nameA = getPropertySubconto(data, a).name.toLocaleLowerCase()
  let nameB = getPropertySubconto(data, b).name.toLocaleLowerCase()

  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}

export default function Personal({ className, listFirstSubconts, data, ...props} : PersonalProps):JSX.Element {
    const { setMainData, mainData } = useAppContext()
    const { oborotType } = mainData.reportOption;
    return (
        <>
          <table className={styles.table}>
              <Thead/>
              <tbody className={styles.tbody}>
                  {
                  listFirstSubconts && 
                  listFirstSubconts
                //   .sort(sortByName)
                  .map((item:string)=>{
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
