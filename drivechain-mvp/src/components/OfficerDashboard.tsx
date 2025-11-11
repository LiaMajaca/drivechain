"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, ShieldCheck, Gavel } from 'lucide-react';

interface OfficerDashboardProps {
  // Add any necessary props here
}

const OfficerDashboard: React.FC<OfficerDashboardProps> = () => {
  const [licenseNumber, setLicenseNumber] = useState("SA123456");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyLicense = () => {
    setIsVerifying(true);
    setVerificationResult(null);

    // Simulate API call/blockchain verification
    setTimeout(() => {
      // Demo data for verification
      const demoDriver = {
        name: "Thabo Molefe",
        licenseNumber: "SA123456",
        status: "VALID",
        points: "12/12",
        recentFines: "1 paid, 0 outstanding",
        lastVerified: "Just now",
        blockchainProof: "0xdef456...",
        photo: "/driver-placeholder.png", // Placeholder for driver photo
      };

      if (licenseNumber === demoDriver.licenseNumber) {
        setVerificationResult(demoDriver);
      } else {
        setVerificationResult({ error: "License not found or invalid." });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleIssueFine = () => {
    alert("Simulating issuing a new fine...");
    // In a real app, this would open a modal and interact with the blockchain
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Traffic Officer Dashboard</h2>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Enter License Number to Verify"
            className="w-full p-3 pl-10 border-2 border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white transition-all duration-300 ease-in-out"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
        </div>
        <motion.button
          whileHover={{ scale: 1.05, background: "linear-gradient(to right, #0ea5e9, #38bdf8)" }}
          whileTap={{ scale: 0.95 }}
          className={`bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center justify-center ${
            isVerifying ? "animate-pulse" : ""
          }`}
          onClick={handleVerifyLicense}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            "Verify Now"
          )}
        </motion.button>
      </div>

      {/* Verification Result Card */}
      {isVerifying && (
        <div className="flex justify-center items-center h-32">
          <p className="text-sky-500 dark:text-sky-300">Verifying license...</p>
        </div>
      )}

      {verificationResult && !isVerifying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`bg-softGray-500 dark:bg-slate-800 p-6 rounded-lg shadow-md mt-8 border-t-4 ${
            verificationResult.error ? "border-rose-500" : "border-emerald-500"
          }`}
        >
          {verificationResult.error ? (
            <div className="flex items-center text-rose-500">
              <XCircle className="mr-2" />
              <p className="font-semibold">{verificationResult.error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <img src={verificationResult.photo} alt="Driver" className="w-24 h-24 rounded-full object-cover mb-4" />
                <p className="text-xl font-bold text-slate-900 dark:text-white">{verificationResult.name}</p>
                <p className="text-slate-600 dark:text-slate-300">License No: {verificationResult.licenseNumber}</p>
                <span className="mt-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-sm font-medium flex items-center">
                  <CheckCircle size={16} className="mr-1" /> {verificationResult.status} & VALID
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Driving Record</h3>
                <p className="text-slate-700 dark:text-slate-200 mb-2">License points: <span className="font-medium">{verificationResult.points}</span></p>
                <p className="text-slate-700 dark:text-slate-200 mb-2">Recent fines: <span className="font-medium">{verificationResult.recentFines}</span></p>
                <p className="text-slate-700 dark:text-slate-200 mb-2">Last verified: <span className="font-medium">{verificationResult.lastVerified}</span></p>
                <p className="text-emerald-600 dark:text-emerald-400 flex items-center">
                  <ShieldCheck size={18} className="mr-2" /> Blockchain Proof: <span className="font-mono text-sm ml-1">{verificationResult.blockchainProof}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, background: "linear-gradient(to right, #ea580c, #f97316)" }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 bg-gradient-to-r from-amber-500 to-warmOrange-500 hover:from-amber-600 hover:to-warmOrange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center justify-center"
                  onClick={handleIssueFine}
                >
                  <Gavel size={20} className="mr-2" /> Issue New Fine
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default OfficerDashboard;