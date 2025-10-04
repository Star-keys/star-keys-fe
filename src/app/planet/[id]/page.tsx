'use client';

import { useParams } from 'next/navigation';

export default function PlanetDetail() {
  const params = useParams();
  const planetId = params.id as string;

  return (
    <main className="min-h-screen bg-white">
      {/* Header with Planet number */}
      <div className="border-b border-gray-300 py-4 px-4 md:px-6 lg:px-8 text-center">
        <p className="text-sm">Planet #{planetId.padStart(2, '0')}</p>
      </div>

      {/* Search Tool Section */}
      <section className="border-b border-gray-300 bg-gray-50 py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-2">(Search tool)</h1>
          <p className="text-sm text-gray-600">(text)</p>
        </div>
      </section>

      {/* INGREDIENTS Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 border-b border-gray-300">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl mb-8">INGREDIENTS</h2>
          <div className="space-y-3 text-sm md:text-base">
            <p>Olive Oil</p>
            <p>Fresh Basil</p>
            <p>Vegan Mozzarella</p>
            <p>Salt</p>
            <p>Pepper</p>
            <p>Black Vinegar</p>
            <p>Tomatoes</p>
          </div>
        </div>
      </section>

      {/* STEPS Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 border-b border-gray-300">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl mb-8">STEPS</h2>
          <div className="space-y-4 text-sm md:text-base text-left">
            <p>1. In a bowl, combine the halved tomatoes, torn basil leaves, and vegan mozzarella.</p>
            <p>2. Drizzle with olive oil and balsamic vinegar.</p>
            <p>3. Toss gently to combine.</p>
            <p>4. Season with salt and pepper to taste.</p>
          </div>
        </div>
      </section>

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
              <img
                src={planetId === '1' ? '/image 100.png' : planetId === '2' ? '/image 99.png' : '/image 98.png'}
                alt="Previous Planet"
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
              <p className="text-xs">Search by</p>
              <img
                src={planetId === '1' ? '/image 98.png' : planetId === '2' ? '/image 100.png' : '/image 99.png'}
                alt="Next Planet"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6 md:mb-8">About Us</h2>
        </div>
      </section>
    </main>
  );
}
