
import axios from "axios";
import { basisApi, symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList, dataSymbols } from "./ uniFunc";

const baseApi: basisApi = {
    domain: 'https://api.kraken.com/0/public/',
    info: 'Assets',
}

export const getSymbolsFromKraken: () => Promise<any> = () => {
    return axios.get('/kraken-currency_pairs').then(res => setKrakenSymbols(res.data.data), err => console.log);
}

const setKrakenSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data, 'baseCurrency', 'quoteCurrency');
}
