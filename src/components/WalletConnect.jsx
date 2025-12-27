import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { client } from "../Client";

/**
 * WalletConnect
 *
 * Mode A (default):
 *   sponsorGas = true  → Gasless Smart Wallet
 *
 * Mode B (Paid Mode):
 *   sponsorGas = false → User pays ETH (Scenario 2)
 */
export default function WalletConnect() {
  const [paidMode, setPaidMode] = useState(false);

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={paidMode}
          onChange={(e) => setPaidMode(e.target.checked)}
        />
        Switch to Paid Mode (Use my ETH for gas)
      </label>

      <ConnectButton
        client={client}
        wallets={[
          inAppWallet({ auth: { options: ["google", "email"] } }),
          createWallet("io.metamask"),
        ]}
        accountAbstraction={{
          chain: sepolia,
          sponsorGas: !paidMode,
          /**
           * paidMode = false → Gasless allowed
           * paidMode = true  → HARD OFF Paymaster
           *
           * ⚠️ User MUST reconnect wallet after switching mode
           */
        }}
        connectModal={{ size: "compact" }}
      />
    </div>
  );
}
