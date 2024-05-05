'use client'
import { SectionItemProps } from './sectionItem.props';
import styles from './sectionItem.module.css';
import cn from 'classnames';
import { Htag } from '@/app/components';
import { numberValue } from '@/app/service/common/converters';

export const SectionItem = ({className, item, sectionType, ...props }: SectionItemProps) :JSX.Element => {
    
    return (
       <>
          <div className={styles.item}>
            <Htag tag='h1'>{item?.section}</Htag>
            {
                sectionType != 'buxgalter'
                &&
                <>
                    <Htag tag='h2' className={styles.h2}>Сон буйича</Htag>
                    <div className={styles.row}>
                        <div className={styles.title}>Кун бошига колдик нони</div>
                        <div className={styles.value}>
                            {numberValue(item?.startBalansCountNon)}
                            <span> ({numberValue(item?.startBalansCountBux)})</span>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>Ишлаб. чик. кирим</div>
                        <div className={styles.value}>
                            {numberValue(item?.prodCountNon)}
                            <span> ({numberValue(item?.prodCountBux)})</span>
                        </div>
                    </div>
                    
                    <div className={styles.row}>
                        <div className={styles.title}>Ички силжиш. кирим</div>
                        <div className={styles.value}>
                            {numberValue(item?.moveIncomeCountNon)}
                            <span> ({numberValue(item?.moveIncomeCountBux)})</span>
                        </div>
                    </div>
                    
                    <div className={styles.row}>
                        <div className={styles.title}>Сотилган нон</div>
                        <div className={styles.value}>
                            {numberValue(item?.saleCountNon)}
                            <span> ({numberValue(item?.saleCountBux)})</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.title}>Брак(истем.) нон</div>
                        <div className={styles.value}>
                            {numberValue(item?.brakCountNon)}
                            <span> ({numberValue(item?.brakCountBux)})</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.title}>Ички сил. чиким</div>
                        <div className={styles.value}>
                            {numberValue(item?.moveOutNon)}
                            <span> ({numberValue(item?.moveOutBux)})</span>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>Зиммасидаги колдик нон</div>
                        <div className={styles.value}>
                            {numberValue(item?.endBalansCountNon)}
                            <span> ({numberValue(item?.endBlanasCountBux)})</span>
                        </div>
                    </div>
                </>
            }

            <Htag tag='h2' className={cn(styles.h2, styles.bottomTitle)}>Пул буйича</Htag>
            <div className={styles.row}>
                <div className={styles.title}>Бошлангич карзи</div>
                <div className={styles.value}>{numberValue(item?.startBalansSumma)}</div>
            </div>
            
            <div className={styles.row}>
                <div className={styles.title}>Пул кирим (махс. сот)</div>
                <div className={styles.value}>{numberValue(item?.incomeFromSaleSumma)}</div>
            </div>

            <div className={styles.row}>
                <div className={styles.title}>Пул силжиш кирим</div>
                <div className={styles.value}>{numberValue(item?.incomeFromMoveSumma)}</div>
            </div>

            <div className={styles.row}>
                <div className={styles.title}>Пул силжиш чиким</div>
                <div className={styles.value}>{numberValue(item?.outFromMoveSumma)}</div>
            </div>
           
            <div className={styles.row}>
                <div className={styles.title}>Пул харажати</div>
                <div className={styles.value}>{numberValue(item?.chargesSumma)}</div>
            </div>
            
            <div className={styles.row}>
                <div className={styles.title}>Охирги карзи</div>
                <div className={styles.value}>{numberValue(item?.endBalansSumma)}</div>
            </div>
          </div>
      </>
    )
} 