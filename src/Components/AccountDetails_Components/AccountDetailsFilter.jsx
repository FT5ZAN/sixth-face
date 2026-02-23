import { useState, useEffect } from "react";
import { FaFilter, FaFilterCircleXmark } from "react-icons/fa6";
import { Calendar } from "@/components/ui/calendar.jsx";
import { createPortal } from "react-dom";

function AccountDetailsFilter({ filters, setFilters }) {
  const [filterOpen, setFilterOpen] = useState(false);

  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const isFiltered =
    filters.search !== "" ||
    filters.dateType !== "all" ||
    filters.transactionType !== "all" ||
    filters.month !== null ||
    filters.customDate !== null;

  const handleApply = () => {
    setFilters(tempFilters);
    setFilterOpen(false);
  };

  const handleCancel = () => {
    setTempFilters(filters);
    setFilterOpen(false);
  };

  const handleClearAll = () => {
    const cleared = {
      search: "",
      dateType: "all",
      month: null,
      customDate: null,
      transactionType: "all",
    };

    setTempFilters(cleared);
    setFilters(cleared);
    setFilterOpen(false);
  };

  return (
    <div className="sticky top-0 flex items-center gap-3 flex-wrap">
      <div className=" relative z-25 m-1  w-full ">
        <div
          className="flex items-center gap-3 p-3 rounded-xl 
                  bg-white/5 backdrop-blur-3xl 
                  border border-white/10 
                  shadow-lg"
        >
          <div className="relative w-full">
            <input
              type="text"
              disabled={filterOpen}
              placeholder="Search transaction..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              className="w-full px-4 py-2.5 
                   bg-white dark:bg-[#2D2E32] 
                    text-black dark:text-white placeholder-gray-400 
                   rounded-lg 
                   border border-black/10 
                   focus:outline-none 
                   focus:border-blue-500 
                   focus:ring-2 focus:ring-blue-500/30 
                   transition-all duration-300"
            />
          </div>
          <button
            onClick={() => {
              if (isFiltered) {
                handleClearAll();
              } else {
                setFilterOpen(!filterOpen);
              }
            }}
            className="px-3 py-2 bg-gray-200 rounded cursor-pointer"
          >
            {isFiltered ? (
              <FaFilterCircleXmark className="text-red-500" />
            ) : (
              <FaFilter className="text-[#283FE1] dark:text-[#27272A]" />
            )}
          </button>
        </div>
      </div>

      {filterOpen &&
        createPortal(
          <div className="fixed   inset-0  flex items-end bg-black/50 backdrop-blur-sm   z-[999999999999999] sm:items-start sm:justify-end ">
            <div
              className="
      w-full  sm:w-96
      bg-white dark:bg-[#2D2E32]
      rounded-t-2xl sm:rounded-xl
      shadow-xl
      p-5
      space-y-6
      max-h-[85vh]
      overflow-y-auto
      sm:absolute sm:right-6 sm:top-15
    "
            >
              <div>
                <input
                  type="text"
                  placeholder="Search transaction..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 
                   bg-white dark:bg-[#2D2E32] 
                    text-black dark:text-white placeholder-gray-400 
                   rounded-lg 
                   border border-black/10 
                   focus:outline-none 
                   focus:border-blue-500 
                   focus:ring-2 focus:ring-blue-500/30 
                   transition-all duration-300
                    mb-2
                   "
                />
                <p className="font-semibold text-lg mb-3">Date</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {["all", "today", "month", "custom"].map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setTempFilters((prev) => ({
                          ...prev,
                          dateType: type,
                          month: null,
                          customDate: null,
                        }))
                      }
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition
                ${
                  tempFilters.dateType === type
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>

                {tempFilters.dateType === "month" && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                      Select Month
                    </p>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const monthName = new Date(0, i).toLocaleString(
                          "default",
                          {
                            month: "short",
                          },
                        );

                        const isActive = tempFilters.month === i;

                        return (
                          <button
                            key={i}
                            onClick={() =>
                              setTempFilters((prev) => ({
                                ...prev,
                                month: i,
                              }))
                            }
                            className={`py-2 text-sm font-medium rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
                          >
                            {monthName}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {tempFilters.dateType === "custom" && (
                  <div className="border rounded-lg p-2 dark:border-gray-600 flex justify-center items-center">
                    <Calendar
                      mode="single"
                      selected={tempFilters.customDate}
                      onSelect={(date) =>
                        setTempFilters((prev) => ({
                          ...prev,
                          customDate: date,
                        }))
                      }
                    />
                  </div>
                )}
              </div>

              <div>
                <p className="font-semibold text-lg mb-3">Transaction Type</p>

                <div className="flex flex-wrap gap-2">
                  {["all", "income", "expense"].map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setTempFilters((prev) => ({
                          ...prev,
                          transactionType: type,
                        }))
                      }
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition
                ${
                  tempFilters.transactionType === type
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between sm:justify-end gap-3 pt-4 border-t dark:border-gray-600">
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg
            bg-gray-200 dark:bg-gray-700
            hover:bg-gray-300 dark:hover:bg-gray-600
            transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleApply}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg
            bg-blue-600 text-white
            hover:bg-blue-700
            transition shadow"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

export default AccountDetailsFilter;
