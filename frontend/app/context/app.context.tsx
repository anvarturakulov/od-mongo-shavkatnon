"use client"
import { ReactNode, createContext, useContext, useState } from "react";
import { defaultMainData } from './app.context.constants';
import { IAppContext, Maindata } from './app.context.interfaces';

const appContextDefaultValues: IAppContext = {
  mainData: {...defaultMainData},
};

const AppContext = createContext<IAppContext>(appContextDefaultValues);

export function useAppContext() {
    return useContext(AppContext);
}

type Props = {
    children: ReactNode;
};

export function AppProvider({ children }: Props) {
    
    const [data, setData] = useState<Maindata>(defaultMainData);

    const setMainData = (key: string, value: any ):void => {
      setData((data) => ({
        ...data,
        [key]: typeof key != 'object' ? value : {...value}
      }));
    };

    const value = {
        mainData: data,
        setMainData,
    };

    return (
        <>
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </>
    );
}