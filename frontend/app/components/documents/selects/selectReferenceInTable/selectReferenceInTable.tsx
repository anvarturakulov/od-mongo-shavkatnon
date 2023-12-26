import { SelectReferenceInTableProps } from './selectReferenceInTable.props';
import styles from './selectForReference.module.css';
import cn from 'classnames';
import { ReferencesData } from '@/app/data';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import { ReferenceModel } from '@/app/interfaces/reference.interface';
import { getDataForSwr } from '@/app/service/references.service';


export const SelectReferenceInTable = ({ label, typeReference, className, ...props }: SelectReferenceInTableProps): JSX.Element => {

    const {mainData, setMainData} = useAppContext();
    const { user } = mainData;
    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/byType/'+typeReference;
    
    const { data, mutate } = useSWR(url, (url) => getDataForSwr(url, token));

    return (
        <div className={styles.box}>
            {label !='' && <div className={styles.label}>{label}</div>}
            <select
                className={styles.select}
                {...props}
            >
                {data && data.length>0  && data?.map((item:ReferenceModel, key:number) => (
                    <>
                        <option value={item.name} data-type={item.typeReference} data-id={item._id}>{item.name}</option>
                    </>
                ))}
            </select>
        </div>
    );
};
