'use client';

import { useParams, useRouter } from 'next/navigation';
import dummyPapers from '@/../dummy-paper.json';

interface Paper {
  _id?: { $oid: string };
  title: string;
  link?: string;
  pmc_id?: string;
  keywords?: string[];
}

export default function PaperDetail() {
  const params = useParams();
  const router = useRouter();
  const { id: planetId, paperId } = params;

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

      {/* Paper Details */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-8">
            {paper.title}
          </h1>

          {/* Metadata */}
          <div className="mb-8 space-y-4">
            {paper.pmc_id && (
              <div className="text-sm md:text-base">
                <span className="font-medium">PMC ID:</span>{' '}
                <span className="text-gray-600">{paper.pmc_id}</span>
              </div>
            )}
          </div>

          {/* Keywords */}
          {paper.keywords && paper.keywords.length > 0 && (
            <div className="mb-8">
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
                className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition"
              >
                View Full Paper ↗
              </a>
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
