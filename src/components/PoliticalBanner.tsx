import { Road, GraduationCap, Droplet, HeartPulse, Tractor, type LucideIcon } from 'lucide-react';

interface Pillar {
  icon: LucideIcon;
  label: string;
}

export default function PoliticalBanner() {
  const familySilhouetteUrl = "/family-sunset.png";
  const leaderPortraitUrl = "/lokesh.png";

  const pillars: Pillar[] = [
    { icon: Road, label: 'Better Infrastructure' },
    { icon: GraduationCap, label: 'Quality Education' },
    { icon: Droplet, label: 'Clean Water' },
    { icon: HeartPulse, label: 'Good Healthcare' },
    { icon: Tractor, label: 'Farmers Prosperity' },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FCE181] via-[#FCE89C] to-[#FCD44D] shadow-md flex flex-col md:flex-row items-center justify-between min-h-[130px] border border-amber-200/50">

      {/* Left Section: Family Silhouette & Quote */}
      <div className="flex flex-1 items-center h-full w-full md:w-auto">
        {/* Family Image with Warm Overlay */}
        <div className="relative hidden lg:block w-40 h-32 flex-shrink-0">
          <img
            src={familySilhouetteUrl}
            alt="Family walking into sunset"
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FCE181]" />
        </div>

        {/* Quote Text */}
        <div className="p-4 md:py-2 md:pl-4 max-w-sm">
          <span className="text-3xl font-serif text-amber-600 block leading-none -mb-3">“</span>
          <p className="text-slate-800 font-bold text-sm md:text-[15px] leading-snug">
            Development reaches every village when people and leadership work together.
          </p>
        </div>
      </div>

      {/* Middle Section: 5 Pillars / Icons */}
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-3 md:gap-1.5 px-4 py-3 md:py-0 border-y md:border-y-0 md:border-x border-amber-600/20 h-full">
        {pillars.map((pillar, index) => {
          const IconComponent = pillar.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center px-1.5 w-20 md:w-16 lg:w-20 transition-transform hover:scale-105"
            >
              <div className="w-8 h-8 flex items-center justify-center text-emerald-800 bg-amber-100/50 rounded-lg mb-1 shadow-sm border border-amber-300/30">
                <IconComponent className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 leading-tight">
                {pillar.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right Section: Leader Portrait & Vision Text */}
      <div className="flex flex-1 items-center justify-end p-4 md:pl-3 w-full md:w-auto gap-3">
        {/* Leader Portrait */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
          <img
            src={leaderPortraitUrl}
            alt="Nara Lokesh"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Leader Statement */}
        <div className="max-w-xs">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Young Leadership
          </h4>
          <p className="text-[10px] font-medium text-slate-700 mt-0.5 leading-snug">
            Driving the Vision of a Developed Andhra Pradesh
          </p>
          <span className="text-xs font-bold text-slate-900 block mt-0.5">
            — Nara Lokesh
          </span>
        </div>
      </div>

    </div>
  );
}
