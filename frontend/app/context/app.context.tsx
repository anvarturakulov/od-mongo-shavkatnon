import { PropsWithChildren, ReactNode, createContext, useContext, useState } from "react";
import { ContentType } from '../interfaces/general.interface';

export interface Maindata {
  menu: {
    activeMenuKey: string,
    contentType?: ContentType,
    contentTitle: string,
  }
  window: {
    show: boolean;
  }
  user: {
    name: string,
    role: string
  },
  mainPage: boolean
}

export interface IAppContext {
  mainData: Maindata,
  setMainData : (state:Maindata) => void;
};

const defaultMainData: Maindata = {
    menu: {
      activeMenuKey: '',
      contentType: 'document',
      contentTitle: '',
    },
    window: {
      show: false
    },
    user: {
      name: 'Шавкат',
      role: 'Admin'
    },
    mainPage: true
  }

const appContextDefaultValues: IAppContext = {
  mainData: {...defaultMainData},
  setMainData: (state:Maindata) => {}
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

    const setMainData = (state:Maindata):void => {
      console.log('Anvar');  
      setData(state);
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