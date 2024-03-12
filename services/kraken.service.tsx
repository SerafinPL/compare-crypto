
import axios from "axios";
import { listKey } from "@/context/symbolsContext";

const baseApi: {
    domain: string;
    info: string;
} = {
    domain: 'https://api.kraken.com/0/public/',
    info: 'Assets',
}

export const getSymbolsFromKraken: () => any = () => {

    return axios.get('/kraken-currency_pairs').then(res => setKrakenSymbols(res.data), err => console.log);
}

const setKrakenSymbols: (data: { data: { quoteCurrency: string, baseCurrency: string }[] }) => { listBase: listKey } = (data) => {

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

