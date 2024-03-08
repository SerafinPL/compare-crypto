'use client';

import { getSymbolsFromBinance } from "@/services/binance.service";
import { getSymbolsFromCoinBase } from "@/services/coinbase.service";

import { createContext, useState, useEffect } from 'react';
import axios from "axios";

export interface listKey {
    [key: string]: boolean;
}

export interface listKeyWithName {
    [key: string]: string;
}

// export interface listExchangeCom {
//     binance: string: listKey | null;
//     coinbase: string: listKeyWithName | null;
// }


export type SymbolsContextType = {
    loading: number;
    symbolObj: SymbolsObjectList;
    symbolList: {[key: string]: any;};
};

export type SymbolsObjectList = {
    [key: string]: any;
    binance: listKey | null;
    coinbase: listKeyWithName | null;
};

export const SymbolContext = createContext<SymbolsContextType | null>(null);

const ProvSymbolsContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    const [loading, setLoading] = useState<number>(0);

    const [symbolObj, setSymbolObj] = useState<SymbolsObjectList>({
        binance: null,
        coinbase: null,
    });

    const [symbolList, setSymbolList] = useState<{ [key: string]: {}; }>({});


    useEffect(() => {

        const reqSymbolsList: any[] = [];

        getSymbolsFromBinance().then((res: { listBase: any; }) => {

            setSymbolObj(prev => addSymbols(prev, { binance: res.listBase }));
            setLoading(prev => (prev + 50));
            return true;
        })
        getSymbolsFromCoinBase().then((res: { listBase: any }) => {

            setSymbolObj(prev => addSymbols(prev, { coinbase: res.listBase }));
            setLoading(prev => (prev + 50));
            return true;
        })

    }, [])

    useEffect(() => {
        console.log(remakeSymbolsToList());
        console.log(symbolList);
    }, [symbolObj]);

    const addSymbols: (prev: SymbolsObjectList, newSym: listKey) => SymbolsObjectList = (prev, newSym) => {
        return Object.assign({}, prev, newSym);
    }

    const remakeSymbolsToList = () => {

        const hugeListSymbols: {
            [key: string]: { [key: string]: boolean };
        } = {};

        symbolObj && Object.keys(symbolObj).forEach(exCompany => {
            symbolObj[exCompany] && Object.keys(symbolObj[exCompany]).forEach(coin => {
                hugeListSymbols[coin] = hugeListSymbols[coin] ? hugeListSymbols[coin] : {};
                hugeListSymbols[coin][exCompany] = true;
            })
        })

        return setSymbolList(hugeListSymbols);
    }


    return (
        <SymbolContext.Provider value={{ loading, symbolObj, symbolList }}>
            {children}
        </SymbolContext.Provider>
    );
}

export default ProvSymbolsContext;