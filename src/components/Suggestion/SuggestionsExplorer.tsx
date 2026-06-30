import React, { useState, useMemo } from "react";
import type { CitizenSuggestion } from "../../data/suggestions";
import { type Language, translations } from "../../data/translations";

interface SuggestionsExplorerProps {
  language: Language;
  suggestions: CitizenSuggestion[];
  onUpvote: (id: string) => void;
}

export const SuggestionsExplorer: React.FC<SuggestionsExplorerProps> = ({
  language,
  suggestions,
  onUpvote,
}) => {
  const t = translations[language];

  // Upvoted tracker (saves local upvoted IDs so users can only upvote once)
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleUpvoteClick = (id: string) => {
    if (upvotedIds[id]) return; // Already upvoted
    setUpvotedIds((prev) => ({ ...prev, [id]: true }));
    onUpvote(id);
  };

  // Filter lists
  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Infrastructure" && s.category === "Infrastructure") ||
        (selectedCategory === "Water" && s.category === "Water") ||
        (selectedCategory === "Education" && s.category === "Education") ||
        (selectedCategory === "Health" && s.category === "Health/Other");

      return matchesSearch && matchesCategory;
    });
  }, [suggestions, searchTerm, selectedCategory]);

  // Color-coded status badge mapper
  const getStatusBadge = (status: CitizenSuggestion["status"]) => {
    let label = t.statusReview;
    let style = "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-300/30";

    if (status === "Approved") {
      label = t.statusApproved;
      style = "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-300/30";
    } else if (status === "In Progress") {
      label = t.statusProgress;
      style = "bg-orange-100 text-orange-850 dark:bg-orange-950/30 dark:text-orange-400 border border-orange-300/30";
    } else if (status === "Completed") {
      label = t.statusCompleted;
      style = "bg-green-105 text-green-800 dark:bg-green-950/30 dark:text-green-400 border border-green-300/30";
    }

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${style}`}>
        {label}
      </span>
    );
  };

  // Category Icon mapper
  const getCategoryIcon = (category: CitizenSuggestion["category"]) => {
    switch (category) {
      case "Infrastructure":
        return "road";
      case "Water":
        return "water_drop";
      case "Education":
        return "school";
      case "Health/Other":
        return "psychiatry";
      default:
        return "help_outline";
    }
  };

  return (
    <section className="py-12 bg-surface-container-low dark:bg-zinc-950/40 border-t border-outline-variant/30 dark:border-zinc-800 transition-colors duration-300" id="proposals-board">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop space-y-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-headline-xl text-3xl font-bold text-on-surface dark:text-zinc-100">
            {t.explorerHeader}
          </h2>
          <p className="font-body-md text-sm md:text-body-md text-on-surface-variant dark:text-zinc-400">
            {t.explorerDesc}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-outline-variant/20 dark:border-zinc-800">
          {/* Category Dropdown */}
          <div className="flex gap-2 items-center w-full md:w-auto">
            <span className="material-symbols-outlined text-on-surface-variant dark:text-zinc-450 hidden sm:block text-lg">filter_alt</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-surface-container dark:bg-zinc-800 text-on-surface dark:text-zinc-200 border-none rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-48"
            >
              <option value="All">{t.explorerFilterAll}</option>
              <option value="Infrastructure">{t.formCategoryInfra}</option>
              <option value="Water">{t.formCategoryWater}</option>
              <option value="Education">{t.formCategoryEdu}</option>
              <option value="Health">{t.formCategoryHealth}</option>
            </select>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.explorerSearchPlaceholder}
              className="w-full bg-surface-container dark:bg-zinc-800 border-none text-on-surface dark:text-zinc-200 rounded-xl pl-4 pr-10 py-2.5 text-xs focus:ring-2 focus:ring-primary outline-none transition-all"
            />
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant dark:text-zinc-450 text-lg font-bold">
              search
            </span>
          </div>
        </div>

        {/* Suggestions Table - Desktop */}
        <div className="hidden lg:block bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-outline-variant/30 dark:border-zinc-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container dark:bg-zinc-850 text-on-surface dark:text-zinc-300 font-label-bold text-xs uppercase tracking-wider border-b border-outline-variant/30">
                <th className="py-4 px-6 font-bold">{t.tblId}</th>
                <th className="py-4 px-6 font-bold">{t.tblTitle}</th>
                <th className="py-4 px-6 font-bold">{t.tblVillage}</th>
                <th className="py-4 px-6 font-bold">{t.tblCategory}</th>
                <th className="py-4 px-6 font-bold">{t.tblStatus}</th>
                <th className="py-4 px-6 font-bold text-center">{t.tblUpvotes}</th>
                <th className="py-4 px-6 font-bold text-center">{t.tblAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 dark:divide-zinc-800 text-sm">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-container/20 dark:hover:bg-zinc-850/20 transition-colors">
                    {/* Tracking ID */}
                    <td className="py-4 px-6 font-semibold font-mono text-primary dark:text-primary-container text-xs">
                      {s.id}
                    </td>

                    {/* Proposal description */}
                    <td className="py-4 px-6 max-w-sm space-y-1">
                      <div className="font-semibold text-on-surface dark:text-zinc-200">
                        {s.title}
                      </div>
                      <div className="text-xs text-on-surface-variant dark:text-zinc-400 line-clamp-2">
                        {s.description}
                      </div>
                      <div className="text-[10px] text-zinc-405 dark:text-zinc-500 font-medium">
                        By {s.submittedBy} • {s.date}
                      </div>
                    </td>

                    {/* Village */}
                    <td className="py-4 px-6 font-bold text-on-surface dark:text-zinc-200 text-xs">
                      {s.village}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant dark:text-zinc-300">
                        <span className="material-symbols-outlined text-sm font-semibold text-primary dark:text-primary-container">
                          {getCategoryIcon(s.category)}
                        </span>
                        <span>
                          {s.category === "Infrastructure"
                            ? t.formCategoryInfra
                            : s.category === "Water"
                            ? t.formCategoryWater
                            : s.category === "Education"
                            ? t.formCategoryEdu
                            : t.formCategoryHealth}
                        </span>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-6">
                      {getStatusBadge(s.status)}
                    </td>

                    {/* Upvote Count */}
                    <td className="py-4 px-6 text-center font-bold text-base text-primary dark:text-primary-container">
                      {s.upvotes}
                    </td>

                    {/* Action Upvote Button */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleUpvoteClick(s.id)}
                        disabled={upvotedIds[s.id]}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 focus:outline-none ${
                          upvotedIds[s.id]
                            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-default"
                            : "bg-primary-container text-on-primary-container hover:bg-primary hover:text-white dark:hover:bg-primary-container/85 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: ` 'FILL' ${upvotedIds[s.id] ? 1 : 0} ` }}>
                          thumb_up
                        </span>
                        <span>{upvotedIds[s.id] ? t.btnUpvoted : t.btnUpvote}</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-on-surface-variant dark:text-zinc-500 font-semibold">
                    {language === "en" ? "No suggestions found matching the filter." : "శోధనకు సరిపోయే ప్రతిపాదనలు లేవు."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Layout (Cards stacked) */}
        <div className="lg:hidden space-y-4">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-outline-variant/30 dark:border-zinc-800 space-y-4 text-left"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold font-mono text-primary dark:text-primary-container bg-primary-container/10 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    {s.id}
                  </span>
                  {getStatusBadge(s.status)}
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-on-surface dark:text-zinc-200 text-sm md:text-base leading-tight">
                    {s.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant dark:text-zinc-400 line-clamp-3">
                    {s.description}
                  </p>
                  <div className="text-[10px] text-zinc-405 dark:text-zinc-500 font-medium">
                    By {s.submittedBy} • {s.date}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-outline-variant/20 dark:border-zinc-800">
                  <div className="space-y-1">
                    <div className="text-[10px] text-on-surface-variant dark:text-zinc-450 uppercase font-semibold">
                      Village & Category
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-on-surface dark:text-zinc-250">
                      <span>{s.village}</span>
                      <span className="w-1 h-1 bg-zinc-400 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs font-semibold text-primary dark:text-primary-container">
                          {getCategoryIcon(s.category)}
                        </span>
                        <span className="font-normal text-[10px] md:text-xs">
                          {s.category === "Infrastructure"
                            ? t.formCategoryInfra
                            : s.category === "Water"
                            ? t.formCategoryWater
                            : s.category === "Education"
                            ? t.formCategoryEdu
                            : t.formCategoryHealth}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] text-on-surface-variant dark:text-zinc-450 uppercase font-semibold">
                        {t.tblUpvotes}
                      </div>
                      <div className="text-sm font-black text-primary dark:text-primary-container">
                        {s.upvotes}
                      </div>
                    </div>

                    <button
                      onClick={() => handleUpvoteClick(s.id)}
                      disabled={upvotedIds[s.id]}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold focus:outline-none transition-all ${
                        upvotedIds[s.id]
                          ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-550 cursor-default"
                          : "bg-primary-container text-on-primary-container hover:bg-primary hover:text-white"
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs font-bold" style={{ fontVariationSettings: ` 'FILL' ${upvotedIds[s.id] ? 1 : 0} ` }}>
                        thumb_up
                      </span>
                      <span>{upvotedIds[s.id] ? t.btnUpvoted : t.btnUpvote}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-outline-variant/30 dark:border-zinc-800 text-on-surface-variant dark:text-zinc-500 font-semibold">
              {language === "en" ? "No suggestions found matching the filter." : "శోధనకు సరిపోయే ప్రతిపాదనలు లేవు."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default SuggestionsExplorer;
