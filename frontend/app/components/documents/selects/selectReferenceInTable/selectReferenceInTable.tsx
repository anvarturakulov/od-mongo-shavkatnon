import { SelectReferenceInTableProps } from './selectReferenceInTable.props';
import styles from './selectReferenceInTable.module.css';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import { ReferenceModel, TypeReference } from '@/app/interfaces/reference.interface';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { Maindata } from '@/app/context/app.context.interfaces';
import { getTypeDocumentForReference } from '@/app/service/documents/getTypeDocumentForReference';
import { DocumentTypeForReference } from '@/app/interfaces/document.interface';
import { query } from '@/app/service/reports/querys/query';
import { Schet, TypeQuery } from '@/app/interfaces/report.interface';
import { sortByName } from '@/app/service/references/sortByName';

export const SelectReferenceInTable = ({  selectForReciever , typeReference, itemIndexInTable, currentItemId, className, ...props }: SelectReferenceInTableProps): JSX.Element => {

    const {mainData, setMainData} = useAppContext();
    const { user, contentName } = mainData;

    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/byType/'+typeReference;
    
    const { data, mutate } = useSWR(url, (url) => getDataForSwr(url, token));
    let typeDocumentForReference = getTypeDocumentForReference(contentName);
    
    const changeElements = (e: React.FormEvent<HTMLSelectElement>, itemIndex: number, setMainData: Function | undefined, mainData: Maindata, typeDocumentForReference:DocumentTypeForReference ) => {
        let target = e.currentTarget;
        let {currentDocument, contentName} = mainData;

        if (currentDocument && currentDocument.tableItems) {
            
            let currentItem = {...currentDocument.tableItems[itemIndex]};
            let id = target[target.selectedIndex].getAttribute('data-id');
            let value = target.value;

            if (id != null) {
                currentItem.referenceId = id
            } else {
                currentItem.referenceId = ''                
            }

            // if ( typeDocumentForPrice(contentName) && id != null && !selectForReciever) {
            //     let schet
            //     schet = Schet.S10
            //     currentItem.price = +query(schet, TypeQuery.MPRICE, id, mainData);
            //     currentItem.balance = +query(schet, TypeQuery.BALANCE, id, mainData, true, currentDocument.senderId );
            // }

            let newItems = [...currentDocument.tableItems]
            newItems[itemIndex] = {...currentItem}
            let newObj = {
                ...currentDocument,
                tableItems: [...newItems]
            }
            
            if ( setMainData ) {
                setMainData('currentDocument', {...newObj})
            }
        }
    }

    return (
        <div className={styles.box}>
            <select
                className={styles.select}
                onChange={(e) => changeElements(e, itemIndexInTable, setMainData, mainData, typeDocumentForReference)}
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
                    return item.typeTMZ == 'MATERIAL'
                })
                .sort(sortByName)
                .filter((item:ReferenceModel) => !item.deleted)
                .map((item:ReferenceModel, key:number) => (
                    <>
                        <option 
                            value={item.name}
                            data-type={item.typeReference}
                            data-id={item._id}
                            selected={item._id == currentItemId}
                            >
                                {item.name}
                        </option>
                    </>
                ))}
            </select>
        </div>
    );
};