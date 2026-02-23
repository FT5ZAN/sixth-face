// import { StrictMode } from 'react'; //it best but i dont need it for now
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/Store.js";
import "./index.css";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ToastProvider>
      <App />
      </ToastProvider>
    </BrowserRouter>
  </Provider>,
  // </StrictMode>,
);
