
import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols, uniRemakePricesSymbolList, uniRemakeToPriceObj } from "./ uniFunc";


const baseApi: basisApi = {
    domain: 'https://www.okx.com/api/v5/',
    info: 'public/instruments',
    ticker: 'market/tickers?instType=SWAP'
}

export const getSymbolsFromOkx: () => Promise<any> = () => {
    return axios.get(`${baseApi.domain}${baseApi.info}`, { params: { instType: 'SPOT' } }).then(res => setOkxSymbols(res.data.data), err => console.log);
}

const setOkxSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data, 'baseCcy', 'quoteCcy');
}

export const getExchangesFromOkx: (currency: string) => Promise<any> = (currency) => {

    return axios.get(`${baseApi.domain}${baseApi.ticker}`).then(res => {

        const responseData = res.data.data.map((rec: { [key: string]: any; }) => {
            return { symbol: rec.instId.substring(0, rec.instId.length - 5), price: rec.last };
        });

        const filteredSymbols = uniRemakePricesSymbolList(responseData, 'symbol', currency);
        return uniRemakeToPriceObj(filteredSymbols, 'symbol', 'price', currency, 1);

    }, err => console.log);
}
