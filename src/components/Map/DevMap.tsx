import React, { useState, useRef, useEffect } from "react";

interface FeedbackItem {
  name: string;
  roleEn: string;
  roleTe: string;
  commentEn: string;
  commentTe: string;
  image: string;
}

const feedbackData: FeedbackItem[] = [
  {
    name: "Venkateshwarulu R.",
    roleEn: "Village Resident for 50 Years",
    roleTe: "50 సంవత్సరాలుగా గ్రామ నివాసి",
    commentEn: "The new RO plant has changed our lives. My children don't get sick as often, and the water tastes like fresh rain. Truly a blessing for our village.",
    commentTe: "కొత్త RO ప్లాంట్ మా జీవితాలను మార్చింది. నా పిల్లలు తరచుగా అనారోగ్యానికి గురికావడం లేదు, మరియు నీరు తాజా వర్షం లాగా రుచిగా ఉంటుంది. నిజంగా మా గ్రామానికి ఒక వరం.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJPE5Dkn71KvQkVBcFla4wFWslpyYQFrrD1EQWU1jwpGAMb3YB7ZmOwd2kq3lkX_1TH9Ikc-8nDXM3yuNlM06HSH8HjoWFCMUwhHVcBajr5ro05P8CvJfs-xllkEA4TkIDswAqmsmoOz4_fYo8eao5KOG87NvzVLd3_7Ozila10qwFkLrg4Ioqvp_TVU1rvhm3TiGrBdHeMRJtbzy5_h-gPBlmmv_5wGtEYQGC39QQvJ92_NwfaYn6BIEmTb72PMY2ilXD-gcp_3yu"
  },
  {
    name: "S. Anitha Devi",
    roleEn: "School Teacher",
    roleTe: "పాఠశాల ఉపాధ్యాయురాలు",
    commentEn: "The digital library and modernization of the ZPHS School has opened so many doors for our children. They now have access to computers and online research toolkits.",
    commentTe: "డిజిటల్ లైబ్రరీ మరియు ZPHS పాఠశాల ఆధునికీకరణ మా పిల్లల కోసం ఎన్నో కొత్త తలుపులు తెరిచింది. ఇప్పుడు వారికి కంప్యూటర్లు మరియు ఆన్‌లైన్ రీసెర్చ్ టూల్‌కిట్స్ అందుబాటులో ఉన్నాయి.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "M. Koteswara Rao",
    roleEn: "Village Farmer",
    roleTe: "గ్రామ రైతు",
    commentEn: "Getting concrete roads inside the village has made it so much easier for us to transport our crops to the Nellore market, especially during monsoon season. No more mud roads!",
    commentTe: "గ్రామంలో సిమెంట్ రోడ్లు వేయడం వల్ల మా పంటలను నెల్లూరు మార్కెట్‌కు రవాణా చేయడం చాలా సులభమైంది, ముఖ్యంగా వర్షాకాలంలో. ఇక బురద రోడ్ల ఇబ్బంది లేదు!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "P. Naresh",
    roleEn: "Student / Youth Representative",
    roleTe: "విద్యార్థి / యువజన ప్రతినిధి",
    commentEn: "The smart street lighting and skill development workshops have made our streets safer at night and gave us a path to find employment. Kanuparthipadu is truly moving forward.",
    commentTe: "స్మార్ట్ స్ట్రీట్ లైటింగ్ మరియు నైపుణ్య అభివృద్ధి వర్క్‌షాప్‌లు రాత్రి వేళల్లో మా వీధులను సురక్షితంగా మార్చాయి మరియు ఉద్యోగం పొందడానికి ఒక మార్గాన్ని చూపించాయి. కనుపర్తిపాడు నిజంగా ముందుకు సాగుతోంది.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      setCount(easeProgress * target);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

interface DevMapProps {
  language: "en" | "te";
}

export const DevMap: React.FC<DevMapProps> = ({ language }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [showAllFeedback, setShowAllFeedback] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const isTe = language === "te";

  return (
    <main className="relative flex-grow">
      {/* Village Header Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="A sweeping wide-angle landscape photograph of Kanuparthipadu village in Nellore at sunrise."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP1U6FkWCDpY2TD2SxTx1WyAPWC2XEQvMepedPlX6abB7mtfN5zZUs-u7xVMriqeA3zTV69jmnH1nSeQDEJvahjdJr5zPPjGFZcpP3MmPIYHa5Ibg3qcYqzBen-ztohZCIuLOuYMVM74e7yns3C8qyKfmq6wfyAMi0-d8wf48anzBA0whP-UY2appheJ4kmze_RrxZmig9ZbMQPs-1Za0dx1mAFKhof3K4DyaxmFRInV2ATfCNPH4wJ-_e6fGp6wabLIx8tUJrPrYq"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop h-full flex flex-col justify-end pb-28">
          <nav className="flex items-center gap-2 bg-zinc-950/40 border border-white/10 px-3 py-1.5 rounded-full w-fit backdrop-blur-md text-white font-semibold text-xs mb-4">
            <span className="text-zinc-200">{isTe ? "నెల్లూరు రూరల్" : "Nellore Rural"}</span>
            <span className="material-symbols-outlined text-[14px] text-zinc-400">chevron_right</span>
            <span className="text-[#f5b81a]">{isTe ? "కనుపర్తిపాడు" : "Kanuparthipadu"}</span>
          </nav>
          <h1 className="font-display-lg text-4xl md:text-5xl lg:text-display-lg text-on-surface font-extrabold mb-2">
            {isTe ? "కనుపర్తిపాడు" : "Kanuparthipadu"}
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">
            {isTe
              ? "నెల్లూరు రూరల్ జిల్లా పరిధిలో డిజిటల్ మరియు మౌలిక సదుపాయాల మార్పుకు నాయకత్వం వహిస్తున్న ఒక ఆదర్శ గ్రామం."
              : "A model village leading the digital and infrastructural transformation in the heart of Nellore Rural district."}
          </p>
        </div>
      </section>

      {/* Village Statistics Bento Grid */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop -mt-16 relative z-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#f5b81a]/20 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800] fill-icon">payments</span>
            </div>
            <span className="text-on-surface-variant font-semibold text-sm">{isTe ? "మొత్తం కేటాయింపు" : "Total Allocation"}</span>
            <span className="font-headline-xl text-3xl font-extrabold text-[#7a5900] dark:text-[#f9b800]">
              <AnimatedCounter target={8.4} decimals={1} prefix="₹" suffix=" Cr" />
            </span>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#f5b81a]/20 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800] fill-icon">engineering</span>
            </div>
            <span className="text-on-surface-variant font-semibold text-sm">{isTe ? "క్రియాశీల ప్రాజెక్టులు" : "Active Projects"}</span>
            <span className="font-headline-xl text-3xl font-extrabold text-[#7a5900] dark:text-[#f9b800]">
              <AnimatedCounter target={24} suffix="+" />
            </span>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#f5b81a]/20 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800] fill-icon">verified</span>
            </div>
            <span className="text-on-surface-variant font-semibold text-sm">{isTe ? "పూర్తయిన పనులు" : "Completed Works"}</span>
            <span className="font-headline-xl text-3xl font-extrabold text-[#7a5900] dark:text-[#f9b800]">
              <AnimatedCounter target={42} />
            </span>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#f5b81a]/20 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800] fill-icon">group</span>
            </div>
            <span className="text-on-surface-variant font-semibold text-sm">{isTe ? "ప్రజల సంతృప్తి" : "Citizen Satisfaction"}</span>
            <span className="font-headline-xl text-3xl font-extrabold text-[#7a5900] dark:text-[#f9b800]">
              <AnimatedCounter target={94} suffix="%" />
            </span>
          </div>
        </div>
      </section>

      {/* Transformation Showcase: Before & After */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-12 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(249, 184, 0, 0.15) 0%, transparent 70%)" }}
        ></div>
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="max-w-2xl">
              <h2 className="font-headline-xl text-3xl md:text-4xl font-extrabold text-on-surface mb-2">
                {isTe ? "దృశ్య మార్పు" : "Visual Transformation"}
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base">
                {isTe
                  ? "మా ముందు మరియు తరువాత గ్యాలరీ ద్వారా కనుపర్తిపాడులో కాంక్రీట్ మార్పులను సాక్ష్యమివ్వండి. ఇవి కేవలం ఫోటోలు కావు; నిలబెట్టుకున్న వాగ్దానాలు."
                  : "Witness the concrete changes in Kanuparthipadu through our before and after gallery. These aren't just photos; they're promises kept."}
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white dark:bg-zinc-800 border border-outline-variant/30 px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#f5b81a] hover:text-zinc-950 transition-all cursor-pointer">
                {isTe ? "మునుపటి సైట్" : "Previous Site"}
              </button>
              <button className="bg-[#f5b81a] text-zinc-950 px-6 py-2 rounded-full font-semibold text-sm shadow-sm transition-all active:scale-95 cursor-pointer">
                {isTe ? "తదుపరి సైట్" : "Next Site"}
              </button>
            </div>
          </div>

          {/* Comparison Slider Component */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl group border-4 border-white dark:border-zinc-800 select-none cursor-ew-resize"
            onMouseDown={() => {
              isDragging.current = true;
            }}
            onTouchStart={() => {
              isDragging.current = true;
            }}
            onMouseMove={(e) => {
              if (isDragging.current) handleMove(e.clientX);
            }}
            onTouchMove={(e) => {
              if (isDragging.current && e.touches.length > 0) {
                handleMove(e.touches[0].clientX);
              }
            }}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover pointer-events-none"
                alt="A crystal clear after-shot of the Kanuparthipadu Main Road."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA1Fy-tWYcNO67hZg_0OfZhFI1TJkmYgeynpzkq-cVnNeq_4e0uBm6l6Xch-xDoIfl01USB28FHJ2KU4198oEa6Jm_zzCXVZtJsaHSbos6S40dXojiAP5C7k9T10tWHbOAixxGgkHcykXuHhOnj645vJ1imoFktFl48Nzc2lJQYOAw27uG-pTGBF2htGr7dOcHhc6X2GG-GCwT_uzMke96pOYWsOjQlRHreiZzAFQAFV6JkWMVtUARTBt_SlheFZj_jVFezDkmfDsi"
              />
              <div className="absolute top-6 right-6 bg-[#f5b81a]/90 backdrop-blur-md px-4 py-2 rounded-full text-zinc-950 font-bold text-xs shadow-md">
                {isTe ? "తరువాత: ఆధునిక మౌలిక సదుపాయాలు" : "After: Modern Infrastructure"}
              </div>
            </div>

            {/* Before Image (Overlay with CSS ClipPath) */}
            <img
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              alt="A gritty before-shot of a dusty, unpaved road in Kanuparthipadu village."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWOxJp82JRrj7ZCelUqgtlSwqHxWshkw6OHESe-BVMjp2JKHERMsKNjOzEZ3bYN53V_KOL5-xNVkyzLt4xfFMQxWFFEUx2RkgRNKyjD_eAR0NYISjCDAF6VNRVsArFutWLgWDZH_zcp9_bTxWstXuzHfl1Z_JYDSrxC4E0vPSqgXPJiUV3tCcOpVw4tNdvU3O0styvhgpoNos0azgJRivcHOh_cSPNKwhPPOKybxGdZo5QQVVSHmZUfLjac29OC4OmFZfC_Bbs4cQI"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            />
            <div
              className="absolute top-6 left-6 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-xs shadow-md whitespace-nowrap"
              style={{ opacity: sliderPosition > 10 ? 1 : 0, transition: "opacity 0.2s" }}
            >
              {isTe ? "ముందు: పాత మైదానం" : "Before: Heritage Grounds"}
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] z-30 -ml-0.5 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-[#f5b81a]">
                <span className="material-symbols-outlined text-[#7a5900] font-bold select-none">unfold_more</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-on-surface-variant font-bold uppercase tracking-widest text-xs italic">
            {isTe ? "మార్పును సరిపోల్చడానికి స్లైడ్ చేయండి" : "Slide to compare transformation progress"}
          </p>
        </div>
      </section>

      {/* Development Categories Grid */}
      <section className="py-12 max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <h2 className="font-headline-xl text-3xl md:text-4xl font-extrabold text-on-surface mb-8 text-center">
          {isTe ? "అభివృద్ధి విభాగాలు" : "Development Categories"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Roads & Infrastructure */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f5b81a] to-[#ffdea3] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-zinc-950 text-[32px] fill-icon">add_road</span>
            </div>
            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">
              {isTe ? "రోడ్లు & కనెక్టివిటీ" : "Roads & Connectivity"}
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800]">check_circle</span>
                <span className="text-on-surface-variant text-sm">
                  {isTe ? "మెయిన్ లింక్ రోడ్ (4.5కిమీ) - పూర్తయింది" : "Main Link Road (4.5km) - Completed"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800]">check_circle</span>
                <span className="text-on-surface-variant text-sm">
                  {isTe ? "గ్రామ అంతర్గత సిమెంట్ వీధులు - 80%" : "Inner Village Cement Streets - 80%"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-zinc-400">pending</span>
                <span className="text-on-surface-variant text-sm">
                  {isTe ? "స్మార్ట్ స్ట్రీట్ లైటింగ్ - కొనసాగుతోంది" : "Smart Street Lighting - Ongoing"}
                </span>
              </li>
            </ul>
            <button className="w-full py-3 rounded-full border border-[#7a5900] text-[#7a5900] dark:border-[#f9b800] dark:text-[#f9b800] font-semibold text-sm hover:bg-[#f5b81a] hover:text-zinc-950 transition-all flex items-center justify-center gap-2 cursor-pointer">
              {isTe ? "ప్రాజెక్టులను చూడండి" : "View Projects"}{" "}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Water & Sanitation */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f5b81a] to-[#ffdea3] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-zinc-950 text-[32px] fill-icon">water_drop</span>
            </div>
            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">
              {isTe ? "నీరు & ఆరోగ్యం" : "Water & Health"}
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800]">check_circle</span>
                <span className="text-on-surface-variant text-sm">
                  {isTe ? "కమ్యూనిటీ RO ప్లాంట్ అప్‌గ్రేడ్" : "Community RO Plant Upgrade"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800]">check_circle</span>
                <span className="text-on-surface-variant text-sm">
                  {isTe ? "450 ఇళ్లకు కుళాయి కనెక్షన్" : "Tap Connection to 450 Homes"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800]">check_circle</span>
                <span className="text-on-surface-variant text-sm">
                  {isTe ? "అండర్‌గ్రౌండ్ డ్రైనేజీ ఫేజ్ 1" : "Underground Drainage Phase 1"}
                </span>
              </li>
            </ul>
            <button className="w-full py-3 rounded-full border border-[#7a5900] text-[#7a5900] dark:border-[#f9b800] dark:text-[#f9b800] font-semibold text-sm hover:bg-[#f5b81a] hover:text-zinc-950 transition-all flex items-center justify-center gap-2 cursor-pointer">
              {isTe ? "ప్రాజెక్టులను చూడండి" : "View Projects"}{" "}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Education & Youth */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f5b81a] to-[#ffdea3] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-zinc-950 text-[32px] fill-icon">school</span>
            </div>
            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">
              {isTe ? "విద్య & ప్రతిభ" : "Education & Talent"}
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800]">check_circle</span>
                <span className="text-on-surface-variant text-sm">
                  {isTe ? "డిజిటల్ లైబ్రరీ & హబ్ సెంటర్" : "Digital Library & Hub Center"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7a5900] dark:text-[#f9b800]">check_circle</span>
                <span className="text-on-surface-variant text-sm">
                  {isTe ? "ZPHS పాఠశాల ఆధునికీకరణ" : "ZPHS School Modernization"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-zinc-400">pending</span>
                <span className="text-on-surface-variant text-sm">
                  {isTe ? "నైపుణ్య అభివృద్ధి వర్క్‌షాప్" : "Skill Development Workshop"}
                </span>
              </li>
            </ul>
            <button className="w-full py-3 rounded-full border border-[#7a5900] text-[#7a5900] dark:border-[#f9b800] dark:text-[#f9b800] font-semibold text-sm hover:bg-[#f5b81a] hover:text-zinc-950 transition-all flex items-center justify-center gap-2 cursor-pointer">
              {isTe ? "ప్రాజెక్టులను చూడండి" : "View Projects"}{" "}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Citizen Feedback Section (Asymmetric) */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-12">
        <div className="bg-zinc-900 text-white rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center overflow-hidden relative">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#f5b81a] opacity-20 blur-[100px]"></div>
          <div className="lg:w-1/2 relative z-10 text-left">
            <h2 className="font-headline-xl text-3xl md:text-4xl font-extrabold mb-6">
              {isTe ? "కనుపర్తిపాడు స్వరం" : "Voice of Kanuparthipadu"}
            </h2>
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
              {(showAllFeedback ? feedbackData : feedbackData.slice(0, 1)).map((item, idx) => (
                <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300">
                  <p className="font-body-lg text-base md:text-lg italic mb-4">
                    "{isTe ? item.commentTe : item.commentEn}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-700">
                      <img
                        className="w-full h-full object-cover"
                        alt={`Portrait of ${item.name}`}
                        src={item.image}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{item.name}</p>
                      <p className="text-xs text-[#f5b81a] uppercase tracking-wider">
                        {isTe ? item.roleTe : item.roleEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {feedbackData.length > 1 && (
              <div className="mt-6 text-left">
                <button
                  onClick={() => setShowAllFeedback(!showAllFeedback)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer"
                >
                  <span>
                    {showAllFeedback 
                      ? (isTe ? "తక్కువ చూపించు" : "Show Less") 
                      : (isTe ? "మరిన్ని ఫీడ్‌బ్యాక్‌లు" : "View More Feedback")
                    }
                  </span>
                  <span className="material-symbols-outlined text-lg transition-transform duration-300">
                    {showAllFeedback ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="lg:w-1/2 w-full bg-white dark:bg-zinc-800 rounded-3xl p-8 text-zinc-950 dark:text-white relative z-10 shadow-2xl">
            <h4 className="font-headline-md text-xl font-bold mb-2">
              {isTe ? "సలహా ఉందా?" : "Have a Suggestion?"}
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
              {isTe
                ? "మీ గ్రామ 'డిజిటల్ అభివృద్ధి పుస్తకానికి' సహకరించండి."
                : "Contribute to the 'Digital Development Book' of your village."}
            </p>
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="w-full px-6 py-4 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-sm border-none focus:ring-2 focus:ring-[#f5b81a] transition-all"
                placeholder={isTe ? "మీ పూర్తి పేరు" : "Your Full Name"}
                type="text"
              />
              <textarea
                className="w-full px-6 py-4 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-sm border-none focus:ring-2 focus:ring-[#f5b81a] transition-all"
                placeholder={isTe ? "ఎలాంటి మార్పులు చేయాలో చెప్పండి..." : "Tell us what can be improved..."}
                rows={4}
              ></textarea>
              <button className="w-full py-4 bg-gradient-to-r from-[#f5b81a] to-[#ffdea3] text-zinc-950 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer">
                {isTe ? "ఫీడ్‌బ్యాక్ సమర్పించండి" : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DevMap;
