import React from "react";
import { type Language, translations } from "../data/translations";

interface NotFoundPageProps {
  language: Language;
  setActiveTab: (tab: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ language, setActiveTab }) => {
  const t = translations[language];

  return (
    <main className="flex-grow flex items-center justify-center py-20 px-6 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] sunlight-blur -z-10 pointer-events-none"></div>
      
      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-outline-variant/30 dark:border-zinc-800 text-center max-w-2xl mx-auto space-y-6 relative z-10">
        <span className="material-symbols-outlined text-7xl md:text-8xl text-[#f5b81a] animate-bounce">
          warning
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
            404
          </h1>
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            {t.pageNotFoundTitle}
          </h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
            {t.pageNotFoundDesc}
          </p>
        </div>
        
        <div className="pt-4">
          <button
            onClick={() => setActiveTab("leaders")}
            className="premium-gradient text-white px-8 py-3.5 rounded-xl font-bold text-sm md:text-base shadow-lg hover:shadow-primary/25 active:scale-95 transition-all cursor-pointer"
          >
            {t.btnGoToLeaders}
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
