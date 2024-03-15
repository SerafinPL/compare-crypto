'use client';
import { useContext, useState,Dispatch,SetStateAction } from "react";

import CryptoTable from "@/components/cryptoTable";
import SelectSymbol from "@/components/selectSymbol";

const Dashboard = () => {

  const [baseCoin, setBaseCoin] = useState<string>('USD');

  return (
    <div>
      <SelectSymbol baseCoin={baseCoin} setBaseCoin={setBaseCoin}/>
      <CryptoTable />
    </div>
  );
}

export default Dashboard
