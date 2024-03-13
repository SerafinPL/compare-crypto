export type basisApi = {
    [key: string]: string;
}

export type symbolListAnswer = { listBase: listKey, listQuote: listKey }

export type listKey = {
    [key: string]: boolean;
}

export type listKeyWithName = {
    [key: string]: string;
}

export type SymbolsContextType = {
    loading: number;
    symbolObj: SymbolsObjectList;
    symbolList: { [key: string]: any; };
};

export interface SymbolsObjectList {
    [key: string]: any;
    binance: listKey | null;
    coinbase: listKeyWithName | null;
    gateio: listKey | null;
    huobi: listKey | null;
    kucoin: listKey | null;
    kraken: listKey | null;
    cryptocom: listKey | null;
    okx: listKey | null;
};

export type AllCoinsObjectList = {
    [key: string]: { [key: string]: boolean };
};