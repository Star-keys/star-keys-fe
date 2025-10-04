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
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <p className="text-gray-600">논문 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error && !paper) {
    return (
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <a href="/" className="text-blue-500 hover:underline mb-4 inline-block">
          ← 검색으로 돌아가기
        </a>
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <a href="/" className="text-blue-500 hover:underline mb-6 inline-block">
        ← 검색으로 돌아가기
      </a>

      {paper && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{paper.title}</h1>

          <div className="space-y-2 mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">저자:</span> {paper.authors}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">발행년도:</span> {paper.year}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">ID:</span> {paper.id}
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-3">내용</h2>
            <p className="whitespace-pre-wrap text-gray-800">{paper.content}</p>
          </div>
        </div>
      )}

      <button
        onClick={handleSummarize}
        disabled={summaryLoading}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 mb-6"
      >
        {summaryLoading ? '요약 생성 중...' : '논문 요약하기'}
      </button>

      {error && paper && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">
          {error}
        </div>
      )}

      {summary && (
        <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">AI 요약</h2>
          <p className="whitespace-pre-wrap text-gray-800">{summary}</p>
        </div>
      )}
    </div>
  );
}
