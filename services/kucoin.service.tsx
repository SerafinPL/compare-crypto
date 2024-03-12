
import axios from "axios";
import { listKey } from "@/context/symbolsContext";

const baseApi: {
    domain: string;
    info: string;
} = {
    domain: 'https://api.kucoin.com/api/v2/',
    info: 'symbols',
}

export const getSymbolsFromHuobi: () => any = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setHuobiSymbols(res.data), err => console.log);
}

const setHuobiSymbols: (data: { data: { quoteCurrency: string, baseCurrency: string }[] }) => { listBase: listKey } = (data) => {

    const listBase: listKey = {};
    const listQuote: listKey = {};
    console.log(data);

    data.data.forEach(rec => {
        const keyBase: string = rec.baseCurrency;
        const keyQuote: string = rec.quoteCurrency;
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })
    console.log({ listBase, listQuote });


    return { listBase, listQuote }
}

