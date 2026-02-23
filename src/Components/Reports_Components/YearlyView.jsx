

import { useState, useMemo } from "react";

function YearlyView({ accounts, selectedAccountId }) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const allTransactions = useMemo(() => {
    if (!accounts) return [];
    if (selectedAccountId === "all") {
      return accounts.flatMap((acc) => acc.transactions || []);
    }
    const account = accounts.find((acc) => acc.id === selectedAccountId);
    return account ? account.transactions || [] : [];
  }, [accounts, selectedAccountId]);

  const yearlyTransactions = useMemo(() => {
    return allTransactions.filter((t) => {
      const date = new Date(t.date);
      return date.getFullYear() === Number(selectedYear);
    });
  }, [allTransactions, selectedYear]);

  const monthlySummary = useMemo(() => {
    const summary = Array.from({ length: 12 }, () => ({ income: 0, expense: 0 }));
    yearlyTransactions.forEach((t) => {
      const month = new Date(t.date).getMonth();
      if (t.type === "income") summary[month].income += t.amount;
      else summary[month].expense += t.amount;
    });
    return summary;
  }, [yearlyTransactions]);

  const totalIncome = monthlySummary.reduce((sum, m) => sum + m.income, 0);
  const totalExpense = monthlySummary.reduce((sum, m) => sum + m.expense, 0);
  const totalBalance = totalIncome - totalExpense;

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const fmt = (n) =>
    Math.abs(n) >= 1000 ? `${(n / 1000).toFixed(1)}k` : Math.abs(n) === 0 ? "0" : n;

  const maxVal = Math.max(...monthlySummary.map((m) => Math.max(m.income, m.expense)), 1);

  const currentMonth = new Date().getMonth();
  const isCurrentYear = Number(selectedYear) === currentYear;

  return (
    <div className="space-y-5 pt-4">

      <div className="flex items-center justify-end gap-3">
        <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
          Year
        </span>
        <div className="flex items-center gap-1 bg-[#E1E3F5] dark:bg-[#3D3D3E]
          border border-white/10 rounded-xl px-1 py-1">
          <button
            onClick={() => setSelectedYear((y) => Number(y) - 1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg
              text-gray-500 dark:text-gray-400
              hover:bg-[#3041DC] hover:text-white transition-all duration-150 active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-16 text-center text-sm font-bold bg-transparent
              text-gray-800 dark:text-white focus:outline-none"
          />

          <button
            onClick={() => setSelectedYear((y) => Number(y) + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg
              text-gray-500 dark:text-gray-400
              hover:bg-[#3041DC] hover:text-white transition-all duration-150 active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/10
        bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm">

        <div className="grid grid-cols-4 gap-1 px-3 sm:px-4 py-2.5
          bg-[#E1E3F5] dark:bg-[#3D3D3E] border-b border-white/10">
          {["Month", "Income", "Expense", "Balance"].map((h) => (
            <div key={h}
              className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider
                text-gray-500 dark:text-gray-400 text-center first:text-left">
              {h}
            </div>
          ))}
        </div>

        <div className="divide-y divide-white/10">
          {months.map((month, index) => {
            const income = monthlySummary[index].income;
            const expense = monthlySummary[index].expense;
            const balance = income - expense;
            const hasData = income > 0 || expense > 0;
            const isThisMonth = isCurrentYear && index === currentMonth;

            return (
              <div
                key={month}
                className={`group grid grid-cols-4 gap-1 px-3 sm:px-4 py-3
                  transition-colors duration-150
                  ${isThisMonth
                    ? "bg-[#3041DC]/5 dark:bg-[#3041DC]/10"
                    : "hover:bg-white/40 dark:hover:bg-white/[0.05]"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-lg shrink-0
                    flex items-center justify-center text-[10px] font-bold
                    ${isThisMonth
                      ? "bg-[#3041DC] text-white shadow-sm shadow-[#3041DC]/30"
                      : "bg-[#E1E3F5] dark:bg-[#3D3D3E] text-[#3041DC] dark:text-[#A7ACDD]"
                    }`}>
                    {month.slice(0, 1)}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                      <span className="hidden sm:inline">{month}</span>
                      <span className="sm:hidden">{month.slice(0, 3)}</span>
                    </span>
                    {isThisMonth && (
                      <span className="text-[9px] text-[#3041DC] dark:text-[#A7ACDD] font-semibold hidden sm:inline">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-0.5">
                  <span className={`text-xs sm:text-sm font-semibold
                    ${income > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-300 dark:text-gray-600"}`}>
                    {income > 0 ? `+₹${fmt(income)}` : "—"}
                  </span>
                  {income > 0 && (
                    <div className="hidden sm:block h-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden w-full max-w-[72px]">
                      <div
                        className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-700"
                        style={{ width: `${(income / maxVal) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center items-center gap-0.5">
                  <span className={`text-xs sm:text-sm font-semibold
                    ${expense > 0 ? "text-rose-500 dark:text-rose-400" : "text-gray-300 dark:text-gray-600"}`}>
                    {expense > 0 ? `-₹${fmt(expense)}` : "—"}
                  </span>
                  {expense > 0 && (
                    <div className="hidden sm:block h-1 rounded-full bg-rose-100 dark:bg-rose-900/30 overflow-hidden w-full max-w-[72px]">
                      <div
                        className="h-full rounded-full bg-rose-500 dark:bg-rose-400 transition-all duration-700"
                        style={{ width: `${(expense / maxVal) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  {hasData ? (
                    <span className={`text-xs sm:text-sm font-bold px-2 py-0.5 rounded-lg
                      ${balance >= 0
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        : "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                      }`}>
                      {balance >= 0 ? "+" : ""}₹{fmt(balance)}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-300 dark:text-gray-600">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-4 gap-1 px-3 sm:px-4 py-3
          bg-[#E1E3F5]/60 dark:bg-[#3D3D3E]/60 border-t border-white/10 text-center first:text-left">
          <div className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center">
            Total
          </div>
          <div className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
            +₹{fmt(totalIncome)}
          </div>
          <div className="text-xs sm:text-sm font-bold text-rose-500 dark:text-rose-400">
            -₹{fmt(totalExpense)}
          </div>
          <div className={`text-xs sm:text-sm font-bold px-2 py-0.5 rounded-lg w-fit text-center mx-auto
            ${totalBalance >= 0
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
              : "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
            }`}>
            {totalBalance >= 0 ? "+" : ""}₹{fmt(totalBalance)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearlyView;