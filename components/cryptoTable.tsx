'use client';

import { useContext } from "react";

import { SymbolContext } from "@/context/symbolsContext";

const CryptoTable: React.FunctionComponent = () => {

    let context = useContext(SymbolContext);
    const loadingValue: number = context?.loading || 0;
    const innerSymbolList = context?.symbolList || {};

    //** VIEW VARS**/

    const okIco = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>;

    const nonIco = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>;

    const tableView = Object.keys(innerSymbolList).map((symbol, index) => {

        return (
            <tr key={`cryptoRow${symbol}`}>
                <th>{++index}</th>
                <td>{symbol}</td>
                <td>
                    {innerSymbolList[symbol].binance ? okIco : nonIco}
                </td>
                <td>
                    {innerSymbolList[symbol].coinbase ? okIco : nonIco}
                </td>
                <td>
                    {innerSymbolList[symbol].gateio ? okIco : nonIco}
                </td>
                <td>
                    {innerSymbolList[symbol].huobi ? okIco : nonIco}
                </td>
            </tr>
        )
    });

    return (
        <div className="min-w-full min-h-screen	">

            <div className="flex min-w-full p-3">
                <div className="flex-none p-3">
                    {context?.loading}%
                </div>
                <div className="flex-auto w-10/12 p-3">
                    <progress className="progress progress-secondary " value={loadingValue} max="100"></progress>
                </div>

            </div>

            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Binance</th>
                            <th>CoinBase</th>
                            <th>GateIo</th>
                            <th>Huobi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableView}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Binance</th>
                            <th>CoinBase</th>
                            <th>GateIo</th>
                            <th>Huobi</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    );
}

export default CryptoTable