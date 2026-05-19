import { SectionPage } from "@/features/sections/components/section-page";
import { sectionRegistry } from "@/features/sections/section-registry";

export default function NlpPage() {
  return <SectionPage section={sectionRegistry.nlp} />;
}
