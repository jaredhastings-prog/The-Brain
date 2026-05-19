import { SectionPage } from "@/features/sections/components/section-page";
import { sectionRegistry } from "@/features/sections/section-registry";

export default function BusinessPage() {
  return <SectionPage section={sectionRegistry.business} />;
}
