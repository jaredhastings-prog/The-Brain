import {
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  FlaskConical,
  FolderKanban,
  GraduationCap,
  HeartPulse,
  History,
  Inbox,
  Landmark,
  LayoutDashboard,
  MessageSquareHeart,
  Settings,
  Shirt,
  Sparkles,
  SquareActivity,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  items?: NavItem[];
};

export const primaryNavigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Executive command center",
  },
  {
    title: "Business",
    href: "/business",
    icon: BriefcaseBusiness,
    description: "Venture operating system",
    items: [
      {
        title: "Evolve Lab",
        href: "/business/evolve-lab",
        icon: FlaskConical,
      },
      {
        title: "Frontier SQ",
        href: "/business/frontier-sq",
        icon: SquareActivity,
      },
      {
        title: "Frontier Wear",
        href: "/business/frontier-wear",
        icon: Shirt,
      },
      {
        title: "The Coaching Room",
        href: "/business/the-coaching-room",
        icon: MessageSquareHeart,
      },
    ],
  },
  {
    title: "Study & Learning",
    href: "/study-learning",
    icon: GraduationCap,
    description: "Formal and self-directed learning",
    items: [
      {
        title: "Master of Business Psychology",
        href: "/study-learning/master-of-business-psychology",
        icon: BrainCircuit,
      },
      {
        title: "NLP",
        href: "/study-learning/nlp",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "Health & Performance",
    href: "/health-performance",
    icon: HeartPulse,
  },
  {
    title: "Liam",
    href: "/liam",
    icon: UsersRound,
  },
  {
    title: "Finance",
    href: "/finance",
    icon: Landmark,
  },
  {
    title: "Relationships",
    href: "/relationships",
    icon: MessageSquareHeart,
  },
  {
    title: "Personal Projects",
    href: "/personal-projects",
    icon: FolderKanban,
  },
  {
    title: "Memory Timeline",
    href: "/memory-timeline",
    icon: History,
  },
  {
    title: "AI Agents",
    href: "/ai-agents",
    icon: Bot,
  },
  {
    title: "Global Capture Inbox",
    href: "/capture-inbox",
    icon: Inbox,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
