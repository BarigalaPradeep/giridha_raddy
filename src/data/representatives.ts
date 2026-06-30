export interface Leader {
  name: string;
  role: string;
  email?: string;
  whatsapp?: string;
  image?: string;
  icon?: string;
  description?: string;
  actions?: { label: string; action: string }[];
}

export interface TaskForceMember {
  category: string;
  name: string;
  whatsapp: string;
}

export const mlaLeader: Leader = {
  name: "Kotamreddy Sreedhar Reddy",
  role: "MLA, Nellore Rural",
  email: "mla@nellorerural.in",
  whatsapp: "https://wa.me/9100000000",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnWkWYfRZe3l-wOkwde1IrC_eA-pC1b5XXmpLFKW8-T23Ic-j_cwODO_AXcqJd0IMx17u0GRD75Qh3JHqgAYwWlA0-KpjHcmYV6csRq8iwCYXJKhnBQROXAXLO5xcZdk1pYA_WMaCdZvsjBvvGVQHkP3HYR5b4XGEd8J9VdYIBcINacO30MyCHclPRA7XXuml5TldNr8RR8Zu4OMKbFliI52l6QHCw26KMXlwUis-OK6YAYBmfSX4W1SkgiH9MrV0fKkX0ECJnBvMd"
};

export const coordinatorLeader: Leader = {
  name: "Kotamreddy Giridhar Reddy",
  role: "Chief Coordinator",
  email: "coordinator@nellorerural.in",
  whatsapp: "https://wa.me/9200000000",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuMPnOGSvySwt02iE-bqtJu4UjYoMTfXEkGRvQ9i5_-AhfC21m3Yafr0z8l5ppLHCHZxcsi86_QW1OpQdRei0FkVdWTMQZRvVpFlko_EKQ3CD5_qUGIBSiPbkrvZKekVwGWmk95pnMy7srPr8j7PUxq5YNJxX1c4YTpeMLWvJhbflK8ldp37pEiv66aM_4AgEfM7bpAgdl4wTpdzcwNLRqoV6iUOTeAEtAxN8h5o3cZxjcWRzI6O-BW7dc5FI3LMkW0zBKY1xwnE7f"
};

export const officeSupport: Leader = {
  name: "Central Office",
  role: "Grievance Cell",
  description: "Opp. ZP High School, Nellore Rural. Open Mon-Sat, 10 AM - 6 PM.",
  icon: "business_center",
  actions: [
    { label: "Call Office", action: "tel:+91861234567" },
    { label: "Directions", action: "https://maps.google.com" }
  ]
};

export const taskForceMembers: TaskForceMember[] = [
  {
    category: "Infrastructure",
    name: "Er. Ravi Kumar",
    whatsapp: "https://wa.me/9100000001"
  },
  {
    category: "Healthcare",
    name: "Dr. Lakshmi P.",
    whatsapp: "https://wa.me/9100000002"
  },
  {
    category: "Education",
    name: "Smt. Radhika Devi",
    whatsapp: "https://wa.me/9100000003"
  },
  {
    category: "Agriculture",
    name: "Shri Chandrasekhar",
    whatsapp: "https://wa.me/9100000004"
  }
];
