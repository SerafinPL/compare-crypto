import axios from "axios";
import { listKey } from "@/context/symbolsContext";

const baseApi: {
    domain: string;
    info: string;
} = {
    domain: 'https://api.gateio.ws/api/v4/',
    info: 'flash_swap/currency_pairs',
}

export const getSymbolsFromGateIo: () => any = async () => {


    const app = axios.create({
        baseURL: baseApi.domain,


    })


    // axios.defaults.baseURL = baseApi.domain;
    return app.get(baseApi.info).then(res => setGateIoSymbols(res.data), err => console.log);
}

const setGateIoSymbols: (data: { buy_currency: string, sell_currency: string }[]) => { listBase: listKey } = (data) => {

    const listBase: listKey = {};
    const listQuote: listKey = {};

    data.forEach(rec => {
        const keyBase: string = rec.buy_currency;
        const keyQuote: string = rec.sell_currency;
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })
    return { listBase, listQuote }
}

