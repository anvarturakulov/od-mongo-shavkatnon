'use client'
import { useState } from 'react';
import { InformationProps } from './information.props';
import styles from './information.module.css';
import { useAppContext } from '@/app/context/app.context';
import useSWR from 'swr';
import { getDataForSwr } from '@/app/service/common/getDataForSwr';
import { getEntrysJournal } from '@/app/service/reports/getEntrysJournal';
import { Button } from '../common/button/Button';
import { Maindata } from '@/app/context/app.context.interfaces';
import { Delivery } from './delivery/delivery';

export const Information = ({className, ...props }: InformationProps) :JSX.Element => {
    const {mainData, setMainData} = useAppContext();
    const [refresh, setRefresh] = useState<boolean>(false)
    const { user } = mainData;
    const token = user?.access_token;
    const url = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/getAll/';

    const { data, mutate } = useSWR(url, (url) => getDataForSwr(url, token));

    const refreshReport = (mainData: Maindata, setMainData: Function | undefined) => {
        getEntrysJournal(setMainData, mainData);
        setRefresh(state => !state)
        // setRefresh(state => !state)
    }

    return (
       <>
            <Button appearance='primary' onClick={(e) => refreshReport(mainData, setMainData)}>Янгилаш</Button>
            {
               refresh &&
                <Delivery data={data}/>
            }
       </>
    )
} 