
import axios from "axios";
import { listKey } from "@/context/symbolsContext";

const baseApi: {
    domain: string;
    info: string;
} = {
    domain: 'https://api.huobi.pro/v2/',
    info: 'settings/common/symbols',
}

export const getSymbolsFromHuobi: () => any = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setHuobiSymbols(res.data), err => console.log);
}

const setHuobiSymbols: (data: { data: { qcdn: string, bcdn: string }[] }) => { listBase: listKey } = (data) => {

    const listBase: listKey = {};
    const listQuote: listKey = {};

    data.data.forEach(rec => {
        const keyBase: string = rec.bcdn;
        const keyQuote: string = rec.qcdn;
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })

    return { listBase, listQuote }
}

