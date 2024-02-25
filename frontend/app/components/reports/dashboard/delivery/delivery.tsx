'use client'
import { DeliveryProps } from './delivery.props';
import styles from './delivery.module.css';
import { DeliveryItem } from './deliveryItem/deliveryItem';

export const Delivery = ({className, ...props }: DeliveryProps) :JSX.Element => {
    const map = [1,1,1,1,1,1]
    return (
       <>
            <div className={styles.title}>ДОСТАВЩИКЛАР</div>
            <div className={styles.itemsBox}>
                {map.map(item => {
                    return <DeliveryItem/>
                })}
            </div> 
            
       </>
    )
} 