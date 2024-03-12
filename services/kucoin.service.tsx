
import axios from "axios";
import { listKey } from "@/context/symbolsContext";

const baseApi: {
    domain: string;
    info: string;
} = {
    domain: 'https://api.kucoin.com/api/v2/',
    info: 'symbols',
}

export const getSymbolsFromKuCoin: () => any = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setKuCoinSymbols(res.data), err => console.log);
}

const setKuCoinSymbols: (data: { data: { quoteCurrency: string, baseCurrency: string }[] }) => { listBase: listKey } = (data) => {

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

