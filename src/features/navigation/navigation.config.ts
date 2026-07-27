import {
  BrainCircuit,
  GraduationCap,
  Landmark,
  Heart,
  LayoutDashboard,
  Plane,
  BookMarked,
  Sparkles,
  Target,
  UtensilsCrossed,
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
    description: "Home",
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
      {
        title: "Coach Training",
        href: "/study-learning/coach-training",
        icon: Target,
      },
      {
        title: "Phrases & Definitions",
        href: "/study-learning/phrases-definitions",
        icon: BookMarked,
      },
    ],
  },
  {
    title: "Liam",
    href: "/liam",
    icon: Heart,
    description: "Ideas register",
  },
  {
    title: "Recipes",
    href: "/recipes",
    icon: UtensilsCrossed,
    description: "Your recipe collection",
  },
  {
    title: "Trips",
    href: "/trips/wellington",
    icon: Plane,
    description: "Wellington, New Zealand",
  },
  {
    title: "Mortgage",
    href: "/mortgage",
    icon: Landmark,
    description: "Payoff progress and strategy",
  },
];
