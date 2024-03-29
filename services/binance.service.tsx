import axios from "axios";
import { basisApi, symbolListAnswer, listKey } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols } from "./ uniFunc";

const baseApi: basisApi = {
    base: 'https://api.binance.com/',
    domainFApi: 'api/v3/',
    domainSApi: 'sapi/v1/',
    bookTickers: 'ticker/bookTicker',
    priceTicker: 'ticker/price',
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

export const getSymbolsFromBinance: () => Promise<any> = () => {

    return axios.get(`${baseApi.base}${baseApi.domainSApi}${baseApi.convert}${baseApi.info}`).then(res => {
        return setBinanceSymbols(res.data)
    }, err => console.log);
}

const setBinanceSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    console.log(data);

    return uniGetSymbolList(data, 'fromAsset', 'toAsset');
}

export const getExchangesFromBinance: (symbol: string) => Promise<any> = (symbol) => {



    return axios.get(`${baseApi.base}${baseApi.domainFApi}${baseApi.info}`).then(res => {
        let pairLists = [];
        const filteredSymbols = res.data.symbols.filter((el:{quoteAsset:string, status:string})=> {
            return el.quoteAsset === symbol && el.status === "TRADING";
        })
        pairLists = filteredSymbols.map((el:{symbol:string}) => {
            return el.symbol
        })

        let paramsToSend = '';

        pairLists.forEach((param: string, index: number) => {
            if (index === 0) {
                paramsToSend += `%22${param}%22`
            } else {
                paramsToSend += `,%22${param}%22`
            }
        })

        return axios.get(`${baseApi.base}${baseApi.domainFApi}${baseApi.priceTicker}?symbols=[${paramsToSend}]`).then(res => {
            let answerObj:{ [key: string]:  number } = {};
            res.data.forEach((el:{symbol:string, price:number}) => {
                answerObj[el.symbol.substring(-4, el.symbol.length - 4)] = 1/el.price;
            })
            return answerObj;
        }, err => console.log);

    }, err => console.log);


}