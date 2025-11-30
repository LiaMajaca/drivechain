"use client";

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);

  const [licenseData] = useState({
    name: "Thabo Molefe",
    id: "9303245801083",
    license: "SA 4567890",
    code: "B (Light motor vehicle)",
    issueDate: "15/03/2021",
    expiryDate: "15/03/2026",
    discExpiry: "31/12/2024",
  });

  const [renewalHistory] = useState([
    { id: 1, type: "License Renewal", date: "2023-10-25", status: "Pending", transactionHash: "0xabc123..." },
    { id: 2, type: "Eye Test Upload", date: "2023-10-20", status: "Approved", transactionHash: "0xdef456..." },
    { id: 3, type: "Disc Renewal", date: "2023-09-15", status: "Completed", transactionHash: "0xghi789..." },
  ]);

  const [transactions] = useState([
    { id: 1, type: "License Mint", date: "2021-03-15", hash: "0x123abc...", amount: "0.05 ETH" },
    { id: 2, type: "Disc Renewal", date: "2023-01-01", hash: "0x456def...", amount: "0.02 ETH" },
    { id: 3, type: "Card Update", date: "2023-06-20", hash: "0x789ghi...", amount: "0.01 ETH" },
  ]);

  useEffect(() => {
    setWalletAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
    setIsLoaded(true);
  }, []);

  const quickActions = [
    { id: 1, icon: "🔄", title: "Renew License", description: "Quick license renewal", gradient: "from-purple-500 to-pink-500", iconBg: "from-purple-100 to-pink-100" },
    { id: 2, icon: "👁️", title: "Upload Eye Test", description: "Submit test results", gradient: "from-teal-500 to-cyan-500", iconBg: "from-teal-100 to-cyan-100" },
    { id: 3, icon: "📱", title: "Digital Verification", description: "Scan QR code", gradient: "from-blue-500 to-indigo-500", iconBg: "from-blue-100 to-indigo-100" },
  ];

  const stats = [
    { label: "License Status", value: "Active", change: "+100%", icon: "✓", color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Days Until Expiry", value: "456", change: "-12%", icon: "📅", color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Renewals", value: "3", change: "+2", icon: "🔄", color: "text-purple-600", bgColor: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                DriveChain SA
              </span>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-1">
              {['dashboard', 'renewals', 'profile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl font-medium capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Wallet */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 rounded-2xl px-4 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-slate-700">
                  {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Connect'}
                </span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                T
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className={`space-y-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome back, {licenseData.name.split(' ')[0]}! 👋</h1>
                <p className="text-slate-600">Here's what's happening with your driver's license today.</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <span>View Blockchain</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                    <span className={`text-sm font-semibold ${stat.color.replace('text-', 'bg-').replace('600', '100')} px-3 py-1 rounded-full ${stat.color}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Digital License Card */}
              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-500 text-2xl">🇿🇦</span>
                            <span className="text-white font-bold text-lg">Republic of South Africa</span>
                          </div>
                          <p className="text-slate-400 text-sm">Digital Driver's License</p>
                        </div>
                        <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/30">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-300 text-sm font-semibold">VERIFIED</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-slate-400 text-sm mb-1">Full Name</p>
                          <p className="text-white font-bold text-xl">{licenseData.name}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm mb-1">License Number</p>
                          <p className="text-white font-bold text-xl">{licenseData.license}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm mb-1">ID Number</p>
                          <p className="text-white font-mono">{licenseData.id}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm mb-1">Vehicle Code</p>
                          <p className="text-white">{licenseData.code}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                        <div>
                          <p className="text-slate-400 text-xs mb-1">Issue Date</p>
                          <p className="text-white font-semibold">{licenseData.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs mb-1">Expiry Date</p>
                          <p className="text-yellow-400 font-semibold">{licenseData.expiryDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs mb-1">Disc Expiry</p>
                          <p className="text-orange-400 font-semibold">{licenseData.discExpiry}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Quick Actions</h2>
                {quickActions.map((action) => (
                  <div
                    key={action.id}
                    onMouseEnter={() => setHoveredAction(action.id)}
                    onMouseLeave={() => setHoveredAction(null)}
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                    <div className="relative flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${action.iconBg} rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-1">{action.title}</h3>
                        <p className="text-sm text-slate-600">{action.description}</p>
                      </div>
                      <svg 
                        className={`w-6 h-6 text-slate-400 transform transition-all duration-300 ${hoveredAction === action.id ? 'translate-x-2 text-slate-700' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
                <button className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {renewalHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                        item.status === 'Approved' ? 'bg-green-100 text-green-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {item.status === 'Pending' ? '⏳' : item.status === 'Approved' ? '✓' : '✓'}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.type}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-sm text-slate-500">{item.date}</p>
                          <span className="text-slate-300">•</span>
                          <p className="text-sm text-slate-500 font-mono">{item.transactionHash}</p>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'renewals' && (
          <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Transaction History</h1>
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Transaction Hash</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-900">{tx.type}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{tx.date}</td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-slate-600">{tx.hash}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-900">{tx.amount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Profile Settings</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input type="text" value={licenseData.name} readOnly className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ID Number</label>
                    <input type="text" value={licenseData.id} readOnly className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">License Number</label>
                    <input type="text" value={licenseData.license} readOnly className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-8 text-white shadow-lg">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                    T
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{licenseData.name}</h3>
                  <p className="text-center text-white/80 text-sm">Driver Since 2021</p>
                </div>
                
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4">Account Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Verification</span>
                      <span className="text-green-600 font-semibold text-sm">✓ Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Blockchain</span>
                      <span className="text-blue-600 font-semibold text-sm">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">2FA</span>
                      <span className="text-slate-400 font-semibold text-sm">Not Set</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}