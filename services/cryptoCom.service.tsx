
import axios from "axios";
import { listKey, basisApi, symbolListAnswer  } from "@/services/symbolsTypes";
import { uniGetSymbolList,dataSymbols } from "./ uniFunc";


const baseApi: basisApi = {
    domain: 'https://api.crypto.com/exchange/v1/',
    info: 'public/get-instruments',
}

export const getSymbolsFromCryptoCom: () => Promise<any> = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setCryptoComSymbols(res.data.result.data), err => console.log);
}

// const setCryptoComSymbols: (res: { result: { data: { quote_ccy: string, base_ccy: string }[] } }) => { listBase: listKey, listQuote: listKey } = (res) => {

//     const listBase: listKey = {};
//     const listQuote: listKey = {};
//     console.log(res);

//     res.result.data.forEach(rec => {
//         const keyBase: string = rec.base_ccy;
//         const keyQuote: string = rec.quote_ccy;
//         listQuote[keyQuote] = true;
//         listBase[keyBase] = true;
//     })

//     return { listBase, listQuote }
// }

const setCryptoComSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data,'base_ccy','quote_ccy');
}