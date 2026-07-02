import React from "react";
import { type Language } from "../data/translations";
import PoliticalBanner from "../components/PoliticalBanner";


interface HomePageProps {
  language: Language;
}

const HomePage: React.FC<HomePageProps> = ({ language: _language }) => {
  return (
    // Added pt-20 to clear the fixed navbar
    <main className="flex-grow relative">
      <section
        id="home"
        className="relative w-full flex flex-col overflow-hidden"
      >
        {/* HERO TOP AREA - Wrapper added to fix alignment */}
        <div className="relative w-full min-h-[650px] flex items-center pb-10">

          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-bg.jpg"
              alt="Nellore Rural Development"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* <div className="absolute inset-20 top-1 bottom-60 left-0 -right-50 bg-gradient-to-r from-[#FBF4E2]/50 via-[#FBF4E2]/30 to-transparent md:w-2/4"></div> */}

          {/* Content Container */}
          <div className="
            relative z-10
            w-full
            max-w-[1500px]
            mx-auto
            px-6
            lg:px-12
            xl:px-20
            -translate-y-8
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center
            gap-10
            p-2
          ">

            {/* Left Content (Text, Features, Buttons) */}
            <div className="w-full lg:w-1/2 max-w-2xl">

              {/* Top Badge */}
              <div className="
                inline-flex
                items-center
                gap-2
                py-1.5
                px-3
                bg-[#FDF6E3]
                border border-[#F2DEAA]
                rounded-full 
              ">
                <svg className="w-4 h-4 text-[#D09A20]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span className="text-[#8B6A1A] font-semibold text-sm">
                  Together for a Developed Nellore Rural
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="
                text-5xl
                md:text-[55px]
                font-bold
                text-[#2B2A29]
                tracking-tight
                mt-4
                text-shadow-white
              "
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                Stronger Villages
                <br />
                <span className="text-[#e2a200] dark:text-[#f5b81a]">
                  Better Tomorrow
                </span>
              </h1>

              {/* Subheading */}
              <p className="
                text-black
                text-lg
                font-medium
                max-w-md
                mt-1 
                p-2
                leading-tight
                text-shadow-white
              " style={{ fontFamily: "'Roboto', sans-serif" }}>
                Every village has a dream. Every development
                work takes us closer to a better future.
              </p>

              {/* Features Row */}
              <div className="flex items-center justify-between w-full gap-4 pt-2">
                {/* Feature 1 */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#b88300] shadow-sm flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight text-shadow-white">People First</span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#b88300] shadow-sm flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight text-shadow-white">Transparent<br />Governance</span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#b88300] shadow-sm flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight text-shadow-white">Development for<br />All</span>
                </div>

                {/* Feature 4 */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#b88300] shadow-sm flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5c-4 3.5-6 7.5-6 11 0 3 2.5 5 6 5s6-2 6-5c0-3.5-2-7.5-6-11z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v16" />
                    </svg>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight text-shadow-white">Better Tomorrow</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-10 flex-wrap">
                <button className="
                  bg-[#F1BA06]
                  hover:bg-yellow-500
                  text-black
                  px-6
                  py-3.5
                  rounded-xl
                  font-bold
                  shadow-sm
                  transition
                  flex items-center gap-2
                ">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Explore My Village
                </button>

                <button className="
                  bg-white
                  border
                  border-gray-300
                  hover:bg-gray-50
                  text-gray-800
                  px-6
                  py-3.5
                  rounded-xl
                  font-bold
                  shadow-sm
                  transition
                  flex items-center gap-2
                ">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  View Development Works
                </button>
              </div>

            </div>
            {/* END OF LEFT CONTENT */}

            {/* Right Content (Leadership Card) */}
            <div className="w-full lg:w-auto max-w-[480px]">
              <div className="bg-white  rounded-3xl p-6 shadow-2xl">

                {/* Top Section */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-xs font-bold text-black uppercase tracking-wider">With Gratitude to NDA Kutami Leadership</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Top 3 Leaders */}
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div className="flex flex-col items-center text-center w-1/3">
                    <img src="/cbn.jpg" alt="Sri Nara Chandrababu Naidu" className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-100" />
                    <h3 className="text-xs font-bold text-gray-900">Sri Nara Chandrababu Naidu</h3>
                    <p className="text-[10px] text-black font-medium">Hon'ble Chief Minister</p>
                  </div>
                  <div className="flex flex-col items-center text-center w-1/3">
                    <img src="/pawan.jpg" alt="Sri Pawan Kalyan" className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-100" />
                    <h3 className="text-xs font-bold text-gray-900">Sri Pawan Kalyan</h3>
                    <p className="text-[10px] text-black font-medium">Hon'ble Deputy<br />Chief Minister</p>
                  </div>
                  <div className="flex flex-col items-center text-center w-1/3">
                    <img src="/lokesh.png" alt="Sri Nara Lokesh" className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-100" />
                    <h3 className="text-xs font-bold text-gray-900">Sri Nara Lokesh</h3>
                    <p className="text-[10px] text-black font-medium">Hon'ble IT, HRD & RD<br />Minister</p>
                  </div>
                </div>

                {/* Middle Section */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-xs font-bold text-black uppercase tracking-wider text-center">Nellore Rural Leadership<br />Committed to Our People</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Bottom 2 Leaders */}
                <div className="flex justify-center gap-12 mb-6">
                  <div className="flex flex-col items-center text-center w-32">
                    <img src="/sreedhar.jpg" alt="Kotamreddy Sreedhar Reddy" className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-100" />
                    <h3 className="text-xs font-bold text-gray-900">Kotamreddy<br />Sreedhar Reddy</h3>
                    <p className="text-[10px] text-black font-medium">MLA, Nellore Rural</p>
                  </div>
                  <div className="flex flex-col items-center text-center w-32">
                    <img src="/giri1.png" alt="Kotamreddy Giridhar Reddy" className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-100" />
                    <h3 className="text-xs font-bold text-gray-900">Kotamreddy<br />Giridhar Reddy</h3>
                    <p className="text-[10px] text-black font-medium">MLA, Nellore Rural</p>
                  </div>
                </div>

                {/* Quote Box */}
                <div className="bg-[#F1BA06] rounded-2xl p-4 text-center flex items-center justify-center gap-3">
                  <span className="text-3xl font-serif text-black opacity-60 leading-none">"</span>
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    Our Commitment, Our Responsibility.<br />
                    Your Development, Our Mission.
                  </p>
                  <span className="text-3xl font-serif text-black opacity-60 leading-none">"</span>
                </div>
              </div>
            </div>
            {/* END OF RIGHT CONTENT */}

          </div>
        </div>
        {/* END OF HERO TOP AREA */}

        {/* --- STATS BANNER SECTION --- */}
        <div className="relative z-20 w-full max-w-[1500px] mx-auto px-6 lg:px-12 xl:px-20 -mt-10 mb-8">
          <div className="bg-[#FDF9EE] rounded-[32px] shadow-lg border border-[#F2DEAA]/60 p-6 lg:p-8 flex flex-wrap xl:flex-nowrap justify-between items-center gap-6 xl:gap-2">

            {/* Stat 1: Total Development Allocation */}
            <div className="flex items-center gap-4 w-full md:w-[45%] xl:w-auto">
              <div className="w-16 h-16 rounded-full bg-[#F1BA06] flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-700">Total Development Allocation</span>
                <span className="text-[32px] font-extrabold text-gray-900 leading-tight">₹42.5 Cr</span>
                <span className="text-xs text-gray-500 font-medium">For Development Works</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden xl:block w-px h-16 bg-gray-200"></div>

            {/* Stat 2: Development Works */}
            <div className="flex items-center gap-4 w-full md:w-[45%] xl:w-auto">
              <div className="w-16 h-16 rounded-full bg-[#F1BA06] flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-700">Development Works</span>
                <span className="text-[32px] font-extrabold text-gray-900 leading-tight">250+</span>
                <span className="text-xs text-gray-500 font-medium">Across Nellore Rural</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden xl:block w-px h-16 bg-gray-200"></div>

            {/* Stat 3: Completed Works */}
            <div className="flex items-center gap-4 w-full md:w-[45%] xl:w-auto">
              <div className="w-16 h-16 rounded-full bg-[#3C731A] flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-700">Completed Works</span>
                <span className="text-[32px] font-extrabold text-gray-900 leading-tight">120+</span>
                <span className="text-xs text-gray-500 font-medium">Successfully Completed</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden xl:block w-px h-16 bg-gray-200"></div>

            {/* Stat 4: Ongoing Works */}
            <div className="flex items-center gap-4 w-full md:w-[45%] xl:w-auto">
              <div className="w-16 h-16 rounded-full bg-[#F1BA06] flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-700">Ongoing Works</span>
                <span className="text-[32px] font-extrabold text-gray-900 leading-tight">50+</span>
                <span className="text-xs text-gray-500 font-medium">In Progress</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden xl:block w-px h-16 bg-gray-200"></div>

            {/* Stat 5: Upcoming Works */}
            <div className="flex items-center gap-4 w-full md:w-[45%] xl:w-auto">
              <div className="w-16 h-16 rounded-full bg-[#F1BA06] flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-700">Upcoming Works</span>
                <span className="text-[32px] font-extrabold text-gray-900 leading-tight">80+</span>
                <span className="text-xs text-gray-500 font-medium">Planned for Future</span>
              </div>
            </div>

          </div>
        </div>

        {/* --- NEW ACTION CARDS SECTION --- */}
        <div className="relative z-20 w-full max-w-[1500px] mx-auto px-6 lg:px-12 xl:px-20 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Card 1: Explore Your Village Development */}
            <div className="col-span-1 lg:col-span-5 relative bg-[#FDF9EE] rounded-[32px] border border-[#F2DEAA]/60 overflow-hidden shadow-sm min-h-[280px] p-6 lg:p-8 flex flex-col justify-between">
              {/* Map Background */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src="/map.png"
                  alt="Map Background"
                  className="w-full h-full object-fill"
                />
              </div>

              {/* Text content overlay */}
              <div className="relative z-10 w-full max-w-[65%] flex flex-col justify-between h-full min-h-[220px]">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">Explore Your Village Development</h3>
                  <p className="text-sm text-gray-700 font-semibold leading-snug">Select your village on the map to see development works and progress</p>
                </div>
                <a
                  href="#devmap"
                  className="bg-[#1C180E] hover:bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition w-max mt-auto shadow-md"
                >
                  <svg className="w-4 h-4 text-[#F1BA06]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Open Development Map
                </a>
              </div>
            </div>

            {/* Card 2: Transformation Stories */}
            <div className="col-span-1 lg:col-span-4 relative bg-[#FDF9EE] rounded-[32px] border border-[#F2DEAA]/60 p-6 lg:p-8 overflow-hidden shadow-sm flex flex-col justify-between min-h-[280px]">
              <div className="relative z-10 w-[48%] flex flex-col justify-between h-full min-h-[220px]">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">Transformation Stories</h3>
                  <p className="text-sm text-gray-700 mb-8 font-semibold leading-snug">Real changes. Real impact. Explore before & after development works.</p>
                </div>
                <button className="bg-[#F1BA06] hover:bg-yellow-500 text-black px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center transition w-max mt-auto shadow-md">
                  View Stories
                </button>
              </div>

              {/* Before/After Graphic */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 select-none pointer-events-none">
                {/* Left part (before) */}
                <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                  <img
                    src="/before-road.png"
                    alt="Before"
                    className="absolute inset-y-0 left-0 h-full w-[200%] max-w-none object-cover object-left"
                  />
                </div>
                {/* Right part (after) */}
                <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                  <img
                    src="/after-road.png"
                    alt="After"
                    className="absolute inset-y-0 right-0 h-full w-[200%] max-w-none object-cover object-right"
                  />
                </div>

                {/* Slider UI Handle */}
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white shadow-lg flex items-center justify-center -ml-[1px]">
                  <div className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-gray-500 border border-gray-25">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white tracking-wider uppercase">
                  After
                </div>
              </div>
            </div>

            {/* Card 3: Voice of Our People */}
            <div className="col-span-1 lg:col-span-3 relative bg-[#E8AE18] rounded-[32px] p-6 lg:p-8 overflow-hidden shadow-sm flex flex-col justify-between min-h-[280px]">
              <div className="relative z-10 w-[50%] flex flex-col justify-between h-full min-h-[220px]">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-1 leading-tight">Voice of Our People</h3>
                  <p className="text-sm text-gray-800 mb-5 font-semibold leading-snug">Your opinion shapes our future projects.</p>
                </div>

                <div className="flex flex-col gap-3.5 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#3C731A] flex items-center justify-center text-white shadow-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-gray-900">Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#6B8E23] flex items-center justify-center text-white shadow-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-gray-900">Suggest Changes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#D32F2F] flex items-center justify-center text-white shadow-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-gray-900">Oppose</span>
                  </div>
                </div>
              </div>

              {/* People Image Overlay */}
              <div className="absolute -right-20 top-0 bottom-0 w-[75%] z-0 pointer-events-none">
                <img
                  src="/voice-people.png"
                  alt="Voice of Our People"
                  className="w-full h-full object-cover object-right"
                />
              </div>
            </div>

          </div>
        </div>

        {/* --- LEADER & VISION BANNER --- */}

        <div className="relative z-20 w-full max-w-[1500px] mx-auto px-6 lg:px-12 xl:px-20 mb-8">
          <PoliticalBanner />
        </div>





      </section>
    </main>
  );
};

export default HomePage;