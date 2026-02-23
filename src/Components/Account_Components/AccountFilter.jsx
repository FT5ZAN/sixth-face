



import { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { TbArrowsUpDown } from "react-icons/tb";
 import { TbArrowsDownUp } from "react-icons/tb";

function AccountFilter({ sortOption, setSortOption }) {
  const [filterOpen, setFilterOpen] = useState(false);

  const isFiltered = sortOption !== "date";

  const handleResetFilter = () => {
    setSortOption("date");
    setFilterOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (isFiltered) {
            handleResetFilter();
          } else {
            setFilterOpen(!filterOpen);
          }
        }}
        className="px-3 py-2 bg-gray-200 rounded flex items-center justify-center cursor-pointer"
      >
        {isFiltered ? (
          <FaFilterCircleXmark className="text-red-500" />
        ) : (
          <FaFilter className="text-[#283FE1] dark:text-[#27272A]" />
        )}
      </button>

      {!isFiltered && filterOpen && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-[#2D2E32]   shadow-md w-48 z-50  rounded-lg border-gray-200 border dark:border-gray-700 ">
          

          <button
            onClick={() => {
              setSortOption("nameAsc");
              setFilterOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-[#283FE1] dark:hover:bg-[#5D5D62] hover:text-white rounded-lg cursor-pointer "
          >
            <div className="flex items-center gap-1">
            <TbArrowsUpDown />Name Ascending  
</div>
          </button>

          <button
            onClick={() => {
              setSortOption("nameDesc");
              setFilterOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-[#283FE1] hover:text-white rounded-lg cursor-pointer dark:hover:bg-[#5D5D62] "
          >
            <div className="flex items-center gap-1">
           <TbArrowsDownUp /> Name Descending 
           </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountFilter;
