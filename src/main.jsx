import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PublicClientApplication } from "@azure/msal-browser"; 

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
          <App />
  </StrictMode>
);
