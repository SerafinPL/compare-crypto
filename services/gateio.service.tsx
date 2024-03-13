
import axios from "axios";
import { listKey, basisApi,symbolListAnswer } from "@/services/symbolsTypes";
import { uniGetSymbolList,dataSymbols } from "./ uniFunc";

const baseApi: basisApi = {
    domain: 'https://api.gateio.ws/api/v4/',
    info: 'flash_swap/currency_pairs',
}

export const getSymbolsFromGateIo: () => Promise<any> = () => {
    return axios.get('/gateio-currency_pairs').then(res => setGateIoSymbols(res.data), err => console.log);
}

const setGateIoSymbols: (data: dataSymbols) => symbolListAnswer = (data) => {
    return uniGetSymbolList(data,'buy_currency','sell_currency')
}

