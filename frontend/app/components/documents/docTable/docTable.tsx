import { DocTableProps } from './docTable.props';
import styles from './docTable.module.css';
import cn from 'classnames';
import TrashIco from './ico/trash.svg';
import { useAppContext } from '@/app/context/app.context';
import { SelectReferenceInTable } from '../selects/selectReferenceInTable/selectReferenceInTable';
import { DocTableItem, DocumentType } from '@/app/interfaces/document.interface';
import { typeDocumentIsSale } from '@/app/service/documents/typeDocumentIsSale';
import { typeDocumentForLeaveTMZ } from '@/app/service/documents/typeDocumentForLeaveTMZ';
import { TypeReference } from '@/app/interfaces/reference.interface';
import { InputInTable } from '../inputs/inputInTable/inputInTable';

export const DocTable = ({ typeReference, items,  className, ...props }: DocTableProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const {contentName, currentDocument} = mainData;

    const deleteItem = (index: number, setMainData: Function | undefined, items: Array<DocTableItem>) => {

        if ( setMainData && items.length>1 ) {
            let newItems = [...items.slice(0, index),...items.slice(index+1)]
            let newObj = {...mainData.currentDocument};
            newObj.tableItems = [...newItems] 
            setMainData('currentDocument', {...newObj})
        }
    }

    let hasCommentInTable = (contentName == DocumentType.LeaveCash);
    let hasWorkers = (contentName == DocumentType.LeaveCash || contentName == DocumentType.ZpCalculate)
    let hasPartners = contentName == DocumentType.LeaveCash;
    let documentIsSaleType = typeDocumentIsSale(contentName);
    let showBalance = typeDocumentForLeaveTMZ(contentName);
    

    return (
        <>
            <div className={cn(styles.box,styles.titleBox, 
                {
                    [styles.boxWithBalance]: showBalance,
                    [styles.boxWithWorkers]: hasWorkers,
                    [styles.boxWithReciever]: documentIsSaleType,
                })}>
                
                { hasWorkers && <div>Ходим</div> }
                { hasPartners && <div>Хамкор</div> }
                
                <div>Номи</div>
                
                { showBalance && <div>Колдик</div> }
                
                { !hasCommentInTable && <div>Сони</div>}
                { !hasCommentInTable && <div>Нархи</div>}
                
                <div>Суммаси</div>

                { documentIsSaleType && <div>Олувчи</div>}

                { documentIsSaleType && <div>Олинган пул</div>}

                { hasCommentInTable && <div>Изох</div>}
                <div className={styles.notColor}>____</div>

            </div>
            {items && items.map((item: DocTableItem, index)  => (
                <div key = {index} className={cn(styles.box, 
                {
                    [styles.boxWithBalance]: showBalance,
                    [styles.boxWithWorkers]: hasWorkers,
                    [styles.boxWithReciever]: documentIsSaleType,

                })}>
                    
                    <SelectReferenceInTable 
                        itemIndexInTable={index}
                        typeReference={typeReference}
                        currentItemId={item.referenceId}
                    />
                    { 
                        showBalance &&                   
                        <div>{item.balance}</div>
                    }
                    { !hasCommentInTable && <InputInTable nameControl='count' type='number' itemIndexInTable={index}/> }
                    { !hasCommentInTable && <InputInTable nameControl='price' type='number' itemIndexInTable={index}/>}
                    
                    <InputInTable nameControl='total' type='number' itemIndexInTable={index}/>

                    { hasCommentInTable && <InputInTable nameControl='comment' type='text' itemIndexInTable={index}/> }
                    <div className={styles.ico} onClick={() => deleteItem(index, setMainData, items)}> <TrashIco/> </div>
                </div>
            ))}
        </>
    )
}