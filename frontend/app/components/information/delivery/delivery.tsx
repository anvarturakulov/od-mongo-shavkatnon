'use client'
import { DeliveryProps } from './delivery.props';
import styles from './delivery.module.css';
import { DeliveryItem } from './deliveryItem/deliveryItem';
import { ReferenceModel } from '@/app/interfaces/reference.interface';

export const Delivery = ({className, data, ...props }: DeliveryProps) :JSX.Element => {

    return (
       <>
            <div className={styles.title}>ДОСТАВЩИКЛАР</div>
            <div className={styles.itemsBox}>
                {
                    data && data.length > 0 &&
                    data.filter((item: any) => item?.delivery)
                    .map((item: ReferenceModel) => {
                        return <DeliveryItem currentDeliveryId= {item._id} data={data} title={item.name}/>
                    })
                }
            </div> 
            
       </>
    )
} 