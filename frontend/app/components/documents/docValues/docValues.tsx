import { DocValuesProps } from './docValues.props';
import styles from './docValues.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { DocumentType, OptionsForDocument } from '@/app/interfaces/document.interface';
import { CheckBoxInTable } from '../inputs/checkBoxInForm/checkBoxInForm';
import { typeDocumentIsSale } from '@/app/service/documents/typeDocumentIsSale';
import { typeDocumentForLeaveTMZ } from '@/app/service/documents/typeDocumentForLeaveTMZ';
import { getOptionOfDocumentElements } from '@/app/service/documents/getOptionOfDocumentElements';
import { InputInForm } from '../inputs/inputInForm/inputInForm';
import { SelectReferenceInForm } from '../selects/selectReferenceInForm/selectReferenceInForm';
import { addItems, getDefinedItemIdForReceiver, getDefinedItemIdForSender, getLabelForAnalitic, getTypeReferenceForAnalitic, saveItemId, visibilityCashFromPartnerValueInDocument, visibilityCommentValueInDocument, visibilityPriceValueInDocument, visibilityTotalValueInDocument } from './doc.values.functions';
import { TypeReference } from '@/app/interfaces/reference.interface';
import { defaultDocumentTableItem } from '@/app/context/app.context.constants';
import { DocTable } from '../docTable/docTable';
import AddIco from './ico/add.svg'

export const DocValues = ({ className, ...props }: DocValuesProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { contentName, currentDocument, isNewDocument } = mainData;
    const role = mainData.user?.role;
    const storageIdFromUser = mainData.user?.storageId;
    
    let options: OptionsForDocument = getOptionOfDocumentElements(contentName)

    
    let hasWorkers = (contentName == DocumentType.LeaveCash )
    let hasPartners = contentName == DocumentType.LeaveCash;
    let hasFounder = contentName == DocumentType.LeaveCash;
    
    let defaultNewItemForTable = {...defaultDocumentTableItem}
    
    let documentIsSaleType = typeDocumentIsSale(contentName);
    let showBalance = typeDocumentForLeaveTMZ(contentName);
    
    let definedItemIdForReceiver = getDefinedItemIdForReceiver(role, storageIdFromUser, contentName)
    let definedItemIdForSender = getDefinedItemIdForSender(role, storageIdFromUser, contentName)
    
    return (
        <>
            <div className={styles.partnersBox}>
                <SelectReferenceInForm 
                    label={options.receiverLabel} 
                    typeReference={options.receiverType}
                    visibile={options.recieverIsVisible}
                    currentItemId={currentDocument?.receiverId}
                    type='receiver'
                    definedItemId= {definedItemIdForReceiver}
                />
                <SelectReferenceInForm 
                    label={options.senderLabel} 
                    typeReference={options.senderType}
                    visibile={options.senderIsVisible}
                    currentItemId={currentDocument?.senderId}
                    type='sender'
                    definedItemId= {definedItemIdForSender}
                />
                
            </div>

            <div className={cn(styles.valuesBox)}>
                <div className={styles.checkBoxs}>
                    { 
                        hasWorkers &&                   
                        <CheckBoxInTable label = 'Ходим' id={'worker'}/> 
                    }

                    { 
                        hasPartners &&                   
                        <CheckBoxInTable label = 'Хамкор' id={'partner'}/> 
                    }

                    { 
                        hasFounder &&                   
                        <CheckBoxInTable label = 'Таъсисчи' id={'founder'}/> 
                    }
                </div>
                
                <SelectReferenceInForm 
                    label={getLabelForAnalitic(currentDocument, options)} 
                    typeReference= {getTypeReferenceForAnalitic(currentDocument, options)}
                    visibile={options.analiticIsVisible}
                    currentItemId={currentDocument?.analiticId}
                    type='analitic'
                />

                {
                    contentName == DocumentType.ComeProduct &&
                    <>
                        <SelectReferenceInForm 
                            label={'Ёпувчи исми'} 
                            typeReference= {TypeReference.WORKERS}
                            visibile={true}
                            currentItemId={currentDocument?.firstWorkerId}
                            type='firstWorker'
                        />
                        <SelectReferenceInForm 
                            label={'Биринчи зувалачи исми'} 
                            typeReference= {TypeReference.WORKERS}
                            visibile={options.analiticIsVisible}
                            currentItemId={currentDocument?.secondWorkerId}
                            type='secondWorker'
                        />
                        <SelectReferenceInForm 
                            label={'Иккинчи зувалачи исми'} 
                            typeReference= {TypeReference.WORKERS}
                            visibile={options.analiticIsVisible}
                            currentItemId={currentDocument?.thirdWorkerId}
                            type='thirdWorker'
                        />
                    </>
                }

                <InputInForm nameControl='balance' type='number' label='Колдик' visible={options.countIsVisible} />
                <InputInForm nameControl='count' type='number' label='Сон' visible={options.countIsVisible} />
                
                {
                    !options.tableIsVisible &&
                    <>
                        <InputInForm nameControl='price' type='number' label='Нарх' visible={visibilityPriceValueInDocument(contentName, mainData.user)} isNewDocument/>
                        <InputInForm nameControl='total' type='number' label={contentName == DocumentType.SaleProd? 'Махсулот суммаси':'Сумма'} visible={visibilityTotalValueInDocument(contentName, mainData.user)}/>
                        <InputInForm nameControl='comment' type='text' label='Изох' visible={visibilityCommentValueInDocument(contentName, mainData.user)}/>

                    </>
                }

                {options.tableIsVisible && 
                    <div className={cn(styles.add, {[styles.notView] : false == false})}>
                        <AddIco onClick={() => addItems(setMainData, mainData ,defaultNewItemForTable)}/>
                    </div>
                }
                {/* <InputInForm nameControl='cashFromPartner' type='number' label='Харидордан олинган пул' visible={visibilityCashFromPartnerValueInDocument(contentName, mainData.user)}/> */}
            
                {options.tableIsVisible && 
                    <DocTable 
                        typeReference={TypeReference.TMZ}
                        items={currentDocument.tableItems} 
                />}

            </div>
        </>
    )
}


