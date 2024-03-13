import { listKey, symbolListAnswer } from "@/services/symbolsTypes";

export type dataSymbols = {
    [key: string]: any;
}[];



export const uniGetSymbolList: (data: dataSymbols, base: string, quote: string) => symbolListAnswer = (data, base, quote) => {
    const listBase: listKey = {};
    const listQuote: listKey = {};

    data.forEach(rec => {
        const keyBase: string = rec[base];
        const keyQuote: string = rec[quote];
        listQuote[keyQuote] = true;
        listBase[keyBase] = true;
    })
    return { listBase, listQuote }
}