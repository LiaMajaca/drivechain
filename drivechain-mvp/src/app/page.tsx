'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "🔐",
      title: "Blockchain Security",
      description: "Your digital license is immutable, encrypted, and always verifiable on the blockchain.",
      gradient: "from-blue-500/10 to-cyan-500/10",
      borderGradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "⚡",
      title: "Instant Renewals",
      description: "Skip the queues. Renew your license disc and card in seconds from anywhere.",
      gradient: "from-purple-500/10 to-pink-500/10",
      borderGradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "👁️",
      title: "Digital Eye Tests",
      description: "Upload and store your eye test results securely for seamless license renewals.",
      gradient: "from-teal-500/10 to-emerald-500/10",
      borderGradient: "from-teal-500 to-emerald-500"
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16">
        {/* Hero Section */}
        <section className={`text-center mb-20 max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-700">Powered by Blockchain Technology</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Your Driver's License.
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              On Blockchain.
            </span>
            <br />
            Forever Accessible.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto font-light">
            Connect your wallet and digitize your SA driver's license in 
            <span className="font-semibold text-slate-800"> 60 seconds</span>
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/connect-wallet" className="group relative px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                Connect Wallet to Start
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-800 font-semibold rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-300 shadow-sm">
              Learn More
            </button>
          </div>

          {/* Illustration Card */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl p-8 border border-slate-200/50 backdrop-blur-sm">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
                {/* License Card Mockup */}
                <div className="w-80 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/20 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-yellow-500 font-bold text-lg">🇿🇦 SA License</span>
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-32 bg-slate-700 rounded"></div>
                      <div className="h-3 w-24 bg-slate-700 rounded"></div>
                      <div className="h-3 w-28 bg-slate-700 rounded"></div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Blockchain Verified</span>
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className={`w-full max-w-6xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative bg-white/70 backdrop-blur-md rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl border border-slate-200/50 ${
                  hoveredCard === index ? 'scale-105 -translate-y-2' : ''
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Gradient Border on Hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.borderGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
                
                {/* Card Content */}
                <div className={`relative bg-gradient-to-br ${feature.gradient} rounded-2xl p-8 h-full flex flex-col`}>
                  <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-slate-900 group-hover:to-slate-600 transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="mt-4 flex items-center gap-2 text-slate-700 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm">Learn more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className={`mt-24 w-full max-w-6xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 shadow-2xl border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-white mb-2">10k+</div>
                <div className="text-slate-400">Digital Licenses Issued</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">99.9%</div>
                <div className="text-slate-400">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">&lt;60s</div>
                <div className="text-slate-400">Average Registration Time</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}