
import axios from "axios";
import { basisApi, symbolListAnswer  } from "@/services/symbolsTypes";
import { uniGetSymbolList,dataSymbols } from "./ uniFunc";


const baseApi: basisApi = {
    domain: 'https://www.okx.com/api/v5/public/',
    info: 'instruments',
}

export const getSymbolsFromOkx: () => Promise<any> = () => {
    return axios.get(`${baseApi.domain}${baseApi.info}`,{params:{instType:'SPOT'}}).then(res => setOkxSymbols(res.data.data), err => console.log);
}

const setOkxSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data,'baseCcy','quoteCcy');
}

