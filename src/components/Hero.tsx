import React, { useState } from "react";
import { type Language, translations } from "../data/translations";

interface HeroProps {
  language: Language;
  suggestionsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ language, suggestionsCount }) => {
  const t = translations[language];
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-12 md:py-stack-lg relative overflow-hidden transition-colors duration-300">
      {/* Background Sunlight Blur */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] sunlight-blur -z-10 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Text Content */}
        <div className="lg:w-1/2 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/20 text-primary dark:text-primary-container font-label-bold text-xs md:text-sm font-semibold tracking-wide">
            <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              groups
            </span>
            {t.heroSubtitle}
          </div>

          <h1 className="font-display-lg text-4xl md:text-5xl lg:text-display-lg text-on-surface dark:text-zinc-100 font-extrabold leading-tight tracking-tight">
            {t.heroTitlePart1}
            <br />
            <span className="text-primary dark:text-primary-container">{t.heroTitlePart2}</span>
          </h1>

          <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant dark:text-zinc-400 max-w-lg leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              className="premium-gradient text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              href="#suggest-form"
            >
              {t.btnSuggest}
            </a>
            <a
              className="px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base border-2 border-outline-variant hover:bg-surface-container dark:hover:bg-zinc-800 text-on-surface dark:text-zinc-300 hover:border-primary transition-all duration-300"
              href="#directory"
            >
              {t.btnDirectory}
            </a>
          </div>
        </div>

        {/* Right Media / Image & Video Thumbnail */}
        <div className="lg:w-1/2 relative w-full">
          <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-video group border border-outline-variant/30">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Nellore Rural Landscape"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbBAKxGaxaujGeD1wGXmVCogvyz8KpoKd0yxo5Eu8tstP59uDqLqo6PlqrU5xFbCSkEvhL8ZaGnP4lPlK9e99xdpiO9Ri-PVm1-Bf5C--Ba5SrhuT505M1_mF9fACOqPQXOJ3ASfr1EvXfFxQT_zS1FIuFbwJtPAlXfEc7X-IY-vkL4y_n0-TydEMGjTmhRvTFQbyrL7_q3PAlOBawUL0DxoO4p97rGEUwBF4qlgt7cfpP5Pt0_MZ450kjvsIZH6GdaZ22hMFj08cF"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent"></div>

            {/* Play Button Overlay */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="absolute bottom-6 left-6 flex items-center gap-4 text-left group/btn focus:outline-none"
            >
              <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-lg group-hover/btn:scale-110 group-active/btn:scale-95 transition-all duration-300 animate-pulse">
                <span className="material-symbols-outlined font-bold text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
              </div>
              <span className="text-white font-semibold text-sm md:text-base tracking-wide group-hover/btn:underline">
                {t.videoTitle}
              </span>
            </button>
          </div>

          {/* Floating Stats Card */}
          <div className="absolute -bottom-6 -right-4 md:-right-6 glass-card dark:bg-zinc-900/90 dark:border-zinc-800 p-4 md:p-6 rounded-2xl shadow-xl border border-white/40 hidden sm:block transition-all duration-300">
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <div className="font-stat-number text-2xl md:text-3xl lg:text-stat-number text-primary dark:text-primary-container font-extrabold">
                  {suggestionsCount}+
                </div>
                <div className="font-label-bold text-[10px] md:text-xs text-on-surface-variant dark:text-zinc-400 uppercase tracking-wider font-semibold">
                  {t.statSuggestions}
                </div>
              </div>
              <div className="w-px h-10 bg-outline-variant/30"></div>
              <div className="text-center">
                <div className="font-stat-number text-2xl md:text-3xl lg:text-stat-number text-primary dark:text-primary-container font-extrabold">
                  85%
                </div>
                <div className="font-label-bold text-[10px] md:text-xs text-on-surface-variant dark:text-zinc-400 uppercase tracking-wider font-semibold">
                  {t.statActionRate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal (Popup) */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="relative bg-zinc-900 w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black transition-all z-10"
            >
              <span className="material-symbols-outlined text-lg block">close</span>
            </button>

            {/* Video player embed (mocked with an iframe / image visualizer or custom video) */}
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-zinc-300">
              <span className="material-symbols-outlined text-6xl text-primary mb-4 animate-bounce">
                movie
              </span>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Nellore Rural Development Video Presentation</h3>
              <p className="text-sm text-zinc-400 max-w-md">
                This presentation showcases the completed road improvements, clean water RO plants, and education setups funded by the NRDA Citizen Connectivity Scheme.
              </p>
              <button
                onClick={() => setShowVideoModal(false)}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/95 transition-all text-sm"
              >
                Close presentation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
