"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ConnectWallet() {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter();

  const handleConnect = async (wallet: string) => {
    setConnecting(true);
    setConnected(false);
    setWalletAddress("");

    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setConnecting(false);
    setConnected(true);
    setWalletAddress("0x742d...3f9a"); // Mock address

    // Simulate smooth transition to Dashboard
    setTimeout(() => {
      router.push("/dashboard");
      // Show welcome toast (can be implemented with a toast library)
      console.log("Wallet connected successfully! 🎉");
    }, 500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-lightgray">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
        {/* Wallet Modal */}
        <div className="bg-white rounded-t-3xl shadow-lg p-8 w-full max-w-md transform transition-all duration-300 ease-out translate-y-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Connect Your Wallet
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => handleConnect("MetaMask")}
              className="w-full flex items-center justify-center gap-3 py-3 px-6 border-2 border-transparent rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out
                         bg-white text-gray-800 shadow-md hover:shadow-lg hover:border-orange-500 group"
            >
              <Image
                src="/metamask-icon.svg"
                alt="MetaMask"
                width={24}
                height={24}
              />
              MetaMask
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-orange-500">
                →
              </span>
            </button>

            <button
              onClick={() => handleConnect("WalletConnect")}
              className="w-full flex items-center justify-center gap-3 py-3 px-6 border-2 border-transparent rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out
                         bg-white text-gray-800 shadow-md hover:shadow-lg hover:border-blue-500 group"
            >
              <Image
                src="/walletconnect-icon.svg"
                alt="WalletConnect"
                width={24}
                height={24}
              />
              WalletConnect
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-500">
                →
              </span>
            </button>

            <button
              onClick={() => handleConnect("Coinbase Wallet")}
              className="w-full flex items-center justify-center gap-3 py-3 px-6 border-2 border-transparent rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out
                         bg-white text-gray-800 shadow-md hover:shadow-lg hover:border-blue-400 group"
            >
              <Image
                src="/coinbase-wallet-icon.svg"
                alt="Coinbase Wallet"
                width={24}
                height={24}
              />
              Coinbase Wallet
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-400">
                →
              </span>
            </button>
          </div>

          {connecting && (
            <div className="flex items-center justify-center mt-6 text-primary">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </div>
          )}

          {connected && (
            <div className="flex items-center justify-center mt-6 text-primary-600">
              <svg
                className="w-6 h-6 mr-2 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Wallet Connected: {walletAddress}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}