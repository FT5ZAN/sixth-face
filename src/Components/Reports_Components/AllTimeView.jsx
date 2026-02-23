


import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function AllTimeView({ accounts, selectedAccountId }) {
  const [chartType, setChartType] = useState("income");

  const allTransactions = useMemo(() => {
    if (!accounts) return [];
    if (selectedAccountId === "all") {
      return accounts.flatMap((acc) => acc.transactions || []);
    }
    const account = accounts.find((acc) => acc.id === selectedAccountId);
    return account ? account.transactions || [] : [];
  }, [accounts, selectedAccountId]);

  const totalIncome = allTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = allTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const pieData = useMemo(() => {
    const filtered = allTransactions.filter((t) => t.type === chartType);
    const grouped = {};
    filtered.forEach((t) => {
      if (!grouped[t.title]) grouped[t.title] = 0;
      grouped[t.title] += t.amount;
    });
    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [allTransactions, chartType]);

  const COLORS = ["#3041DC", "#A7ACDD", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const fmt = (n) =>
    Math.abs(n) >= 100000
      ? `${(n / 100000).toFixed(1)}L`
      : Math.abs(n) >= 1000
      ? `${(n / 1000).toFixed(1)}k`
      : n;

  const savingsRate =
    totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      const pct = pieData.length
        ? Math.round((d.value / pieData.reduce((s, i) => s + i.value, 0)) * 100)
        : 0;
      return (
        <div className="bg-white dark:bg-[#2a2a2c] border border-white/20 rounded-xl px-3 py-2 shadow-xl text-xs">
          <p className="font-semibold text-gray-800 dark:text-white mb-0.5">{d.name}</p>
          <p className="text-[#3041DC] dark:text-[#A7ACDD] font-bold">₹{fmt(d.value)}</p>
          <p className="text-gray-400">{pct}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5 pt-3">

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          {
            label: "Total Income",
            value: `+₹${fmt(totalIncome)}`,
            sub: `${allTransactions.filter(t => t.type === "income").length} transactions`,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-100/60 dark:bg-emerald-900/20",
            dot: "bg-emerald-500",
          },
          {
            label: "Total Expense",
            value: `-₹${fmt(totalExpense)}`,
            sub: `${allTransactions.filter(t => t.type === "expense").length} transactions`,
            color: "text-rose-500 dark:text-rose-400",
            bg: "bg-rose-100/60 dark:bg-rose-900/20",
            dot: "bg-rose-500",
          },
          {
            label: "Net Balance",
            value: `${balance >= 0 ? "+" : ""}₹${fmt(balance)}`,
            sub: `${savingsRate >= 0 ? savingsRate : 0}% savings rate`,
            color: balance >= 0 ? "text-[#3041DC] dark:text-[#A7ACDD]" : "text-rose-500 dark:text-rose-400",
            bg: "bg-[#E1E3F5]/80 dark:bg-[#3D3D3E]/80",
            dot: "bg-[#3041DC]",
          },
        ].map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl p-3 sm:p-4 border border-white/10 ${card.bg} flex flex-col gap-1`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${card.dot} shrink-0`} />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 truncate">
                {card.label}
              </span>
            </div>
            <p className={`text-sm sm:text-base md:text-xl font-bold truncate ${card.color}`}>
              {card.value}
            </p>
            <p className="text-[9px] sm:text-xs text-gray-400 dark:text-gray-500 truncate">
              {card.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="rounded-2xl border border-white/10
          bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm p-4 space-y-4">

          <div className="flex gap-2 bg-[#E1E3F5] dark:bg-[#3D3D3E]
            rounded-xl p-1.5 border border-white/10">
            {["income", "expense"].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold
                  flex items-center justify-center gap-2 transition-all duration-200
                  ${chartType === type
                    ? type === "income"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "bg-rose-500 text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0
                  ${chartType === type ? "bg-white/70" : type === "income" ? "bg-emerald-400" : "bg-rose-400"}`}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {pieData.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <div className="w-12 h-12 rounded-2xl bg-[#E1E3F5] dark:bg-[#3D3D3E]
                flex items-center justify-center">
                <svg className="w-6 h-6 text-[#A7ACDD]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                No {chartType} data available
              </p>
            </div>
          ) : (
            <div>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2 max-h-28 overflow-y-auto
                scrollbar-thin scrollbar-thumb-[#A7ACDD] dark:scrollbar-thumb-[#828284]">
                {pieData.map((entry, index) => {
                  const total = pieData.reduce((s, i) => s + i.value, 0);
                  const pct = Math.round((entry.value / total) * 100);
                  return (
                    <div key={entry.name} className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 truncate flex-1">
                        {entry.name}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-gray-400 shrink-0">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10
          bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm p-4 sm:p-5
          flex flex-col gap-5">

          <h2 className="text-sm sm:text-base font-bold text-gray-800 dark:text-white tracking-wide">
            Balance Overview
          </h2>

          <div className="space-y-4">
            {[
              {
                label: "Income",
                value: totalIncome,
                total: totalIncome + totalExpense,
                color: "bg-emerald-500",
                track: "bg-emerald-100 dark:bg-emerald-900/30",
                text: "text-emerald-600 dark:text-emerald-400",
                prefix: "+",
              },
              {
                label: "Expense",
                value: totalExpense,
                total: totalIncome + totalExpense,
                color: "bg-rose-500",
                track: "bg-rose-100 dark:bg-rose-900/30",
                text: "text-rose-500 dark:text-rose-400",
                prefix: "-",
              },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                    {item.label}
                  </span>
                  <span className={`text-xs sm:text-sm font-bold ${item.text}`}>
                    {item.prefix}₹{fmt(item.value)}
                  </span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${item.track}`}>
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{
                      width: item.total > 0
                        ? `${(item.value / item.total) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 dark:border-white/10" />

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Net Balance
              </span>
              <span className={`text-base sm:text-lg font-bold
                ${balance >= 0
                  ? "text-[#3041DC] dark:text-[#A7ACDD]"
                  : "text-rose-500 dark:text-rose-400"
                }`}>
                {balance >= 0 ? "+" : ""}₹{fmt(balance)}
              </span>
            </div>

            <div className={`flex items-center justify-between px-4 py-3 rounded-xl
              ${balance >= 0
                ? "bg-[#E1E3F5] dark:bg-[#3D3D3E]"
                : "bg-rose-100/60 dark:bg-rose-900/20"
              }`}>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Savings Rate
              </span>
              <span className={`text-sm font-bold
                ${savingsRate >= 0
                  ? "text-[#3041DC] dark:text-[#A7ACDD]"
                  : "text-rose-500 dark:text-rose-400"
                }`}>
                {savingsRate}%
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-xl
              bg-white/50 dark:bg-white/5 border border-white/10">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Transactions
              </span>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                {allTransactions.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTimeView;