import { UserData, RainfallData, RWHRecommendation, WaterSavings } from '../types';

export const calculateRunoff = (userData: UserData, rainfallData: RainfallData): number => {
  const runoffCoefficient = 0.8; // Standard for roof collection
  const collectionEfficiency = 0.85; // Account for losses
  
  const annualRunoff = (userData.roofArea * rainfallData.annualRainfall * runoffCoefficient * collectionEfficiency) / 1000;
  return Math.round(annualRunoff);
};

export const calculateWaterDemand = (dwellers: number): number => {
  const dailyPerCapitaDemand = 135; // liters per person per day (WHO standard)
  return Math.round((dailyPerCapitaDemand * dwellers * 365) / 1000); // Convert to cubic meters
};

export const generateRecommendations = (userData: UserData, runoff: number): RWHRecommendation[] => {
  const recommendations: RWHRecommendation[] = [];
  
  // Storage Tank
  const tankCapacity = Math.min(runoff * 0.3, userData.roofArea * 0.1);
  recommendations.push({
    type: 'tank',
    name: 'Overhead Storage Tank',
    capacity: Math.round(tankCapacity),
    dimensions: {
      length: Math.round(Math.cbrt(tankCapacity * 1000) * 1.2),
      width: Math.round(Math.cbrt(tankCapacity * 1000) * 1.0),
      depth: Math.round(Math.cbrt(tankCapacity * 1000) * 0.8)
    },
    cost: {
      material: tankCapacity * 150,
      labor: tankCapacity * 50,
      total: tankCapacity * 200
    },
    suitability: userData.buildingType === 'residential' ? 95 : 85,
    diyFriendly: tankCapacity < 5,
    description: 'Collects and stores rainwater for immediate use'
  });

  // Soak Pit
  if (userData.openSpace > 10) {
    recommendations.push({
      type: 'soak_pit',
      name: 'Recharge Soak Pit',
      capacity: Math.round(userData.openSpace * 0.5),
      dimensions: {
        diameter: Math.round(Math.sqrt(userData.openSpace * 0.5 / 3.14) * 2),
        depth: 3
      },
      cost: {
        material: userData.openSpace * 8,
        labor: userData.openSpace * 12,
        total: userData.openSpace * 20
      },
      suitability: userData.soilType === 'sandy' ? 90 : userData.soilType === 'mixed' ? 75 : 60,
      diyFriendly: true,
      description: 'Allows rainwater to percolate and recharge groundwater'
    });
  }

  // Recharge Trench
  if (userData.openSpace > 20) {
    const trenchLength = Math.min(userData.openSpace / 2, 30);
    recommendations.push({
      type: 'trench',
      name: 'Recharge Trench',
      capacity: Math.round(trenchLength * 0.6 * 1.5),
      dimensions: {
        length: Math.round(trenchLength),
        width: 60,
        depth: 150
      },
      cost: {
        material: trenchLength * 25,
        labor: trenchLength * 35,
        total: trenchLength * 60
      },
      suitability: userData.soilType !== 'clayey' ? 85 : 65,
      diyFriendly: true,
      description: 'Linear structure for enhanced groundwater recharge'
    });
  }

  return recommendations.sort((a, b) => b.suitability - a.suitability);
};

export const calculateWaterSavings = (
  userData: UserData, 
  rainfallData: RainfallData, 
  recommendations: RWHRecommendation[]
): WaterSavings => {
  const annualRunoff = calculateRunoff(userData, rainfallData);
  const totalDemand = calculateWaterDemand(userData.dwellers);
  const harvestable = Math.round(annualRunoff * 0.85); // 85% collection efficiency
  const demandMet = Math.min((harvestable / totalDemand) * 100, 100);
  
  // Cost savings calculation (₹30 per m³ average water cost)
  const costSavings = harvestable * 30;
  const totalInvestment = recommendations.reduce((sum, rec) => sum + rec.cost.total, 0);
  const roiPeriod = totalInvestment > 0 ? totalInvestment / costSavings : 0;
  
  return {
    annualRunoff,
    harvestable,
    demandMet: Math.round(demandMet),
    costSavings,
    roiPeriod: Math.round(roiPeriod * 10) / 10
  };
};