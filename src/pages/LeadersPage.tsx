import React from "react";
import Hero from "../components/Hero";
import DirectorySection from "../components/Directory/DirectorySection";
import SuggestionForm from "../components/Suggestion/SuggestionForm";
import SuggestionsExplorer from "../components/Suggestion/SuggestionsExplorer";
import { type Language, translations } from "../data/translations";
import { type CitizenSuggestion } from "../data/suggestions";

interface LeadersPageProps {
  language: Language;
  suggestions: CitizenSuggestion[];
  onAddSuggestion: (newSuggestion: CitizenSuggestion) => void;
  onUpvote: (id: string) => void;
}

const LeadersPage: React.FC<LeadersPageProps> = ({
  language,
  suggestions,
  onAddSuggestion,
  onUpvote,
}) => {
  const t = translations[language];

  return (
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
              onAddSuggestion={onAddSuggestion}
            />
          </div>
        </div>
      </section>

      {/* Proposals Board Explorer */}
      <SuggestionsExplorer
        language={language}
        suggestions={suggestions}
        onUpvote={onUpvote}
      />
    </main>
  );
};

export default LeadersPage;
