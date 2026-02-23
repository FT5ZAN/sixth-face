import { Routes, Route } from "react-router-dom";
import MainPages from "../Components/Layout/MainPages.jsx";
import AccountsPage from "../Pages/Accounts.jsx";
import AccountDetailsPage from "../Pages/AccountDetailsPage.jsx";

import  ReportsPage  from "../Pages/Reports.jsx";
import   StorageAndSettingPage from "../Pages/Storage_and_Setting.jsx";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<MainPages />}>
            <Route path="/" element={<AccountsPage />} />
            <Route path="/account/:id" element={<AccountDetailsPage />} />
            <Route path="/Reports" element={<ReportsPage />} />  
              <Route path="/Storage" element={< StorageAndSettingPage/>} /> 
                  </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
