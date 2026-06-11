export interface Costs {
  materials: number;
  labor: number;
  subcontractor: number;
  equipment: number;
  salesCommission: number;
  ownerTime: number;
}

export interface CalculationResult {
  directCost: number;
  totalWithOverhead: number;
  recommendedPrice: number;
  grossProfit: number;
  marginPercent: number;
}

export function calculateMargin(
  costs: Costs,
  overheadPercent: number,
  targetMarginPercent: number
): CalculationResult {
  // Calculate direct cost
  const directCost =
    costs.materials +
    costs.labor +
    costs.subcontractor +
    costs.equipment +
    costs.salesCommission +
    costs.ownerTime;

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

  return {
    directCost,
    totalWithOverhead,
    recommendedPrice,
    grossProfit,
    marginPercent,
  };
}
