import { SectionPage } from "@/features/sections/components/section-page";
import { sectionRegistry } from "@/features/sections/section-registry";

export default function HealthPerformancePage() {
  return <SectionPage section={sectionRegistry.healthPerformance} />;
}
