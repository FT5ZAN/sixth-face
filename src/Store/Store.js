import { configureStore } from "@reduxjs/toolkit";
import accountsSlice from "./Accounts/accountsSlice.js";

export const store = configureStore({
  reducer: {
    accounts: accountsSlice,
  },
});
