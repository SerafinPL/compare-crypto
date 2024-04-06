
import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols, uniRemakePricesSymbolList, uniRemakeToPriceObj } from "./ uniFunc";


const baseApi: basisApi = {
    domain: 'https://api.crypto.com/exchange/v1/',
    info: 'public/get-instruments',
    ticker: 'public/get-tickers',
}

export const getSymbolsFromCryptoCom: () => Promise<any> = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setCryptoComSymbols(res.data.result.data), err => console.log);
}

const setCryptoComSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data, 'base_ccy', 'quote_ccy');
}


export const getExchangesFromCryptoCom: (currency: string) => Promise<any> = (currency) => {

    return axios.get(`${baseApi.domain}${baseApi.ticker}`).then(res => {

        const responseData = res.data.result.data;

        const filteredSymbols = uniRemakePricesSymbolList(responseData, 'i', currency);
        return uniRemakeToPriceObj(filteredSymbols, 'i', 'k', currency, 1);

    }, err => console.log);
}