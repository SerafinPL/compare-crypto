'use client';
import { useContext, useState,Dispatch,SetStateAction } from "react";

import CryptoTable from "@/components/cryptoTable";
import SelectSymbol from "@/components/selectSymbol";

const Dashboard = () => {

  const [baseCoin, setBaseCoin] = useState<string>('choose crypto');  

  return (
    <div>
      <SelectSymbol baseCoin={baseCoin} setBaseCoin={setBaseCoin}/>
      <CryptoTable baseCoin={baseCoin}/>
    </div>
  );
}

export default Dashboard
