'use client';
import { useContext, useState } from "react";

import { SymbolContext } from "@/context/symbolsContext";
import SearchBox from "./searchBox";

const SelectSymbol: React.FunctionComponent = () => {

    const [searchInput, setSearchInput] = useState<string>('');

    let context = useContext(SymbolContext);
    const innerSymbolList = context?.symbolList || {};

    const noEmpty = searchInput.trim().length > 0;
    const optionsRec = Object.keys(innerSymbolList).map(symbol => {
        if (symbol.search(searchInput.trim().toUpperCase()) > -1 && noEmpty) {
            return (<li className="cursor-pointer" key={`cryptoSymbolSearchRow${symbol}`}>{symbol}</li>)
        }
    });

    return (<div className="float-right">
        <div className={`w-80`}>
            <SearchBox input={searchInput} setInput={setSearchInput} />
            <ul className={`${noEmpty ? 'block' : 'hidden'} dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80`}>
                {optionsRec}
            </ul>
        </div>
    </div>);
}

export default SelectSymbol
