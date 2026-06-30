import React from "react";
import { mlaLeader, coordinatorLeader, officeSupport, taskForceMembers } from "../../data/representatives";
import { LeadershipCard } from "./LeadershipCard";
import { TaskForceCard } from "./TaskForceCard";
import { VillageSearcher } from "./VillageSearcher";
import { type Language, translations } from "../../data/translations";

interface DirectorySectionProps {
  language: Language;
}

export const DirectorySection: React.FC<DirectorySectionProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section className="bg-surface-container-low dark:bg-zinc-950/40 py-12 md:py-stack-lg border-y border-outline-variant/30 dark:border-zinc-800 transition-all duration-300" id="directory">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-headline-xl text-3xl md:text-headline-xl font-bold text-on-surface dark:text-zinc-100">
            {t.dirHeader}
          </h2>
          <p className="font-body-md text-sm md:text-body-md text-on-surface-variant dark:text-zinc-400">
            {t.dirDesc}
          </p>
        </div>

        {/* Section 1: MLA, Chief Coordinator & Central Office */}
        <div className="space-y-6">
          <h3 className="font-label-bold text-primary dark:text-primary-container text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-center">
            {t.dirMlaOffice}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <LeadershipCard leader={mlaLeader} language={language} />
            <LeadershipCard leader={coordinatorLeader} language={language} />
            <LeadershipCard leader={officeSupport} language={language} />
          </div>
        </div>

        {/* Section 2: Task Force Specialist Cards */}
        <div className="space-y-6">
          <h3 className="font-label-bold text-primary dark:text-primary-container text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-left">
            {t.dirTaskForce}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {taskForceMembers.map((m, idx) => (
              <TaskForceCard key={idx} member={m} language={language} />
            ))}
          </div>
        </div>

        {/* Section 3: Village Sarpanches Searcher */}
        <VillageSearcher language={language} />
      </div>
    </section>
  );
};

export default DirectorySection;
