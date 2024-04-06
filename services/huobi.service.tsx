
import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols,uniRemakePricesSymbolList,uniRemakeToPriceObj } from "./ uniFunc";

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

        const filteredSymbols = uniRemakePricesSymbolList(res.data.data,'symbol',currency);

        return uniRemakeToPriceObj(filteredSymbols, 'symbol', 'ask', currency, 0);

    }, err => console.log);
}


const setHuobiSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data, 'bcdn', 'qcdn');
}

