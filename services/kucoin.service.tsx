
import axios from "axios";
import { listKey, basisApi } from "@/services/symbolsTypes";

const baseApi: basisApi = {
    domain: 'https://api.kucoin.com/api/v2/',
    info: 'symbols',
}

export const getSymbolsFromKuCoin: () => Promise<any> = () => {

    return axios.get('/kucoin-currency_pairs').then(res => setKuCoinSymbols(res.data), err => console.log);
}

const setKuCoinSymbols: (data: { data: { quoteCurrency: string, baseCurrency: string }[] }) => { listBase: listKey, listQuote: listKey } = (data) => {

    const listBase: listKey = {};
    const listQuote: listKey = {};
    console.log(data);

    data.data.forEach(rec => {
        const keyBase: string = rec.baseCurrency;
        const keyQuote: string = rec.quoteCurrency;
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })

    return { listBase, listQuote }
}

