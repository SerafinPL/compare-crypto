
import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols, uniRemakePricesSymbolList, uniRemakeToPriceObj } from "./ uniFunc";
import { log } from "console";

const baseApi: basisApi = {
    domain: 'https://api.kraken.com/0/public/',
    info: 'Assets',
    ticker: 'Ticker',
}

export const getSymbolsFromKraken: () => Promise<any> = () => {
    return axios.get('/kraken-currency_pairs').then(res => setKrakenSymbols(res.data.data), err => console.log);
}

const setKrakenSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data, 'baseCurrency', 'quoteCurrency');
}


export const getExchangesFromKraken: (currency: string) => Promise<any> = (currency) => {

    return axios.get(`${baseApi.domain}${baseApi.ticker}`).then(res => {

        const responseData = res.data.result;
        const filteredSymbolsKeys = Object.keys(responseData).filter(el => {
            return el.substring(el.length - currency.length, el.length).toLowerCase() === currency.toLowerCase();
        });

        const answer: { [key: string]: number } = {};

        const symbolsArray = filteredSymbolsKeys.forEach((pair) => {
            answer[pair.substring(0, pair.length - currency.length).toUpperCase()] = responseData[pair].a[0];
        })

        return answer;
    }, err => console.log);
}

