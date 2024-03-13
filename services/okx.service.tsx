
import axios from "axios";
import { listKey,basisApi,symbolListAnswer } from "@/services/symbolsTypes";

const baseApi: basisApi = {
    domain: 'https://www.okx.com/api/v5/public/',
    info: 'instruments',
}

export const getSymbolsFromOkx: () => Promise<any> = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`,{params:{instType:'SPOT'}}).then(res => setOkxSymbols(res.data), err => console.log);
}

const setOkxSymbols: ( res: { data:{quoteCcy: string, baseCcy: string}[] } ) => symbolListAnswer = (res) => {

    const listBase: listKey = {};
    const listQuote: listKey = {};

    res.data.forEach(rec => {
        const keyBase: string = rec.baseCcy;
        const keyQuote: string = rec.quoteCcy;
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })

    return { listBase, listQuote }
}

