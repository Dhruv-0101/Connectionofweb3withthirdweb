import { ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { client } from "./Client";

export default function Example() {
  return (
    <ConnectButton
      client={client}
      wallets={[
        inAppWallet({
          auth: { options: ["google", "email"] },
        }),
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("me.rainbow"),
      ]}
      accountAbstraction={{
        chain: sepolia,
        sponsorGas: true, // 🔥 REAL GASLESS SWITCH
      }}
      connectModal={{ size: "compact" }}
    />
  );
}
