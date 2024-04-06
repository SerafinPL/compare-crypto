
import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols } from "./ uniFunc";

const baseApi: basisApi = {
    domain: 'https://api.gateio.ws/api/v4/',
    info: 'flash_swap/currency_pairs',
}

export const getSymbolsFromGateIo: () => Promise<any> = () => {
    return axios.get('/gateio-currency_pairs').then(res => setGateIoSymbols(res.data), err => console.log);
}

const setGateIoSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data, 'buy_currency', 'sell_currency')
}

export const getExchangesFromGateIO: (currency: string) => Promise<any> = (currency) => {
    return axios.get('/gateio-tickers').then(res => {
        const filteredSymbols = res.data.filter((el: { currency_pair: string }) => {
            return el.currency_pair.substring(el.currency_pair.length - currency.length, el.currency_pair.length) == currency;
        })

        let answerObj: { [key: string]: number } = {};
        filteredSymbols.forEach((el: { currency_pair: string, last: string }) => {
            answerObj[el.currency_pair.substring(0, el.currency_pair.length - currency.length - 1)] = Number(el.last);
        })

        return answerObj;

    }, err => console.log);
}