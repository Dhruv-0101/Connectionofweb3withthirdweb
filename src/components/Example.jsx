import { ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";

const wallets = [
  // ✅ Only In-App Wallet gets Smart Wallet wrapper
  inAppWallet({
    auth: { options: ["google", "discord", "email"] },
    smartWallet: {
      chain: sepolia,
      sponsorGas: true,
    },
  }),

  // ✅ These stay pure EOAs (real addresses)
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

export default function Example() {
  return (
    <ConnectButton
      client={{ clientId: "b34fd548e807251bc443476606eb1bee" }}
      wallets={wallets}
      connectModal={{ size: "compact" }}
    />
  );
}
//done
// import { createThirdwebClient } from "thirdweb";
// import { ConnectButton } from "thirdweb/react";
// import { inAppWallet, createWallet } from "thirdweb/wallets";
// import { sepolia } from "thirdweb/chains";

// const client = createThirdwebClient({
//   clientId: "b34fd548e807251bc443476606eb1bee",
// });

// const wallets = [
//   inAppWallet({
//     auth: {
//       options: [
//         "google",
//         "discord",
//         "telegram",
//         "farcaster",
//         "email",
//         "x",
//         "passkey",
//         "phone",
//         "apple",
//       ],
//     },
//   }),

//   createWallet("io.metamask"),
//   createWallet("com.coinbase.wallet"),
//   createWallet("me.rainbow"),
//   createWallet("io.rabby"),
//   createWallet("io.zerion.wallet"),
// ];

// export default function Example() {
//   return (
//     <ConnectButton
//       client={client}
//       connectModal={{ size: "compact" }}
//       wallets={wallets}
//       accountAbstraction={{
//         sponsorGas: true,
//         chain: sepolia,
//       }}
//     />
//   );
// }
