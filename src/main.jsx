import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThirdwebProvider } from "thirdweb/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThirdwebProvider
      clientId="b34fd548e807251bc443476606eb1bee" 
      activeChain="sepolia"
    >
      <App />
    </ThirdwebProvider>
  </StrictMode>
);
