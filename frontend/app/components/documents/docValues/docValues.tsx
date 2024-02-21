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
import { TypeReference } from '@/app/interfaces/reference.interface';
import { UserRoles } from '@/app/interfaces/general.interface';
import { getDefinedItemIdForReceiver, getDefinedItemIdForSender, getLabelForAnalitic, getTypeReferenceForAnalitic } from './docValuesOptions';


export const DocValues = ({ className, ...props }: DocValuesProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const {contentName, currentDocument} = mainData;
    const role = mainData.user?.role;
    const storageIdFromUser = mainData.user?.storageId;
    
    let options: OptionsForDocument = getOptionOfDocumentElements(contentName)

    let docWithCash = (contentName == DocumentType.LeaveCash || contentName == DocumentType.MoveCash || contentName == DocumentType.ComeCashFromPartners );
    
    let hasWorkers = (contentName == DocumentType.LeaveCash || contentName == DocumentType.ZpCalculate)
    let hasPartners = contentName == DocumentType.LeaveCash;
    
    let documentIsSaleType = typeDocumentIsSale(contentName);
    let showBalance = typeDocumentForLeaveTMZ(contentName);
    let roleZuvalachiOrHamirchi = (role == UserRoles.HAMIRCHI || role == UserRoles.ZUVALACHI)
    return (
        <>
            <div className={styles.partnersBox}>
                <SelectReferenceInForm 
                    label={options.receiverLabel} 
                    typeReference={options.receiverType}
                    visibile={options.recieverIsVisible}
                    currentItemId={currentDocument?.values.receiverId}
                    type='receiver'
                    definedItemId= {getDefinedItemIdForReceiver(role, storageIdFromUser, contentName)}
                />
                
                <SelectReferenceInForm 
                    label={options.senderLabel} 
                    typeReference={options.senderType}
                    visibile={options.senderIsVisible}
                    currentItemId={currentDocument?.values.senderId}
                    type='sender'
                    definedItemId= {getDefinedItemIdForSender(role, storageIdFromUser, contentName)}
                />
                
            </div>

            <div className={cn(styles.valuesBox)}>
                
                <div className={styles.checkBoxs}>
                    { 
                        hasWorkers &&                   
                        <CheckBoxInTable
                            label = 'Ходим'
                            itemIndexInTable={0}
                            isPartner={false}
                        /> 
                    }

                    { 
                        hasPartners &&                   
                        <CheckBoxInTable
                            label = 'Хамкор'
                            itemIndexInTable={0}
                            isPartner={true}
                        /> 
                    }
                </div>
                
                <SelectReferenceInForm 
                    label={getLabelForAnalitic(currentDocument, options)} 
                    typeReference= {getTypeReferenceForAnalitic(currentDocument, options)}
                    visibile={options.analiticIsVisible}
                    currentItemId={currentDocument?.values.analiticId}
                    type='analitic'
                />

                {/* { 
                    showBalance &&                   
                    <div>{currentDocument?.values.balance}</div>
                } */}

                <InputInForm nameControl='count' type='number' label='Сон' visible={!docWithCash} />
                <InputInForm nameControl='price' type='number' label='Нарх' visible={docWithCash || !roleZuvalachiOrHamirchi}/>
                <InputInForm nameControl='total' type='number' label='Сумма' visible={!roleZuvalachiOrHamirchi}/>
                <InputInForm nameControl='comment' type='text' label='Изох'/>
            </div>
        </>
        

    )
}


