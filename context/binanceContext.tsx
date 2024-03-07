
import { getTradeInfo, getSymbolsInfo } from "@/services/binance.service";

import { createContext, useState, useEffect } from 'react';

export type SymbolsContextType = {
    loading: Number;
};

export const SymbolContext = createContext<SymbolsContextType | null>(null);

const ProvSymbolsContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    const [loading, setLoading] = useState<Number>(0);

    useEffect(() => {
        getSymbolsInfo().then((res: {}[]) => {
            setLoading(100)
            console.log(res)
        })

    }, [])

    return (
        <SymbolContext.Provider value={{ loading }}>
            {children}

        </SymbolContext.Provider>
    );
}

export default ProvSymbolsContext;