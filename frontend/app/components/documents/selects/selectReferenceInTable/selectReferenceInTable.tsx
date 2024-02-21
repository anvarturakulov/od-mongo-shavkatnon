import { SelectReferenceInTableProps } from './selectReferenceInTable.props';
import styles from './selectReferenceInTable.module.css';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import { ReferenceModel, TypePartners, TypeReference } from '@/app/interfaces/reference.interface';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { Maindata } from '@/app/context/app.context.interfaces';
import { getTypeDocumentForReference } from '@/app/service/documents/getTypeDocumentForReference';
import { DocumentType, DocumentTypeForReference } from '@/app/interfaces/document.interface';
import { query } from '@/app/service/reports/querys/query';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { typeDocumentForLeaveTMZ } from '@/app/service/documents/typeDocumentForLeaveTMZ';
import { sortByName } from '@/app/service/references/sortByName';
import { getTypeReference } from '@/app/service/references/getTypeReference';

export const SelectReferenceInTable = ({ className, ...props }: SelectReferenceInTableProps): JSX.Element => {

    const {mainData, setMainData} = useAppContext();
    const { user, currentDocument, contentName } = mainData;

    let typeReference = TypeReference.TMZ;
    
    if (currentDocument && currentDocument.values.isWorker) {
        typeReference = TypeReference.WORKERS
    }

    if (currentDocument && currentDocument.values.isPartner) {
        typeReference = TypeReference.PARTNERS
    }

    if (currentDocument && contentName == DocumentType.LeaveCash) {
        typeReference = TypeReference.CHARGES
    }

    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/byType/'+typeReference;
    
    const { data, mutate } = useSWR(url, (url) => getDataForSwr(url, token));
    let typeDocumentForReference = getTypeDocumentForReference(contentName);
    
    const changeElements = (e: React.FormEvent<HTMLSelectElement>, setMainData: Function | undefined, mainData: Maindata, typeDocumentForReference:DocumentTypeForReference ) => {
        let target = e.currentTarget;
        let {currentDocument, contentName} = mainData;

        if (currentDocument) {
            
            let currentItem = {...currentDocument.values};
            let id = target[target.selectedIndex].getAttribute('data-id');
            let value = target.value;

            if (id != null) {
                currentItem.analiticId = id
            }
            else {
                currentItem.analiticId = ''               
            }

            if (value != null) {
                currentItem.analiticName = value
            }

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

            let newObj = {
                ...currentDocument,
                values: {...currentItem}
            }
            
            if ( setMainData ) {
                setMainData('currentDocument', {...newObj})
            }
        }
    }

    let label = 'Харажатлар'

    return (
        <div className={styles.box}>
            {label !='' && <div className={styles.label}>{label}</div>}
            <select
                className={styles.select}
                onChange={(e) => changeElements(e, setMainData, mainData, typeDocumentForReference)}
                {...props}
            >
                <option 
                    value={'NotSelected'}
                    data-type={null}
                    data-id={null}
                    selected={true}
                    className={styles.chooseMe}
                >
                    {'Тангланг =>>>>'}
                </option>

                {data && data.length>0 && 
                data?.filter((item:ReferenceModel) => {
                    if (typeReference != TypeReference.PARTNERS) {
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
                .filter((item:ReferenceModel) => !item.deleted)
                .map((item:ReferenceModel, key:number) => (
                    <>
                        <option 
                            value={item.name}
                            data-type={item.typeReference}
                            data-id={item._id}
                            selected={item._id == currentDocument.values.analiticId}
                            >
                                {item.name}
                        </option>
                    </>
                ))}
            </select>
        </div>
    );
};
