import { SelectReferenceInTableProps } from './selectReferenceInTable.props';
import styles from './selectReferenceInTable.module.css';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import { ReferenceModel, TypeReference } from '@/app/interfaces/reference.interface';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { Maindata } from '@/app/context/app.context.interfaces';

export const SelectReferenceInTable = ({ typeReference, itemIndexInTable, currentItemId, className, ...props }: SelectReferenceInTableProps): JSX.Element => {

    const {mainData, setMainData} = useAppContext();
    const { user, currentDocument } = mainData;
    if (currentDocument.tableItems && currentDocument.tableItems[itemIndexInTable].isWorker) {
        typeReference = TypeReference.WORKERS
    }

    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/byType/'+typeReference;
    
    const { data, mutate } = useSWR(url, (url) => getDataForSwr(url, token));
    
    const changeElements = (e: React.FormEvent<HTMLSelectElement>, itemIndex: number, setMainData: Function | undefined, mainData: Maindata) => {
        let target = e.currentTarget;
        let {currentDocument} = mainData;

        if (currentDocument && currentDocument.tableItems) {
            
            let currentItem = {...currentDocument.tableItems[itemIndex]}
            let id = target[target.selectedIndex].getAttribute('data-id')
            let value = target.value
            
            if (id != null) {
                currentItem.referenceId = id
            }

            if (value != null) {
                currentItem.referenceName = value
            }


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
                onChange={(e) => changeElements(e, itemIndexInTable, setMainData, mainData)}
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

                {data && data.length>0 && data?.map((item:ReferenceModel, key:number) => (
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
