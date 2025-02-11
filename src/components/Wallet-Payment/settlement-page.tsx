import { useEffect } from "react";

import { useSettlementStore } from "@/hooks/wallet-payments/settelment-list";
import TablePage from "./settlement-list";
const tableHeading = ["Service Period", "Settlement Date", "NEFT ID", "Reference ID", "Notes", "Download"];

function OverviewPage() {
  const { settlement, fetchInvoices } = useSettlementStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  if (!settlement.length) {
    return <div>Data Not Found..</div>;
  }

  return (
    <div>
    <h1 className="text-[22px]">All settlements</h1>
      <div className="bg-white p-5 border border-[1.5px] border-borderColor mt-5 mb-10">
   
        <TablePage invoices={settlement} tableHeading={tableHeading} />
      </div>
   
    </div>
  );
}

export default OverviewPage;
