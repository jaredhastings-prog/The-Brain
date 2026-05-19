import { SectionPage } from "@/features/sections/components/section-page";
import { sectionRegistry } from "@/features/sections/section-registry";

export default function RelationshipsPage() {
  return <SectionPage section={sectionRegistry.relationships} />;
}
