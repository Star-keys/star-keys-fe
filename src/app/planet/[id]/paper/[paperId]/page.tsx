'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface PaperDetail {
  paperId: string;
  title: string;
  doi: string;
  abstract: string;
  introduction: string;
  method: string;
  result: string;
  discussion: string;
  conclusion: string;
  fields: string[];
}

export default function PaperDetailPage() {
  const params = useParams();
  const router = useRouter();
  const planetId = params.id as string;
  const paperId = params.paperId as string;
  const [paper, setPaper] = useState<PaperDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPaperDetail = async () => {
      try {
        setLoading(true);
        console.log('Fetching paper:', paperId);
        const response = await fetch(`/api/paper/${paperId}`);

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          throw new Error('Failed to fetch paper');
        }

        const data: PaperDetail = await response.json();
        console.log('Paper data:', data);
        setPaper(data);
      } catch (err) {
        console.error('Error fetching paper detail:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (paperId) {
      fetchPaperDetail();
    }
  }, [paperId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-300 py-4 px-4 md:px-6 lg:px-8 text-center">
          <p className="text-sm">Planet #{planetId.padStart(2, '0')}</p>
        </div>
        <div className="py-20 text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </main>
    );
  }

  if (error || !paper) {
    return (
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-300 py-4 px-4 md:px-6 lg:px-8 text-center">
          <p className="text-sm">Planet #{planetId.padStart(2, '0')}</p>
        </div>
        <div className="py-20 text-center">
          <p className="text-lg mb-4">Failed to load paper</p>
          <Link href={`/planet/${planetId}`} className="underline">
            Back to Search
          </Link>
        </div>
      </main>
    );
  }

  const sections = [
    { title: 'Abstract', content: paper.abstract },
    { title: 'Introduction', content: paper.introduction },
    { title: 'Method', content: paper.method },
    { title: 'Result', content: paper.result },
    { title: 'Discussion', content: paper.discussion },
    { title: 'Conclusion', content: paper.conclusion },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 py-4 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-sm">Planet #{planetId.padStart(2, '0')}</p>
          <button onClick={() => router.back()} className="text-sm underline">
            ← Back
          </button>
        </div>
      </div>

      {/* Paper Content */}
      <article className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            {paper.title}
          </h1>

          {/* Metadata */}
          <div className="mb-8 pb-8 border-b border-gray-300">
            {paper.doi && (
              <p className="text-sm text-gray-600 mb-4">
                DOI: <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" className="underline">{paper.doi}</a>
              </p>
            )}
            {paper.paperId && (
              <p className="text-sm text-gray-600 mb-4">
                Paper ID: {paper.paperId}
              </p>
            )}
            {paper.fields && paper.fields.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {paper.fields.map((field, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-xs border border-gray-300">
                    {field}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              section.content && (
                <section key={index} className="border-b border-gray-300 pb-12 last:border-b-0">
                  <h2 className="text-2xl md:text-3xl font-medium mb-6">
                    {section.title}
                  </h2>
                  <div className="prose prose-sm md:prose-base max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                      {section.content}
                    </p>
                  </div>
                </section>
              )
            ))}
          </div>
        </div>
      </article>

      {/* Footer Navigation */}
      <div className="border-t border-gray-300 py-8 px-4 md:px-6 lg:px-8 text-center">
        <Link href={`/planet/${planetId}`} className="inline-block px-6 py-3 border-2 border-black hover:bg-gray-100 transition text-sm">
          ← Back to Search Results
        </Link>
      </div>
    </main>
  );
}
