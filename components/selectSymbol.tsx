'use client';
import { useContext, useState,Dispatch,SetStateAction } from "react";

import { SymbolContext } from "@/context/symbolsContext";
import SearchBox from "./searchBox";

type selectProps = {
    baseCoin:string;
    setBaseCoin: Dispatch<SetStateAction<string>>;
  };

const SelectSymbol = ({baseCoin,setBaseCoin}:selectProps) => {

    const [searchInput, setSearchInput] = useState<string>('');

    let context = useContext(SymbolContext);
    const innerSymbolList = context?.symbolList || {};
    const noEmpty = searchInput.trim().length > 0;

    const clickHandler = (symbol:string) => {
        setBaseCoin(symbol)
        setSearchInput('')
    }
   

    const optionsRec = Object.keys(innerSymbolList).map(symbol => {
        if (symbol.search(searchInput.trim().toUpperCase()) > -1 && noEmpty) {
            return (<li className="cursor-pointer" key={`cryptoSymbolSearchRow${symbol}`} onClick={() => clickHandler(symbol)}>{symbol}</li>)
        }
    });

    return (
        
    
    <div className="float-right">
        <div className={`w-40 float-right flex items-center`}>
        {baseCoin}
        </div>
        <div className={`w-80 dropdown ${noEmpty ? 'dropdown-open' : ''}`}>
            <SearchBox input={searchInput} setInput={setSearchInput} />
            <ul className={`${noEmpty ? '' : 'hidden'} dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80`}>
                {optionsRec}
            </ul>
        </div>
    </div>);
}

export default SelectSymbol
