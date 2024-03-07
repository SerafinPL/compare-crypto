'use client';


import { getTradeInfo, getSymbolsInfo } from "@/services/binance.service";
import { MouseEventHandler } from "react";


const onClickHandler:MouseEventHandler = () => getSymbolsInfo().then((res: any) => console.log(res));

export const SimpleButton: React.FunctionComponent<{}> = ({ }) => (
    <div>
        <button className="btn btn-secondary" onClick={onClickHandler}>CheckOut</button>
    </div>
);