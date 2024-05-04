
type cryptoTableProps = {
    baseCoin: string;
};


const CryptoTable = ({ baseCoin }: cryptoTableProps) => {

    let context = useContext(SymbolContext);
    const loadingValue: number = context?.loading || 0;
    const innerSymbolList = context?.symbolList || {};
    const innerPriceList = context?.priceObj || {};

    const tableContentSymbols = [
        'Binance',
        'CoinBase',
        'GateIo',
        'Huobi',
        'KuCoin',
        'Kraken',
        'CryptoCom',
        'Okx',
    ]

    //** VIEW VARS**/

    const okIco = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>;

    const nonIco = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>;

    const header = <tr>
        <th>#</th>
        <th>Name</th>
        {tableContentSymbols.map(el => (<th key={`thead-${el}`}>{el}</th>))}
    </tr>;

    const tableView = Object.keys(innerSymbolList).map((symbol, index) => {

        console.log(innerSymbolList);
        console.log(innerPriceList);

        console.log(symbol);

        
        
        return (
            <tr key={`cryptoRow${symbol}`}>
                <th>{++index}</th>
                <td>{symbol}</td>
                {tableContentSymbols.map(el => (<td key={`tSymbol-${symbol}-${el}`}>
                    {symbol !== baseCoin &&
                        innerPriceList[el.toLowerCase()] &&
                        innerPriceList[el.toLowerCase()][symbol] ? Number(innerPriceList[el.toLowerCase()][symbol]).toFixed(8) : nonIco}
                    {/* {innerSymbolList[symbol][el.toLowerCase()] ? okIco : nonIco} */}

                </td>))}
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
                        {header}
                    </thead>
                    <tbody>
                        {tableView}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CryptoTable