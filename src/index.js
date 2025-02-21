import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot instead of render
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);