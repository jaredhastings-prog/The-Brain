import { SectionPage } from "@/features/sections/components/section-page";
import { sectionRegistry } from "@/features/sections/section-registry";

export default function AiAgentsPage() {
  return <SectionPage section={sectionRegistry.aiAgents} />;
}
