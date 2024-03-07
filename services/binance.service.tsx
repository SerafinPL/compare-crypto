import axios from "axios";

const baseApi: {
    domain: string;
    bookTickers: string;
    convert: string;
    info: string;
} = {
    domain: 'https://api.binance.com/api/v3/',
    bookTickers: 'ticker/bookTicker',
    convert:'convert/',
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
    return axios.get(`${baseApi.domain}${baseApi.bookTickers}?symbols=[${paramsToSend}]`).then(res => res.data, err => console.log);
}

export const getSymbolsFromBinance: () => any = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setBinanceSymbols(res.data.symbols), err => console.log);
}

interface listKey {
    [key: string]: boolean;
}

const setBinanceSymbols: (data: { quoteAsset: string, baseAsset: string }[]) => { listQuote: listKey, listBase: listKey } = (data) => {

    const listQuote: listKey = {};
    const listBase: listKey = {};

    data.forEach(rec => {
        const keyQuote: string = rec.quoteAsset;
        const keyBase: string = rec.baseAsset;
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })

    return { listQuote, listBase }
}