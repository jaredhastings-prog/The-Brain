import { SectionPage } from "@/features/sections/components/section-page";
import { sectionRegistry } from "@/features/sections/section-registry";

export default function FinancePage() {
  return <SectionPage section={sectionRegistry.finance} />;
}
