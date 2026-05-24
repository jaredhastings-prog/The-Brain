import { notFound } from "next/navigation";

import { BusinessPsychologyUnitPage } from "@/features/business-psychology/components/business-psychology-unit-page";
import {
  businessPsychologyUnits,
  getBusinessPsychologyUnit,
} from "@/features/business-psychology/data/business-psychology-data";

type UnitRouteProps = {
  params: Promise<{
    unitId: string;
  }>;
};

export function generateStaticParams() {
  return businessPsychologyUnits.map((unit) => ({
    unitId: unit.id,
  }));
}

export default async function UnitPage({ params }: UnitRouteProps) {
  const { unitId } = await params;
  const unit = getBusinessPsychologyUnit(unitId);

  if (!unit) {
    notFound();
  }

  return <BusinessPsychologyUnitPage unit={unit} />;
}
