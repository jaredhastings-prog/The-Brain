import { SectionPage } from "@/features/sections/components/section-page";
import { sectionRegistry } from "@/features/sections/section-registry";

export default function SettingsPage() {
  return <SectionPage section={sectionRegistry.settings} />;
}
