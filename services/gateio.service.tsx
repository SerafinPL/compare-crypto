
import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols,uniRemakePricesSymbolList,uniRemakeToPriceObj } from "./ uniFunc";

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

        const filteredSymbols = uniRemakePricesSymbolList(res.data,'currency_pair',currency);
        return uniRemakeToPriceObj(filteredSymbols, 'currency_pair', 'last', currency, 1);

    }, err => console.log);
}