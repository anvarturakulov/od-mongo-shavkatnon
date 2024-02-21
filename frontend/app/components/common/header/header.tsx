import styles from './header.module.css'
import { HeaderProps } from './header.props'
import AddIco from './add.svg'
import DateIco from './date.svg'
import CloseIco from './close.svg'
import { useAppContext } from '@/app/context/app.context';
import cn from 'classnames';
import { defaultDocumentFormItems } from '@/app/context/app.context.constants';
import { Maindata } from '@/app/context/app.context.interfaces';
import { getDateFromStorageExceptNull } from '@/app/service/documents/getDateFromStorageExceptNull'
import { dateToStr } from '@/app/service/reports/dateToStr'

export default function Header({ windowFor ,className, ...props }: HeaderProps): JSX.Element {
    
    const {mainData, setMainData} = useAppContext()
    const {contentType, contentName, contentTitle, showReferenceWindow, isNewReference, showDocumentWindow, isNewDocument } = mainData 
    const strFirst =  
        contentType == 'document' ? 
            (isNewDocument) ?  'буйича янги хужжат тузиш':
                               'буйича хужжатни куриш'  
        : 
            (isNewReference) ? 'буйича янги элемент очиш':
                               'буйича элементни куриш';

    const strSecond =  contentType == 'document' ? 'буйича хужжатлар руйхати' : 'руйхати'

    let dateStart = dateToStr(Date.parse(getDateFromStorageExceptNull(localStorage.getItem('dateStartToInterval'))));
    let dateEnd = dateToStr(Date.parse(getDateFromStorageExceptNull(localStorage.getItem('dateEndToInterval'))));

    return (
        <>
            {
                contentTitle ?
                <div className={styles.box}>
                    <div className={cn(styles.title, 
                                    {[styles.newWindow] : (isNewReference|| isNewDocument)})}
                        >{contentTitle} { ( showReferenceWindow || showDocumentWindow ) ? strFirst : strSecond }
                    </div>
                    {
                        windowFor == 'document' &&
                        <div>{`оралик сана: ${dateStart} дан ${dateEnd} гача`}</div>
                    }
                    <div>
                        {( showReferenceWindow || showDocumentWindow )? 
                        <CloseIco 
                            className={styles.ico}
                            onClick={() => {
                                if (setMainData) {

                                    setMainData('clearControlElements', true);
                                    setMainData(windowFor == 'reference' ? 'showReferenceWindow':'showDocumentWindow', false);
                                    setMainData(windowFor == 'reference' ? 'isNewReference': 'isNewDocument' , false);                                    
                                    }
                                }}
                                
                        />
                        :
                        <>
                        <DateIco 
                            className={styles.ico}
                            onClick={(mainData: Maindata) => {
                                if (setMainData) {
                                    setMainData('showIntervalWindow', true);
                                    }
                                }}
                        />
                        <AddIco 
                            className={styles.ico}
                            onClick={(mainData: Maindata) => {
                                if (setMainData) {
                                    setMainData('clearControlElements', false);
                                    if (!mainData.clearControlElements) {
                                        setMainData(windowFor == 'reference' ? 'showReferenceWindow': 'showDocumentWindow' , true);
                                        setMainData(windowFor == 'reference' ? 'isNewReference' : 'isNewDocument', true);
                                    }
                                    }
                                }} 
                        />
                        </>
                    }
                    </div>
                </div>
                :
                <div className={styles.box}>
                    <div className={styles.title}>Барча хужжатлар руйхати</div>
                </div>
            }
        </>
    )
}

