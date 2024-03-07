'use client'

import { useContext } from "react";

import { SymbolContext } from "@/context/symbolsContext";

const CryptoTable: React.FunctionComponent = () => {

    let context = useContext(SymbolContext);

    
  
    return (
        <div className="min-w-full min-h-screen	">
            <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{"--value":context?.loading}} role="progressbar">{context?.loading}%</div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>company</th>
                            <th>location</th>
                            <th>Last Login</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>Canada</td>
                            <td>12/16/2020</td>
                            <td>Blue</td>
                        </tr>

                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>company</th>
                            <th>location</th>
                            <th>Last Login</th>
                            <th>Favorite Color</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    );
}

export default CryptoTable