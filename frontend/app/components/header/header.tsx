import styles from './header.module.css'
import { HeaderProps } from './header.props'
import AddIco from './add.svg'
import CloseIco from './close.svg'

export default function Header({ contentType, contentTitle, visibilityNewElement, setVisibilityNewElement, className, ...props }: HeaderProps): JSX.Element {
    
    const strFirst =  contentType == 'document' ? 'буйича янги хужжат тузиш' : 'буйича янги элемент очиш'
    const strSecond =  contentType == 'document' ? 'буйича хужжатлар руйхати' : 'руйхати'
    return (
        <>
            {
                contentTitle ?
                <div className={styles.box}>
                        <div className={styles.title}>{contentTitle} {visibilityNewElement ? strFirst : strSecond }</div>
                    {visibilityNewElement ? 
                    <CloseIco 
                        className={styles.ico}
                        onClick={() => setVisibilityNewElement(false)}    
                    />
                    :
                    <AddIco 
                        className={styles.ico}
                        onClick={() => setVisibilityNewElement(true)}    
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

