import { useEffect } from "react";

import { usehistoryDeatilsStore } from "@/hooks/wallet-payments/history-list";
import TablePage from "./history-list";
const tableHeading = ["Transition Details","Order ID", "Task", "Status", "Ref ID", "Debit", "Credit", "Charges", "Charges in (%)", "balance"];

function OverviewPage() {
  const { historyDeatils, fetchInvoices } = usehistoryDeatilsStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  if (!historyDeatils.length) {
    return <div>Data Not Found..</div>;
  }

  // // console.log('historyDeatils', historyDeatils)
  return (
    <div>
    <h1 className="text-[22px]">All history</h1>
      <div className="bg-white p-5 border border-[1.5px] border-borderColor mt-5 mb-10">
   
   
        <TablePage 
        //@ts-expect-error null
        transaction_list={historyDeatils} tableHeading={tableHeading} />
      </div>
   
    </div>
  );
}

export default OverviewPage;
