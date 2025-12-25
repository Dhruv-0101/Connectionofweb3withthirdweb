"use client";

import {
  useActiveAccount,
  useSendTransaction,
  useReadContract,
} from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "./Client";

const CONTRACT_ADDRESS = "0xF37Bc74fD3816881eaA4FF74E3be9b587C975d01";

const abi = [
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function CounterApp() {
  const account = useActiveAccount();

  const contract = getContract({
    client, // ✅ SAME CLIENT INSTANCE
    chain: sepolia,
    address: CONTRACT_ADDRESS,
    abi,
  });

  const { data: count, refetch } = useReadContract({
    contract,
    method: "getCount",
  });

  const { mutateAsync: sendTx, isLoading } = useSendTransaction();

  const increment = async () => {
    if (!account) {
      alert("Connect wallet first");
      return;
    }

    const tx = prepareContractCall({
      contract,
      method: "increment",
      params: [],
      overrides: {
        gasless: true, // 🔥 FORCE PAYMASTER
      },
    });

    await sendTx(tx);
    refetch();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Counter DApp (Gasless)</h1>

      <p className="text-lg">
        Current Count:{" "}
        <span className="font-mono">{count ? count.toString() : "..."}</span>
      </p>

      <button
        onClick={increment}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {isLoading ? "Incrementing..." : "Increment"}
      </button>
    </div>
  );
}
