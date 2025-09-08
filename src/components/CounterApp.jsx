"use client";
import { useState, useEffect } from "react";
import {
  createThirdwebClient,
  getContract,
  readContract,
  prepareContractCall,
  sendTransaction,
} from "thirdweb";
import { useActiveWallet, useActiveAccount } from "thirdweb/react";
import { sepolia, avalancheFuji } from "thirdweb/chains";

// Your deployed contract addresses
const CONTRACTS = {
  sepolia: "0xF37Bc74fD3816881eaA4FF74E3be9b587C975d01",
  fuji: "0x826c958a3D0201a255bd60b520F5de7b7aa4E7E3",
};

const client = createThirdwebClient({
  clientId: "b34fd548e807251bc443476606eb1bee",
});

export default function CounterApp() {
  const wallet = useActiveWallet();
  const account = useActiveAccount();

  const [chain, setChain] = useState(sepolia); // default chain
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  // ABI for the Counter contract
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

  // Get contract instance based on selected chain
  const contract = getContract({
    client,
    chain,
    address: chain.id === sepolia.id ? CONTRACTS.sepolia : CONTRACTS.fuji,
    abi,
  });

  // Fetch count from contract
  const fetchCount = async () => {
    try {
      const value = await readContract({
        contract,
        method: "getCount",
      });
      setCount(Number(value));
    } catch (err) {
      console.error("Failed to fetch count:", err);
    }
  };

  // Call increment on contract
  const increment = async () => {
    if (!wallet || !account) {
      alert("Please connect your wallet first!");
      return;
    }
    setLoading(true);
    try {
      const tx = prepareContractCall({
        contract,
        method: "increment",
        params: [],
      });

      await sendTransaction({
        transaction: tx,
        account,
      });

      await fetchCount(); // refresh count
    } catch (err) {
      console.error("Increment failed:", err);
    }
    setLoading(false);
  };

  // Fetch count when chain changes
  useEffect(() => {
    fetchCount();
  }, [chain]);

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

      <div>
        <p className="text-lg">
          Current Count:{" "}
          <span className="font-mono">{count !== null ? count : "..."}</span>
        </p>
      </div>

      <button
        onClick={increment}
        disabled={loading || !wallet}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Incrementing..." : "Increment"}
      </button>
    </div>
  );
}
