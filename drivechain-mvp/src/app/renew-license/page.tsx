"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RenewLicensePage() {
  const router = useRouter();
  const [licenseCode, setLicenseCode] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('R 0.00');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      setErrors((prev) => ({ ...prev, renewalDate: 'Renewal date cannot be in the past.' }));
    } else {
      setErrors((prev) => ({ ...prev, renewalDate: '' }));
      setRenewalDate(selectedDate);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const [integer, decimal] = value.split('.');
    let formattedValue = integer;
    if (decimal !== undefined) {
      formattedValue += '.' + decimal.slice(0, 2);
    }
    setPaymentAmount(`R ${parseFloat(formattedValue || '0').toFixed(2)}`);
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!licenseCode) newErrors.licenseCode = 'License code is required.';
    if (!renewalDate) newErrors.renewalDate = 'Renewal date is required.';
    if (parseFloat(paymentAmount.replace('R ', '')) <= 0) newErrors.paymentAmount = 'Payment amount must be greater than 0.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate blockchain transaction
    const transactionHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;

    // Update localStorage
    if (typeof window !== 'undefined') {
      const currentRenewalHistory = JSON.parse(localStorage.getItem('renewalHistory') || '[]');
      const newRenewalEntry = {
        id: currentRenewalHistory.length + 1,
        type: "License Renewal",
        date: new Date().toISOString().split('T')[0],
        status: "Pending",
        transactionHash,
      };
      localStorage.setItem('renewalHistory', JSON.stringify([...currentRenewalHistory, newRenewalEntry]));

      const currentTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      const newTransactionEntry = {
        id: currentTransactions.length + 1,
        type: "License Renewal Payment",
        date: new Date().toISOString().split('T')[0],
        hash: transactionHash,
        amount: paymentAmount,
      };
      localStorage.setItem('transactions', JSON.stringify([...currentTransactions, newTransactionEntry]));
    }

    alert('License renewal initiated successfully!');
    setIsSubmitting(false);
    router.push('/dashboard');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background text-gray-800 p-6">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-primary">DriveChain SA</div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">{walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Connect Wallet'}</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-primary mb-6">Renew Your License</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="licenseCode" className="block text-sm font-medium text-gray-700">License Code</label>
            <input
              type="text"
              id="licenseCode"
              className={`mt-1 block w-full p-3 border ${errors.licenseCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
              value={licenseCode}
              onChange={(e) => setLicenseCode(e.target.value)}
              placeholder="e.g., B, C1, EC"
            />
            {errors.licenseCode && <p className="mt-2 text-sm text-red-600">{errors.licenseCode}</p>}
            {!errors.licenseCode && licenseCode && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <Image src="/check-circle.svg" alt="Valid" width={16} height={16} className="mr-1" />
                Looks good!
              </p>
            )}
          </div>

          <div>
            <label htmlFor="renewalDate" className="block text-sm font-medium text-gray-700">Desired Renewal Date</label>
            <input
              type="date"
              id="renewalDate"
              className={`mt-1 block w-full p-3 border ${errors.renewalDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
              value={renewalDate}
              onChange={handleDateChange}
              min={today}
            />
            {errors.renewalDate && <p className="mt-2 text-sm text-red-600">{errors.renewalDate}</p>}
            {!errors.renewalDate && renewalDate && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <Image src="/check-circle.svg" alt="Valid" width={16} height={16} className="mr-1" />
                Date selected.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">Payment Amount</label>
            <input
              type="text"
              id="paymentAmount"
              className={`mt-1 block w-full p-3 border ${errors.paymentAmount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
              value={paymentAmount}
              onChange={handleAmountChange}
              inputMode="decimal"
            />
            {errors.paymentAmount && <p className="mt-2 text-sm text-red-600">{errors.paymentAmount}</p>}
            {!errors.paymentAmount && parseFloat(paymentAmount.replace('R ', '')) > 0 && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <Image src="/check-circle.svg" alt="Valid" width={16} height={16} className="mr-1" />
                Amount entered.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-md font-semibold hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Renew License'}
          </button>
        </form>
      </div>
    </div>
  );
}