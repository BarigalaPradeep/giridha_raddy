import React from "react";
import type { TaskForceMember } from "../../data/representatives";
import { type Language, translations } from "../../data/translations";

interface TaskForceCardProps {
  member: TaskForceMember;
  language: Language;
}

export const TaskForceCard: React.FC<TaskForceCardProps> = ({ member, language }) => {
  const t = translations[language];

  // Map category to localized labels
  const categoryLabel = () => {
    switch (member.category.toLowerCase()) {
      case "infrastructure":
        return t.formCategoryInfra;
      case "healthcare":
        return t.formCategoryHealth;
      case "education":
        return t.formCategoryEdu;
      case "agriculture":
        return language === "en" ? "Agriculture" : "వ్యవసాయం";
      default:
        return member.category;
    }
  };

  return (
    <div className="bg-white/50 dark:bg-zinc-900/50 border border-outline-variant/30 dark:border-zinc-800 p-5 rounded-xl hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md hover:border-primary/30 transition-all duration-300 text-left">
      <div className="font-label-bold text-xs text-primary dark:text-primary-container mb-1 uppercase font-bold tracking-wider">
        {categoryLabel()}
      </div>
      <h5 className="font-bold text-on-surface dark:text-zinc-100 text-base md:text-lg mb-3">
        {member.name}
      </h5>
      <a
        href={member.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="text-xs font-bold text-on-surface-variant dark:text-zinc-400 flex items-center gap-1.5 hover:text-primary dark:hover:text-primary-container transition-colors duration-200"
      >
        <span className="material-symbols-outlined text-sm text-green-600">chat</span>
        <span>{t.dirWhatsAppTeam}</span>
      </a>
    </div>
  );
};
export default TaskForceCard;
