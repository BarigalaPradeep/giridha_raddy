import React, { useState, useMemo } from "react";
import { villagesData } from "../../data/villages";
import { type Language, translations } from "../../data/translations";

interface VillageSearcherProps {
  language: Language;
}

export const VillageSearcher: React.FC<VillageSearcherProps> = ({ language }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Extract unique Mandals for filtering
  const mandals = useMemo(() => {
    const list = new Set(villagesData.map((v) => v.mandal));
    return ["All", ...Array.from(list)];
  }, []);

  // Filter logic
  const filteredVillages = useMemo(() => {
    return villagesData.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.representative.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMandal = selectedMandal === "All" || v.mandal === selectedMandal;
      return matchesSearch && matchesMandal;
    });
  }, [searchTerm, selectedMandal]);

  // Handle how many we show
  const displayedVillages = useMemo(() => {
    if (showAll) return filteredVillages;
    return filteredVillages.slice(0, 5); // Show first 5 and the "View All" card
  }, [filteredVillages, showAll]);

  return (
    <div className="space-y-8 transition-colors duration-300">
      {/* Header with Search and Filter controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div>
          <h3 className="font-label-bold text-primary dark:text-primary-container uppercase tracking-wider text-sm md:text-base font-bold text-left">
            {t.dirSarpanchTitle}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Mandal Filter */}
          <select
            value={selectedMandal}
            onChange={(e) => setSelectedMandal(e.target.value)}
            className="bg-surface-container dark:bg-zinc-850 text-on-surface dark:text-zinc-200 border border-outline-variant dark:border-zinc-700 rounded-full px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {mandals.map((m) => (
              <option key={m} value={m}>
                {m === "All" ? (language === "en" ? "All Mandals" : "అన్ని మండలాలు") : m}
              </option>
            ))}
          </select>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.dirSarpanchSearchPlaceholder}
              className="w-full bg-white dark:bg-zinc-900 border border-outline-variant dark:border-zinc-700 text-on-surface dark:text-zinc-200 rounded-full pl-5 pr-10 py-2 text-xs focus:ring-2 focus:ring-primary outline-none transition-all"
            />
            <span className="material-symbols-outlined absolute right-4 top-2 text-on-surface-variant dark:text-zinc-400 text-lg font-bold">
              search
            </span>
          </div>
        </div>
      </div>

      {/* Villages Grid */}
      {displayedVillages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayedVillages.map((v) => (
            <div
              key={v.id}
              className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-outline-variant/20 dark:border-zinc-800 hover:border-primary dark:hover:border-primary-container text-center shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-secondary-container dark:bg-zinc-800 rounded-full mx-auto mb-3 flex items-center justify-center text-primary dark:text-primary-container group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    person
                  </span>
                </div>
                <div className="text-xs font-bold text-on-surface dark:text-zinc-200">
                  {v.representative}
                </div>
                <div className="text-[10px] text-on-surface-variant dark:text-zinc-400 font-bold uppercase tracking-wider mt-1 mb-3">
                  {v.name}
                </div>
              </div>
              <div>
                <a
                  href={v.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex p-1.5 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-100 transition-colors"
                  title="WhatsApp"
                >
                  <span className="material-symbols-outlined text-lg block font-bold">chat</span>
                </a>
              </div>
            </div>
          ))}

          {/* View All Toggle Card (Only show if we have more than 5 villages and showAll is false) */}
          {!showAll && filteredVillages.length > 5 && (
            <button
              onClick={() => setShowAll(true)}
              className="bg-primary/5 dark:bg-zinc-900 border border-dashed border-primary/40 dark:border-zinc-800 rounded-xl p-4 flex items-center justify-center flex-col text-center hover:bg-primary/10 transition-all duration-300 cursor-pointer min-h-[140px] focus:outline-none"
            >
              <div className="text-xs font-bold text-primary dark:text-primary-container">
                {t.dirViewAll} {filteredVillages.length}+
              </div>
              <span className="material-symbols-outlined text-primary dark:text-primary-container text-xl mt-2 animate-bounce-horizontal">
                arrow_forward
              </span>
            </button>
          )}

          {/* Show Less Toggle Card (Only show if showAll is true) */}
          {showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="bg-primary/5 dark:bg-zinc-900 border border-dashed border-primary/40 dark:border-zinc-800 rounded-xl p-4 flex items-center justify-center flex-col text-center hover:bg-primary/10 transition-all duration-300 cursor-pointer min-h-[140px] focus:outline-none"
            >
              <div className="text-xs font-bold text-primary dark:text-primary-container">
                {language === "en" ? "Show Less" : "తక్కువ చూపించు"}
              </div>
              <span className="material-symbols-outlined text-primary dark:text-primary-container text-xl mt-2 rotate-180">
                arrow_forward
              </span>
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-surface-container/30 dark:bg-zinc-900/30 rounded-2xl border border-dashed border-outline-variant/40 dark:border-zinc-800">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant dark:text-zinc-500 mb-2">
            search_off
          </span>
          <p className="text-sm font-semibold text-on-surface-variant dark:text-zinc-400">
            {language === "en" ? "No village representatives found matching your search." : "మీ శోధనకు సరిపోయే గ్రామ ప్రతినిధులు ఎవరూ కనుగొనబడలేదు."}
          </p>
        </div>
      )}
    </div>
  );
};
export default VillageSearcher;
