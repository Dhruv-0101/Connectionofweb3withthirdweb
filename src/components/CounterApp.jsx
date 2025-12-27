"use client";

import { useActiveAccount } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { TransactionButton, useReadContract } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { client } from "../Client";

const CONTRACT_ADDRESS = "0xF37Bc74fD3816881eaA4FF74E3be9b587C975d01";

const abi = [
  {
    name: "getCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "increment",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
];

export default function CounterApp() {
  const account = useActiveAccount();

  const contract = getContract({
    client,
    chain: sepolia,
    address: CONTRACT_ADDRESS,
    abi,
  });

  const { data: count, refetch } = useReadContract({
    contract,
    method: "getCount",
  });

  if (!account) {
    return <p>Please connect wallet</p>;
  }

  return (
    <div className="p-6 space-y-4 border rounded max-w-md">
      <h1 className="text-xl font-bold">Counter DApp</h1>

      <p>
        Count:{" "}
        <span className="font-mono">{count ? count.toString() : "..."}</span>
      </p>

      {/* 
        🔥 TransactionButton is IMPORTANT
        - Shows thirdweb Transaction Modal
        - Shows Execute Contract Call screen
        - Shows Choose Payment Method
        - Works ONLY for paid transactions
      */}
      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract,
            method: "increment",
            params: [],
            overrides: {
              gasless: false, // 🔒 Paid Mode → FORCE modal
            },
          })
        }
        onTransactionConfirmed={() => {
          refetch();
        }}
      >
        Increment
      </TransactionButton>
    </div>
  );
}
/*
🧪 COMMON SETUP (HAR SCENARIO SE PEHLE)

Har scenario ko test karne ke liye:

Incognito window open karo

DApp open karo

Fresh state (no wallet connected)

Isse:

inApp wallet session

gasless cache

AA config

sab clean hota hai.

🟢 SCENARIO 1
New User → In-App Wallet → Gasless (Free Tx)
🎯 Expectation

No ETH

Paymaster used

Tx success

🪜 Steps

Incognito open

App open

Paid Mode = OFF

Click Connect Wallet

Choose Email / Google

Login complete

Wallet ETH = 0

Click Increment

✅ Check kaise karein

❌ ETH deduct nahi hua

✅ Counter increment hua

❌ Wallet se ETH nahi gaya

👉 Scenario 1 PASS

🟢 SCENARIO 2
Smart Wallet → Paid Mode → ETH deduct hona chahiye

⚠️ Yahi sabse important scenario hai

🎯 Expectation

ETH deduct ho

Paymaster OFF

Modal aaye ya na aaye → does not matter

🪜 Steps

Incognito open

App open

Paid Mode = ON

Click Connect Wallet

Login via Email / Google

Wallet connect hone ke baad:

Wallet me ETH bhejo

Click Increment

✅ Check kaise karein (VERY IMPORTANT)

✅ ETH balance kam hua

✅ Counter increment hua

❌ Paymaster use nahi hua

❌ Agar modal nahi dikha → ignore
✔ ETH kata → Scenario 2 PASS

🔍 Extra verification (optional)

Wallet address Etherscan pe dekho

Transaction fee = wallet se paid

🟢 SCENARIO 3
Smart Wallet + ETH → Gasless Mode (User prefers free tx)
🎯 Expectation

ETH hone ke bawajood free tx

Paymaster used

🪜 Steps

Incognito open

App open

Paid Mode = OFF

Connect via Email / Google

Wallet me ETH bhejo

Click Increment

✅ Check kaise karein

❌ ETH deduct nahi hua

✅ Counter increment hua

👉 Scenario 3 PASS

🔵 SCENARIO 4
MetaMask → Normal Web3 Flow
🎯 Expectation

MetaMask popup

ETH deduct

🪜 Steps

Incognito open

App open

Paid Mode ON/OFF (doesn’t matter)

Click Connect Wallet

Choose MetaMask

Approve connection

Click Increment

✅ Check kaise karein

🦊 MetaMask popup aaya

Gas fee dikhayi

ETH MetaMask se kata

👉 Scenario 4 PASS
*/
