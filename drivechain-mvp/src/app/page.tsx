import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-lightgray">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Your Driver's License. On Blockchain. Forever Accessible.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect your wallet and digitize your SA driver's license in 60 seconds
        </p>
        <Link href="/connect-wallet" className="inline-block">
          <button className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
            Connect Wallet to Start
          </button>
        </Link>
        <div className="mt-12">
          {/* Placeholder for illustration */}
          <div className="w-96 h-60 bg-gray-200 rounded-lg mx-auto flex items-center justify-center shadow-xl" style={{
            backgroundImage: `url('/digital-license-illustration.svg')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
            {/* This div will be replaced by an SVG illustration */}
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
          <span className="text-4xl mb-4 block">🎫</span>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Store your license securely on blockchain</h3>
          <p className="text-gray-600">Your digital license is immutable and always verifiable.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
          <span className="text-4xl mb-4 block">🔄</span>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Renew license disc & card instantly</h3>
          <p className="text-gray-600">Say goodbye to queues and paperwork with instant renewals.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
          <span className="text-4xl mb-4 block">👁️</span>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload eye test results directly</h3>
          <p className="text-gray-600">Seamlessly submit your eye test results for license renewals.</p>
        </div>
      </section>
    </main>
  );
}