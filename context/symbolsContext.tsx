'use client';

import { getTradeInfo, getSymbolsFromBinance } from "@/services/binance.service";
import { getSymbolsFromCoinBase } from "@/services/coinbase.service";

import { createContext, useState, useEffect } from 'react';

export type SymbolsContextType = {
    loading: number;
};

export const SymbolContext = createContext<SymbolsContextType | null>(null);

const ProvSymbolsContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    const [loading, setLoading] = useState<number>(0);

    useEffect(() => {
        getSymbolsFromBinance().then((res: {}[]) => {
            setLoading(prev => (prev + 50))
            console.log(res)
        })
        getSymbolsFromCoinBase().then((res: {}[]) => {
            setLoading(prev => (prev + 50))
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