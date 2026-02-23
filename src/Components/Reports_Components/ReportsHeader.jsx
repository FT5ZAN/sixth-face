import AccountSelector from "./AccountSelector.jsx";

function ReportsHeader({
  selectedTab,
  setSelectedTab,
  accounts,
  selectedAccountId,
  setSelectedAccountId,
}) {
  return (
    <div className="w-full h-auto flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-4 bg-gray-100 dark:bg-[#333334] p-2 md:p-4 rounded-lg">

     
               <div className="flex md:gap-6 p-2  bg-[#E1E3F5] dark:bg-[#3D3D3E] backdrop-blur-[20px] rounded-xl  border border-white/10">
  {["monthly", "yearly", "alltime"].map((tab) => (
    <button
      key={tab}
      onClick={() => setSelectedTab(tab)}
      className={`flex-1 py-3 px-2 md:px-5 rounded-lg cursor-pointer flex justify-center items-center ${
        selectedTab === tab
          ? "bg-[#3041DC] dark:bg-[#27272A] font-semibold text-white"
          : "text-white-50"
      }`}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  ))}
</div>
 <div className="w-full md:w-auto flex items-center justify-center">
      <AccountSelector
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        setSelectedAccountId={setSelectedAccountId}
      />
      </div>
    </div>
  );
}

export default ReportsHeader;