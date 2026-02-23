import MonthlyCalendar from "./MonthlyCalendar.jsx";
import WeeklySummaryTable from "./WeeklySummaryTable.jsx";

function MonthlyView({
  accounts,
  selectedDate,
  setSelectedDate,
  selectedAccountId,
}) {
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  const goPrev = () => {
    setSelectedDate(
      new Date(selectedYear, selectedMonth - 1, 1)
    );
  };

  const goNext = () => {
    setSelectedDate(
      new Date(selectedYear, selectedMonth + 1, 1)
    );
  };

 
  const allTransactions =
    selectedAccountId === "all"
      ? accounts.flatMap((acc) => acc.transactions)
      : accounts.find((acc) => acc.id === selectedAccountId)
          ?.transactions || [];

 
  const monthlyTransactions = allTransactions.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getMonth() === selectedMonth &&
      d.getFullYear() === selectedYear
    );
  });
  




  const totalIncome = monthlyTransactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpense = monthlyTransactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

const balance = totalIncome - totalExpense;
  return (
    <div>

      
        <div className="flex justify-between items-center m-4 px-1">
  <button
    onClick={goPrev}
    className="w-9 h-9 flex items-center justify-center rounded-xl
      bg-[#E1E3F5] dark:bg-[#3D3D3E] border border-white/10
      text-gray-600 dark:text-gray-300
      hover:bg-[#3041DC] hover:text-white dark:hover:bg-[#27272A]
      transition-all duration-200 shadow-sm active:scale-95"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <h2 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 dark:text-white tracking-wide select-none">
    {selectedDate.toLocaleString("default", { month: "long" })}{" "}
    <span className="text-[#3041DC] dark:text-[#A7ACDD]">{selectedYear}</span>
  </h2>

  <button
    onClick={goNext}
    className="w-9 h-9 flex items-center justify-center rounded-xl
      bg-[#E1E3F5] dark:bg-[#3D3D3E] border border-white/10
      text-gray-600 dark:text-gray-300
      hover:bg-[#3041DC] hover:text-white dark:hover:bg-[#27272A]
      transition-all duration-200 shadow-sm active:scale-95"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
      <MonthlyCalendar
        selectedDate={selectedDate}
        transactions={monthlyTransactions}
      />

      <WeeklySummaryTable
        transactions={monthlyTransactions}
      />
      <div className="">
 
</div>
    </div>
  );
}

export default MonthlyView;