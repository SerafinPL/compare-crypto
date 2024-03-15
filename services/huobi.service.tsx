
import axios from "axios";
import { basisApi, symbolListAnswer  } from "@/services/symbolsTypes";
import { uniGetSymbolList,dataSymbols } from "./ uniFunc";

const baseApi: basisApi = {
    domain: 'https://api.huobi.pro/v2/',
    info: 'settings/common/symbols',
}

export const getSymbolsFromHuobi: () => Promise<any> = () => {
    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => setHuobiSymbols(res.data.data), err => console.log);
}

const setHuobiSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data,'bcdn','qcdn');
}

