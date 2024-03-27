import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList,dataSymbols } from "./ uniFunc";


const baseApi: basisApi = {
    domain: 'https://api.coinbase.com/v2/',
    info: 'currencies/crypto',
    exchanges:'exchange-rates',
    prices:'/prices',
}

export const getSymbolsFromCoinBase: () => Promise<any> = () => {
    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setCoinBaseSymbols(res.data.data), err => console.log);
}

export const getExchangesFromCoinBase: (currency:string) => Promise<any> = (currency) => {
    return axios.get(`${baseApi.domain}${baseApi.exchanges}`, {params:{ currency }}).then(res => (res.data.data.rates), err => console.log);
}

const setCoinBaseSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data,'code','code');
}

