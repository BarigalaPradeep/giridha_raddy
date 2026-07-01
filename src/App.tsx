import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DirectorySection from "./components/Directory/DirectorySection";
import SuggestionForm from "./components/Suggestion/SuggestionForm";
import SuggestionsExplorer from "./components/Suggestion/SuggestionsExplorer";
import Footer from "./components/Footer";
import DevMap from "./components/Map/DevMap";
import { type Language, translations } from "./data/translations";
import { initialSuggestions, type CitizenSuggestion } from "./data/suggestions";

function App() {
  // Localization state
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  // Active routing tab state (default: leaders directory)
  const [activeTab, setActiveTab] = useState<string>("leaders");

  // Sync state with URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#" || hash === "#home") {
        setActiveTab("home");
      } else if (hash === "#devmap") {
        setActiveTab("devmap");
      } else if (hash === "#voice") {
        setActiveTab("voice");
      } else if (hash === "#leaders") {
        setActiveTab("leaders");
      } else if (hash === "#gallery") {
        setActiveTab("gallery");
      } else if (hash === "#about") {
        setActiveTab("about");
      } else if (hash === "#contact") {
        setActiveTab("contact");
      }
    };

    // Run on initial load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Suggestions state
  const [suggestions, setSuggestions] = useState<CitizenSuggestion[]>(initialSuggestions);

  // Handler to add a suggestion
  const handleAddSuggestion = (newSuggestion: CitizenSuggestion) => {
    setSuggestions((prev) => [newSuggestion, ...prev]);
  };

  // Handler to upvote a suggestion
  const handleUpvote = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, upvotes: s.upvotes + 1 } : s))
    );
  };

  return (
    <div className="bg-background text-on-surface dark:bg-zinc-950 dark:text-zinc-150 min-h-screen flex flex-col font-body-md transition-colors duration-300">
      {/* Header / Navbar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
      />

      {/* Main Content Area */}
      {activeTab === "leaders" ? (
        <main className="flex-grow relative">
          {/* Hero Landing */}
          <Hero language={language} suggestionsCount={suggestions.length} />

          {/* Leadership Directory & Village Reps Searcher */}
          <DirectorySection language={language} />

          {/* Suggestion Form Section */}
          <section className="py-12 md:py-stack-lg max-w-container-max mx-auto px-6 md:px-margin-desktop transition-colors duration-300" id="suggest-form">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Left Instructions */}
              <div className="lg:w-1/3 text-left space-y-6">
                <div className="sticky top-28 space-y-6">
                  <div className="space-y-4">
                    <h2 className="font-headline-xl text-3xl md:text-4xl font-bold text-on-surface dark:text-zinc-100">
                      {t.formHeader}
                    </h2>
                    <p className="font-body-md text-sm md:text-base text-on-surface-variant dark:text-zinc-400 leading-relaxed">
                      {t.formDesc}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 dark:bg-primary-container/20 rounded-full flex items-center justify-center text-primary dark:text-primary-container font-bold flex-shrink-0 border border-primary/20">
                        1
                      </div>
                      <div>
                        <h5 className="font-bold text-on-surface dark:text-zinc-200 text-sm md:text-base">
                          {t.formStep1Title}
                        </h5>
                        <p className="text-xs md:text-sm text-on-surface-variant dark:text-zinc-400">
                          {t.formStep1Desc}
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 dark:bg-primary-container/20 rounded-full flex items-center justify-center text-primary dark:text-primary-container font-bold flex-shrink-0 border border-primary/20">
                        2
                      </div>
                      <div>
                        <h5 className="font-bold text-on-surface dark:text-zinc-200 text-sm md:text-base">
                          {t.formStep2Title}
                        </h5>
                        <p className="text-xs md:text-sm text-on-surface-variant dark:text-zinc-400">
                          {t.formStep2Desc}
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 dark:bg-primary-container/20 rounded-full flex items-center justify-center text-primary dark:text-primary-container font-bold flex-shrink-0 border border-primary/20">
                        3
                      </div>
                      <div>
                        <h5 className="font-bold text-on-surface dark:text-zinc-200 text-sm md:text-base">
                          {t.formStep3Title}
                        </h5>
                        <p className="text-xs md:text-sm text-on-surface-variant dark:text-zinc-400">
                          {t.formStep3Desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Component */}
              <div className="lg:w-2/3">
                <SuggestionForm
                  language={language}
                  onAddSuggestion={handleAddSuggestion}
                />
              </div>
            </div>
          </section>

          {/* Proposals Board Explorer */}
          <SuggestionsExplorer
            language={language}
            suggestions={suggestions}
            onUpvote={handleUpvote}
          />
        </main>
      ) : activeTab === "devmap" ? (
        <DevMap language={language} />
      ) : (
        /* Premium 404 Page Not Found Screen */
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
      )}

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}

export default App;
