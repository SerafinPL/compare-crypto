'use client';
import { useState } from "react";

import SearchBox from "./searchBox";

type selectProps = {
    symbolList: string[];
};

const SimpleSelect = ({ symbolList }: selectProps) => {

    const [searchInput, setSearchInput] = useState<string>('');
    const [dropDownOpen, setDropDownState] = useState<boolean>(false);

    const noEmpty = searchInput.trim().length > 0;

    const clickHandler = (symbol: string) => {
        setSearchInput('');
        setDropDownState(false);
    }

    const optionsRec = Object.keys(symbolList).map(symbol => {
        if (symbol.search(searchInput.trim().toUpperCase()) > -1 || (dropDownOpen && !noEmpty)) {
            return (
                <li className="cursor-pointer" key={`cryptoSymbolSearchRow${symbol}`} onClick={() => clickHandler(symbol)}>{symbol}</li>
            );
        }
    });

    return (
        <div className="float-right flex justify-center items-center">

            <div className={`w-96 dropdown ${dropDownOpen ? 'dropdown-open' : ''}`}>
                <SearchBox input={searchInput} setInput={setSearchInput} dropDownOpen={dropDownOpen} setDropDownState={setDropDownState} />
                <ul className={`${dropDownOpen ? '' : 'hidden'} dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80`}>
                    {optionsRec}
                </ul>
            </div>
        </div>);
}

export default SimpleSelect
