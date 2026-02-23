

function MonthlyCalendar({ selectedDate, transactions }) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const dailySummary = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const day = date.getDate();

    if (!dailySummary[day]) {
      dailySummary[day] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      dailySummary[day].income += t.amount;
    } else {
      dailySummary[day].expense += t.amount;
    }
  });

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarCells = [];

  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(
      <div key={"empty-" + i} className="rounded-xl" />
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const summary = dailySummary[day];
    const income = summary?.income || 0;
    const expense = summary?.expense || 0;
    const balance = income - expense;
    const isToday = isCurrentMonth && day === todayDate;
    const hasData = !!summary;

    calendarCells.push(
      <div
        key={day}
        className={`relative rounded-xl p-1.5 sm:p-2 min-h-[64px] sm:min-h-[80px] md:min-h-[90px]
          flex flex-col transition-all duration-200
          border
          ${isToday
            ? "bg-[#3041DC]/10 dark:bg-[#3041DC]/20 border-[#3041DC]/40 shadow-sm shadow-[#3041DC]/10"
            : hasData
            ? "bg-white/60 dark:bg-white/5 border-white/20 hover:bg-white/80 dark:hover:bg-white/10"
            : "bg-white/30 dark:bg-white/[0.03] border-white/10"
          }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span
            className={`text-xs sm:text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-lg
              ${isToday
                ? "bg-[#3041DC] text-white shadow-sm"
                : "text-gray-700 dark:text-gray-300"
              }`}
          >
            {day}
          </span>
          {hasData && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#A7ACDD] dark:bg-[#828284] opacity-70" />
          )}
        </div>

        {summary && (
          <div className="flex flex-col gap-0.5  mt-auto">
            {income > 0 && (
              <div className="flex items-center justify-center gap-0.5">
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-[9px] sm:text-[10px] md:text-xs text-emerald-600 dark:text-emerald-400 font-medium truncate leading-tight">
                  <span className="hidden sm:inline">+</span>₹{income >= 1000 ? `${(income / 1000).toFixed(1)}k` : income}
                </span>
              </div>
            )}
            {expense > 0 && (
              <div className="flex items-center justify-center gap-0.5">
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-rose-500 shrink-0" />
                <span className="text-[9px] sm:text-[10px] md:text-xs text-rose-500 dark:text-rose-400 font-medium truncate leading-tight">
                  <span className="hidden sm:inline">-</span>₹{expense >= 1000 ? `${(expense / 1000).toFixed(1)}k` : expense}
                </span>
              </div>
            )}
            <div
              className={`text-[9px] sm:text-[10px] md:text-xs font-bold leading-tight mt-0.5 truncate flex items-center justify-center 
                ${balance >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-500 dark:text-rose-400"
                }`}
            >
              ₹{Math.abs(balance) >= 1000
                ? `${(balance / 1000).toFixed(1)}k`
                : balance}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayLabels.map((label) => (
          <div
            key={label}
            className="text-center text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 py-1 tracking-wide uppercase"
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.charAt(0)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarCells}
      </div>

      <div className="flex items-center justify-end gap-4 mt-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">Expense</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#3041DC]" />
          <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">Today</span>
        </div>
      </div>
    </div>
  );
}

export default MonthlyCalendar;