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
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">논문 검색</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? '검색 중...' : '검색'}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {papers.map((paper, index) => (
          <a
            key={paper.id || index}
            href={`/paper/${paper.id || index}`}
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
          >
            <h3 className="font-semibold text-lg mb-2">{paper.title}</h3>
            <p className="text-gray-600">{paper.description || paper.abstract}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
