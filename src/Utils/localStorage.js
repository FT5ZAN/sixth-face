const STORAGE_KEY = "accounts_db";

export const loadAccounts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load accounts", error);
    return [];
  }
};
 
export const saveAccounts = (accounts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch (error) {
    console.error("Failed to save accounts", error);
  }
};
