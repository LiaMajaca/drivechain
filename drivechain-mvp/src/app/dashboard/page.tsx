"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'renewals', 'profile'

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
          <span className="text-sm">0x...1234</span>
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
                  <p className="text-lg font-medium">John Doe</p>
                  <p className="text-sm opacity-80">License ID: DC-SA-123456789</p>
                  <p className="text-sm opacity-80">Valid Until: 2028-10-26</p>
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
                <li className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                  <div>
                    <p className="font-medium">License Renewal Initiated</p>
                    <p className="text-sm text-gray-500">2023-10-25 at 10:30 AM</p>
                  </div>
                  <span className="text-sm text-teal-600 font-semibold">Pending</span>
                </li>
                <li className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                  <div>
                    <p className="font-medium">Eye Test Results Uploaded</p>
                    <p className="text-sm text-gray-500">2023-10-20 at 02:15 PM</p>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Approved</span>
                </li>
                <li className="flex justify-between items-center py-3 last:border-b-0">
                  <div>
                    <p className="font-medium">Profile Information Updated</p>
                    <p className="text-sm text-gray-500">2023-10-15 at 09:00 AM</p>
                  </div>
                  <span className="text-sm text-gray-600 font-semibold">Completed</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'renewals' && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-primary">Renewals</h1>
            <p>Details about license renewals will go here.</p>
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