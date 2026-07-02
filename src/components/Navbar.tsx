import React, { useState } from "react";
import { type Language, translations } from "../data/translations";

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  activeTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  // Helper function to render nav links with dynamic active styling
  const renderNavLink = (tabId: string, label: string) => {
    const isActive = activeTab === tabId;

    if (tabId === "home") {
      // Home button styling with yellow background and black text on active
      return (
        <a
          href="#home"
          className={`font-semibold text-sm transition-all py-1.5 px-3.5 rounded-xl cursor-pointer flex items-center justify-center ${isActive
            ? "bg-[#f5b81a] text-zinc-950 font-bold shadow-sm"
            : "text-zinc-700 dark:text-zinc-300 hover:text-[#f5b81a] dark:hover:text-primary-container hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
        >
          <span>{label}</span>
        </a>
      );
    }

    return (
      <a
        href={`#${tabId}`}
        className={`font-semibold text-sm transition-all py-1.5 px-3.5 rounded-xl cursor-pointer flex items-center justify-center ${isActive
          ? "bg-[#f5b81a] text-zinc-950 font-bold shadow-sm"
          : "text-zinc-755 dark:text-zinc-355 hover:text-[#f5b81a] dark:hover:text-primary-container hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
      >
        {label}
      </a>
    );
  };

  return (
    <header className="bg-white dark:bg-zinc-900/95 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50 transition-colors duration-300 shadow-sm">
      <div className="max-w-container-max mx-auto flex items-center justify-between px-4 md:px-margin-desktop py-3.5">

        {/* Left Side: Brand Logo and Title */}
        <a
          href="#leaders"
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          {/* Circular logo badge matching screen */}
          <div className="w-12 h-12 rounded-full bg-[#f5b81a] flex items-center justify-center border-2 border-amber-400 shadow-sm relative group overflow-hidden">
            <span className="material-symbols-outlined text-zinc-950 text-2xl font-bold animate-pulse">
              <img src="/tdplogo.png" alt="" />
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-sans text-lg font-extrabold tracking-wide text-zinc-950 dark:text-zinc-100 leading-tight">
              {t.brandTitle}
            </span>
            <span className="font-sans text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
              {language === "en" ? "Mana Abhivruddhi" : "మన అభివృద్ధి"}
            </span>
          </div>
        </a>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-2 text-zinc-850 dark:text-zinc-200">
          {renderNavLink("home", t.navHome)}
          {renderNavLink("devmap", t.navDevMap)}
          {renderNavLink("voice", t.navVoice)}
          {renderNavLink("leaders", t.navLeaders)}
          {renderNavLink("gallery", t.navGallery)}
          {renderNavLink("about", t.navAbout)}
          {renderNavLink("contact", t.navContact)}
        </nav>

        {/* Right Side: Controls and Actions */}
        <div className="flex items-center gap-3">
          {/* Language Selector Capsule Dropdown */}
          <button
            onClick={() => setLanguage(language === "en" ? "te" : "en")}
            className="flex items-center gap-1.5 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs font-semibold bg-white/50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-sm hover:bg-white dark:hover:bg-zinc-750 transition-all duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm font-bold">language</span>
            <span>{language === "en" ? "English" : "తెలుగు"}</span>
            <span className="material-symbols-outlined text-sm font-bold">keyboard_arrow_down</span>
          </button>

          {/* Minimalist Mobile Menu Toggle Button (Outline design) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-705 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-xl font-bold select-none block">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Toggled by hamburger) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-outline-variant/20 bg-[#fcfaf6] dark:bg-zinc-900 px-6 py-4 space-y-2.5 transition-all text-left shadow-inner flex flex-col">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-semibold text-sm py-2 hover:text-[#f5b81a] ${activeTab === "home" ? "text-[#f5b81a] font-bold" : "text-zinc-700 dark:text-zinc-300"
              }`}
          >
            {t.navHome}
          </a>
          <a
            href="#devmap"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-semibold text-sm py-2 hover:text-[#f5b81a] ${activeTab === "devmap" ? "text-[#f5b81a] font-bold" : "text-zinc-700 dark:text-zinc-300"
              }`}
          >
            {t.navDevMap}
          </a>
          <a
            href="#voice"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-semibold text-sm py-2 hover:text-[#f5b81a] ${activeTab === "voice" ? "text-[#f5b81a] font-bold" : "text-zinc-700 dark:text-zinc-300"
              }`}
          >
            {t.navVoice}
          </a>
          <a
            href="#leaders"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-semibold text-sm py-2 hover:text-[#f5b81a] ${activeTab === "leaders" ? "text-[#f5b81a] font-bold" : "text-zinc-700 dark:text-zinc-300"
              }`}
          >
            {t.navLeaders}
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-semibold text-sm py-2 hover:text-[#f5b81a] ${activeTab === "gallery" ? "text-[#f5b81a] font-bold" : "text-zinc-700 dark:text-zinc-300"
              }`}
          >
            {t.navGallery}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-semibold text-sm py-2 hover:text-[#f5b81a] ${activeTab === "about" ? "text-[#f5b81a] font-bold" : "text-zinc-700 dark:text-zinc-300"
              }`}
          >
            {t.navAbout}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-semibold text-sm py-2 hover:text-[#f5b81a] ${activeTab === "contact" ? "text-[#f5b81a] font-bold" : "text-zinc-700 dark:text-zinc-300"
              }`}
          >
            {t.navContact}
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
