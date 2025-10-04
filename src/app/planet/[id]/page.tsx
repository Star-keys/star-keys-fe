'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function PlanetDetail() {
  const params = useParams();
  const planetId = params.id as string;

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

        {/* RESOURCES Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 border-b border-gray-300">
          <div className="max-w-[1280px] mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8">RESOURCES</h2>
          </div>
        </section>

        {/* Star Keys + Alien Section */}
        <section className="border-b border-gray-300">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
              {/* Star Keys Text */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl mb-6">Star Keys</h3>
                <div className="space-y-4 text-sm md:text-base">
                  <p>Hi, I&apos;m Deon Overfelt. I used to be a card-carrying member of the &apos;Meat Lovers&apos; Club.&apos;</p>
                  <p>Then, I wondered...what if I tried going vegan? For a year? So I did.</p>
                  <p className="text-xs text-gray-600">(team intro)</p>
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
              <a href="#" className="p-6 md:p-8 text-center hover:bg-gray-50 transition text-sm md:text-base">
                NASA Open Science Data Repository
              </a>
              <a href="#" className="p-6 md:p-8 text-center hover:bg-gray-50 transition text-sm md:text-base">
                NASA Space Life Sciences Library
              </a>
              <a href="#" className="p-6 md:p-8 text-center hover:bg-gray-50 transition text-sm md:text-base">
                NASA Task Book
              </a>
            </div>
            <div className="border-t border-gray-300">
              <a href="#" className="block p-6 md:p-8 text-center hover:bg-gray-50 transition text-sm md:text-base">
                Open-Access Space Biology Publications
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
              <p className="text-xs">Search by</p>
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

      {/* About Us Section */}
      <section id="about" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6 md:mb-8">About Us</h2>
        </div>
      </section>
    </main>
  );
}
