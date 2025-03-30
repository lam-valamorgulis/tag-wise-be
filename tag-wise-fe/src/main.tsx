import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Auth0ProviderWithNavigate } from "./components/Auth0ProviderWithNavigate";
import { GeneralInformationProvider } from "./context/GeneralInformationProvider";
import "./index.css";
import { THEME_OPTIONS } from "./utils/const";
console.log("Before mounting React"); // Debugging log

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <GeneralInformationProvider>
          <ConfigProvider theme={THEME_OPTIONS}>
            <App />
          </ConfigProvider>
        </GeneralInformationProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);
