
import axios from "axios";
import { basisApi, symbolListAnswer  } from "@/services/symbolsTypes";
import { uniGetSymbolList,dataSymbols } from "./ uniFunc";


const baseApi: basisApi = {
    domain: 'https://api.crypto.com/exchange/v1/',
    info: 'public/get-instruments',
}

export const getSymbolsFromCryptoCom: () => Promise<any> = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setCryptoComSymbols(res.data.result.data), err => console.log);
}

const setCryptoComSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data,'base_ccy','quote_ccy');
}
