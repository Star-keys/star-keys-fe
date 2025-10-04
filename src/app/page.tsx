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
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl leading-tight mb-6">
            Come Closer:<br />
            I'll Show You<br />
            Who's Out There
          </h1>
          <button className="px-6 py-2 bg-blue-600 text-white text-sm border-2 border-blue-700">
            (project intro)
          </button>
        </div>
      </section>

      {/* Graph Section */}
      <section className="border-t border-b border-gray-300 bg-gray-50 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-2">(Graph here)</h2>
          <p className="text-sm text-gray-600">(text here)</p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-12 max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for papers..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 bg-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Planet Categories */}
      <section className="py-16 px-8 border-b border-gray-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-gray-300 border border-gray-300">
            {/* Planet #01 */}
            <div className="p-12 text-center bg-white hover:bg-gray-50 cursor-pointer">
              <div className="mb-4">
                <p className="text-xs mb-1">Planet</p>
                <p className="text-lg">#01</p>
              </div>
              <div className="text-6xl mb-6">🛸</div>
              <p className="text-xs mb-3">Search by</p>
              <div className="text-2xl text-gray-400">↘</div>
            </div>

            {/* Planet #02 */}
            <div className="p-12 text-center bg-white hover:bg-gray-50 cursor-pointer">
              <div className="mb-4">
                <p className="text-xs mb-1">Planet</p>
                <p className="text-lg">#02</p>
              </div>
              <div className="text-6xl mb-6">👽</div>
              <p className="text-xs mb-3">Search by</p>
              <div className="text-2xl text-gray-400">↘</div>
            </div>

            {/* Planet #03 */}
            <div className="p-12 text-center bg-white hover:bg-gray-50 cursor-pointer">
              <div className="mb-4">
                <p className="text-xs mb-1">Planet</p>
                <p className="text-lg">#03</p>
              </div>
              <div className="text-6xl mb-6">🚀</div>
              <p className="text-xs mb-3">Search by</p>
              <div className="text-2xl text-gray-400">↘</div>
            </div>
          </div>
        </div>
      </section>

      {/* Papers Results */}
      {papers.length > 0 && (
        <section className="py-12 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {papers.map((paper, index) => (
                <a
                  key={paper.id || index}
                  href={`/paper/${paper.id || index}`}
                  className="p-6 border-2 border-gray-300 bg-white hover:border-black transition"
                >
                  <p className="text-xs text-gray-500 mb-1">Entry</p>
                  <p className="text-lg mb-3">#{String(index + 4).padStart(2, '0')}</p>
                  <h3 className="text-base mb-3 hover:underline">{paper.title}</h3>
                  <p className="text-xs mb-2">Search by</p>
                  <div className="text-xl text-gray-400">↘</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Us Section */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-8">About Us</h2>
          <div className="max-w-2xl mx-auto text-gray-700">
            <p>Space Biology Library is a collaborative project between NASA and Star Keys,
            exploring the fascinating world of space biology and extraterrestrial research.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
