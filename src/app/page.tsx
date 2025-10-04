'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/papers?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setPapers(data.papers || data.results || data || []);
    } catch (error) {
      console.error('Failed to fetch papers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight mb-4 md:mb-6">
            Come Closer:<br />
            I'll Show You<br />
            Who's Out There
          </h1>
          <button className="px-4 md:px-6 py-2 bg-blue-600 text-white text-xs md:text-sm border-2 border-blue-700">
            (project intro)
          </button>
        </div>
      </section>

      {/* Search Tool Section */}
      <section className="border-t border-b border-gray-300 bg-gray-50 py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-2">(Search tool)</h2>
            <p className="text-xs md:text-sm text-gray-600">(text)</p>
          </div>

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

      {/* Planet Categories */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 border-b border-gray-300">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300 border border-gray-300">
            {/* Planet #01 */}
            <a href="/planet/1" className="p-8 md:p-10 lg:p-12 text-center bg-white hover:bg-gray-50 cursor-pointer block">
              <div className="mb-4">
                <p className="text-xs mb-1">Planet</p>
                <p className="text-base md:text-lg">#01</p>
              </div>
              <div className="mb-4 md:mb-6 flex justify-center">
                <img src="/image 99.png" alt="UFO" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              </div>
              <p className="text-xs mb-2 md:mb-3">Search by</p>
              <div className="text-xl md:text-2xl text-gray-400">↘</div>
            </a>

            {/* Planet #02 */}
            <a href="/planet/2" className="p-8 md:p-10 lg:p-12 text-center bg-white hover:bg-gray-50 cursor-pointer block">
              <div className="mb-4">
                <p className="text-xs mb-1">Planet</p>
                <p className="text-base md:text-lg">#02</p>
              </div>
              <div className="mb-4 md:mb-6 flex justify-center">
                <img src="/image 98.png" alt="Alien" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              </div>
              <p className="text-xs mb-2 md:mb-3">Search by</p>
              <div className="text-xl md:text-2xl text-gray-400">↘</div>
            </a>

            {/* Planet #03 */}
            <a href="/planet/3" className="p-8 md:p-10 lg:p-12 text-center bg-white hover:bg-gray-50 cursor-pointer block">
              <div className="mb-4">
                <p className="text-xs mb-1">Planet</p>
                <p className="text-base md:text-lg">#03</p>
              </div>
              <div className="mb-4 md:mb-6 flex justify-center">
                <img src="/image 100.png" alt="Rocket" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              </div>
              <p className="text-xs mb-2 md:mb-3">Search by</p>
              <div className="text-xl md:text-2xl text-gray-400">↘</div>
            </a>
          </div>
        </div>
      </section>

      {/* Papers Results */}
      {papers.length > 0 && (
        <section className="py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {papers.map((paper, index) => (
                <a
                  key={paper.id || index}
                  href={`/paper/${paper.id || index}`}
                  className="p-4 md:p-6 border-2 border-gray-300 bg-white hover:border-black transition"
                >
                  <p className="text-xs text-gray-500 mb-1">Entry</p>
                  <p className="text-base md:text-lg mb-2 md:mb-3">#{String(index + 4).padStart(2, '0')}</p>
                  <h3 className="text-sm md:text-base mb-2 md:mb-3 hover:underline line-clamp-2">{paper.title}</h3>
                  <p className="text-xs mb-2">Search by</p>
                  <div className="text-lg md:text-xl text-gray-400">↘</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Us Section */}
      <section id="about" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6 md:mb-8">About Us</h2>
          <div className="max-w-2xl mx-auto text-sm md:text-base text-gray-700">
            <p>Space Biology Library is a collaborative project between NASA and Star Keys,
            exploring the fascinating world of space biology and extraterrestrial research.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
