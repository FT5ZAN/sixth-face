
import { useState } from "react";

function AccountSelector({
  accounts,
  selectedAccountId,
  setSelectedAccountId,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredAccounts = accounts.filter((acc) =>
    acc.nameLower.includes(search.toLowerCase())
  );

  const selectedName =
    selectedAccountId === "all"
      ? "All Accounts"
      : accounts.find((a) => a.id === selectedAccountId)?.name;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm font-medium
          bg-[#E1E3F5] dark:bg-[#3D3D3E] border-white/10 text-gray-800 dark:text-white
          hover:bg-[#d0d3f0] dark:hover:bg-[#4a4a4c] shadow-sm`}
      >
        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.232.797 5.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="max-w-[100px] sm:max-w-[140px] truncate">{selectedName}</span>
        <svg
          className={`w-4 h-4 opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 sm:hidden"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-[90vw] max-w-[260px] sm:w-64
            bg-[#E1E3F5] dark:bg-[#3D3D3E] backdrop-blur-[20px]
            border border-white/10 rounded-xl shadow-xl z-50 p-2 space-y-1
            animate-in fade-in slide-in-from-top-1 duration-150">

            <div className="relative mb-2">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search account..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg text-sm
                  bg-white/60 dark:bg-white/10 border border-white/20
                  text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-[#3041DC]/40"
              />
            </div>

            <button
              onClick={() => {
                setSelectedAccountId("all");
                setOpen(false);
              }}
              className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${selectedAccountId === "all"
                  ? "bg-[#3041DC] dark:bg-[#27272A] text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10"
                }`}
            >
              <svg className="w-4 h-4 opacity-70 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              All Accounts
            </button>

            {filteredAccounts.length > 0 && (
              <div className="border-t border-white/20 dark:border-white/10 my-1" />
            )}

            <div className="max-h-48 overflow-y-auto space-y-0.5 pr-0.5
              scrollbar-thin scrollbar-thumb-[#A7ACDD] dark:scrollbar-thumb-[#828284] scrollbar-track-transparent">
              {filteredAccounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    setSelectedAccountId(acc.id);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150
                    ${selectedAccountId === acc.id
                      ? "bg-[#3041DC] dark:bg-[#27272A] text-white font-medium"
                      : "text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10"
                    }`}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0
                    ${selectedAccountId === acc.id
                      ? "bg-white/20 text-white"
                      : "bg-[#A7ACDD]/40 dark:bg-[#828284]/40 text-gray-600 dark:text-gray-300"
                    }`}>
                    {acc.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate">{acc.name}</span>
                </button>
              ))}

              {filteredAccounts.length === 0 && (
                <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-4">
                  No accounts found
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountSelector;