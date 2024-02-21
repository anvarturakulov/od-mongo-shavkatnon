import { SelectReferenceInFormProps, TypeForSelectInForm } from './selectReferenceInForm.props';
import styles from './selectReferenceInForm.module.css';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import cn from 'classnames';
import { ReferenceModel, TypeReference } from '@/app/interfaces/reference.interface';
import { Maindata } from '@/app/context/app.context.interfaces';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { sortByName } from '@/app/service/references/sortByName';
import { typeDocumentForLeaveTMZ } from '@/app/service/documents/typeDocumentForLeaveTMZ';
import { getTypeDocumentForReference } from '@/app/service/documents/getTypeDocumentForReference';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { query } from '@/app/service/reports/querys/query';

export const SelectReferenceInForm = ({ label, typeReference, visibile=true , definedItemId ,currentItemId, type, className, ...props }: SelectReferenceInFormProps): JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();

    const { user, contentName } = mainData;
    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/byType/'+typeReference;
    const { data, mutate } = useSWR(url, (url) => getDataForSwr(url, token));

    const changeElements = (e: React.FormEvent<HTMLSelectElement>, setMainData: Function | undefined, mainData: Maindata, type: TypeForSelectInForm) => {

        
        let {currentDocument, contentName} = mainData;
        
        if (currentDocument) {
            
            let target = e.currentTarget;
            let currentItem = {...currentDocument.values};
            let id = target[target.selectedIndex].getAttribute('data-id');
            let value = target.value;
            let key:string = `${type}+Id`
            let typeDocumentForReference = getTypeDocumentForReference(contentName);
        
            if ( typeDocumentForLeaveTMZ(contentName) && id ) {
                let schet

                if (typeDocumentForReference == 'MATERIAL') {
                    schet = Schet.S10
                }

                if (typeDocumentForReference == 'HALFSTUFF') {
                    schet = Schet.S21;
                }

                if (typeDocumentForReference == 'PRODUCT') {
                    schet = Schet.S28    
                }
                
                if (schet) {
                    currentItem.price = +query(schet, TypeQuery.MPRICE, id, mainData);
                    currentItem.balance = +query(schet, TypeQuery.BALANCE, id, mainData, true, currentDocument.values.senderId );
                }
            }

            if (type == 'sender' && id) currentItem.senderId = id
            if (type == 'receiver' && id) currentItem.receiverId = id
            if (type == 'analitic' && id) currentItem.analiticId = id

            let newObj = {
                    ...currentDocument,
                    values: {...currentItem}
                }

            if ( setMainData ) {
                setMainData('currentDocument', {...newObj})
            }
        }
        
    }
    
    if (visibile == false) return <></>
    let typeDocumentForReference = getTypeDocumentForReference(contentName);
    return (
        <div className={styles.box}>
            {label !='' && <div className={styles.label}>{label}</div>}
            <select
                className={cn(styles.select)}
                {...props}
                onChange={(e) => changeElements(e, setMainData, mainData, type)}
                disabled = { Boolean(definedItemId) }
            >   
                <>
                    <option 
                        value={'NotSelected'} 
                        data-type={null} 
                        data-id={null}
                        className={styles.chooseMe}
                        selected = {true}
                        
                        >{'Тангланг =>>>>'}</option>
                </>
                {data && data.length>0  &&
                data
                .filter((item:ReferenceModel) => {
                    if (typeReference == TypeReference.TMZ) {
                        switch (typeDocumentForReference) {
                            case 'MATERIAL':
                                return item.typeTMZ == 'MATERIAL'
                            case 'PRODUCT':
                                return item.typeTMZ == 'PRODUCT'
                            case 'HALFSTUFF':
                                return item.typeTMZ == 'HALFSTUFF'
                            case 'OTHER':
                                return true
                        }
                    } else {
                        return true
                    }
                })
                .sort(sortByName)
                .filter(( item:ReferenceModel ) => !item.deleted )
                .map(( item:ReferenceModel ) => (
                    <>
                        <option 
                            key = {item._id}
                            value={item.name}
                            data-type={item.typeReference} 
                            data-id={item._id}
                            selected={item._id == definedItemId || item._id == currentItemId} 
                            >
                                {item.name}
                        </option>  
                    </>
                ))}
            </select>
        </div>
    );
};
