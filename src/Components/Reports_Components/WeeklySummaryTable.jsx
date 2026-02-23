

function WeeklySummaryTable({ transactions }) {
  const weeklySummary = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const week = Math.ceil(date.getDate() / 7);

    if (!weeklySummary[week]) {
      weeklySummary[week] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      weeklySummary[week].income += t.amount;
    } else {
      weeklySummary[week].expense += t.amount;
    }
  });

  const weeks = Object.keys(weeklySummary);

  const fmt = (n) =>
    Math.abs(n) >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

  if (weeks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 px-4
        bg-white/30 dark:bg-white/[0.03] border border-white/10 rounded-2xl text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#E1E3F5] dark:bg-[#3D3D3E] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#A7ACDD]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 17v-6m3 6V7m3 10v-4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
          No transactions this month
        </p>
      </div>
    );
  }

  const totalIncome = weeks.reduce((s, w) => s + weeklySummary[w].income, 0);
  const totalExpense = weeks.reduce((s, w) => s + weeklySummary[w].expense, 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10
      bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm">

      <div className="grid grid-cols-4 gap-1 px-3 sm:px-4 py-2.5
        bg-[#E1E3F5] dark:bg-[#3D3D3E] border-b border-white/10 ">
        {["Week", "Income", "Expense", "Balance"].map((h) => (
          <div key={h}
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider
              text-gray-500 dark:text-gray-400 text-center first:text-left">
            {h}
          </div>
        ))}
      </div>

      <div className="divide-y divide-white/10">
        {weeks.map((week) => {
          const income = weeklySummary[week].income;
          const expense = weeklySummary[week].expense;
          const balance = income - expense;
          const maxVal = Math.max(income, expense);

          return (
            <div
              key={week}
              className="group grid grid-cols-4 gap-1 px-3 sm:px-4 py-3
                hover:bg-white/40 dark:hover:bg-white/[0.05] transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#E1E3F5] dark:bg-[#3D3D3E]
                  flex items-center justify-center text-[10px] sm:text-xs
                  font-bold text-[#3041DC] dark:text-[#A7ACDD] shrink-0">
                  W{week}
                </span>
                <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Week {week}
                </span>
              </div>

              <div className="flex flex-col justify-center items-center gap-0.5">
                <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  +₹{fmt(income)}
                </span>
                {income > 0 && (
                  <div className="hidden sm:block h-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden w-full max-w-[80px]">
                    <div
                      className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-500"
                      style={{ width: `${maxVal > 0 ? (income / maxVal) * 100 : 0}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center items-center gap-0.5">
                <span className="text-xs sm:text-sm font-semibold text-rose-500 dark:text-rose-400">
                  -₹{fmt(expense)}
                </span>
                {expense > 0 && (
                  <div className="hidden sm:block h-1 rounded-full bg-rose-100 dark:bg-rose-900/30 overflow-hidden w-full max-w-[80px]">
                    <div
                      className="h-full rounded-full bg-rose-500 dark:bg-rose-400 transition-all duration-500"
                      style={{ width: `${maxVal > 0 ? (expense / maxVal) * 100 : 0}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center">
                <span className={`text-xs sm:text-sm font-bold px-2 py-0.5 rounded-lg
                  ${balance >= 0
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    : "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                  }`}>
                  {balance >= 0 ? "+" : ""}₹{fmt(balance)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-4 gap-1 px-3 sm:px-4 py-3
        bg-[#E1E3F5]/60 dark:bg-[#3D3D3E]/60 border-t border-white/10">
        <div className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center">
          Total
        </div>
        <div className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 text-center">
          +₹{fmt(totalIncome)}
        </div>
        <div className="text-xs sm:text-sm font-bold text-rose-500 dark:text-rose-400 text-center">
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
  );
}

export default WeeklySummaryTable;