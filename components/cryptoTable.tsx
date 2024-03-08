'use client';

import { useContext } from "react";

import { SymbolContext } from "@/context/symbolsContext";

const CryptoTable: React.FunctionComponent = () => {

    let context = useContext(SymbolContext);

    const loadingValue: number = context?.loading || 0;

    const innerSymbolList = context?.symbolList || {};
    const tableView = Object.keys(innerSymbolList).map((symbol, index) => {

        return (
            <tr key={`cryptoRow${symbol}`}>
                <th>{++index}</th>
                <td>{symbol}</td>
                <td>{innerSymbolList[symbol].binance ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                }</td>
                <td>{innerSymbolList[symbol].coinbase ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                }</td>
                <td>{innerSymbolList[symbol].gateio ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                }</td>
            </tr>
        )
    });
    return (
        <div className="min-w-full min-h-screen	">
            <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": loadingValue }} role="progressbar">{context?.loading}%</div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Binance</th>
                            <th>CoinBase</th>
                            <th>GateIo</th>

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
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    );
}

export default CryptoTable