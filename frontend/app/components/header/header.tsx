import styles from './header.module.css'
import { HeaderProps } from './header.props'
import AddIco from './add.svg'
import CloseIco from './close.svg'
import { Maindata, useAppContext } from '@/app/context/app.context';
import cn from 'classnames';

export default function Header({ className, ...props }: HeaderProps): JSX.Element {
    
    const {mainData, setMainData} = useAppContext()
    const {contentType, contentName, showReferenceWindow, isNewReference } = mainData 
    const strFirst =  
        contentType == 'document' ? 
        'буйича янги хужжат тузиш' : 
            isNewReference ? 'буйича янги элемент очиш':
                             'буйича элементни куриш';

    const strSecond =  contentType == 'document' ? 'буйича хужжатлар руйхати' : 'руйхати'
    
    return (
        <>
            {
                contentName ?
                <div className={styles.box}>
                    <div className={cn(styles.title, 
                                    {[styles.newWindow] : isNewReference})}
                        >{contentName} { showReferenceWindow ? strFirst : strSecond }
                    </div>
                    
                    {mainData.showReferenceWindow ? 
                    
                    <CloseIco 
                        className={styles.ico}
                        onClick={() => {
                            if (setMainData) {
                                   setMainData('clearControlElements', true);
                                   setMainData('showReferenceWindow', false);
                                   setMainData('isNewReference', false);
                                }
                            }}
                            
                    />
                    :
                    <AddIco 
                        className={styles.ico}
                        onClick={(mainData: Maindata) => {
                            if (setMainData) {
                                   setMainData('clearControlElements', false);
                                   if (!mainData.clearControlElements) {
                                       setMainData('showReferenceWindow', true);
                                       setMainData('isNewReference', true);
                                   }
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

