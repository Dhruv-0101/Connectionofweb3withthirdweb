"use client";
import { useState, useEffect } from "react";
import {
  useActiveAccount,
  useSendTransaction,
  useReadContract,
} from "thirdweb/react";
import { sepolia, avalancheFuji } from "thirdweb/chains";
import { getContract, prepareContractCall } from "thirdweb";

const CONTRACTS = {
  sepolia: "0xF37Bc74fD3816881eaA4FF74E3be9b587C975d01",
  fuji: "0x826c958a3D0201a255bd60b520F5de7b7aa4E7E3",
};

const abi = [
  {
    inputs: [],
    name: "getCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
  const [chain, setChain] = useState(sepolia);

  const contract = getContract({
    client: { clientId: "b34fd548e807251bc443476606eb1bee" },
    chain,
    address: chain.id === sepolia.id ? CONTRACTS.sepolia : CONTRACTS.fuji,
    abi,
  });

  const { data: count, refetch } = useReadContract({
    contract,
    method: "getCount",
  });

  const { mutateAsync: sendTx, isLoading } = useSendTransaction();

  const increment = async () => {
    if (!account) {
      alert("Connect a wallet first!");
      return;
    }

    try {
      const tx = prepareContractCall({
        contract,
        method: "increment",
        params: [],
      });

      await sendTx(tx);
      refetch(); // refresh count
    } catch (err) {
      console.error("Increment failed:", err);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Counter DApp</h1>

      <div>
        <label className="mr-2 font-medium">Select Chain:</label>
        <select
          className="p-2 border rounded"
          value={chain.id}
          onChange={(e) =>
            setChain(e.target.value === "sepolia" ? sepolia : avalancheFuji)
          }
        >
          <option value="sepolia">Sepolia</option>
          <option value="fuji">Avalanche Fuji</option>
        </select>
      </div>

      <p className="text-lg">
        Current Count:{" "}
        <span className="font-mono">{count !== undefined ? count.toString() : "..."}</span>
      </p>

      <button
        onClick={increment}
        disabled={isLoading || !account}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {isLoading ? "Incrementing..." : "Increment"}
      </button>
    </div>
  );
}
