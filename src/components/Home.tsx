import React, { useState } from "react";
import { type Language, translations } from "../data/translations";

interface HomeProps {
  language: Language;
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ language, setActiveTab }) => {
  const t = translations[language];
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Leader image definitions
  const leadersList = {
    cbn: {
      name: language === "en" ? "Sri Nara Chandrababu Naidu" : "శ్రీ నారా చంద్రబాబు నాయుడు",
      role: language === "en" ? "Hon'ble Chief Minister" : "గౌరవ ముఖ్యమంత్రి",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/10/Nara_Chandrababu_Naidu-1.jpg"
    },
    pk: {
      name: language === "en" ? "Sri Pawan Kalyan" : "శ్రీ పవన్ కళ్యాణ్",
      role: language === "en" ? "Hon'ble Deputy Chief Minister" : "గౌరవ ఉప ముఖ్యమంత్రి",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/The_portrait_of_Pawan_Kalyan_%282024%29.jpg"
    },
    lokesh: {
      name: language === "en" ? "Sri Nara Lokesh" : "శ్రీ నారా లోకేష్",
      role: language === "en" ? "Hon'ble IT, HRD & RD Minister" : "గౌరవ ఐటీ, మానవ వనరుల & గ్రామీణాభివృద్ధి శాఖ మంత్రి",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Nara_Lokesh_at_public_meet_%28cropped%29.jpg"
    },
    sreedhar: {
      name: language === "en" ? "Kotamreddy Sreedhar Reddy" : "కోటంరెడ్డి శ్రీధర్ రెడ్డి",
      role: language === "en" ? "MLA, Nellore Rural" : "ఎమ్మెల్యే, నెల్లూరు రూరల్",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnWkWYfRZe3l-wOkwde1IrC_eA-pC1b5XXmpLFKW8-T23Ic-j_cwODO_AXcqJd0IMx17u0GRD75Qh3JHqgAYwWlA0-KpjHcmYV6csRq8iwCYXJKhnBQROXAXLO5xcZdk1pYA_WMaCdZvsjBvvGVQHkP3HYR5b4XGEd8J9VdYIBcINacO30MyCHclPRA7XXuml5TldNr8RR8Zu4OMKbFliI52l6QHCw26KMXlwUis-OK6YAYBmfSX4W1SkgiH9MrV0fKkX0ECJnBvMd"
    },
    giridhar: {
      name: language === "en" ? "Kotamreddy Giridhar Reddy" : "కోటంరెడ్డి గిరిధర్ రెడ్డి",
      role: language === "en" ? "MLA, Nellore Rural" : "ఎమ్మెల్యే, నెల్లూరు రూరల్", // Matches image label
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuMPnOGSvySwt02iE-bqtJu4UjYoMTfXEkGRvQ9i5_-AhfC21m3Yafr0z8l5ppLHCHZxcsi86_QW1OpQdRei0FkVdWTMQZRvVpFlko_EKQ3CD5_qUGIBSiPbkrvZKekVwGWmk95pnMy7srPr8j7PUxq5YNJxX1c4YTpeMLWvJhbflK8ldp37pEiv66aM_4AgEfM7bpAgdl4wTpdzcwNLRqoV6iUOTeAEtAxN8h5o3cZxjcWRzI6O-BW7dc5FI3LMkW0zBKY1xwnE7f"
    }
  };

  return (
    <main className="flex-grow w-full relative">
      {/* Hero background Section with responsive layout */}
      <section 
        className="w-full relative min-h-[90vh] lg:min-h-[85vh] bg-cover bg-center flex flex-col justify-between py-12 md:py-16 px-6 md:px-margin-desktop overflow-hidden border-b border-outline-variant/30"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`
        }}
      >
        {/* Soft Golden Sunset-Tinted Backdrop overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/95 via-amber-50/70 to-transparent dark:from-zinc-950/95 dark:via-zinc-950/75 dark:to-transparent/10 -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfaf6] via-transparent to-[#fcfaf6]/50 dark:from-zinc-950 dark:via-transparent dark:to-zinc-950/20 -z-10"></div>

        {/* Top/Middle content area */}
        <div className="max-w-container-max w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-grow">
          
          {/* Left Text / Info Panel */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8">
            
            {/* Partnership Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 dark:bg-primary-container/20 dark:border-primary-container/30 text-primary dark:text-primary-container font-label-bold text-xs md:text-sm font-semibold tracking-wide shadow-sm animate-fade-in">
              <span className="material-symbols-outlined text-sm font-bold text-amber-600 dark:text-amber-400">
                diversity_1
              </span>
              <span>{t.homeTogetherPill}</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-55 text-shadow-white">
                {t.homeTitleStronger}
                <br />
                <span className="text-[#e2a200] dark:text-[#f5b81a]">{t.homeTitleBetter}</span>
              </h1>
              <p className="font-body-lg text-base md:text-lg text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed">
                {t.homeSubtitle}
              </p>
            </div>

            {/* Icon Bullets side-by-side */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-amber-500/20 flex items-center justify-center text-[#b88300] dark:text-[#f5b81a] shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">groups</span>
                </div>
                <span className="font-semibold text-xs md:text-sm text-zinc-800 dark:text-zinc-200 leading-snug text-shadow-white">{t.homeBullet1}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-amber-500/20 flex items-center justify-center text-[#b88300] dark:text-[#f5b81a] shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">verified_user</span>
                </div>
                <span className="font-semibold text-xs md:text-sm text-zinc-800 dark:text-zinc-200 leading-snug text-shadow-white">{t.homeBullet2}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-amber-500/20 flex items-center justify-center text-[#b88300] dark:text-[#f5b81a] shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">trending_up</span>
                </div>
                <span className="font-semibold text-xs md:text-sm text-zinc-800 dark:text-zinc-200 leading-snug text-shadow-white">{t.homeBullet3}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-amber-500/20 flex items-center justify-center text-[#b88300] dark:text-[#f5b81a] shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">eco</span>
                </div>
                <span className="font-semibold text-xs md:text-sm text-zinc-800 dark:text-zinc-200 leading-snug text-shadow-white">{t.homeBullet4}</span>
              </div>
            </div>

            {/* Buttons Group */}
            <div className="flex flex-wrap gap-4 pt-4 w-full">
              <button
                onClick={() => setActiveTab("devmap")}
                className="bg-[#f5b81a] hover:bg-[#e2a200] text-zinc-955 px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer border border-amber-400"
              >
                <span className="material-symbols-outlined text-xl font-bold">location_on</span>
                <span>{t.btnExploreVillage}</span>
              </button>
              <button
                onClick={() => setActiveTab("leaders")}
                className="bg-white hover:bg-zinc-50 dark:bg-zinc-805 dark:hover:bg-zinc-700/80 text-zinc-900 dark:text-zinc-150 px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-sm border border-zinc-300 dark:border-zinc-700 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">list_alt</span>
                <span>{t.btnViewWorks}</span>
              </button>
            </div>

            {/* Video Play Trigger (Under buttons) */}
            <div className="pt-2">
              <button
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
              >
                <div className="w-11 h-11 bg-white dark:bg-zinc-800 text-amber-500 dark:text-amber-400 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 active:scale-90 transition-all duration-350 border border-amber-500/25">
                  <span className="material-symbols-outlined font-bold text-xl block" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm tracking-wide group-hover:underline">
                  {t.btnWatchJourney}
                </span>
              </button>
            </div>

          </div>

          {/* Right Leaders Gratitude Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end animate-fade-in-right">
            <div className="w-full max-w-lg glass-card dark:bg-zinc-900/90 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 border border-white/60 dark:border-zinc-800 flex flex-col space-y-6 relative overflow-hidden backdrop-blur-xl">
              
              {/* Gratitude Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 w-full justify-between">
                  <div className="h-px bg-amber-500/20 flex-grow"></div>
                  <span className="font-sans text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest px-3 text-center leading-none">
                    {t.leadershipCardGratitude}
                  </span>
                  <div className="h-px bg-amber-500/20 flex-grow"></div>
                </div>

                {/* NDA Leaders Portraits Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[leadersList.cbn, leadersList.pk, leadersList.lokesh].map((leader, i) => (
                    <div key={i} className="flex flex-col items-center text-center space-y-2 group">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-amber-500/10 dark:border-zinc-800 shadow-md group-hover:border-amber-500 transition-all duration-300">
                        <img 
                          src={leader.image} 
                          alt={leader.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-headline-md text-[10px] sm:text-xs font-black text-zinc-900 dark:text-zinc-100 leading-snug text-shadow-white">
                          {leader.name}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                          {leader.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Leadership Section */}
              <div className="space-y-4 pt-1 border-t border-zinc-200/50 dark:border-zinc-800">
                <div className="flex items-center gap-2 w-full justify-between">
                  <div className="h-px bg-amber-500/20 flex-grow"></div>
                  <span className="font-sans text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest px-3 text-center leading-none">
                    {t.leadershipCardNellore}
                  </span>
                  <div className="h-px bg-amber-500/20 flex-grow"></div>
                </div>

                {/* Local Leaders portraits (Sreedhar & Giridhar Reddy) */}
                <div className="grid grid-cols-2 gap-4 justify-center px-4 pt-1">
                  {[leadersList.sreedhar, leadersList.giridhar].map((leader, i) => (
                    <div key={i} className="flex items-center gap-3 text-left group">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-amber-500/10 dark:border-zinc-800 shadow-sm group-hover:border-amber-500 transition-all duration-300 flex-shrink-0">
                        <img 
                          src={leader.image} 
                          alt={leader.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-headline-md text-[11px] sm:text-xs font-black text-zinc-900 dark:text-zinc-100 leading-snug text-shadow-white">
                          {leader.name}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                          {leader.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Capsule Banner */}
              <div className="bg-[#f5b81a]/10 dark:bg-amber-400/5 border border-[#f5b81a]/20 dark:border-amber-400/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3.5 text-left relative overflow-hidden">
                <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-3xl font-bold select-none opacity-40">
                  format_quote
                </span>
                <p className="text-[11px] sm:text-xs font-bold text-amber-900 dark:text-amber-300 italic leading-normal z-10">
                  "{t.leadershipQuote}"
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom statistics panel - spans full grid at bottom */}
        <div className="max-w-container-max w-full mx-auto pt-12 md:pt-16 animate-fade-in-up">
          <div className="bg-[#fcfaf6] dark:bg-zinc-900 rounded-[2rem] shadow-md border border-zinc-200/40 dark:border-zinc-800 p-6 md:p-8 w-full backdrop-blur-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 lg:divide-x lg:divide-zinc-200/50 dark:lg:divide-zinc-800/50">
              
              {/* Stat 1: Allocation */}
              <div className="flex items-center lg:justify-center gap-4 text-left lg:px-4">
                <div className="w-12 h-12 rounded-full bg-[#f5b81a] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5z" />
                    <path d="M4 17v-1a8 8 0 1 1 16 0v1a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                    <line x1="12" x2="12" y1="11.5" y2="18.5" />
                    <path d="M14 13h-3.5a1.25 1.25 0 0 0 0 2.5h3a1.25 1.25 0 0 1 0 2.5h-3.5" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 block leading-tight">
                    {t.statAllocationTitle}
                  </span>
                  <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                    {t.statAllocationValue}
                  </div>
                  <span className="text-[10px] md:text-[11px] text-zinc-500 dark:text-zinc-400 font-medium block">
                    {t.statAllocationDesc}
                  </span>
                </div>
              </div>

              {/* Stat 2: Total Works */}
              <div className="flex items-center lg:justify-center gap-4 text-left lg:px-4">
                <div className="w-12 h-12 rounded-full bg-[#f5b81a] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 21h12" />
                    <path d="M9 21v-18l-6 6h18" />
                    <path d="M9 3l10 6" />
                    <path d="M17 9v4a2 2 0 1 1 -2 2" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 block leading-tight">
                    {t.statWorksTitle}
                  </span>
                  <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                    {t.statWorksValue}
                  </div>
                  <span className="text-[10px] md:text-[11px] text-zinc-500 dark:text-zinc-400 font-medium block">
                    {t.statWorksDesc}
                  </span>
                </div>
              </div>

              {/* Stat 3: Completed Works */}
              <div className="flex items-center lg:justify-center gap-4 text-left lg:px-4">
                <div className="w-12 h-12 rounded-full bg-[#3d700e] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold text-white">check</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 block leading-tight">
                    {t.statCompletedTitle}
                  </span>
                  <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                    {t.statCompletedValue}
                  </div>
                  <span className="text-[10px] md:text-[11px] text-zinc-500 dark:text-zinc-400 font-medium block">
                    {t.statCompletedDesc}
                  </span>
                </div>
              </div>

              {/* Stat 4: Ongoing Works */}
              <div className="flex items-center lg:justify-center gap-4 text-left lg:px-4">
                <div className="w-12 h-12 rounded-full bg-[#f5b81a] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold text-white">settings</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 block leading-tight">
                    {t.statOngoingTitle}
                  </span>
                  <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                    {t.statOngoingValue}
                  </div>
                  <span className="text-[10px] md:text-[11px] text-zinc-500 dark:text-zinc-400 font-medium block">
                    {t.statOngoingDesc}
                  </span>
                </div>
              </div>

              {/* Stat 5: Upcoming Works */}
              <div className="flex items-center lg:justify-center gap-4 text-left lg:px-4">
                <div className="w-12 h-12 rounded-full bg-[#f5b81a] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold text-white">calendar_month</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 block leading-tight">
                    {t.statUpcomingTitle}
                  </span>
                  <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                    {t.statUpcomingValue}
                  </div>
                  <span className="text-[10px] md:text-[11px] text-zinc-500 dark:text-zinc-400 font-medium block">
                    {t.statUpcomingDesc}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Video Modal (Popup) */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[100] p-4 transition-all duration-300">
          <div className="relative bg-zinc-900 w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl animate-scale-up">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2.5 hover:bg-black transition-all z-10 flex items-center justify-center focus:outline-none"
            >
              <span className="material-symbols-outlined text-lg block">close</span>
            </button>

            {/* Video player embed details (mocked with an iframe / image visualizer or custom video) */}
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-zinc-300 bg-cover bg-center relative"
                 style={{
                   backgroundImage: `linear-gradient(rgba(24, 24, 27, 0.9), rgba(24, 24, 27, 0.9)), url('/hero-bg.jpg')`
                 }}>
              <span className="material-symbols-outlined text-6xl text-amber-500 mb-4 animate-bounce">
                movie
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-zinc-100 mb-2">
                {language === "en" ? "Nellore Rural Development Journey" : "నెల్లూరు రూరల్ అభివృద్ధి ప్రస్థానం"}
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 max-w-md leading-relaxed">
                {language === "en" 
                  ? "This presentation showcases the completed road improvements, clean water RO plants, and education setups funded by the NRDA Citizen Connectivity Scheme."
                  : "ఈ ప్రెజెంటేషన్ NRDA సిటిజన్ కనెక్టివిటీ స్కీమ్ ద్వారా నిధులు సమకూర్చబడిన రోడ్డు మెరుగుదలలు, స్వచ్ఛమైన నీటి RO ప్లాంట్లు మరియు విద్యా వ్యవస్థలను ప్రదర్శిస్తుంది."}
              </p>
              <button
                onClick={() => setShowVideoModal(false)}
                className="mt-6 px-6 py-2.5 bg-[#f5b81a] hover:bg-[#e2a200] text-zinc-950 font-bold rounded-xl transition-all text-xs md:text-sm shadow-md cursor-pointer"
              >
                {language === "en" ? "Close presentation" : "ప్రదర్శనను మూసివేయండి"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
