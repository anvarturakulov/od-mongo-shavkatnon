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
import { getDefinedItemIdForReceiver, getDefinedItemIdForSender, getLabelForAnalitic, getTypeReferenceForAnalitic, saveItemId, visibilityCashFromPartnerValueInDocument, visibilityPriceValueInDocument, visibilityTotalValueInDocument } from './docValuesOptions';

export const DocValues = ({ className,setDefinedValues, ...props }: DocValuesProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const {contentName, currentDocument} = mainData;
    const role = mainData.user?.role;
    const storageIdFromUser = mainData.user?.storageId;
    
    let options: OptionsForDocument = getOptionOfDocumentElements(contentName)

    let docWithCash = (contentName == DocumentType.LeaveCash || contentName == DocumentType.MoveCash || contentName == DocumentType.ComeCashFromPartners );
    
    let hasWorkers = (contentName == DocumentType.LeaveCash || contentName == DocumentType.ZpCalculate)
    let hasPartners = contentName == DocumentType.LeaveCash;
    let hasFounder = contentName == DocumentType.LeaveCash;
    
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
                        <CheckBoxInTable label = 'Ходим' itemIndexInTable={0} id={'worker'}/> 
                    }

                    { 
                        hasPartners &&                   
                        <CheckBoxInTable label = 'Хамкор' itemIndexInTable={0} id={'partner'}/> 
                    }

                    { 
                        hasFounder &&                   
                        <CheckBoxInTable label = 'Таъсисчи' itemIndexInTable={0} id={'founder'}/> 
                    }
                </div>
                
                <SelectReferenceInForm 
                    label={getLabelForAnalitic(currentDocument, options)} 
                    typeReference= {getTypeReferenceForAnalitic(currentDocument, options)}
                    visibile={options.analiticIsVisible}
                    currentItemId={currentDocument?.analiticId}
                    type='analitic'
                />

                {/* { 
                    showBalance &&                   
                    <div>{currentDocument?.values.balance}</div>
                } */}

                <InputInForm nameControl='count' type='number' label='Сон' visible={!docWithCash} />
                <InputInForm nameControl='price' type='text' label='Нарх' visible={visibilityPriceValueInDocument(contentName, mainData.user)}/>
                <InputInForm nameControl='total' type='text' label={contentName == DocumentType.SaleProd? 'Махсулот суммаси':'Сумма'} visible={visibilityTotalValueInDocument(contentName, mainData.user)}/>
                {/* <InputInForm nameControl='cashFromPartner' type='number' label='Харидордан олинган пул' visible={visibilityCashFromPartnerValueInDocument(contentName, mainData.user)}/> */}
                <InputInForm nameControl='comment' type='text' label='Изох'/>
            </div>
        </>
        

    )
}


