import axios from "axios";

const baseApi: {
    domain: string;
    info: string;
} = {
    domain: 'https://api.coinbase.com/v2/',
    info: 'currencies/crypto',
}

interface listKey {
    [key: string]: boolean;
}


export const getSymbolsFromCoinBase: () => any = () => {

    return axios.get(`${baseApi.domain}${baseApi.info}`).then(res => console.log(res.data), err => console.log);
}

