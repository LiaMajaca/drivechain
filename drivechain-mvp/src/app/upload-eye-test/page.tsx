"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UploadEyeTestPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create file preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setErrors((prev) => ({ ...prev, file: '' }));
    } else {
      setSelectedFile(null);
      setFilePreview(null);
    }
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!selectedFile) newErrors.file = 'Please select a file to upload.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        const base64String = reader.result as string;

        // Simulate blockchain transaction
        const transactionHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;

        // Update localStorage
        if (typeof window !== 'undefined') {
          const currentUploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
          const newFileEntry = {
            id: currentUploadedFiles.length + 1,
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
            base64: base64String,
            uploadDate: new Date().toISOString().split('T')[0],
            transactionHash,
          };
          localStorage.setItem('uploadedFiles', JSON.stringify([...currentUploadedFiles, newFileEntry]));

          const currentRenewalHistory = JSON.parse(localStorage.getItem('renewalHistory') || '[]');
          const newRenewalEntry = {
            id: currentRenewalHistory.length + 1,
            type: "Eye Test Upload",
            date: new Date().toISOString().split('T')[0],
            status: "Pending Review",
            transactionHash,
          };
          localStorage.setItem('renewalHistory', JSON.stringify([...currentRenewalHistory, newRenewalEntry]));

          const currentTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
          const newTransactionEntry = {
            id: currentTransactions.length + 1,
            type: "Eye Test Upload",
            date: new Date().toISOString().split('T')[0],
            hash: transactionHash,
            fileName: selectedFile.name,
          };
          localStorage.setItem('transactions', JSON.stringify([...currentTransactions, newTransactionEntry]));
        }

        alert('Eye test results uploaded successfully!');
        setIsSubmitting(false);
        router.push('/dashboard');
      };
    }
  };

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
        <h1 className="text-3xl font-bold text-primary mb-6">Upload Eye Test Results</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="eyeTestFile" className="block text-sm font-medium text-gray-700">Upload File (Image or PDF)</label>
            <input
              type="file"
              id="eyeTestFile"
              accept="image/*,application/pdf"
              className={`mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary-dark
                ${errors.file ? 'border-red-500' : ''}`}
              onChange={handleFileChange}
            />
            {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file}</p>}
            {!errors.file && selectedFile && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <Image src="/check-circle.svg" alt="Valid" width={16} height={16} className="mr-1" />
                File selected: {selectedFile.name}
              </p>
            )}
          </div>

          {filePreview && (selectedFile?.type.startsWith('image/') || selectedFile?.type === 'application/pdf') && (
            <div className="mt-4">
              <p className="block text-sm font-medium text-gray-700 mb-2">File Preview:</p>
              {selectedFile?.type.startsWith('image/') && (
                <Image src={filePreview} alt="File Preview" width={200} height={200} className="max-w-full h-auto rounded-md border border-gray-300" />
              )}
              {selectedFile?.type === 'application/pdf' && (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md border border-gray-300">
                  <p className="text-gray-500">PDF Preview not available. File selected.</p>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-md font-semibold hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Eye Test'}
          </button>
        </form>
      </div>
    </div>
  );
}