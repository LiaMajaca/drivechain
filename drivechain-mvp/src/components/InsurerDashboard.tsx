"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, AppWindow } from 'lucide-react';

interface InsurerDashboardProps {
  // Add any necessary props here
}

const InsurerDashboard: React.FC<InsurerDashboardProps> = () => {
  const [licenseNumbers, setLicenseNumbers] = useState("SA123456\nSA789012\nSA345678");
  const [verificationResults, setVerificationResults] = useState<any[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>("");

  const handleBatchVerify = () => {
    setIsVerifying(true);
    setVerificationResults([]);

    const numbers = licenseNumbers.split('\n').map(num => num.trim()).filter(num => num.length > 0);

    // Simulate API call for batch verification
    setTimeout(() => {
      const results = numbers.map(num => {
        if (num === "SA123456") {
          return { license: num, name: "Thabo M.", status: "Valid", risk: "Low", lastFine: "2 months ago", icon: <CheckCircle className="text-emerald-500" /> };
        } else if (num === "SA789012") {
          return { license: num, name: "Sarah K.", status: "Valid", risk: "Low", lastFine: "None", icon: <CheckCircle className="text-emerald-500" /> };
        } else if (num === "SA345678") {
          return { license: num, name: "John D.", status: "Suspended", risk: "High", lastFine: "3 unpaid", icon: <AlertCircle className="text-rose-500" /> };
        } else {
          return { license: num, name: "N/A", status: "Not Found", risk: "N/A", lastFine: "N/A", icon: <XCircle className="text-slate-500" /> };
        }
      });
      setVerificationResults(results);
      setIsVerifying(false);
    }, 2000);
  };

  const handleTestApiCall = () => {
    setApiResponse("Loading...");
    setTimeout(() => {
      setApiResponse(JSON.stringify({
        status: "success",
        licenseId: "SA123456",
        driverName: "Thabo Molefe",
        licenseStatus: "VALID",
        riskScore: "Low",
        lastViolation: "2023-09-15"
      }, null, 2));
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Insurer Dashboard</h2>

      {/* Batch Verification Tool */}
      <div className="mb-8 p-6 bg-softGray-500 dark:bg-slate-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Batch Verification Tool</h3>
        <textarea
          className="w-full p-3 border-2 border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white transition-all duration-300 ease-in-out"
          rows={5}
          placeholder="Paste license numbers (one per line)"
          value={licenseNumbers}
          onChange={(e) => setLicenseNumbers(e.target.value)}
        ></textarea>
        <motion.button
          whileHover={{ scale: 1.05, background: "linear-gradient(to right, #0ea5e9, #38bdf8)" }}
          whileTap={{ scale: 0.95 }}
          className={`mt-4 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center justify-center ${
            isVerifying ? "animate-pulse" : ""
          }`}
          onClick={handleBatchVerify}
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
            "Verify All"
          )}
        </motion.button>

        {isVerifying && (
          <p className="mt-4 text-sky-500 dark:text-sky-300">Processing batch verification...</p>
        )}

        {verificationResults.length > 0 && !isVerifying && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <thead>
                <tr className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">License #</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Risk Score</th>
                  <th className="py-3 px-6 text-left">Last Fine</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300 text-sm font-light">
                {verificationResults.map((result, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`border-b border-slate-200 dark:border-slate-700 ${
                      result.status === "Valid" ? "hover:bg-emerald-50 dark:hover:bg-emerald-900/20" :
                      result.status === "Suspended" ? "hover:bg-rose-50 dark:hover:bg-rose-900/20" :
                      "hover:bg-sky-50 dark:hover:bg-sky-900/20"
                    }`}
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap flex items-center">
                      {result.icon} <span className="ml-2">{result.license}</span>
                    </td>
                    <td className="py-3 px-6 text-left">{result.name}</td>
                    <td className={`py-3 px-6 text-left ${
                      result.status === "Valid" ? "text-emerald-600" :
                      result.status === "Suspended" ? "text-rose-600" :
                      "text-slate-600"
                    }`}>{result.status}</td>
                    <td className={`py-3 px-6 text-left ${
                      result.risk === "Low" ? "text-emerald-600" :
                      result.risk === "High" ? "text-rose-600" :
                      "text-amber-600"
                    }`}>{result.risk}</td>
                    <td className="py-3 px-6 text-left">{result.lastFine}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* API Integration Panel */}
      <div className="p-6 bg-softGray-500 dark:bg-slate-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">API Integration Panel</h3>
        <p className="text-slate-700 dark:text-slate-200 mb-2 font-mono text-sm">Mock API Endpoint: <span className="font-bold">/api/verify-license</span></p>
        <motion.button
          whileHover={{ scale: 1.05, background: "linear-gradient(to right, #0ea5e9, #38bdf8)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center"
          onClick={handleTestApiCall}
        >
          <AppWindow size={20} className="mr-2" /> Test API Call
        </motion.button>
        {apiResponse && (
          <pre className="mt-4 p-4 bg-slate-200 dark:bg-slate-900 rounded-lg text-slate-800 dark:text-slate-200 text-sm overflow-x-auto">
            {apiResponse}
          </pre>
        )}
      </div>
    </motion.div>
  );
};

export default InsurerDashboard;