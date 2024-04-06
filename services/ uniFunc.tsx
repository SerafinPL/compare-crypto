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

export const uniRemakePricesSymbolList = (data:[],priceName:string,currency:string) =>{

    const filteredSymbols = data.filter((el:{[key: string]: any;}) => {
        return el[priceName].substring(el[priceName].length - currency.length, el[priceName].length).toLowerCase() === currency.toLowerCase();
    })   

    return filteredSymbols;
}

export const uniRemakeToPriceObj = (data:never[],priceName:string,priceValueName:string,currency:string,converter:number) =>{

    let answerObj:{ [key: string]:  number } = {};
    data.forEach((el:{[key: string]: any;}) => {
        answerObj[el[priceName].substring(0,el[priceName].length-currency.length-converter).toUpperCase()] = Number(el[priceValueName]);
    })

    return answerObj;  
}