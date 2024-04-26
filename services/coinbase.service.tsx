import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols } from "./ uniFunc";


const baseApi: basisApi = {
    domain: 'https://api.coinbase.com/v2/',
    info: 'currencies/crypto',
    exchanges: 'exchange-rates',
    prices: '/prices',
    products: '/products',
    domainExchange: 'https://api.exchange.coinbase.com'
}

export const getSymbolsFromCoinBase: () => Promise<any> = () => {
    return axios.get(`${baseApi.domainExchange}${baseApi.products}`).then(res => setCoinBaseSymbols(res.data), err => console.log);
}

export const getExchangesFromCoinBase: (currency: string) => Promise<any> = (currency) => {
    return axios.get(`${baseApi.domain}${baseApi.exchanges}`, { params: { currency } }).then(res => {
        const dataObj = res.data.data.rates;

        let aswerObj:{ [key: string]:  number } = {};
        Object.keys(dataObj).forEach(el => {
            aswerObj[el] = 1 / dataObj[el]
        })
        
        return aswerObj;
    }, err => console.log);
}

const setCoinBaseSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    console.log(data);
    
    return uniGetSymbolList(data, 'base_currency', 'quote_currency');
}

