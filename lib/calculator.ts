export interface Costs {
  materials: number;
  labor: number;
  subcontractor: number;
  equipment: number;
  salesCommission: number;
  ownerHours: number;
  ownerHourlyRate: number;
}

export interface CalculationResult {
  directCost: number;
  overheadAmount: number;
  totalWithOverhead: number;
  recommendedPrice: number;
  grossProfit: number;
  marginPercent: number;
  alertLevel: 'danger' | 'warning' | 'success';
  costBreakdown: Array<{ label: string; amount: number; percent: number }>;
}

export const TRADE_LABELS = {
  'Roofing': 'Materials/shingles',
  'HVAC': 'Equipment/unit cost',
  'Plumbing': 'Materials/fixtures',
  'Electrical': 'Materials/wire & parts',
  'Landscaping': 'Materials/plants & mulch',
  'General': 'Materials cost',
} as const;

export function calculateMargin(
  costs: Costs,
  overheadPercent: number,
  targetMarginPercent: number
): CalculationResult {
  // Calculate owner time cost
  const ownerTimeCost = costs.ownerHours * costs.ownerHourlyRate;

  // Calculate direct cost
  const directCost =
    costs.materials +
    costs.labor +
    costs.subcontractor +
    costs.equipment +
    costs.salesCommission +
    ownerTimeCost;

  // Calculate overhead amount
  const overheadAmount = (directCost * overheadPercent) / 100;

  // Total cost with overhead
  const totalWithOverhead = directCost + overheadAmount;

  // Calculate recommended price using margin formula
  // Price = Cost / (1 - (Margin% / 100))
  const recommendedPrice = totalWithOverhead / (1 - targetMarginPercent / 100);

  // Calculate gross profit
  const grossProfit = recommendedPrice - totalWithOverhead;

  // Verify margin percent
  const marginPercent = (grossProfit / recommendedPrice) * 100;

  // Determine alert level
  let alertLevel: 'danger' | 'warning' | 'success';
  if (marginPercent < 15) {
    alertLevel = 'danger';
  } else if (marginPercent < 25) {
    alertLevel = 'warning';
  } else {
    alertLevel = 'success';
  }

  // Build cost breakdown (non-zero items only)
  const breakdownItems: Array<{ label: string; amount: number }> = [];
  if (costs.materials > 0) breakdownItems.push({ label: 'Materials', amount: costs.materials });
  if (costs.labor > 0) breakdownItems.push({ label: 'Labor', amount: costs.labor });
  if (costs.subcontractor > 0) breakdownItems.push({ label: 'Subcontractor', amount: costs.subcontractor });
  if (costs.equipment > 0) breakdownItems.push({ label: 'Equipment', amount: costs.equipment });
  if (costs.salesCommission > 0) breakdownItems.push({ label: 'Commission', amount: costs.salesCommission });
  if (ownerTimeCost > 0) breakdownItems.push({ label: 'Owner Time', amount: ownerTimeCost });
  if (overheadAmount > 0) breakdownItems.push({ label: 'Overhead', amount: overheadAmount });

  const costBreakdown = breakdownItems.map((item) => ({
    ...item,
    percent: (item.amount / totalWithOverhead) * 100,
  }));

  return {
    directCost,
    overheadAmount,
    totalWithOverhead,
    recommendedPrice,
    grossProfit,
    marginPercent,
    alertLevel,
    costBreakdown,
  };
}
