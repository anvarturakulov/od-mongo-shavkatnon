'use client'
import { useEffect, useState } from 'react';
import { InformationProps } from './information.props';
import styles from './information.module.css';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { getEntrysJournal } from '@/app/service/reports/getEntrysJournal';
import { Button } from '../common/button/Button';
import { Maindata } from '@/app/context/app.context.interfaces';
import { Section } from './section/section';
import { Cash } from './cash/cash';
import DateIco from './date.svg'
import { RefreshPanel } from './refreshPanel/refreshPanel';
import { Sklad } from './sklad/sklad';

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
            <Sklad data={data} sectionType='sklad'/>
            <Section data={data} sectionType='delivery'/>
            <Section data={data} sectionType='filial'/>
       </>
    )
} 