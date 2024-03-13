
import axios from "axios";
import { listKey, basisApi, symbolListAnswer } from "@/services/symbolsTypes";

const baseApi: basisApi = {
    domain: 'https://api.huobi.pro/v2/',
    info: 'settings/common/symbols',
}

export const getSymbolsFromHuobi: () => Promise<any> = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setHuobiSymbols(res.data), err => console.log);
}

const setHuobiSymbols: (data: { data: { qcdn: string, bcdn: string }[] }) => symbolListAnswer = (data) => {

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

