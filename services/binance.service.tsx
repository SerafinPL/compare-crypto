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

export const getSymbolsFromBinance: () => Promise<any> = () => {

    return axios.get(`${baseApi.base}${baseApi.domainSApi}${baseApi.convert}${baseApi.info}`).then(res => {
        return setBinanceSymbols(res.data);
    }, err => console.log);
}

const setBinanceSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data, 'fromAsset', 'toAsset');
}

export const getExchangesFromBinance: (baseSymbol: string) => Promise<any> = (baseSymbol) => {

    return axios.get(`${baseApi.base}${baseApi.domainFApi}${baseApi.info}`).then(res => {
        
        const filteredSymbols = res.data.symbols.filter((el:{quoteAsset:string, status:string})=> {
            return el.quoteAsset == baseSymbol && el.status === "TRADING";
        })
        let pairLists = filteredSymbols.map((el:{symbol:string}) => {
            return el.symbol;
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
                answerObj[el.symbol.substring(-baseSymbol.length, el.symbol.length - baseSymbol.length)] = el.price;
            })
            return answerObj;
        }, err => console.log);

    }, err => console.log);


}