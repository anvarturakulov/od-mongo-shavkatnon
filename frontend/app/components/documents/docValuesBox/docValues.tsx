import { DocValuesProps } from './docValues.props';
import styles from './docTable.module.css';
import cn from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { SelectReferenceInTable } from '../selects/selectReferenceInTable/selectReferenceInTable';
import { DocumentType, OptionsForDocument } from '@/app/interfaces/document.interface';
import { InputInTable } from '../inputs/inputInTable/inputInTable';
import { CheckBoxInTable } from '../inputs/checkBoxInTable/checkBoxInTable';
import { typeDocumentIsSale } from '@/app/service/documents/typeDocumentIsSale';
import { typeDocumentForLeaveTMZ } from '@/app/service/documents/typeDocumentForLeaveTMZ';
import { TypeReference } from '@/app/interfaces/reference.interface';
import { getOptionOfDocumentElements } from '@/app/service/documents/getOptionOfDocumentElements';
import { InputInForm } from '../inputs/inputInForm/inputInForm';
import { SelectReferenceInForm } from '../selects/selectReferenceInForm/selectReferenceInForm';

export const DocValues = ({ typeReference,  className, ...props }: DocValuesProps): JSX.Element => {
    
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
                    payValue = {currentDocument.values.payment}
                />
            </div>

            <div className={cn(styles.valuesBox, 
            {
                [styles.boxWithBalance]: showBalance,
                [styles.boxWithWorkers]: hasWorkers,
                [styles.boxWithReciever]: documentIsSaleType,

            })}>
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
                
                <SelectReferenceInForm 
                    label={'****'} 
                    typeReference={options.senderType}
                    visibile={options.senderIsVisible}
                    currentItemId={currentDocument?.values.referenceId}
                    type='sender'
                />

                { 
                    showBalance &&                   
                    <div>{currentDocument?.values.balance}</div>
                }

                { !hasCommentInTable && <InputInTable nameControl='count' type='number' itemIndexInTable={index}/> }
                { !hasCommentInTable && <InputInTable nameControl='price' type='number' itemIndexInTable={index}/>}
                
                <InputInTable nameControl='total' type='number' itemIndexInTable={index}/>

                { hasCommentInTable && <InputInTable nameControl='comment' type='text' itemIndexInTable={index}/> }
            </div>
        </>
        

    )
}


