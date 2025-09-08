// import { createThirdwebClient } from "thirdweb";
// import { ConnectButton } from "thirdweb/react";

// import {
//   inAppWallet,
//   createWallet,
// } from "thirdweb/wallets";

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

// function Example() {
//   return (
//     <ConnectButton
//       client={client}
//       connectModal={{ size: "compact" }}
//       wallets={wallets}
//       accountAbstraction={
//         {
//             sponsorGas : true,
//             chain : ["sepolia","Avalanche Fuji Testnet"],
//         }
//       }
//     />
//   );
// }
// export default Example;
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

import { sepolia, avalancheFuji } from "thirdweb/chains"; // ✅ import chain objects

const client = createThirdwebClient({
  clientId: "b34fd548e807251bc443476606eb1bee",
});

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "telegram",
        "farcaster",
        "email",
        "x",
        "passkey",
        "phone",
        "apple",
      ],
    },
  }),
  
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

function Example() {
  return (
    <ConnectButton
      client={client}
      connectModal={{ size: "compact" }}
      wallets={wallets}
      accountAbstraction={{
        sponsorGas: true,
        chain: sepolia, // ✅ use chain objects, not strings
      }}
    />
  );
}

export default Example;