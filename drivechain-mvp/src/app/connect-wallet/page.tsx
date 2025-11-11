"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Mock window.ethereum for demonstration purposes
const mockEthereum = {
  isMetaMask: true,
  request: async ({ method }: { method: string }) => {
    if (method === 'eth_requestAccounts') {
      // Simulate a delay for connecting
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Return a mock account address
      return ['0x' + Math.random().toString(16).substr(2, 40)];
    }
    throw new Error('Unsupported method');
  },
  on: (event: string, callback: (...args: any[]) => void) => {
    console.log(`Mock Ethereum: Subscribed to ${event}`);
  },
  removeListener: (event: string, callback: (...args: any[]) => void) => {
    console.log(`Mock Ethereum: Unsubscribed from ${event}`);
  },
};

export default function ConnectWalletPage() {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem('walletAddress', walletAddress);
      router.push('/dashboard');
    }
  }, [walletAddress, router]);

  const connectWallet = async (walletType: 'MetaMask' | 'WalletConnect' | 'Coinbase Wallet') => {
    setConnecting(true);
    setError('');

    try {
      if (walletType === 'MetaMask') {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
          // If MetaMask is installed, try to connect
          const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
          setWalletAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
        } else {
          // Fallback to mock if MetaMask is not installed
          const mockAddress = '0xMockMetaMaskAddress12345678901234567890';
          setWalletAddress(mockAddress);
          localStorage.setItem('walletAddress', mockAddress);
        }
      } else if (walletType === 'WalletConnect') {
        const mockAddress = '0xMockWalletConnectAddress12345678901234567890';
        setWalletAddress(mockAddress);
        localStorage.setItem('walletAddress', mockAddress);
      } else if (walletType === 'Coinbase Wallet') {
        const mockAddress = '0xMockCoinbaseAddress12345678901234567890';
        setWalletAddress(mockAddress);
        localStorage.setItem('walletAddress', mockAddress);
      }
      // setConnectionStatus('connected'); // Removed as no corresponding state
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error: any) {
      console.error("Wallet connection failed:", error);
      setError(error.message || 'Failed to connect wallet.');
      // setConnectionStatus('failed'); // Removed as no corresponding state
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">Connect Your Wallet</h1>
        <p className="text-gray-600 mb-8">
          Connect your preferred crypto wallet to access your digital driver's license.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => connectWallet('MetaMask')}
            disabled={connecting}
            className="w-full flex items-center justify-center bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200"
          >
            <Image src="/metamask-icon.svg" alt="MetaMask" width={24} height={24} className="mr-3" />
            {connecting ? 'Connecting...' : 'Connect MetaMask'}
          </button>
          <button
            onClick={() => connectWallet('WalletConnect')}
            disabled={connecting}
            className="w-full flex items-center justify-center bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200"
          >
            <Image src="/walletconnect-icon.svg" alt="WalletConnect" width={24} height={24} className="mr-3" />
            {connecting ? 'Connecting...' : 'Connect WalletConnect'}
          </button>
          <button
            onClick={() => connectWallet('Coinbase Wallet')}
            disabled={connecting}
            className="w-full flex items-center justify-center bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200"
          >
            <Image src="/coinbase-wallet-icon.svg" alt="Coinbase Wallet" width={24} height={24} className="mr-3" />
            {connecting ? 'Connecting...' : 'Connect Coinbase Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
}