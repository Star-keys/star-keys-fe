'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

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
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600">Loading paper information...</p>
        </div>
      </div>
    );
  }

  if (error && !paper) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="inline-block mb-6 text-sm hover:underline">← Back to Home</a>
          <div className="p-6 bg-red-50 border-2 border-red-300 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8">
        <a href="/" className="inline-block mb-8 text-sm hover:underline">← Back to Home</a>

        {paper && (
          <div className="mb-12">
            <div className="border-2 border-gray-300 p-8 mb-8 bg-white">
              <h1 className="text-3xl mb-6 leading-tight">{paper.title}</h1>

              <div className="grid grid-cols-3 gap-6 text-sm border-t border-gray-200 pt-6">
                <div>
                  <p className="text-gray-500 mb-1">AUTHORS</p>
                  <p>{paper.authors}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">YEAR</p>
                  <p>{paper.year}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">ID</p>
                  <p>{paper.id}</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-300 p-8 mb-8 bg-gray-50">
              <h2 className="text-xl mb-4">CONTENT</h2>
              <p className="whitespace-pre-wrap leading-relaxed text-sm">{paper.content}</p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <button
            onClick={handleSummarize}
            disabled={summaryLoading}
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {summaryLoading ? 'Generating Summary...' : 'Generate AI Summary'}
          </button>
        </div>

        {error && paper && (
          <div className="p-6 bg-red-50 border-2 border-red-300 text-red-700 mb-8 text-sm">
            {error}
          </div>
        )}

        {summary && (
          <div className="p-8 border-2 border-blue-600 bg-blue-50">
            <h2 className="text-xl mb-6">AI SUMMARY</h2>
            <p className="whitespace-pre-wrap leading-relaxed text-sm">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
