'use client'
import { DeliveryItemProps } from './deliveryItem.props';
import styles from './deliveryItem.module.css';
import { Htag } from '@/app/components';

export const DeliveryItem = ({className, ...props }: DeliveryItemProps) :JSX.Element => {
    
    return (
       <>
          <div className={styles.item}>
            <Htag tag='h1'>Мусо</Htag>
            <Htag tag='h2'>Сон буйича</Htag>
            <div className={styles.row}>
                <div className={styles.title}>Кун бошига колдик нони</div>
                <div className={styles.value}>0</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Цехдан олинган нон</div>
                <div className={styles.value}>1590</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Сотилган нон</div>
                <div className={styles.value}>1500</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Цехга кайтарилган нон</div>
                <div className={styles.value}>10</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Зиммасидаги колдик нон</div>
                <div className={styles.value}>80</div>
            </div>
            <Htag tag='h2'>Пул буйича</Htag>
            <div className={styles.row}>
                <div className={styles.title}>Бошлангич карзи</div>
                <div className={styles.value}>600,000</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Махсулот олди</div>
                <div className={styles.value}>14,500,000</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Махсулот кайтарди</div>
                <div className={styles.value}>100,000</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Пул олиб келди</div>
                <div className={styles.value}>13,200,000</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Охирги карзи</div>
                <div className={styles.value}>1,800,000</div>
            </div>
          </div>
      </>
    )
} 