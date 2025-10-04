'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Paper {
  id: string;
  title: string;
  authors: string;
  year: string;
  content: string;
}

export default function PaperDetail() {
  const params = useParams();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPaper = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/papers/${params.id}`);
        if (!response.ok) {
          throw new Error('논문 정보를 불러오는데 실패했습니다');
        }
        const data = await response.json();
        setPaper(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [params.id]);

  const handleSummarize = async () => {
    setSummaryLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/paper/${params.id}/summary`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('요약 생성에 실패했습니다');
      }

      const data = await response.json();
      setSummary(data.summary || data.result || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다');
    } finally {
      setSummaryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <p className="text-gray-600 text-sm md:text-base">Loading paper information...</p>
        </div>
      </div>
    );
  }

  if (error && !paper) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <Link href="/" className="inline-block mb-6 text-xs md:text-sm hover:underline">← Back to Home</Link>
          <div className="p-4 md:p-6 bg-red-50 border-2 border-red-300 text-red-700 text-xs md:text-sm">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <Link href="/" className="inline-block mb-6 md:mb-8 text-xs md:text-sm hover:underline">← Back to Home</Link>

        {paper && (
          <div className="mb-8 md:mb-12">
            <div className="border-2 border-gray-300 p-4 md:p-6 lg:p-8 mb-6 md:mb-8 bg-white">
              <h1 className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 leading-tight">{paper.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-xs md:text-sm border-t border-gray-200 pt-4 md:pt-6">
                <div>
                  <p className="text-gray-500 mb-1">AUTHORS</p>
                  <p className="break-words">{paper.authors}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">YEAR</p>
                  <p>{paper.year}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">ID</p>
                  <p className="break-all">{paper.id}</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-300 p-4 md:p-6 lg:p-8 mb-6 md:mb-8 bg-gray-50">
              <h2 className="text-lg md:text-xl mb-3 md:mb-4">CONTENT</h2>
              <p className="whitespace-pre-wrap leading-relaxed text-xs md:text-sm">{paper.content}</p>
            </div>
          </div>
        )}

        <div className="mb-6 md:mb-8">
          <button
            onClick={handleSummarize}
            disabled={summaryLoading}
            className="w-full md:w-auto px-6 md:px-8 py-3 bg-black text-white text-sm hover:bg-gray-800 disabled:bg-gray-400"
          >
            {summaryLoading ? 'Generating Summary...' : 'Generate AI Summary'}
          </button>
        </div>

        {error && paper && (
          <div className="p-4 md:p-6 bg-red-50 border-2 border-red-300 text-red-700 mb-6 md:mb-8 text-xs md:text-sm">
            {error}
          </div>
        )}

        {summary && (
          <div className="p-4 md:p-6 lg:p-8 border-2 border-blue-600 bg-blue-50">
            <h2 className="text-lg md:text-xl mb-4 md:mb-6">AI SUMMARY</h2>
            <p className="whitespace-pre-wrap leading-relaxed text-xs md:text-sm">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
