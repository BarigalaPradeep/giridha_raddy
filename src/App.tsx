import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { type Language } from "./data/translations";
import { initialSuggestions, type CitizenSuggestion } from "./data/suggestions";

function App() {
  // Localization state
  const [language, setLanguage] = useState<Language>("en");

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
      <AppRoutes 
        activeTab={activeTab}
        language={language}
        suggestions={suggestions}
        onAddSuggestion={handleAddSuggestion}
        onUpvote={handleUpvote}
        setActiveTab={setActiveTab}
      />

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}

export default App;
