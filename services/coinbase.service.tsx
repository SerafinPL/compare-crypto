import axios from "axios";

const baseApi: {
    domain: string;
    info: string;

} = {
    domain: 'https://api.coinbase.com/v2/',
    info: 'currencies/crypto',
}



export const getSymbolsFromCoinBase: () => any = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => res.data, err => console.log);
}