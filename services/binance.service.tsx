import axios from "axios";

export const coinList = ['BTC', 'ETH', 'PAXG', 'BCH', 'SOL',
  'LTC', 'AVAX', 'ETC', 'INJ', 'TIA',
  'ATOM', 'FIL', 'NEAR', 'OSMO', 'XNO',
  'KAVA', 'STORJ', '1INCH', 'XRP', 'ONT', 'ALGO', 'ASTR', 'DAR', 'TRX', 'DOGE'];

export const stringListT = coinList.map(el => el + 'USDT')

export const getTradeInfo = (params) => {
    let paramsToSend = ``;

    stringListT.forEach((param, index) => {
        if (index === 0) {
            paramsToSend += `%22${param}%22`
        } else {
            paramsToSend += `,%22${param}%22`
        }
    })
    return axios.get(`https://api.binance.com/api/v3/ticker/bookTicker?symbols=[${paramsToSend}]`).then(res => res.data, err => console.log);
}