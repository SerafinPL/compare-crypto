import axios from "axios";
import { basisApi, symbolListAnswer, listKey } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols } from "./ uniFunc";


const baseApi: basisApi = {
    domain: 'https://api.coinbase.com/v2/',
    info: 'currencies/crypto',
    exchanges: 'exchange-rates',
    prices: '/prices',
    products: '/products',
    domainExchange: 'https://api.exchange.coinbase.com',
    publicApi: 'https://api.coinbase.com/api/v3/',
    publicProductsList: 'brokerage/market/products',
}

export const getSymbolsFromCoinBase: () => Promise<any> = () => {
    return axios.get(`${baseApi.domainExchange}${baseApi.products}`).then(res => setCoinBaseSymbols(res.data), err => console.log);
}

export const getExchangesFromCoinBase: (currency: string) => Promise<any> = (currency) => {
    return axios.get(`${baseApi.domain}${baseApi.exchanges}`, { params: { currency } }).then(res => {
        const dataObj = res.data.data.rates;

        let aswerObj: { [key: string]: number } = {};
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

//**  For Serwer reasons **/

export const getAllCoinsCoinBase: () => Promise<any> = () => {
    return getProductsList().then(res => {
        return convertCoinBaseSymbolsToList(res);
    }, err => console.log);
}

type CoinBaseRes = { base_currency: string, quote_currency: string };

const convertCoinBaseSymbolsToList = (answer:CoinBaseRes[]) => {
    const list: listKey = {}
    answer.forEach((element:CoinBaseRes) => {
        list[element.base_currency] = true;
        list[element.quote_currency] = true;
    });

    return list;
};

export const getProductsList: () => Promise<any> = () => {
    return axios.get(`${baseApi.domainExchange}${baseApi.products}`).then(res => res.data, err => console.log);
}