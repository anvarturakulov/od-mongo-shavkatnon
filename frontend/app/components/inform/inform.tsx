'use client'
import { InformationProps } from './inform.props';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { Section } from './section/section';
import { Cash } from './cash/cash';
import { RefreshPanel } from './refreshPanel/refreshPanel';
import { Sklad } from './sklad/sklad';
import { Production } from './production/production';
import { Zp } from './zp/zp';
import { UserRoles } from '@/app/interfaces/general.interface';
import { Taking } from './taking/taking';
import { Foyda } from './foyda/foyda';
import { Norma } from './norma/norma';
import { useEffect } from 'react';

export const totalByKey = (key:string, data:any[]) => {
    let total = 0;
    data && data.length &&
    data.forEach((item:any) => {
        total += item[key]
    })
    return total
}


export const Inform = ({className, ...props }: InformationProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { user, informData } = mainData;
    
    useEffect(()=>{
    },[mainData.informData])
    
    return (
       <>
            <RefreshPanel/>
            {
                user?.role != UserRoles.ZAMGLBUX &&
                user?.role != UserRoles.GLBUX &&
                  <>
                    <Cash data={informData}/>
                    <Foyda data={informData}/>
                  </>
            }
            {
                user?.role != UserRoles.ZAMGLBUX &&
                <>
                    <Taking data={informData} />
                    <Section data={informData} sectionType='buxgalter'/>
                    <Section data={informData} sectionType='filial'/>
                    <Section data={informData} sectionType='delivery'/>
                    <Sklad data={informData}/>
                    <Production data={informData} />
                    {/* <Zp data={data}/> */}
                    <Norma data={informData}/>    
                </>
            }

            {
                user?.role != UserRoles.ZAMGLBUX &&
                user?.role != UserRoles.GLBUX &&
                  <>
                    <Section data={informData} sectionType='founder'/>
                  </>
            }

            {
                user?.role == UserRoles.ZAMGLBUX &&
                <>
                    <Section data={informData} sectionType='buxgalter' currentSection={user.storageId}/>
                    <Sklad data={informData}/>
                </>

            }
            

       </>
    )
} 