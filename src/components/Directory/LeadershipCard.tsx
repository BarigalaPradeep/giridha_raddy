import React from "react";
import type { Leader } from "../../data/representatives";
import { type Language, translations } from "../../data/translations";

interface LeadershipCardProps {
  leader: Leader;
  language: Language;
}

export const LeadershipCard: React.FC<LeadershipCardProps> = ({ leader, language }) => {
  const t = translations[language];

  // Render for standard MLA/Coordinator leaders
  if (leader.image) {
    return (
      <div className="bg-surface-container-lowest dark:bg-zinc-900 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/40 border border-outline-variant/20 dark:border-zinc-800 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start text-left">
        <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 border border-outline-variant/30">
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            alt={leader.name}
            src={leader.image}
          />
        </div>
        <div className="flex-grow space-y-1">
          <h4 className="font-headline-md text-lg md:text-xl font-bold text-on-surface dark:text-zinc-100">
            {leader.name}
          </h4>
          <p className="text-primary dark:text-primary-container font-semibold text-sm">
            {leader.role === "MLA, Nellore Rural" ? "MLA, Nellore Rural" : t.dirChiefCoordinator}
          </p>
          <div className="space-y-3 pt-3">
            {leader.email && (
              <a
                href={`mailto:${leader.email}`}
                className="flex items-center gap-2 text-on-surface-variant dark:text-zinc-400 hover:text-primary dark:hover:text-primary-container text-xs transition-colors"
              >
                <span className="material-symbols-outlined text-sm font-semibold">mail</span>
                <span className="truncate">{leader.email}</span>
              </a>
            )}
            {leader.whatsapp && (
              <a
                href={leader.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#075E54] dark:bg-[#25D366]/20 dark:text-[#25D366] rounded-full text-xs font-bold hover:bg-[#25D366]/20 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-sm block">chat</span>
                <span>{t.dirWhatsAppRep}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render for Office Support
  return (
    <div className="bg-surface-container-lowest dark:bg-zinc-900 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/40 border border-outline-variant/20 dark:border-zinc-800 transition-all duration-300 flex gap-6 items-start text-left">
      <div className="w-12 h-12 rounded-xl bg-primary-container/20 dark:bg-primary-container/10 flex items-center justify-center text-primary dark:text-primary-container flex-shrink-0 border border-primary/20">
        <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
          {leader.icon || "business_center"}
        </span>
      </div>
      <div className="space-y-1">
        <h4 className="font-headline-md text-lg md:text-xl font-bold text-on-surface dark:text-zinc-100">
          {leader.name === "Central Office" ? t.dirGrievanceCell : leader.name}
        </h4>
        <p className="text-on-surface-variant dark:text-zinc-400 font-semibold text-xs uppercase tracking-wider pb-2">
          {t.dirGrievanceCell}
        </p>
        <p className="text-xs text-on-surface-variant dark:text-zinc-400 leading-relaxed pb-3">
          {t.dirOpenHours}
        </p>
        <div className="flex gap-2">
          {leader.actions?.map((act, idx) => (
            <a
              key={idx}
              href={act.action}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-outline-variant dark:border-zinc-700 rounded-full text-[10px] font-bold text-on-surface dark:text-zinc-300 hover:bg-surface-container dark:hover:bg-zinc-800 transition-all duration-200"
            >
              {act.label === "Call Office" ? t.btnCallOffice : t.btnDirections}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
