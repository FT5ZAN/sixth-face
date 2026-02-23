import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import TransactionModal from "../Components/AccountDetails_Components/TransactionModal.jsx";
import TransactionActions from "../Components/AccountDetails_Components/TransactionActions.jsx";
import AccountDetailsFilter from "../Components/AccountDetails_Components/AccountDetailsFilter.jsx";

import { IoMdAdd } from "react-icons/io";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";

function AccountDetailsPage() {
  const { id } = useParams();

  const account = useSelector((state) =>
    state.accounts.accounts.find((acc) => acc.id === id),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const [filters, setFilters] = useState({
    search: "",
    dateType: "all",
    month: null,
    customDate: null,
    transactionType: "all",
  });

  if (!account) {
    return <div className="p-6">Account not found</div>;
  }

  const transactions = account.transactions;

  const processedTransactions = [...transactions]

    .filter((t) => t.title.toLowerCase().includes(filters.search.toLowerCase()))

    .filter((t) => {
      if (filters.transactionType === "all") return true;
      return t.type === filters.transactionType;
    })

    .filter((t) => {
      const txDate = new Date(t.date);
      const today = new Date();

      if (filters.dateType === "today") {
        return txDate.toDateString() === today.toDateString();
      }

      if (filters.dateType === "month" && filters.month !== null) {
        return txDate.getMonth() === filters.month;
      }

      if (filters.dateType === "custom" && filters.customDate) {
        return (
          txDate.toDateString() === new Date(filters.customDate).toDateString()
        );
      }

      return true;
    })

    .sort((a, b) => {
      let comparison = 0;

      if (sortConfig.key === "date") {
        comparison = new Date(a.date) - new Date(b.date);
      }

      if (sortConfig.key === "name") {
        comparison = a.title.localeCompare(b.title);
      }

      if (sortConfig.key === "amount") {
        comparison = a.amount - b.amount;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

  const totalIncome = processedTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = processedTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };
 


const formatCompact = (amount) =>
  new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);

const formatFull = (amount) =>
  new Intl.NumberFormat("en-IN").format(amount);

  return (
    <div
      className="w-full
         h-full
         bg-red-400
         dark:bg-[#333334]
         
         md:p-5
         rounded-b-lg 
         flex flex-col
         md:justify-center
         justify-evenly
         items-center
         md:gap-1
         "
    >
      <div className=" bg-green-400 h-auto w-full sticky top-0">
        <AccountDetailsFilter
          filters={filters}
          setFilters={setFilters}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
      </div>
       <div className="bg-sky-700 w-full h-[10%]  rounded-lg">
                 <table className="w-full h-full  p-1" >
                    <thead className="bg-gray-50  ">
                  <tr className="border-b border-gray-200">
                    <th
                      onClick={() => handleSort("date")}
                      className="w-[25%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-700 transition"
                    >
                      <div className="flex items-center gap-2">
                        <span>Date</span>
                        {sortConfig.key === "date" && (
                          <span className="text-blue-600">
                            {sortConfig.direction === "asc" ? (
                              <HiOutlineArrowNarrowUp className="w-4 h-4" />
                            ) : (
                              <HiOutlineArrowNarrowDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>

                    <th
                      onClick={() => handleSort("name")}
                      className="w-[35%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-700 transition"
                    >
                      <div className="flex items-center gap-2">
                        <span>Name</span>
                        {sortConfig.key === "name" && (
                          <span className="text-blue-600">
                            {sortConfig.direction === "asc" ? (
                              <HiOutlineArrowNarrowUp className="w-4 h-4" />
                            ) : (
                              <HiOutlineArrowNarrowDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>

                    <th
                      onClick={() => handleSort("amount")}
                      className="w-[25%] px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-700 transition"
                    >
                      <div className="flex items-center justify-end gap-2">
                        <span>Amount</span>
                        {sortConfig.key === "amount" && (
                          <span className="text-blue-600">
                            {sortConfig.direction === "asc" ? (
                              <HiOutlineArrowNarrowUp className="w-4 h-4" />
                            ) : (
                              <HiOutlineArrowNarrowDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>

                    <th className="w-[5%] px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"></th>
                  </tr>
                </thead>  
                 </table>
             </div>
      
        <div className="bg-yellow-300 p-2 h-[50vh] md:h-[65vh] w-full flex flex-col">

  {processedTransactions.length === 0 ? (
    <div className="flex-1 flex justify-center items-center">
      <p className="text-gray-500 text-sm sm:text-base">
        No transactions found.
      </p>
    </div>
  ) : (

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">

      
      <div className="flex-1 overflow-y-auto">

        <table className="w-full table-fixed">

          <tbody className="divide-y divide-gray-200">

            {processedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >

               
                <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-gray-600">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                <td className="px-3 sm:px-6 py-3">
                 
                  <span
  title={transaction.title}
  className="block truncate max-w-[110px] sm:max-w-[220px] text-xs sm:text-sm font-medium text-gray-900"
>
  {transaction.title}
</span>
                </td>

                
                <td className="px-3 sm:px-6 py-3 text-right">
  <div
    className={`inline-flex items-center justify-end gap-1 text-xs sm:text-sm font-semibold ${
      transaction.type === "income"
        ? "text-emerald-600"
        : "text-rose-600"
    }`}
  >
    <FaRupeeSign className="w-3 h-3 sm:w-4 sm:h-4" />
    <span title={`₹ ${formatFull(transaction.amount)}`}>
      {transaction.type === "income" ? "+" : "-"}
      {formatCompact(transaction.amount)}
    </span>
  </div>
</td>

                <td className="px-3 sm:px-6 py-3 text-right">
                  <TransactionActions
                    transaction={transaction}
                    accountId={account.id}
                    onEdit={(tx) => {
                      setEditingTransaction(tx);
                      setIsModalOpen(true);
                    }}
                  />
                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>

    </div>
  )}
</div>
      <div className="w-full px-3 py-2">
        <div
          className="flex justify-between items-center 
                  bg-white dark:bg-[#1f1f1f] 
                  shadow-md rounded-xl 
                  px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
              <FaRupeeSign className="text-green-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Income</p>
              <p className="text-green-600 font-semibold text-sm sm:text-base">
               
                <span title={`₹ ${formatFull(totalIncome)}`}>
  {formatCompact(totalIncome)}
</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
              <FaRupeeSign className="text-red-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Expense</p>
              <p className="text-red-600 font-semibold text-sm sm:text-base">
                
                <span title={`₹ ${formatFull(totalExpense)}`}>
  {formatCompact(totalExpense)}
</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <FaRupeeSign className="text-blue-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Balance</p>
             
             
<p
  className={`font-semibold text-sm sm:text-base ${
    balance > 0
      ? "text-green-600"
      : balance < 0
      ? "text-red-600"
      : "text-blue-600"
  }`}
>
  <span title={`₹ ${formatFull(balance)}`}>
    {formatCompact(balance)}
  </span>
</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setEditingTransaction(null);
          setIsModalOpen(true);
        }}
        className="fixed
         bottom-45
          right-8
           md:bottom-30
             md:right-13
              bg-[#283FE1]
               dark:bg-[#27272A]
                text-white 
                 md:w-15 
                 md:h-15
                  w-13 
                  h-13 
                  rounded-full
                   text-2xl
                    shadow-lg
                     flex 
                     items-center 
                     justify-center
                      cursor-pointer
                       hover:scale-110 transition-all duration-200
                       z-40
 "
      >
        <IoMdAdd />
      </button>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accountId={account.id}
        editingTransaction={editingTransaction}
      />
    </div>
  );
}

export default AccountDetailsPage;
