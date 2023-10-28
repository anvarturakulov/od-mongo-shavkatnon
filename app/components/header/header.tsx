import styles from './header.module.css'
import { HeaderProps } from './header.props'
import AddIco from './add.svg'

export default function Header({ contentType, contentTitle, className, ...props }: HeaderProps): JSX.Element {

    return (
        <>
            {
                contentTitle ?
                <div className={styles.box}>
                    <div className={styles.title}>{contentTitle} буйича хужжатлар руйхати</div>
                    <AddIco className={styles.ico}/>
                </div>
                :
                <div className={styles.box}>
                    <div className={styles.title}>Барча хужжатлар руйхати</div>
                </div>
            }
        </>
    )
}

