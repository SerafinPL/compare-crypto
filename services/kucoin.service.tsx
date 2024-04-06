
import axios from "axios";
import { listKey, basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols, uniRemakePricesSymbolList, uniRemakeToPriceObj } from "./ uniFunc";

const baseApi: basisApi = {
    domain: 'https://api.kucoin.com/api/v2/',
    domainV1: 'https://api.kucoin.com/api/v1/',
    info: 'symbols',
    marketAll: 'market/allTickers',
}

const setKuCoinSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data, 'baseCurrency', 'quoteCurrency');
}

export const getSymbolsFromKuCoin: () => Promise<any> = () => {

    return axios.get('/kucoin-currency_pairs').then(res => setKuCoinSymbols(res.data.data), err => console.log);
}

export const getExchangesFromKuCoin: (currency: string) => Promise<any> = (currency) => {

    return axios.get('/kucoin-currency_prices').then(res => {

        const filteredSymbols = uniRemakePricesSymbolList(res.data.data.ticker, 'symbol', currency);
        return uniRemakeToPriceObj(filteredSymbols, 'symbol', 'averagePrice', currency, 1);
        
    }, err => console.log);
}