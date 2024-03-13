
import axios from "axios";
import { listKey, basisApi, symbolListAnswer } from "@/services/symbolsTypes";

const baseApi: basisApi = {
    domain: 'https://api.kraken.com/0/public/',
    info: 'Assets',
}

export const getSymbolsFromKraken: () => Promise<any> = () => {

    return axios.get('/kraken-currency_pairs').then(res => setKrakenSymbols(res.data), err => console.log);
}

const setKrakenSymbols: (data: { data: { quoteCurrency: string, baseCurrency: string }[] }) => symbolListAnswer = (data) => {

    const listBase: listKey = {};
    const listQuote: listKey = {};

    data.data.forEach(rec => {
        const keyBase: string = rec.baseCurrency;
        const keyQuote: string = rec.quoteCurrency;
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })

    return { listBase, listQuote }
}

