'use client'

import { useContext } from "react";

import { SymbolContext } from "@/context/symbolsContext";


import { MouseEventHandler } from "react";



export const SimpleButton: React.FunctionComponent<{}> = ({ }) => {
    
    const onClickHandler:MouseEventHandler = () =>  {
        // console.log(context?.remakeSymbolsToList())
    }     //getSymbolsFromBinance().then((res: any) => console.log(res));

    let context = useContext(SymbolContext);

    const loadingValue:number = context?.loading || 0;
    return(
    <div>
        <button className="btn btn-secondary" onClick={onClickHandler}>CheckOut</button>
    </div>
)};