
import axios from "axios";
import { listKey, basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList,dataSymbols } from "./ uniFunc";

const baseApi: basisApi = {
    domain: 'https://api.kucoin.com/api/v2/',
    info: 'symbols',
}

export const getSymbolsFromKuCoin: () => Promise<any> = () => {

    return axios.get('/kucoin-currency_pairs').then(res => setKuCoinSymbols(res.data.data), err => console.log);
}


const setKuCoinSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data,'baseCurrency','quoteCurrency');
}