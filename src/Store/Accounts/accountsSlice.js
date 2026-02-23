


import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadAccounts, saveAccounts } from "../../Utils/localStorage.js";

const initialState = {
  accounts: loadAccounts(),
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: {
      reducer(state, action) {
        state.accounts.push(action.payload);
        saveAccounts(state.accounts);
      },
      prepare(name, isArchived = false, isPinned = false) {
        return {
          payload: {
            id: nanoid(),
            name: name.trim(),
            nameLower: name.trim().toLowerCase(),
            isArchived,
            isPinned,
            createdAt: new Date().toISOString(),
            transactions: [],
          },
        };
      },
    },

    deleteAccount(state, action) {
      state.accounts = state.accounts.filter(
        (acc) => acc.id !== action.payload
      );
      saveAccounts(state.accounts);
    },

    toggleArchive(state, action) {
      const account = state.accounts.find(
        (acc) => acc.id === action.payload
      );
      if (account) {
        account.isArchived = !account.isArchived;
        saveAccounts(state.accounts);
      }
    },

    togglePin(state, action) {
      const account = state.accounts.find(
        (acc) => acc.id === action.payload
      );
      if (account) {
        account.isPinned = !account.isPinned;
        saveAccounts(state.accounts);
      }
    },

    renameAccount(state, action) {
      const { id, newName } = action.payload;
      const account = state.accounts.find((acc) => acc.id === id);
      if (account) {
        account.name = newName.trim();
        account.nameLower = newName.trim().toLowerCase();
        saveAccounts(state.accounts);
      }
    },


    addTransaction: {
      reducer(state, action) {
        const { accountId, transaction } = action.payload;

        const account = state.accounts.find(
          (acc) => acc.id === accountId
        );

        if (account) {
          account.transactions.push(transaction);
          saveAccounts(state.accounts);
        }
      },
      prepare(accountId, { title, amount, type, date }) {
        return {
          payload: {
            accountId,
            transaction: {
              id: nanoid(),
              title: title.trim(),
              amount: Number(amount),
              type,
              date: new Date(date).toISOString(),
            },
          },
        };
      },
    },

    editTransaction(state, action) {
      const { accountId, transactionId, updatedData } = action.payload;

      const account = state.accounts.find(
        (acc) => acc.id === accountId
      );

      if (account) {
        const transaction = account.transactions.find(
          (t) => t.id === transactionId
        );

        if (transaction) {
          transaction.title = updatedData.title.trim();
          transaction.amount = Number(updatedData.amount);
          transaction.type = updatedData.type;
          transaction.date = new Date(updatedData.date).toISOString();

          saveAccounts(state.accounts);
        }
      }
    },

    deleteTransaction(state, action) {
      const { accountId, transactionId } = action.payload;

      const account = state.accounts.find(
        (acc) => acc.id === accountId
      );

      if (account) {
        account.transactions = account.transactions.filter(
          (t) => t.id !== transactionId
        );

        saveAccounts(state.accounts);
      }
    },

  },
});

export const {
  addAccount,
  deleteAccount,
  toggleArchive,
  togglePin,
  renameAccount,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = accountsSlice.actions;

export default accountsSlice.reducer;
