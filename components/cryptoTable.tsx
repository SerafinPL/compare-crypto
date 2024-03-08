'use client';

import { useContext } from "react";

import { SymbolContext } from "@/context/symbolsContext";

const CryptoTable: React.FunctionComponent = () => {

    let context = useContext(SymbolContext);

    const loadingValue: number = context?.loading || 0;

    const innerSymbolList = context?.symbolList || {};
    const tableView = Object.keys(innerSymbolList).map((symbol, index) => {

        return (
            <tr>
                <th>{++index}</th>
                <td>{symbol}</td>
                <td>{innerSymbolList[symbol].binance ? 'git': 'no'}</td>
                <td>{innerSymbolList[symbol].coinbase ? 'git': 'no'}</td>
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

                        </tr>
                    </thead>
                    <tbody>
                        {tableView}
                    </tbody>
                    <tfoot>
                        <tr>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Binance</th>
                                <th>CoinBase</th>

                            </tr>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    );
}

export default CryptoTable