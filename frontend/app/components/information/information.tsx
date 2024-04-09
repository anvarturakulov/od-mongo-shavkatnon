'use client'
import { InformationProps } from './information.props';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { Section } from './section/section';
import { Cash } from './cash/cash';
import { RefreshPanel } from './refreshPanel/refreshPanel';
import { Sklad } from './sklad/sklad';
import { Production } from './production/production';
import { Zp } from './zp/zp';

export const Information = ({className, ...props }: InformationProps) :JSX.Element => {
    
    const {mainData, setMainData} = useAppContext();
    const { user } = mainData;
    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/getAll/';
    const { data, mutate } = useSWR(url, (url) => getDataForSwr(url, token));
    
    return (
       <>
            <RefreshPanel/>
            <Cash data={data}/>
            <Section data={data} sectionType='buxgalter'/>
            <Section data={data} sectionType='filial'/>
            <Section data={data} sectionType='delivery'/>
            <Sklad data={data} sectionType='sklad'/>
            <Production data={data} />
            <Zp data={data}/>
       </>
    )
} 