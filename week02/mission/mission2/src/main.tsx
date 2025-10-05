import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import TodoProvider from "./context/contextProvider.tsx";
import { ThemeProvider } from "./context/themeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TodoProvider>
  </StrictMode>
);
