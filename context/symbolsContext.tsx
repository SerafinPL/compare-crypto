'use client';
import { createContext, useState, useEffect } from 'react';
import { symbolListAnswer, SymbolsContextType, SymbolsObjectList, AllCoinsObjectList, AllCoinsPriceList } from "@/services/symbolsTypes";


import { getSymbolsFromBinance, getExchangesFromBinance } from "@/services/binance.service";
import { getSymbolsFromCoinBase, getExchangesFromCoinBase } from "@/services/coinbase.service";
import { getSymbolsFromGateIo, getExchangesFromGateIO } from "@/services/gateio.service";
import { getSymbolsFromHuobi, getExchangesFromHuobi } from "@/services/huobi.service";
import { getSymbolsFromKuCoin, getExchangesFromKuCoin } from "@/services/kucoin.service";
import { getSymbolsFromKraken, getExchangesFromKraken } from "@/services/kraken.service";
import { getSymbolsFromCryptoCom, getExchangesFromCryptoCom } from "@/services/cryptoCom.service";
import { getSymbolsFromOkx, getExchangesFromOkx } from "@/services/okx.service";

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

    const [priceObj, setPriceObj] = useState<{}>({});


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

    const addPrices: (prev: {}, newSym: {}) => {} = (prev, newSym) => {
        return Object.assign({}, prev, newSym);
    }

    const remakeSymbolsToList = () => {

        const hugeListSymbols: AllCoinsObjectList = {};

        symbolObj && Object.keys(symbolObj).forEach(exCompany => {
            symbolObj[exCompany] && Object.keys(symbolObj[exCompany].listBase).forEach(coin => {
                hugeListSymbols[coin] = hugeListSymbols[coin] ? hugeListSymbols[coin] : {};
                hugeListSymbols[coin][exCompany] = true;
            })
        })

        return setSymbolList(hugeListSymbols);
    }

    const getPriceList = (symbol: string) => {


        getExchangesFromCoinBase(symbol).then(res => {
            setPriceObj(prev => addPrices(prev, { coinbase: res }));
        })

        getExchangesFromBinance(symbol).then(res => {
            setPriceObj(prev => addPrices(prev, { binance: res }));
        })

        getExchangesFromGateIO(symbol).then(res => {
            setPriceObj(prev => addPrices(prev, { gateio: res }));
        })

        getExchangesFromHuobi(symbol).then(res => {
            setPriceObj(prev => addPrices(prev, { huobi: res }));
        })

        getExchangesFromKuCoin(symbol).then(res => {
            setPriceObj(prev => addPrices(prev, { kucoin: res }));
        })

        getExchangesFromKraken(symbol).then(res => {
            setPriceObj(prev => addPrices(prev, { kraken: res }));
        })

        getExchangesFromCryptoCom(symbol).then(res => {        
            setPriceObj(prev => addPrices(prev, { cryptocom: res }));
        })

        getExchangesFromOkx(symbol).then(res => {        
            setPriceObj(prev => addPrices(prev, { okx: res }));
        })
    }


    return (
        <SymbolContext.Provider value={{ loading, symbolObj, symbolList, getPriceList, priceObj }}>
            {children}
        </SymbolContext.Provider>
    );
}

export default ProvSymbolsContext;