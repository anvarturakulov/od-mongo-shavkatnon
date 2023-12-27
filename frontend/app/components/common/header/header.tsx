import styles from './header.module.css'
import { HeaderProps } from './header.props'
import AddIco from './add.svg'
import CloseIco from './close.svg'
import { useAppContext } from '@/app/context/app.context';
import cn from 'classnames';
import { defaultDocumentFormItems, defaultDocumentTableItem } from '@/app/context/app.context.constants';
import { Maindata } from '@/app/context/app.context.interfaces';

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

    return (
        <>
            {
                contentTitle ?
                <div className={styles.box}>
                    <div className={cn(styles.title, 
                                    {[styles.newWindow] : (isNewReference|| isNewDocument)})}
                        >{contentTitle} { ( showReferenceWindow || showDocumentWindow ) ? strFirst : strSecond }
                    </div>
                    
                    {( showReferenceWindow || showDocumentWindow )? 
                    
                    <CloseIco 
                        className={styles.ico}
                        onClick={() => {
                            if (setMainData) {

                                   setMainData('clearControlElements', true);
                                   setMainData(windowFor == 'reference' ? 'showReferenceWindow':'showDocumentWindow', false);
                                   setMainData(windowFor == 'reference' ? 'isNewReference': 'isNewDocument' , false);
                                   if (windowFor != 'reference') {
                                    let defaultTableItemsObj = {items: [defaultDocumentTableItem]}
                                    setMainData('docTable', {...defaultTableItemsObj});
                                    setMainData('currentDocument', {...defaultDocumentFormItems});
                                   }
                                   
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
                                       setMainData(windowFor == 'reference' ? 'showReferenceWindow': 'showDocumentWindow' , true);
                                       setMainData(windowFor == 'reference' ? 'isNewReference' : 'isNewDocument', true);
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

