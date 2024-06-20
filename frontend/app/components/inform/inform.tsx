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
import { Material } from './material/material';
import { Financial } from './financial/financial';
import { Giving } from './giving/giving';
import { getReportByType } from './helper';
import { isAdmins } from '@/app/service/common/users';

export const totalByKey = (key:string, data:any[]) => {
    let total = 0;
    data && data.length &&
    data.forEach((item:any) => {
        total += item[key]
    })
    return total
}

export const totalByKeyForFinancial = (key:string, data:any[]) => {
    let total = 0;
    data && data.length &&
    data.forEach((item:any) => {
        total += item[key]
    })
    return total
}


export const Inform = ({className, ...props }: InformationProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { informData, dashboardCurrentReportType, user } = mainData;
    let reportType = dashboardCurrentReportType;
    // if (isAdmins(user)) reportType = 'All'
    useEffect(()=>{
    },[mainData.informData])
    
    
    return (
       <>
            <RefreshPanel/>
            {getReportByType(reportType, informData)}
       </>
    )
} 