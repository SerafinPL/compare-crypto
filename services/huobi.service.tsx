
import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols } from "./ uniFunc";

const baseApi: basisApi = {
    domain: 'https://api.huobi.pro/',
    info: 'v2/settings/common/symbols',
    market: '/market/tickers'
}

export const getSymbolsFromHuobi: () => Promise<any> = () => {
    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setHuobiSymbols(res.data.data), err => console.log);
}

export const getExchangesFromHuobi: (currency: string) => Promise<any> = (currency) => {
    return axios.get(`${baseApi.domain}${baseApi.market}`).then(res => {
        const filteredSymbols = res.data.data.filter((el: { symbol: string }) => {
            return el.symbol.substring(el.symbol.length - currency.length , el.symbol.length) == currency.toLowerCase();
        });

        let answerObj: { [key: string]: number } = {};
        filteredSymbols.forEach((el: { symbol: string, ask: number }) => {
            answerObj[el.symbol.substring(0, el.symbol.length - currency.length).toUpperCase()] = el.ask;
        });  

        return answerObj;
    }, err => console.log);
}



const setHuobiSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data, 'bcdn', 'qcdn');
}

