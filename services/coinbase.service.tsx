import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList,dataSymbols } from "./ uniFunc";


const baseApi: basisApi = {
    domain: 'https://api.coinbase.com/v2/',
    info: 'currencies/crypto',
    prices:'/prices',
}

export const getSymbolsFromCoinBase: () => Promise<any> = () => {
    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setCoinBaseSymbols(res.data.data), err => console.log);
}

const setCoinBaseSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data,'code','code');
}

