import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App";

const rootEl = document.getElementById("root");
if (rootEl === null) throw new Error("Root element #root not found");

if (import.meta.env.PROD) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
