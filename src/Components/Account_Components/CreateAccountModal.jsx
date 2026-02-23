


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAccount,
  renameAccount,
  toggleArchive,
  togglePin,
} from "../../Store/Accounts/accountsSlice.js";
import { TiPin } from "react-icons/ti";
import { VscFolderActive } from "react-icons/vsc";
import { MdAddCircle } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useToast } from "../../context/ToastContext.jsx";
function CreateAccountModal({ isOpen, onClose, editingAccount }) {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.accounts);

  const [name, setName] = useState("");
  const [isArchived, setIsArchived] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const { showToast } = useToast();
  useEffect(() => {
    if (editingAccount) {
      setName(editingAccount.name);
      setIsArchived(editingAccount.isArchived);
      setIsPinned(editingAccount.isPinned);
    } else {
      setName("");
      setIsArchived(false);
      setIsPinned(false);
    }
  }, [editingAccount]);

  if (!isOpen) return null;

  

  const handleSubmit = () => {
  const trimmed = name.trim();

  if (!trimmed) {
    showToast("Account name is required", "error");
    return;
  }

  const exists = accounts.some(
    (acc) =>
      acc.nameLower === trimmed.toLowerCase() &&
      (!editingAccount || acc.id !== editingAccount.id),
  );

  if (exists) {
    showToast("Account already exists", "error");
    return;
  }

  if (editingAccount) {
    dispatch(
      renameAccount({
        id: editingAccount.id,
        newName: trimmed,
      }),
    );

    if (editingAccount.isArchived !== isArchived) {
      dispatch(toggleArchive(editingAccount.id));
    }

    if (editingAccount.isPinned !== isPinned) {
      dispatch(togglePin(editingAccount.id));
    }

    showToast("Account updated successfully", "success");
  } else {
    dispatch(addAccount(trimmed, isArchived, isPinned));
    showToast("Account created successfully", "success");
  }

  setName("");
  setIsArchived(false);
  setIsPinned(false);

  onClose();
};
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm 
                flex items-end sm:items-center 
                justify-center 
                z-[1000]">
      <div className="bg-white dark:bg-[#2D2E32] 
                w-full sm:max-w-md
                rounded-t-2xl sm:rounded-2xl
                shadow-2xl 
                relative z-50 
                max-h-[90vh] overflow-y-auto
                animate-slideUp">
        <div className="bg-[#3041DC] dark:bg-[#27272A] px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            {editingAccount ? "Edit Account" : "Create New Account"}
          </h2>
          <p className="text-[#ADB2E3] dark:text-[#c0c0ce] text-sm mt-1">
            {editingAccount
              ? "Update your account details below"
              : "Fill in the information to create a new account"}
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Account Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg   text-gray-700 dark:text-white placeholder-gray-400"
              placeholder="Enter account name"
              autoFocus
            />
          </div>

          <div className="space-y-4 mb-5">
            <div className="flex items-center justify-between p-3 bg-[#ADB2E3] dark:bg-[#707075] rounded-lg   ">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#DBEAFD] dark:bg-[#E5E7EB] rounded-full flex items-center justify-center">
                   <VscFolderActive size={20} className="text-[#3041DC] dark:text-[#838384]" />
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-white">
                    Archive
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white">
                    Move to archived folder
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isArchived}
                  onChange={() => setIsArchived(!isArchived)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#ADB2E3] dark:bg-[#707075] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#DBEAFD] dark:bg-[#E5E7EB] rounded-full flex items-center justify-center">
                  <TiPin size={20} className="text-[#3041DC] dark:text-[#838384]" />
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-white">
                    Pin
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white">
                    Keep at the top of the list
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={() => setIsPinned(!isPinned)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

         

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg  focus:ring-gray-200 dark:text-white font-medium order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#3041DC] dark:bg-[#27272A] text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 font-medium order-1 sm:order-2"
            >
              {editingAccount ? (
                <span className="flex items-center justify-center gap-2">
                  < FaEdit size={20} />
                  Update Account
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                 
                 < MdAddCircle
                  
                 />
                  Create Account
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountModal;
