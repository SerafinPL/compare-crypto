import { cache } from 'react';

import { getAllCoinsBinance, getExchangesFromBinance } from "@/services/binance.service";
import { getAllCoinsCoinBase, getExchangesFromCoinBase } from "@/services/coinbase.service";
import { getSymbolsFromGateIo, getExchangesFromGateIO } from "@/services/gateio.service";
import { getSymbolsFromHuobi, getExchangesFromHuobi } from "@/services/huobi.service";
import { getSymbolsFromKuCoin, getExchangesFromKuCoin } from "@/services/kucoin.service";
import { getSymbolsFromKraken, getExchangesFromKraken } from "@/services/kraken.service";
import { getSymbolsFromCryptoCom, getExchangesFromCryptoCom } from "@/services/cryptoCom.service";
import { getSymbolsFromOkx, getExchangesFromOkx } from "@/services/okx.service";
 
export const getBinanceItems = cache(async () => {
  
  const coinBinanceItem = await getAllCoinsBinance();
  const coinBaseItem = await getAllCoinsCoinBase();
  //??  ADD NEXT EX
  
    const wholeList = Object.assign({},coinBinanceItem,coinBaseItem)

  return wholeList;
})
  
