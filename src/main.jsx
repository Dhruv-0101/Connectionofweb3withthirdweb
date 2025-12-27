import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "thirdweb/react";
import App from "./App";

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
