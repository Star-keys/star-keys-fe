'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Paper {
  _id?: { $oid: string };
  id?: string | number;
  title: string;
  link?: string;
  pmc_id?: string;
  keywords?: string[];
}

export default function PlanetDetail() {
  const params = useParams();
  const planetId = params.id as string;
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState<Paper[]>([]);
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

  // Planet #3 - About Us Page
  if (planetId === '3') {
    return (
      <main className="min-h-screen bg-white">
        {/* NASA Space Apps Banner */}
        <section className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
          <Image
            src="/image 343.png"
            alt="Earth"
            fill
            className="object-cover object-[center_10%]"
          />
        </section>

        {/* Star Keys + Alien Section */}
        <section className="border-b border-gray-300">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
              {/* Star Keys Text */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl mb-6">Star Keys</h3>
                <div className="space-y-4 text-sm md:text-base leading-relaxed">
                  <p>
                    Hey, Earth friends! We&apos;re Star Keys — five cosmic explorers unlocking life&apos;s secrets.
                  </p>
                  <p>
                    Our name comes from our mission: to find the hidden keys of life scattered across the stars. Each discovery is a key, opening another mystery of the universe.
                  </p>
                  <p>
                    Our creation, the Space Biology Library, was built for the NASA Space Apps Challenge — a place where any curious Earthling can explore astrobiology and design their own space quests.
                  </p>
                </div>
              </div>

              {/* Alien Image */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center gap-6">
                <Image src="/image 98.png" alt="Alien" width={160} height={160} className="w-32 h-32 md:w-40 md:h-40 object-contain" />
                <button className="px-6 py-2 border-2 border-black hover:bg-gray-100 transition text-sm">
                  Email us ↗
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* NASA Links Section */}
        <section className="border-b border-gray-300">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">
              <a href="https://science.nasa.gov/biological-physical/data/" target="_blank" rel="noopener noreferrer" className="p-6 md:p-8 text-center hover:bg-gray-50 transition text-sm md:text-base underline">
                NASA Open Science Data Repository
              </a>
              <a href="https://public.ksc.nasa.gov/nslsl/" target="_blank" rel="noopener noreferrer" className="p-6 md:p-8 text-center hover:bg-gray-50 transition text-sm md:text-base underline">
                NASA Space Life Sciences Library
              </a>
              <a href="https://taskbook.nasaprs.com/tbp/welcome.cfm" target="_blank" rel="noopener noreferrer" className="p-6 md:p-8 text-center hover:bg-gray-50 transition text-sm md:text-base underline">
                NASA Task Book
              </a>
            </div>
            <div className="border-t border-gray-300">
              <a href="https://github.com/jgalazka/SB_publications/tree/main" target="_blank" rel="noopener noreferrer" className="block p-6 md:p-8 text-center hover:bg-gray-50 transition text-sm md:text-base underline">
                Open-Access Space Biology Publications
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
          <div className="max-w-[1280px] mx-auto text-center">
            <p className="text-sm md:text-base">Star Keys × NASA Space Apps Challenge 2025</p>
          </div>
        </section>
      </main>
    );
  }

  // Planet #1 and #2 - Recipe style pages
  return (
    <main className="min-h-screen bg-white">
      {/* Header with Planet number */}
      <div className="border-b border-gray-300 py-4 px-4 md:px-6 lg:px-8 text-center">
        <p className="text-sm">Planet #{planetId.padStart(2, '0')}</p>
      </div>

      {/* Search Tool Section */}
      <section className="border-b border-gray-300 bg-gray-50 py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8">Search Papers</h1>
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

      {/* Search Results */}
      {papers.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 border-b border-gray-300">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl mb-8 text-center">Search Results</h2>
            <div className="space-y-6">
              {papers.map((paper, index) => {
                const paperId = paper._id?.$oid || paper.pmc_id || paper.id || index;
                return (
                  <Link
                    key={paperId}
                    href={`/planet/${planetId}/paper/${paperId}`}
                    className="block p-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition"
                  >
                    <h3 className="text-lg md:text-xl font-medium mb-3">{paper.title}</h3>

                    {paper.keywords && paper.keywords.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {paper.keywords.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-xs border border-gray-300">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {paper.pmc_id && (
                        <span>PMC ID: {paper.pmc_id}</span>
                      )}
                      {paper.link && (
                        <span className="underline">View Details →</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

         {/* Navigation to other Planets */}
      <section className="border-t border-gray-300">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 divide-x divide-gray-300 border-b border-gray-300">
            {/* Previous Planet */}
            <a
              href={planetId === '1' ? '/planet/3' : `/planet/${Number(planetId) - 1}`}
              className="p-8 md:p-12 lg:p-16 text-center bg-white hover:bg-gray-50 transition flex flex-col items-center justify-center gap-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl">←</span>
                <div className="text-left">
                  <p className="text-xs mb-1">#{(planetId === '1' ? '03' : String(Number(planetId) - 1).padStart(2, '0'))}</p>
                  <p className="text-xs">Planet</p>
                </div>
              </div>
              <p className="text-xs">Search by</p>
              <Image
                src={planetId === '1' ? '/image 100.png' : planetId === '2' ? '/image 99.png' : '/image 98.png'}
                alt="Previous Planet"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </a>

            {/* Next Planet */}
            <a
              href={planetId === '3' ? '/planet/1' : `/planet/${Number(planetId) + 1}`}
              className="p-8 md:p-12 lg:p-16 text-center bg-white hover:bg-gray-50 transition flex flex-col items-center justify-center gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs mb-1">#{(planetId === '3' ? '01' : String(Number(planetId) + 1).padStart(2, '0'))}</p>
                  <p className="text-xs">Planet</p>
                </div>
                <span className="text-2xl md:text-3xl">→</span>
              </div>
              <p className="text-xs">About Us</p>
              <Image
                src={planetId === '1' ? '/image 98.png' : planetId === '2' ? '/image 100.png' : '/image 99.png'}
                alt="Next Planet"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
