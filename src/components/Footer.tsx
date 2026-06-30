import React from "react";
import { type Language, translations } from "../data/translations";

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="bg-surface-container-lowest dark:bg-zinc-950 border-t border-outline-variant/50 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-12 flex flex-col md:flex-row justify-between gap-8 text-left">
        {/* Brand Information */}
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined scale-75 font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                pedal_bike
              </span>
            </div>
            <span className="font-headline-md text-lg md:text-xl font-extrabold text-on-surface dark:text-zinc-100">
              {t.brandTitle}
            </span>
          </div>
          <p className="font-body-md text-sm text-on-secondary-container dark:text-zinc-400 leading-relaxed">
            {t.footerInitiative}
          </p>
          <p className="font-label-bold text-[10px] md:text-xs text-on-surface-variant dark:text-zinc-500 font-medium">
            {t.footerCopyright}
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-12 sm:gap-16">
          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="font-semibold text-primary dark:text-primary-container text-sm tracking-wider uppercase">
              {t.footerLinks}
            </h5>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <a
                  className="text-on-secondary-container dark:text-zinc-400 hover:text-primary dark:hover:text-primary-container transition-all"
                  href="#directory"
                >
                  {language === "en" ? "Village Map" : "గ్రామ పటం"}
                </a>
              </li>
              <li>
                <a
                  className="text-on-secondary-container dark:text-zinc-400 hover:text-primary dark:hover:text-primary-container transition-all"
                  href="#proposals-board"
                >
                  {language === "en" ? "Works Progress" : "పనుల పురోగతి"}
                </a>
              </li>
              <li>
                <a
                  className="text-on-secondary-container dark:text-zinc-400 hover:text-primary dark:hover:text-primary-container transition-all"
                  href="#suggest-form"
                >
                  {language === "en" ? "Citizen Portal" : "సిటిజన్ పోర్టల్"}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h5 className="font-semibold text-primary dark:text-primary-container text-sm tracking-wider uppercase">
              {t.footerSupport}
            </h5>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <a
                  className="text-on-secondary-container dark:text-zinc-400 hover:text-primary dark:hover:text-primary-container transition-all"
                  href="#"
                >
                  {language === "en" ? "Emergency Contacts" : "అత్యవసర పరిచయాలు"}
                </a>
              </li>
              <li>
                <a
                  className="text-on-secondary-container dark:text-zinc-400 hover:text-primary dark:hover:text-primary-container transition-all"
                  href="#"
                >
                  {language === "en" ? "Privacy Policy" : "గోప్యతా విధానం"}
                </a>
              </li>
              <li>
                <a
                  className="text-on-secondary-container dark:text-zinc-400 hover:text-primary dark:hover:text-primary-container transition-all"
                  href="#"
                >
                  {language === "en" ? "Feedback Portal" : "ఫీడ్‌బ్యాక్ పోర్టల్"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
