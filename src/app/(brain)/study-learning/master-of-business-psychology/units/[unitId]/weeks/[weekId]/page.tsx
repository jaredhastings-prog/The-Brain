import { notFound } from "next/navigation";

import { BusinessPsychologyWeekPage } from "@/features/business-psychology/components/business-psychology-week-page";
import {
  businessPsychologyUnits,
  getBusinessPsychologyUnit,
  getBusinessPsychologyWeek,
} from "@/features/business-psychology/data/business-psychology-data";

type WeekRouteProps = {
  params: Promise<{
    unitId: string;
    weekId: string;
  }>;
};

export function generateStaticParams() {
  return businessPsychologyUnits.flatMap((unit) =>
    unit.weeklyTopics.map((week) => ({
      unitId: unit.id,
      weekId: week.id,
    })),
  );
}

export default async function WeekPage({ params }: WeekRouteProps) {
  const { unitId, weekId } = await params;
  const unit = getBusinessPsychologyUnit(unitId);
  const week = getBusinessPsychologyWeek(unitId, weekId);

  if (!unit || !week) {
    notFound();
  }

  return <BusinessPsychologyWeekPage unit={unit} week={week} />;
}
