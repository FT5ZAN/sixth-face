
import { useState } from "react";
import { useSelector } from "react-redux";

import ReportsHeader from "../Components/Reports_Components/ReportsHeader.jsx";
import MonthlyView from "../Components/Reports_Components/MonthlyView.jsx";
import YearlyView from "../Components/Reports_Components/YearlyView.jsx";
import AllTimeView from "../Components/Reports_Components/AllTimeView.jsx";

function ReportsPage() {
  const accounts = useSelector(
    (state) => state.accounts.accounts
  );

  const [selectedTab, setSelectedTab] = useState("monthly");

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedAccountId, setSelectedAccountId] =
    useState("all");

  return (
    <div className=" w-full
          min-h-full
          bg-yellow-500
          dark:bg-[#333334]
          md:p-5
            p-1
          rounded-b-lg
            ">
<div className="w-full h-auto sticky top-0  dark:bg-[#333334] z-10 p-1 flex items-center justify-center rounded-lg ">
      <ReportsHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        setSelectedAccountId={setSelectedAccountId}
      />
</div>
      {selectedTab === "monthly" && (
        <MonthlyView
          accounts={accounts}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedAccountId={selectedAccountId}
        />
        
      )}
     
{selectedTab === "yearly" && (
  <YearlyView
    accounts={accounts}
    selectedAccountId={selectedAccountId}
  />
)}

{selectedTab === "alltime" && (
  <AllTimeView
    accounts={accounts}
    selectedAccountId={selectedAccountId}
  />
)}
    </div>
  );
}

export default ReportsPage;