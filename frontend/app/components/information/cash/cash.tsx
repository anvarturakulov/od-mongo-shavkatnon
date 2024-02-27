'use client'
import { CashProps } from './cash.props';
import { CashItem } from './cashItem/cashItem';
import styles from './delivery.module.css';
import { ReferenceModel } from '@/app/interfaces/reference.interface';

export const Cash = ({className, data, ...props }: CashProps) :JSX.Element => {

    return (
       <>
            <div className={styles.title}>Касса</div>
            <div className={styles.itemsBox}>
                {
                    data && data.length > 0 &&
                    data.filter((item: any) => item?.delivery)
                    .map((item: ReferenceModel) => {
                        return <CashItem currentDeliveryId= {item._id} data={data} title={item.name}/>
                    })
                }
            </div> 
            
       </>
    )
} 