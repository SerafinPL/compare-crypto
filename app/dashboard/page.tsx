import CryptoTable from "@/components/cryptoTable";
import SelectSymbol from "@/components/selectSymbol";

const Dashboard: React.FunctionComponent = () => {
  return (
    <div>
      <SelectSymbol/>
      <CryptoTable />
    </div>
  );
}

export default Dashboard
