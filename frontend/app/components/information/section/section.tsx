'use client'
import { SectionProps } from './section.props';
import styles from './section.module.css';
import { SectionItem } from './sectionItem/sectionItem';
import { ReferenceModel } from '@/app/interfaces/reference.interface';

export const Section = ({className, data, sectionType, ...props }: SectionProps) :JSX.Element => {
    let title = sectionType == 'delivery' ? 'ЮК ЕТКАЗУВЧИЛАР' : 'ФИЛИАЛ'  
    return (
       <>
            <div className={styles.title}>{title}</div>
            <div className={styles.itemsBox}>
                {
                    data && data.length > 0 &&
                    data.filter((item: any) => {
                        if (sectionType == 'delivery') return item?.delivery
                        if (sectionType == 'filial') return item?.filial
                    })
                    .map((item: ReferenceModel) => {
                        return <SectionItem currentId= {item._id} data={data} title={item.name} sectionType = {sectionType}/>
                    })
                }
            </div> 
            
       </>
    )
} 