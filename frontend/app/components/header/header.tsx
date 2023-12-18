import styles from './header.module.css'
import { HeaderProps } from './header.props'
import AddIco from './add.svg'
import CloseIco from './close.svg'
import { useAppContext } from '@/app/context/app.context'

export default function Header({ className, ...props }: HeaderProps): JSX.Element {
    
    const {mainData, setMainData} = useAppContext()
    const {contentType, contentTitle, showReferenceWindow } = mainData
    const strFirst =  contentType == 'document' ? 'буйича янги хужжат тузиш' : 'буйича янги элемент очиш'
    const strSecond =  contentType == 'document' ? 'буйича хужжатлар руйхати' : 'руйхати'
    
    return (
        <>
            {
                contentTitle ?
                <div className={styles.box}>
                        <div className={styles.title}>{contentTitle} { showReferenceWindow ? strFirst : strSecond }</div>
                    {mainData.showReferenceWindow ? 
                    
                    <CloseIco 
                        className={styles.ico}
                        onClick={() => {
                            if (setMainData) {
                                   setMainData('showReferenceWindow', false);
                                   setMainData('clearControlElements', true);
                                }
                            }}
                            
                    />
                    :
                    <AddIco 
                        className={styles.ico}
                        onClick={() => {
                            if (setMainData) {
                                   setMainData('showReferenceWindow', true);
                                   setMainData('clearControlElements', false);
                                }
                            }} 
                    />
                    }
                </div>
                :
                <div className={styles.box}>
                    <div className={styles.title}>Барча хужжатлар руйхати</div>
                </div>
            }
        </>
    )
}

