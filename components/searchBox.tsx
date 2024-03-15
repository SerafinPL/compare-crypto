
'use client';

import { Dispatch, SetStateAction, MouseEventHandler, ChangeEventHandler } from "react";

import { SymbolContext } from "@/context/symbolsContext";

type searchProps = {
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    dropDownOpen: boolean;
    setDropDownState: Dispatch<SetStateAction<boolean>>;
};

const SearchBox = ({ input, setInput, dropDownOpen, setDropDownState }: searchProps) => {

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (eve) => {
        setInput(eve.target.value)
        eve.target.value.trim() !== '' ? setDropDownState(true) : setDropDownState(false);

    }

    const changeDropdownHandler: MouseEventHandler<HTMLButtonElement> = () => {
        setDropDownState(prev => !prev)
    }

    return (<div className="flex items-center gap-0">
        <button className={`btn btn-square btn-outline ${dropDownOpen ? 'btn-active' : ''}`} onClick={changeDropdownHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        </button>
        <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search base coin" value={input} onChange={onChangeHandler} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>

    </div>
    );
}

export default SearchBox
