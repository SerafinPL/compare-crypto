'use client';
import { useContext, useState, Dispatch, SetStateAction } from "react";

import { SymbolContext } from "@/context/symbolsContext";
import SearchBox from "./searchBox";

type selectProps = {
    baseCoin: string;
    setBaseCoin: Dispatch<SetStateAction<string>>;
};

const SelectSymbol = ({ baseCoin, setBaseCoin }: selectProps) => {

    const [searchInput, setSearchInput] = useState<string>('');
    const [dropDownOpen, setDropDownState] = useState<boolean>(false);

    let context = useContext(SymbolContext);
    const innerSymbolList = context?.symbolList || {};
    const noEmpty = searchInput.trim().length > 0;

    const clickHandler = (symbol: string) => {
        setBaseCoin(symbol);
        setSearchInput('');
        setDropDownState(false);
    }


    const optionsRec = Object.keys(innerSymbolList).map(symbol => {
        if (symbol.search(searchInput.trim().toUpperCase()) > -1 && noEmpty) {
            return (<li className="cursor-pointer" key={`cryptoSymbolSearchRow${symbol}`} onClick={() => clickHandler(symbol)}>{symbol}</li>)
        }
    });

    return (
        <div className="float-right flex justify-center items-center">
            <div className={`w-40 flex justify-center items-center`}>
                {baseCoin}
            </div>
            <div className={`w-96 dropdown ${noEmpty ? 'dropdown-open' : ''}`}>
                <SearchBox input={searchInput} setInput={setSearchInput} dropDownOpen={dropDownOpen} setDropDownState={setDropDownState} />
                <ul className={`${noEmpty ? '' : 'hidden'} dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80`}>
                    {optionsRec}
                </ul>
            </div>
        </div>);
}

export default SelectSymbol
