"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ScanYourFeaturePage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAddress = localStorage.getItem('walletAddress');
      if (storedAddress) {
        setWalletAddress(storedAddress);
      } else {
        router.push('/connect-wallet'); // Redirect if no wallet connected
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-gray-800 p-6">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-primary">DriveChain SA</div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">{walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Connect Wallet'}</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">Scan Your Feature</h1>
        <p className="text-lg text-gray-700">This page is a placeholder for future functionality where you can scan various features related to your digital license.</p>
        <p className="mt-4 text-md text-gray-600">Stay tuned for updates!</p>
      </div>
    </div>
  );
}