import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, QrCode, Wallet, Activity, Landmark } from 'lucide-react';

interface DriverDashboardProps {
  // Add any necessary props here
}

const DriverDashboard: React.FC<DriverDashboardProps> = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  // Demo data for the driver
  const driver = {
    name: "Thabo Molefe",
    licenseNumber: "SA123456789",
    status: "VALID",
    expiryDate: "2028-10-26",
    fines: [
      { id: 1, description: "Speeding", amount: 500, paid: false, hash: "" },
    ],
    recentActivity: [
      { id: 1, type: "Fine paid", details: "R500 (blockchain hash: 0x7a3f...)", icon: <Wallet size={16} /> },
      { id: 2, type: "License verified", details: "by Metro Police", icon: <CheckCircle size={16} /> },
      { id: 3, type: "Insurance check", details: "completed", icon: <Landmark size={16} /> },
    ],
  };

  const handlePayFine = () => {
    // Simulate payment
    alert("Simulating payment for R500 fine...");
    // In a real app, this would interact with the blockchain and update state
    // For now, we'll just show an alert.
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      {/* Left Side: Digital License Card */}
      <motion.div
        whileHover={{ translateY: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
        whileTap={{ scale: 0.98 }}
        className="relative flex flex-col items-center justify-center bg-gradient-to-br from-sky-500 to-blue-800 text-white p-6 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>
        <h2 className="text-2xl font-bold mb-4 z-10">Digital Driver's License</h2>
        <div className="w-32 h-32 bg-softGray-500 rounded-full flex items-center justify-center mb-4 z-10">
          <span className="text-slate-500 text-sm">Photo</span>
        </div>
        <p className="text-xl font-semibold z-10">{driver.name}</p>
        <p className="text-sm mb-2 z-10">License No: {driver.licenseNumber}</p>
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className={`px-3 py-1 rounded-full text-sm font-medium z-10 ${
            driver.status === "VALID" ? "bg-emerald-500" : "bg-rose-500"
          }`}>
          {driver.status}
        </motion.span>
        <p className="text-xs mt-2 z-10">Expires: {driver.expiryDate}</p>
        <motion.div
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(14, 165, 233, 0.6)" }}
          className="mt-4 p-2 bg-white rounded z-10"
        >
          <QrCode size={64} color="black" />
        </motion.div>
      </motion.div>

      {/* Right Side: Simple Actions */}
      <div className="flex flex-col space-y-6">
        {/* Outstanding Fines Panel */}
        <div className="bg-rose-100 dark:bg-rose-900 p-6 rounded-lg shadow-md border-l-4 border-rose-500">
          <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-4">Outstanding Fines</h3>
          {driver.fines.filter(fine => !fine.paid).length > 0 ? (
            driver.fines.filter(fine => !fine.paid).map(fine => (
              <div key={fine.id} className="flex justify-between items-center mb-3">
                <p className="text-rose-700 dark:text-rose-300">{fine.description}: R{fine.amount}</p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                  onClick={handlePayFine}
                >
                  <Wallet size={18} className="mr-2" /> Pay with Crypto Wallet
                </motion.button>
              </div>
            ))
          ) : (
            <p className="text-emerald-700 dark:text-emerald-300">No outstanding fines!</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-softGray-500 dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {driver.recentActivity.map(activity => (
              <li key={activity.id} className="flex items-center text-slate-700 dark:text-slate-200">
                {activity.icon}
                <span className="ml-3">{activity.type} - {activity.details}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Simple Blockchain Visualization */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Recent Blockchain Transactions</h3>
          <div className="flex overflow-x-auto space-x-4 pb-2">
            {/* Demo Blocks */}
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: "#0ea5e9" }}
                className="flex-shrink-0 w-40 p-4 bg-slate-200 dark:bg-slate-700 rounded-lg shadow-sm text-slate-900 dark:text-slate-100 border-2 border-transparent"
              >
                <p className="text-xs font-semibold">Block #{100 + i}</p>
                <p className="text-xs mt-1">Action: Fine Payment</p>
                <p className="text-xs truncate">Hash: 0xabc{i}d...</p>
                <p className="text-xs mt-1">{currentTime}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverDashboard;