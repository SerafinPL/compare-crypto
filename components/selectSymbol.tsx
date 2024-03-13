'use client';
import { useContext } from "react";

import { SymbolContext } from "@/context/symbolsContext";
import SearchBox from "./searchBox";

const SelectSymbol: React.FunctionComponent = (symbolList) => {

    let context = useContext(SymbolContext);
    const loadingValue: number = context?.loading || 0;
    const innerSymbolList = context?.symbolList || {};

    const optionsRec = Object.keys(innerSymbolList).map((symbol, index) => {
        return (<li key={`cryptoSymbolSearchRow${symbol}`}>{symbol}</li>)
    });

    return (<div className="float-right	">
        <div className="dropdown dropdown-open w-80">
            <SearchBox />
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
            {optionsRec}
            </ul>
        </div>
    </div>);
}

export default SelectSymbol
