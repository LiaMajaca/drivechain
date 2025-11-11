"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'renewals', 'profile'
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [licenseData, setLicenseData] = useState({
    name: "Thabo Molefe",
    id: "9303245801083",
    license: "SA 4567890",
    code: "B (Light motor vehicle)",
    issueDate: "15/03/2021",
    expiryDate: "15/03/2026",
    discExpiry: "31/12/2024",
  });
  const [renewalHistory, setRenewalHistory] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAddress = localStorage.getItem('walletAddress');
      if (storedAddress) {
        setWalletAddress(storedAddress);
      }

      // Load or initialize demo data in localStorage
      const storedLicenseData = localStorage.getItem('licenseData');
      if (storedLicenseData) {
        setLicenseData(JSON.parse(storedLicenseData));
      } else {
        localStorage.setItem('licenseData', JSON.stringify(licenseData));
      }

      const storedRenewalHistory = localStorage.getItem('renewalHistory');
      if (storedRenewalHistory) {
        setRenewalHistory(JSON.parse(storedRenewalHistory));
      } else {
        const demoRenewalHistory = [
          {
            id: 1,
            type: "License Renewal",
            date: "2023-10-25",
            status: "Pending",
            transactionHash: "0xabc123...",
          },
          {
            id: 2,
            type: "Eye Test Upload",
            date: "2023-10-20",
            status: "Approved",
            transactionHash: "0xdef456...",
          },
        ];
        localStorage.setItem('renewalHistory', JSON.stringify(demoRenewalHistory));
        setRenewalHistory(demoRenewalHistory);
      }

      const storedTransactions = localStorage.getItem('transactions');
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      } else {
        const demoTransactions = [
          { id: 1, type: "License Mint", date: "2021-03-15", hash: "0x123abc..." },
          { id: 2, type: "Disc Renewal", date: "2023-01-01", hash: "0x456def..." },
        ];
        localStorage.setItem('transactions', JSON.stringify(demoTransactions));
        setTransactions(demoTransactions);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-gray-800">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">DriveChain SA</div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('renewals')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'renewals' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Renewals
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Profile
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">{walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Connect Wallet'}</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div> {/* Placeholder for profile pic */}
        </div>
      </nav>

      <div className="container mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-primary">Driver Dashboard</h1>

            {/* Digital License Card */}
            <div className="bg-gradient-to-br from-primary to-teal-500 rounded-xl shadow-lg p-6 mb-8 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
              <h2 className="text-2xl font-semibold mb-4">Digital Driver's License</h2>
              <div className="flex items-center mb-4">
                <Image src="/digital-license-illustration.svg" alt="Digital License" width={80} height={80} className="mr-4" />
                <div>
                  <p className="text-lg font-medium">{licenseData.name}</p>
                  <p className="text-sm opacity-80">ID: {licenseData.id}</p>
                  <p className="text-sm opacity-80">License: {licenseData.license}</p>
                  <p className="text-sm opacity-80">Code: {licenseData.code}</p>
                  <p className="text-sm opacity-80">Issue Date: {licenseData.issueDate}</p>
                  <p className="text-sm opacity-80">Expiry Date: {licenseData.expiryDate}</p>
                  <p className="text-sm opacity-80">Disc Expires: {licenseData.discExpiry}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block bg-white text-primary text-xs font-bold px-3 py-1 rounded-full">VERIFIED</span>
              </div>
            </div>

            {/* Quick Actions */}
            <h2 className="text-2xl font-bold mb-4 text-primary">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Link href="/renew-license" className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300">
                <Image src="/renew-icon.svg" alt="Renew License" width={40} height={40} className="mb-3" />
                <p className="font-semibold text-lg">Renew License</p>
              </Link>
              <Link href="/upload-eye-test" className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300">
                <Image src="/eye-test-icon.svg" alt="Upload Eye Test" width={40} height={40} className="mb-3" />
                <p className="font-semibold text-lg">Upload Eye Test</p>
              </Link>
              <Link href="/scan-your-feature" className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300">
                <Image src="/scan-icon.svg" alt="Scan Feature" width={40} height={40} className="mb-3" />
                <p className="font-semibold text-lg">Scan Your Feature</p>
              </Link>
            </div>

            {/* Recent Activity */}
            <h2 className="text-2xl font-bold mb-4 text-primary">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <ul>
                {renewalHistory.map((item) => (
                  <li key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                    <div>
                      <p className="font-medium">{item.type}</p>
                      <p className="text-sm text-gray-500">{item.date} - {item.transactionHash}</p>
                    </div>
                    <span className={`text-sm font-semibold ${
                      item.status === 'Pending' ? 'text-teal-600' :
                      item.status === 'Approved' ? 'text-green-600' :
                      'text-gray-600'
                    }`}>{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'renewals' && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-primary">Renewals</h1>
            <p>Details about license renewals will go here.</p>
            <h2 className="text-2xl font-bold mb-4 text-primary">Transaction History</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <ul>
                {transactions.map((tx) => (
                  <li key={tx.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                    <div>
                      <p className="font-medium">{tx.type}</p>
                      <p className="text-sm text-gray-500">{tx.date} - {tx.hash}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-primary">Profile</h1>
            <p>User profile information and settings will go here.</p>
          </div>
        )}
      </div>
    </div>
  );
}