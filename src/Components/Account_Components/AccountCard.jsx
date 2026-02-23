import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  togglePin,
  toggleArchive,
  deleteAccount,
} from "../../Store/Accounts/accountsSlice.js";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TiPin } from "react-icons/ti";
import { VscFolderActive } from "react-icons/vsc";
import { GoDotFill } from "react-icons/go";
import { FaRupeeSign } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { RiFolderCloseFill } from "react-icons/ri";
import { RiUnpinFill } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import ConfirmAlert from "../Coman_Components/ConfromAlert.jsx";
import { useToast } from "../../context/ToastContext.jsx";

function AccountCard({ account, onEdit }) {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
const totalIncome = account.transactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpense = account.transactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

const balance = totalIncome - totalExpense;

const balanceColor =
  balance > 0
    ? "text-green-600"
    : balance < 0
    ? "text-red-500"
    : "text-blue-600";

const formatCompact = (amount) =>
  new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
const formatFull = (amount) =>
  new Intl.NumberFormat("en-IN").format(amount);


const { showToast } = useToast();
const [showConfirm, setShowConfirm] = useState(false);

const handleDeleteConfirm = () => {
  dispatch(deleteAccount(account.id));
  showToast("Account deleted successfully", "success");
  setShowConfirm(false);

  if (location.pathname === `/account/${account.id}`) {
    navigate("/");
  }
};

const handleDeleteCancel = () => {
  setShowConfirm(false);
};

return (
    <div
    onClick={(e) => {
  if (showConfirm) return; 
  navigate(`/account/${account.id}`);
}}
      className="  cursor-pointer relative bg-white dark:bg-[#2D2E32] rounded-2xl border border-gray-200 
                   dark:border-gray-700    
                  shadow-sm hover:shadow-md transition-all duration-300 
                  p-5 flex md:flex-row  items-center justify-between 
                   flex-col gap-5
                 "
    >
      <div className="flex items-center md:justify-center gap-4  w-full justify-baseline md:w-[auto]">
        <div
          className="w-12 h-12 rounded-xl bg-[#A6ACDF] dark:bg-[#838384]
                      flex items-center justify-center
                      font-semibold text-[#3041DC] dark:text-[#242A45]"
        >
          {account.name.slice(0, 1).toUpperCase()}
        </div>

        <div>
          
<h2
  title={account.name}
  className="font-semibold text-lg text-black dark:text-white 
             max-w-[150px] md:max-w-[200px] 
             truncate"
>
  {account.name}
</h2>

          <div className="flex gap-2 mt-1">
            {account.isPinned && (
              <span
                className="text-xs bg-yellow-100 text-yellow-700 
                             px-3 py-1 rounded-full"
              >
                <div className="flex items-center gap-1">
                  {" "}
                  <TiPin />
                  Pinned
                </div>
              </span>
            )}

            {account.isArchived ? (
              <span
                className="text-xs bg-gray-200 text-gray-600 
                             px-3 py-1 rounded-full"
              >
                <div className="flex items-center gap-1">
                  {" "}
                  <VscFolderActive />
                  Archived{" "}
                </div>
              </span>
            ) : (
              <span
                className="text-xs bg-green-100 text-green-700 
                             px-3 py-1 rounded-full"
              >
                <div className="flex items-center gap-1">
                  {" "}
                  <GoDotFill />
                  Active
                </div>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-around md:justify-center gap-5 md:gap-10 text-sm w-full md:w-[auto]">
        <div className="text-center ">
          <p className="text-gray-400 uppercase text-xs tracking-wider">
            Income
          </p>
        
          <p className="text-green-600 font-semibold text-base">
  <span
    className="flex items-center gap-1"
    title={`₹ ${formatFull(totalIncome)}`}
  >
    <FaRupeeSign />
    {formatCompact(totalIncome)}
  </span>
</p>
        </div>

        <div className="text-center">
          <p className="text-gray-400 uppercase text-xs tracking-wider">
            Expense
          </p>
         <p className="text-red-500 font-semibold text-base">
  <span
    className="flex items-center gap-1"
    title={`₹ ${formatFull(totalExpense)}`}
  >
    <FaRupeeSign />
    {formatCompact(totalExpense)}
  </span>
</p>
        </div>

        <div className="text-center">
          <p className="text-gray-400 uppercase text-xs tracking-wider">
            Balance
          </p>
          
        
<p className={`font-semibold text-base ${balanceColor}`}>
  <span
    className="flex items-center gap-1"
    title={`₹ ${formatFull(balance)}`}
  >
    <FaRupeeSign />
    {formatCompact(balance)}
  </span>
</p>
   
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            const dropdownHeight = 180;
            const dropdownWidth = 160;
           
            let top = rect.bottom;
            let left = rect.right - dropdownWidth;

            if (rect.bottom + dropdownHeight > window.innerHeight) {
              top = rect.top - dropdownHeight;
            }

            left = Math.max(10, left);

            setMenuPosition({ top, left });
            setOpenMenu(!openMenu);
          }}
          className="text-gray-500 hover:text-gray-700 transition  cursor-pointer"
        >
          <PiDotsThreeOutlineVerticalFill size={20} />
        </button>
      </div>

      {openMenu && (
        <div
          ref={menuRef}
           onClick={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            top: menuPosition.top,
            left: menuPosition.left,
          }}
          className="bg-white dark:bg-[#2D2E32] dark:border-gray-700 border border-gray-200 
                   rounded-xl shadow-lg w-44 z-50 "
        >
          <button
            onClick={() => {
              
              onEdit(account);
              setOpenMenu(false);
            }}
            className="block w-full text-left px-4 py-2  rounded-xl hover:bg-[#3041DC] hover:text-white  dark:hover:bg-[#5D5D62] cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <MdDriveFileRenameOutline size={20} />
              Rename
            </div>
          </button>

          <button
            onClick={() => {
              dispatch(togglePin(account.id));
              setOpenMenu(false);
            }}
            className="block w-full text-left px-4 py-2  rounded-xl hover:bg-[#3041DC] hover:text-white dark:hover:bg-[#5D5D62]  cursor-pointer"
          >
            
            {account.isPinned ? (
              <>
                <div className="flex items-center gap-1">
                  <RiUnpinFill size={20} />
                  Unpin
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <TiPin size={20} />
                  Pin
                </div>
              </>
            )}
          </button>

         
          <button
            onClick={() => {
              dispatch(toggleArchive(account.id));
              setOpenMenu(false);
            }}
            className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-xl hover:bg-[#3041DC] hover:text-white dark:hover:bg-[#5D5D62]  cursor-pointer"
          >
            {account.isArchived ? (
              <>
                <RiFolderCloseFill size={20} />
                Remove from Archive
              </>
            ) : (
              <>
                <VscFolderActive size={16} />
                Move to Archive
              </>
            )}
          </button>

          <button
           
           onClick={(e) => {
  e.stopPropagation();
  setShowConfirm(true);
  setOpenMenu(false);
}}
            className="block w-full text-left px-4 py-2 text-red-500 rounded-xl hover:bg-[#FB313D] hover:text-white  cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <MdDeleteSweep className="text-xl" />
              Delete
            </div>
          </button>
        </div>
      )}
     <ConfirmAlert
  isOpen={showConfirm}
  title="Delete Account?"
  message={`Are you sure you want to delete "${account.name}"? This action cannot be undone.`}
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleDeleteConfirm}
  onCancel={handleDeleteCancel}
/>
    </div>
  );
}

export default AccountCard;
