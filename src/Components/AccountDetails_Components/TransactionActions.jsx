import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../Store/Accounts/accountsSlice.js";
import ConfirmAlert from "../Coman_Components/ConfromAlert.jsx";
import { useToast } from "../../Context/ToastContext.jsx";
function TransactionActions({
  transaction,
  accountId,
  onEdit,
}) {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);
  const { showToast } = useToast();
const [showConfirm, setShowConfirm] = useState(false);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleDeleteConfirm = () => {
  dispatch(
    deleteTransaction({
      accountId,
      transactionId: transaction.id,
    })
  );

  showToast("Transaction deleted successfully", "success");
  setShowConfirm(false);
};

const handleDeleteCancel = () => {
  setShowConfirm(false);
};
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();

          const rect = e.currentTarget.getBoundingClientRect();
          const dropdownHeight = 120;
          const dropdownWidth = 140;

          let top = rect.bottom;
          let left = rect.right - dropdownWidth;

          if (rect.bottom + dropdownHeight > window.innerHeight) {
            top = rect.top - dropdownHeight;
          }

          left = Math.max(10, left);

          setMenuPosition({ top, left });
          setOpenMenu(!openMenu);
        }}
        className="text-xl"
      >
        ⋮
      </button>

      {openMenu && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: menuPosition.top,
            left: menuPosition.left,
          }}
          className="bg-white border rounded shadow-md w-36 z-50"
        >
          <button
            onClick={() => {
              onEdit(transaction);
              setOpenMenu(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Edit
          </button>

          <button
            
            onClick={(e) => {
  e.stopPropagation();
  setShowConfirm(true);
  setOpenMenu(false);
}}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      )}
      <ConfirmAlert
  isOpen={showConfirm}
  title="Delete Transaction?"
  message={`Are you sure you want to delete "${transaction.title}"? This action cannot be undone.`}
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleDeleteConfirm}
  onCancel={handleDeleteCancel}
/>
    </>
  );
}

export default TransactionActions;
