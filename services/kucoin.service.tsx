
import axios from "axios";
import { listKey, basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols } from "./ uniFunc";

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
    return axios.get(`${baseApi.domainV1}${baseApi.marketAll}`).then(res => {
        const filteredSymbols = res.data.data.ticker.filter((el: { symbol: string }) => {
            return el.symbol.substring( el.symbol.length-currency.length,el.symbol.length )== currency;
        })

        let answerObj:{ [key: string]:  number } = {};
        filteredSymbols.forEach((el:{symbol:string, averagePrice: string}) => {
            answerObj[el.symbol.substring(0,el.symbol.length-currency.length-1)] = Number(el.averagePrice);
        })

        return answerObj;       

    }, err => console.log);
}