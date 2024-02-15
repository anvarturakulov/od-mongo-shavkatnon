import { DocValuesProps } from './docValues.props';
import styles from './docValues.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { DocumentType, OptionsForDocument } from '@/app/interfaces/document.interface';
import { CheckBoxInTable } from '../inputs/checkBoxInTable/checkBoxInTable';
import { typeDocumentIsSale } from '@/app/service/documents/typeDocumentIsSale';
import { typeDocumentForLeaveTMZ } from '@/app/service/documents/typeDocumentForLeaveTMZ';
import { getOptionOfDocumentElements } from '@/app/service/documents/getOptionOfDocumentElements';
import { InputInForm } from '../inputs/inputInForm/inputInForm';
import { SelectReferenceInForm } from '../selects/selectReferenceInForm/selectReferenceInForm';
import { SelectReferenceInTable } from '../selects/selectReferenceInTable/selectReferenceInTable';
import { TypeReference } from '@/app/interfaces/reference.interface';

export const DocValues = ({ className, ...props }: DocValuesProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const {contentName, currentDocument} = mainData;
    const role = mainData.user?.role;
    
    let options: OptionsForDocument = getOptionOfDocumentElements(contentName)

    let hasCommentInTable = (contentName == DocumentType.LeaveCash);
    let hasWorkers = (contentName == DocumentType.LeaveCash || contentName == DocumentType.ZpCalculate)
    let hasPartners = contentName == DocumentType.LeaveCash;
    let documentIsSaleType = typeDocumentIsSale(contentName);
    let showBalance = typeDocumentForLeaveTMZ(contentName);

    return (
        <>
            <div className={styles.partnersBox}>
                <SelectReferenceInForm 
                    label={options.receiverLabel} 
                    typeReference={options.receiverType}
                    visibile={options.recieverIsVisible}
                    currentItemId={currentDocument?.values.receiverId}
                    type='receiver'
                />
                
                <SelectReferenceInForm 
                    label={options.senderLabel} 
                    typeReference={options.senderType}
                    visibile={options.senderIsVisible}
                    currentItemId={currentDocument?.values.senderId}
                    type='sender'
                />
                
                <InputInForm 
                    label={options.paymentLabel}
                    type='number' 
                    visible={options.paymentIsVisible}
                    nameControl = 'payment'
                />
            </div>

            <div className={cn(styles.valuesBox)}>
                { 
                    hasWorkers &&                   
                    <CheckBoxInTable 
                        itemIndexInTable={0}
                        isPartner={false}
                    /> 
                }

                { 
                    hasPartners &&                   
                    <CheckBoxInTable 
                        itemIndexInTable={0}
                        isPartner={true}
                    /> 
                }
                
                <SelectReferenceInTable
                    typeReference={TypeReference.TMZ}
                    selectForReciever = {false}
                    label = 'Ходимлар'  
                />

                {/* { 
                    showBalance &&                   
                    <div>{currentDocument?.values.balance}</div>
                } */}

                { !hasCommentInTable && <InputInForm nameControl='count' type='number' label='Сон'/> }
                { !hasCommentInTable && <InputInForm nameControl='price' type='number' label='Нарх'/>}
                
                <InputInForm nameControl='total' type='number' label='Сумма'/>

                { hasCommentInTable && <InputInForm nameControl='comment' type='text' label='Изох'/> }
            </div>
        </>
        

    )
}


