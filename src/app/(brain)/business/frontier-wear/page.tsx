import { SectionPage } from "@/features/sections/components/section-page";
import { sectionRegistry } from "@/features/sections/section-registry";

export default function FrontierWearPage() {
  return <SectionPage section={sectionRegistry.frontierWear} />;
}
