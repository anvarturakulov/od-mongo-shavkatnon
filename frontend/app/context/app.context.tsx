"use client"
import { ReactNode, createContext, useContext, useState } from "react";
import { ContentType, MessageType } from '../interfaces/general.interface';

export interface Maindata {
  activeMenuKey: string,
  contentType?: ContentType,
  contentTitle: string,
  showReferenceWindow: boolean,
  showDocumentWindow: boolean,
  user: string,
  mainPage: boolean,
  showMessageWindow: boolean,
  message: string,
  messageType: MessageType,
}

export interface IAppContext {
  mainData: Maindata,
  setMainData? : (key: string, value: any) => void;
};

const defaultMainData: Maindata = {
    activeMenuKey: '',
    contentType: 'document',
    contentTitle: '',
    showReferenceWindow: false,
    showDocumentWindow: false,
    user: 'Шавкат',
    mainPage: true,
    showMessageWindow: false,
    message: 'Маълумотлар сакланди',
    messageType: 'error',
  }

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
        [key]: value
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