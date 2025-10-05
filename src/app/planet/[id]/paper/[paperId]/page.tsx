'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dummyPapers from '@/../dummy-paper.json';

interface Paper {
  _id?: { $oid: string };
  title: string;
  link?: string;
  pmc_id?: string;
  keywords?: string[];
}

interface ScientistAnalysis {
  summary: string;
  research_gap: string;
  hypotheses: string[];
  future_research: string[];
}

type TabType = 'overview' | 'explore';

export default function PaperDetail() {
  const params = useParams();
  const router = useRouter();
  const { id: planetId, paperId } = params;
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [scientistData, setScientistData] = useState<ScientistAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paper = dummyPapers.find(
    (p: Paper) => p._id?.$oid === paperId || p.pmc_id === paperId
  );

  if (!paper) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg">Paper not found</p>
      </main>
    );
  }

  const handleTabChange = async (tab: TabType) => {
    setActiveTab(tab);

    if (tab === 'explore' && !error) {
      setError('Comming soon!');
    }

    // if (tab === 'explore' && !scientistData && !loading) {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const response = await fetch(`/api/papers/${paperId}/scientist`, {
    //       method: 'POST',
    //     });
    //
    //     if (!response.ok) {
    //       throw new Error('Comming soon!');
    //     }
    //
    //     const data = await response.json();
    //     setScientistData(data);
    //   } catch (err) {
    //     setError(err instanceof Error ? err.message : 'An error occurred');
    //   } finally {
    //     setLoading(false);
    //   }
    // }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 py-4 px-4 md:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="text-sm hover:underline"
        >
          ← Back to Search Results
        </button>
      </div>

      {/* Paper Title */}
      <section className="py-8 md:py-12 px-4 md:px-6 lg:px-8 border-b border-gray-300">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            {paper.title}
          </h1>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-gray-300">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex gap-0">
            <button
              onClick={() => handleTabChange('overview')}
              className={`px-6 py-4 text-sm border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-black font-medium'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabChange('explore')}
              className={`px-6 py-4 text-sm border-b-2 transition ${
                activeTab === 'explore'
                  ? 'border-black font-medium'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Metadata */}
              <div className="space-y-4">
                {paper.pmc_id && (
                  <div className="text-sm md:text-base">
                    <span className="font-medium">PMC ID:</span>{' '}
                    <span className="text-gray-600">{paper.pmc_id}</span>
                  </div>
                )}
              </div>

              {/* Keywords */}
              {paper.keywords && paper.keywords.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-medium mb-4">Keywords</h2>
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gray-100 text-sm border border-gray-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* View Paper Link */}
              {paper.link && (
                <div className="mt-12">
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition text-sm"
                  >
                    View Full Paper ↗
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === 'explore' && (
            <div>
              {loading && (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading scientist analysis...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <p className="text-gray-600">{error}</p>
                </div>
              )}

              {scientistData && !loading && (
                <div className="space-y-10">
                  {/* Research Summary */}
                  <div className="p-6 bg-blue-50 border border-blue-200">
                    <h2 className="text-xl md:text-2xl font-medium mb-4">연구 핵심 요약</h2>
                    <p className="text-sm md:text-base leading-relaxed">{scientistData.summary}</p>
                  </div>

                  {/* Research Gap */}
                  <div className="p-6 bg-yellow-50 border border-yellow-200">
                    <h2 className="text-xl md:text-2xl font-medium mb-4">연구 갭(Gap) 분석</h2>
                    <p className="text-sm md:text-base leading-relaxed">{scientistData.research_gap}</p>
                  </div>

                  {/* New Hypotheses */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-medium mb-6">새로운 가설 제안</h2>
                    <div className="space-y-4">
                      {scientistData.hypotheses.map((hypothesis, index) => (
                        <div key={index} className="p-6 border border-gray-300 hover:border-gray-400 transition">
                          <div className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <p className="text-sm md:text-base leading-relaxed pt-1">{hypothesis}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Future Research Ideas */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-medium mb-6">후속 연구 아이디어</h2>
                    <div className="space-y-3">
                      {scientistData.future_research.map((idea, index) => (
                        <div key={index} className="p-4 border-l-4 border-gray-300 bg-gray-50">
                          <p className="text-sm md:text-base leading-relaxed">{idea}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-gray-300 py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => router.push(`/planet/${planetId}`)}
            className="text-sm hover:underline"
          >
            Go to Planet #{String(planetId).padStart(2, '0')}
          </button>
        </div>
      </section>
    </main>
  );
}
