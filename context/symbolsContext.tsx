'use client';

import { getSymbolsFromBinance } from "@/services/binance.service";
import { getSymbolsFromCoinBase } from "@/services/coinbase.service";
import { getSymbolsFromGateIo } from "@/services/gateio.service";
import { getSymbolsFromHuobi } from "@/services/huobi.service";
import { getSymbolsFromKuCoin } from "@/services/kucoin.service";
import { getSymbolsFromKraken } from "@/services/kraken.service";
import { getSymbolsFromCryptoCom } from "@/services/cryptoCom.service";
import { getSymbolsFromOkx } from "@/services/okx.service";

import { symbolListAnswer, SymbolsContextType, SymbolsObjectList, AllCoinsObjectList } from "@/services/symbolsTypes";

import { createContext, useState, useEffect } from 'react';


export const SymbolContext = createContext<SymbolsContextType | null>(null);

const ProvSymbolsContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    const [loading, setLoading] = useState<number>(0);

    const [symbolObj, setSymbolObj] = useState<SymbolsObjectList>({
        binance: null,
        coinbase: null,
        gateio: null,
        huobi: null,
        kucoin: null,
        kraken: null,
        cryptocom: null,
        okx: null,
    });

    const [symbolList, setSymbolList] = useState<{ [key: string]: {}; }>({});


    useEffect(() => {

        getSomeSymbols(getSymbolsFromBinance, 'binance');
        getSomeSymbols(getSymbolsFromCoinBase, 'coinbase');
        getSomeSymbols(getSymbolsFromGateIo, 'gateio');
        getSomeSymbols(getSymbolsFromHuobi, 'huobi');
        getSomeSymbols(getSymbolsFromKuCoin, 'kucoin');
        getSomeSymbols(getSymbolsFromKraken, 'kraken');
        getSomeSymbols(getSymbolsFromCryptoCom, 'cryptocom');
        getSomeSymbols(getSymbolsFromOkx, 'okx');
        setLoading(prev => (prev + 4));

    }, [])

    useEffect(() => {
        remakeSymbolsToList();
    }, [symbolObj]);

    const getSomeSymbols: (getSymbol: () => any, symbol: string) => boolean = (getSymbol, symbol) => {
        return getSymbol().then((res: symbolListAnswer) => {
            setSymbolObj(prev => addSymbols(prev, { [symbol]: res }));
            setLoading(prev => (prev + 12));
            return true;
        })
    };

    const addSymbols: (prev: SymbolsObjectList, newSym: {}) => SymbolsObjectList = (prev, newSym) => {
        return Object.assign({}, prev, newSym);
    }

    const remakeSymbolsToList = () => {

        const hugeListSymbols: AllCoinsObjectList = {};

        symbolObj && Object.keys(symbolObj).forEach(exCompany => {
            symbolObj[exCompany] && Object.keys(symbolObj[exCompany].listQuote).forEach(coin => {
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