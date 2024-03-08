import axios from "axios";
import { listKey } from "@/context/symbolsContext";
const baseApi: {
    base:string;
    domainSApi: string;
    domainFApi: string;
    bookTickers: string;
    convert: string;
    info: string;
} = {
    base: 'https://api.binance.com/',
    domainFApi: 'api/v3/',
    domainSApi: 'sapi/v1/',
    bookTickers: 'ticker/bookTicker',
    convert: 'convert/',
    info: 'exchangeInfo',
}


export const coinList: string[] = ['BTC', 'ETH', 'PAXG', 'BCH', 'SOL',
    'LTC', 'AVAX', 'ETC', 'INJ', 'TIA',
    'ATOM', 'FIL', 'NEAR', 'OSMO', 'XNO',
    'KAVA', 'STORJ', '1INCH', 'XRP',
    'ONT', 'ALGO', 'ASTR', 'DAR', 'TRX', 'DOGE'];

export const stringListT: string[] = coinList.map(el => el + 'USDT');

export const getTradeInfo: () => any = () => {
    let paramsToSend: string = ``;

    stringListT.forEach((param: string, index: number) => {
        if (index === 0) {
            paramsToSend += `%22${param}%22`
        } else {
            paramsToSend += `,%22${param}%22`
        }
    })
    return axios.get(`${baseApi.base}${baseApi.domainFApi}${baseApi.bookTickers}?symbols=[${paramsToSend}]`).then(res => res.data, err => console.log);
}

export const getSymbolsFromBinance: () => any = () => {

    return axios.get(`${baseApi.base}${baseApi.domainSApi}${baseApi.convert}${baseApi.info}`).then(res => {
        return setBinanceSymbols(res.data)
    }, err => console.log);
}


const setBinanceSymbols: (data: { fromAsset: string, toAsset: string }[]) => { listQuote: listKey, listBase: listKey } = (data) => {

    const listQuote: listKey = {};
    const listBase: listKey = {};

    data.forEach(rec => {
        const keyQuote: string = rec.toAsset;
        const keyBase: string = rec.fromAsset;
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })

    return { listQuote, listBase }
}