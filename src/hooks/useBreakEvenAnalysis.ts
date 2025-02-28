import { useState, useCallback } from 'react';
import { BreakEvenAnalysis } from '../types/business';

interface BreakEvenInputs {
  fixedCosts: number;
  variableCostPerUnit: number;
  sellingPricePerUnit: number;
  expectedUnits?: number;
}

export function useBreakEvenAnalysis() {
  const [analysis, setAnalysis] = useState<BreakEvenAnalysis>({
    breakEvenPoint: 0,
    breakEvenUnits: 0,
    marginOfSafety: 0,
    contributionMargin: 0,
    fixedCosts: 0,
    variableCosts: 0,
  });

  const calculateBreakEven = useCallback(
    ({ fixedCosts, variableCostPerUnit, sellingPricePerUnit, expectedUnits }: BreakEvenInputs) => {
      // Calculate contribution margin per unit
      const contributionMarginPerUnit = sellingPricePerUnit - variableCostPerUnit;

      // Calculate break-even point in units
      const breakEvenUnits = fixedCosts / contributionMarginPerUnit;

      // Calculate break-even point in dollars
      const breakEvenPoint = breakEvenUnits * sellingPricePerUnit;

      // Calculate total variable costs at break-even
      const variableCosts = breakEvenUnits * variableCostPerUnit;

      // Calculate contribution margin ratio
      const contributionMargin = (contributionMarginPerUnit / sellingPricePerUnit) * 100;

      // Calculate margin of safety if expected units provided
      const marginOfSafety = expectedUnits
        ? ((expectedUnits - breakEvenUnits) / expectedUnits) * 100
        : 0;

      setAnalysis({
        breakEvenPoint,
        breakEvenUnits,
        marginOfSafety,
        contributionMargin,
        fixedCosts,
        variableCosts,
      });

      return {
        breakEvenPoint,
        breakEvenUnits,
        marginOfSafety,
        contributionMargin,
        fixedCosts,
        variableCosts,
      };
    },
    []
  );

  const calculateProfitAtVolume = useCallback(
    (volume: number) => {
      if (!analysis.breakEvenPoint) return 0;

      const revenue = volume * (analysis.breakEvenPoint / analysis.breakEvenUnits);
      const totalCosts = analysis.fixedCosts + (analysis.variableCosts * volume) / analysis.breakEvenUnits;
      return revenue - totalCosts;
    },
    [analysis]
  );

  const getSafetyMarginRecommendation = useCallback(
    (marginOfSafety: number) => {
      if (marginOfSafety < 0) {
        return "Your business is operating below the break-even point. Consider reducing costs or increasing prices.";
      } else if (marginOfSafety < 10) {
        return "Your safety margin is low. Look for ways to increase sales or reduce costs to improve your buffer.";
      } else if (marginOfSafety < 20) {
        return "You have a moderate safety margin. Continue monitoring and look for optimization opportunities.";
      } else {
        return "You have a healthy safety margin. Consider investing in growth or expansion.";
      }
    },
    []
  );

  const getContributionMarginRecommendation = useCallback(
    (contributionMargin: number) => {
      if (contributionMargin < 20) {
        return "Your contribution margin is low. Consider increasing prices or finding ways to reduce variable costs.";
      } else if (contributionMargin < 40) {
        return "Your contribution margin is moderate. Look for opportunities to improve efficiency.";
      } else {
        return "You have a strong contribution margin. Focus on maintaining your competitive advantage.";
      }
    },
    []
  );

  return {
    analysis,
    calculateBreakEven,
    calculateProfitAtVolume,
    getSafetyMarginRecommendation,
    getContributionMarginRecommendation,
  };
} 