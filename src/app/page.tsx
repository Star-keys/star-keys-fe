'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PaperNetworkGraph from '@/components/PaperNetworkGraph';

interface Paper {
  id?: string | number;
  title: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    localStorage.setItem('searchQuery', query);
    window.location.href = '/planet/1';
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight mb-4 md:mb-6">
            Come Closer:<br />
            I&apos;ll Show You<br />
            Who&apos;s Out There
          </h1>
          {/* <button className="px-4 md:px-6 py-2 bg-blue-600 text-white text-xs md:text-sm border-2 border-blue-700">
            (project intro)
          </button> */}
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for papers..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 bg-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 md:px-8 py-3 bg-black text-white text-sm hover:bg-gray-800 disabled:bg-gray-400 whitespace-nowrap"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Graph Section */}
      <section className="border-t border-b border-gray-300 bg-gray-50 py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl mb-8 text-center">Paper Network</h2>
          <div className="flex justify-center">
            <PaperNetworkGraph width={1200} height={600} />
          </div>
        </div>
      </section>

      {/* Planet Categories */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 border-b border-gray-300">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300 border border-gray-300">
            {/* Planet #01 */}
            <Link href="/planet/1" className="p-8 md:p-10 lg:p-12 text-center bg-white hover:bg-gray-50 cursor-pointer block">
              <div className="mb-4">
                <p className="text-xs mb-1">Planet</p>
                <p className="text-base md:text-lg">#01</p>
              </div>
              <div className="mb-4 md:mb-6 flex justify-center">
                <Image src="/image 99.png" alt="UFO" width={80} height={80} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              </div>
              <p className="text-xs mb-2 md:mb-3">Search</p>
              <div className="text-xl md:text-2xl text-gray-400">↘</div>
            </Link>

            {/* Planet #02 */}
            <div className="p-8 md:p-10 lg:p-12 text-center bg-gray-100 opacity-50 cursor-not-allowed">
              <div className="mb-4">
                <p className="text-xs mb-1">Planet</p>
                <p className="text-base md:text-lg">#02</p>
              </div>
              <div className="mb-4 md:mb-6 flex justify-center">
                <Image src="/image 100.png" alt="Rocket" width={80} height={80} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              </div>
              <p className="text-xs mb-2 md:mb-3">Coming Soon</p>
              <div className="text-xl md:text-2xl text-gray-400">↘</div>
            </div>

            {/* Planet #03 */}
            <Link href="/planet/3" className="p-8 md:p-10 lg:p-12 text-center bg-white hover:bg-gray-50 cursor-pointer block">
              <div className="mb-4">
                <p className="text-xs mb-1">Planet</p>
                <p className="text-base md:text-lg">#03</p>
              </div>
              <div className="mb-4 md:mb-6 flex justify-center">
                <Image src="/image 98.png" alt="Alien" width={80} height={80} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              </div>
              <p className="text-xs mb-2 md:mb-3">About Us</p>
              <div className="text-xl md:text-2xl text-gray-400">↘</div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="max-w-2xl mx-auto text-sm md:text-base text-gray-700">
            <p>Star Keys ✕ NASA Space Apps Challenge 2025</p>
          </div>
        </div>
      </section>
    </main>
  );
}
