
import axios from "axios";
import { listKey } from "@/context/symbolsContext";

const baseApi: {
    domain: string;
    info: string;
} = {
    domain: 'https://api.crypto.com/exchange/v1/',
    info: 'public/get-instruments',
}

export const getSymbolsFromCryptoCom: () => any = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setCryptoComSymbols(res.data), err => console.log);
}

const setCryptoComSymbols: ( res: { result: {data:{quote_ccy: string, base_ccy: string}[] } } ) => { listBase: listKey } = (res) => {

    const listBase: listKey = {};
    const listQuote: listKey = {};
    console.log(res);

    res.result.data.forEach(rec => {
        const keyBase: string = rec.base_ccy;
        const keyQuote: string = rec.quote_ccy;
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })

    return { listBase, listQuote }
}

