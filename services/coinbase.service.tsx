import axios from "axios";
import { listKeyWithName } from "@/context/symbolsContext";

const baseApi: {
    domain: string;
    info: string;
} = {
    domain: 'https://api.coinbase.com/v2/',
    info: 'currencies/crypto',
}

export const getSymbolsFromCoinBase: () => any = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setCoinBaseSymbols(res.data.data), err => console.log);
}

const setCoinBaseSymbols: (data: { code: string, name: string }[]) => {  listBase: listKeyWithName } = (data) => {

    const listBase: listKeyWithName = {};

    data.forEach(rec => {
        const keyBase: string = rec.code;
        listBase[keyBase] = rec.name;
    })

    return { listBase }
}

