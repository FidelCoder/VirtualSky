import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";

import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
