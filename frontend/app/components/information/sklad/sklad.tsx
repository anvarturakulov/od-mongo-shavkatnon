'use client'
import { SkladProps } from './sklad.props';
import styles from './sklad.module.css';
import { SkladItem } from './skladItem/skladItem';
import { ReferenceModel } from '@/app/interfaces/reference.interface';

export const Sklad = ({className, data, sectionType, currentSection, ...props }: SkladProps) :JSX.Element => {
    let title = sectionType == 'sklad' ? 'СКЛАД': ''  
    return (
       <>
            <div className={styles.title}>{title}</div>
            <div className={styles.itemsBox}>
                {
                    data && data.length > 0 &&
                    data.filter((item: any) => {
                        if (sectionType == 'sklad') return item?.sklad
                    })
                    .filter((item: ReferenceModel) => {
                        if (currentSection) return item._id == currentSection
                        else return true
                    })
                    .map((item: ReferenceModel, key: number) => {
                        return <SkladItem key={key} currentId= {item._id} data={data} title={item.name} sectionType = {sectionType}/>
                    })
                }
            </div> 
            
       </>
    )
} 