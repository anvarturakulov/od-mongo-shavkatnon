'use client'
import { DocumentProps } from './document.props';
import styles from './document.module.css';
import cn from 'classnames';
import { Button, Htag, Input } from '@/app/components';
import TrashIco from './ico/trash.svg';
import AddIco from './ico/add.svg'

export const Document = ({ className, ...props }: DocumentProps) :JSX.Element => {
    
    return (
        <div className={styles.docBox}>
            <div className={styles.selectBox}>
                <div>
                    <Htag tag='h2'>Хужжат тури</Htag>
                    <input value='Юк чикими' disabled className={styles.input} />
                </div>

                <div>
                    <Htag tag='h2'>Номер</Htag>
                    <input value='000569' disabled className={styles.input} />
                </div>

                <div>
                    <Htag tag='h2'>Сана</Htag>
                    <input value='15/10/2023' disabled className={styles.input}/>
                </div>
                <div>
                    <Htag tag='h2'>Муаллиф</Htag>
                    <input value='Шаршара цех Гулсум опа' disabled className={styles.input} />
                </div>
            </div>

            <div className={styles.taminotchiBox}>
                <div>
                    <Htag tag='h2'>Жунатувчи</Htag>
                    <select
                        className={styles.select}
                        defaultValue={'dashboard'}
                    >
                        <option value="dashboard">Цех Дарё</option>
                        <option value="gild">Цех Халкобод</option>
                        <option value="delivery">Цех Иштихон</option>
                    </select>
                </div>
                <div>
                    <Htag tag='h2'>Олувчи</Htag>
                    <select
                        className={styles.select}
                        defaultValue={'dashboard'}
                    >
                        <option value="dashboard">Саломат</option>
                        <option value="gild">Шукрона Маркет</option>
                        <option value="delivery">Дукон Шаходат опа</option>
                    </select>
                </div>
                <div>
                    <Htag tag='h2'>Мижоздан олинган сумма</Htag>
                    <input className={styles.input} type='number' />
                </div>
                <div>
                    <Htag tag='h2'>Кушимча</Htag>
                    <input className={styles.input} type='number' />
                </div>
                <div></div>
            </div>
            {/* <Htag tag='h2'>Махсулот таснифи</Htag> */}
            
            <div className={cn(styles.TMZ, {
                [styles.notView]: false == false
            })} >
                <div className={styles.boxTMZ}>
                    <Htag tag='h2'>Ходимга</Htag>
                    <Htag tag='h2'>Махсулот номи</Htag>
                    <Htag tag='h2'>Сони</Htag>
                    <Htag tag='h2'>Нархи</Htag>
                    <Htag tag='h2'>Суммаси</Htag>
                    {/* <Htag tag='h2'>Уч.</Htag> */}
                    <div className={styles.ico}>
                        {/* <TrashIco className={styles.ico} /> */}
                    </div>
                </div>
                <div className={styles.boxTMZ}>
                    <div className={styles.checkbox}>
                        <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" />
                    </div>
                    <select
                        className={styles.select}
                        defaultValue={'dashboard'}
                    >
                        <option value="dashboard">Бозор Нон</option>
                        <option value="gild">Буханка</option>
                        <option value="delivery">Патир</option>
                    </select>
                    <input className={styles.input} type='number' />
                    <input className={styles.input} type='number' />
                    <input className={styles.input} type='number' />
                    <div className={styles.ico}>
                        <TrashIco />
                    </div>
                </div>
                <div className={styles.boxTMZ}>
                    <div className={styles.checkbox}>
                        <input  type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" />
                    </div>
                    <select
                        className={styles.select}
                        defaultValue={'dashboard'}
                        value={'gild'}
                    >
                        <option value="dashboard">Бозор Нон</option>
                        <option value="gild">Буханка</option>
                        <option value="delivery">Патир</option>
                    </select>
                    <input className={styles.input} type='number' />
                    <input className={styles.input} type='number' />
                    <input className={styles.input} type='number' />
                    <div className={styles.ico}>
                        <TrashIco />
                    </div>
                </div>
            </div>
            <div className={styles.paybox}>
                <Input placeholder='Кушимча изох'/>
                <div className={cn(styles.add, {
                    [styles.notView] : false == false
                })}>
                    <AddIco/>
                </div>
            </div>

            <div className={styles.boxBtn}>
                <Button appearance='primary'>Жунатиш</Button>
                <Button appearance='ghost'>Бекор килиш</Button>
            </div>
        </div>   
    )
} 