import React from "react";
import HomePage from "../pages/HomePage";
import LeadersPage from "../pages/LeadersPage";
import NotFoundPage from "../pages/NotFoundPage";
import DevMap from "../components/Map/DevMap";
import { type Language } from "../data/translations";
import { type CitizenSuggestion } from "../data/suggestions";

interface AppRoutesProps {
  activeTab: string;
  language: Language;
  suggestions: CitizenSuggestion[];
  onAddSuggestion: (newSuggestion: CitizenSuggestion) => void;
  onUpvote: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  activeTab,
  language,
  suggestions,
  onAddSuggestion,
  onUpvote,
  setActiveTab,
}) => {
  if (activeTab === "leaders") {
    return (
      <LeadersPage
        language={language}
        suggestions={suggestions}
        onAddSuggestion={onAddSuggestion}
        onUpvote={onUpvote}
      />
    );
  }

  if (activeTab === "home") {
    return <HomePage language={language} />;
  }

  if (activeTab === "devmap") {
    return <DevMap language={language} />;
  }

  return <NotFoundPage language={language} setActiveTab={setActiveTab} />;
};

export default AppRoutes;
