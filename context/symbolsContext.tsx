'use client';

import { getSymbolsFromBinance } from "@/services/binance.service";
import { getSymbolsFromCoinBase } from "@/services/coinbase.service";
import { getSymbolsFromGateIo } from "@/services/gateio.service";
import { getSymbolsFromHuobi } from "@/services/huobi.service";
import { getSymbolsFromKuCoin } from "@/services/kucoin.service";


import { createContext, useState, useEffect } from 'react';
import axios from "axios";

export interface listKey {
    [key: string]: boolean;
}

export interface listKeyWithName {
    [key: string]: string;
}

export type SymbolsContextType = {
    loading: number;
    symbolObj: SymbolsObjectList;
    symbolList: { [key: string]: any; };
};

export type SymbolsObjectList = {
    [key: string]: any;
    binance: listKey | null;
    coinbase: listKeyWithName | null;
    gateio: listKey | null;
    huobi: listKey | null;
    kucoin: listKey | null;


};

export const SymbolContext = createContext<SymbolsContextType | null>(null);

const ProvSymbolsContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    const [loading, setLoading] = useState<number>(0);

    const [symbolObj, setSymbolObj] = useState<SymbolsObjectList>({
        binance: null,
        coinbase: null,
        gateio: null,
        huobi: null,
        kucoin: null,

    });


    const [symbolList, setSymbolList] = useState<{ [key: string]: {}; }>({});


    useEffect(() => {
        const reqSymbolsList: any[] = [];

        getSymbolsFromBinance().then((res: { listBase: any; }) => {

            setSymbolObj(prev => addSymbols(prev, { binance: res.listBase }));
            setLoading(prev => (prev + 20));
            return true;
        })
        getSymbolsFromCoinBase().then((res: { listBase: any }) => {

            setSymbolObj(prev => addSymbols(prev, { coinbase: res.listBase }));
            setLoading(prev => (prev + 20));
            return true;
        })
        getSymbolsFromGateIo().then((res: { listBase: any }) => {

            setSymbolObj(prev => addSymbols(prev, { gateio: res.listBase }));
            setLoading(prev => (prev + 20));
            return true;
        })
        getSymbolsFromHuobi().then((res: { listBase: any }) => {

            setSymbolObj(prev => addSymbols(prev, { huobi: res.listBase }));
            console.log(res.listBase);

            setLoading(prev => (prev + 20));
            return true;
        })
        getSymbolsFromKuCoin().then((res: { listBase: any }) => {

            setSymbolObj(prev => addSymbols(prev, { kucoin: res.listBase }));
            console.log(res.listBase);

            setLoading(prev => (prev + 20));
            return true;
        })
        setLoading(prev => (prev + 0));

    }, [])

    useEffect(() => {
        remakeSymbolsToList();

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