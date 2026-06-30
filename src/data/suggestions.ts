export interface CitizenSuggestion {
  id: string;
  title: string;
  category: "Infrastructure" | "Water" | "Education" | "Health/Other";
  village: string;
  description: string;
  upvotes: number;
  status: "Under Review" | "Approved" | "In Progress" | "Completed";
  date: string;
  submittedBy: string;
}

export const initialSuggestions: CitizenSuggestion[] = [
  {
    id: "NR-2026-1024",
    title: "Pothole repair on Main Bypass Road",
    category: "Infrastructure",
    village: "Kakupalle",
    description: "The main connecting bypass road has developed huge potholes after the recent monsoon. Needs urgent repairs as school buses use it daily.",
    upvotes: 45,
    status: "In Progress",
    date: "2026-06-15",
    submittedBy: "K. Prasad"
  },
  {
    id: "NR-2026-1025",
    title: "Drinking Water Plant near ZP School",
    category: "Water",
    village: "Indukurpet",
    description: "Setting up an RO drinking water plant to benefit 500+ school kids and nearby families. Current water supply is high in fluoride.",
    upvotes: 112,
    status: "Approved",
    date: "2026-06-18",
    submittedBy: "M. Anuradha"
  },
  {
    id: "NR-2026-1026",
    title: "Digital classroom setup in Primary School",
    category: "Education",
    village: "Bujjapadu",
    description: "Upgrading 2 rooms with projector screens and basic computing systems to support digital interactive learning.",
    upvotes: 78,
    status: "Completed",
    date: "2026-06-20",
    submittedBy: "P. Venkatesh"
  },
  {
    id: "NR-2026-1027",
    title: "Primary Health Sub-center upgrade",
    category: "Health/Other",
    village: "Kanuparthipadu",
    description: "Requesting basic medical diagnostic kit upgrades and additional generic medicines stock at the village health sub-center.",
    upvotes: 34,
    status: "Under Review",
    date: "2026-06-22",
    submittedBy: "A. Deepa"
  },
  {
    id: "NR-2026-1028",
    title: "Street lights installation on temple road",
    category: "Infrastructure",
    village: "Devarapalem",
    description: "High pedestrian traffic after dusk on temple road, needs 8 LED solar street lights for security.",
    upvotes: 56,
    status: "In Progress",
    date: "2026-06-25",
    submittedBy: "S. Kondaiah"
  }
];
