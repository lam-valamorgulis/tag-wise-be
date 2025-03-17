import { ConfigProvider, theme } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Auth0ProviderWithNavigate } from "./components/Auth0ProviderWithNavigate";
import "./index.css";
console.log("Before mounting React"); // Debugging log

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <ConfigProvider
          theme={{
            components: {
              Typography: {
                titleMarginBottom: "0",
              },
              Table: {
                borderColor: "rgb(203,213,225)",
              },
            },
            token: {
              fontSize: 14,
              sizeStep: 4,
            },
            algorithm: theme.compactAlgorithm,
          }}
        >
          <App />
          {/* <h1>hello world</h1> */}
        </ConfigProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);
console.log("After mounting React"); // Debugging log
