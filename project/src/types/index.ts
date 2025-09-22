export interface UserData {
  location: string;
  coordinates?: { lat: number; lng: number };
  roofArea: number;
  dwellers: number;
  openSpace: number;
  buildingType: 'residential' | 'commercial' | 'institutional';
  soilType: 'clayey' | 'sandy' | 'rocky' | 'mixed';
  waterSource: 'municipal' | 'borewell' | 'both' | 'none';
}

export interface RainfallData {
  annualRainfall: number;
  monthlyDistribution: number[];
  rainyDays: number;
  intensity: 'low' | 'medium' | 'high';
}

export interface GroundwaterData {
  level: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  rechargeRate: number;
  aquiferType: 'confined' | 'unconfined' | 'perched';
}

export interface RWHRecommendation {
  type: 'tank' | 'soak_pit' | 'trench' | 'recharge_shaft' | 'percolation_pit';
  name: string;
  capacity: number;
  dimensions: {
    length?: number;
    width?: number;
    depth: number;
    diameter?: number;
  };
  cost: {
    material: number;
    labor: number;
    total: number;
  };
  suitability: number;
  diyFriendly: boolean;
  description: string;
}

export interface WaterSavings {
  annualRunoff: number;
  harvestable: number;
  demandMet: number;
  costSavings: number;
  roiPeriod: number;
}

export interface CertifiedAgency {
  id: string;
  name: string;
  type: 'ngo' | 'contractor' | 'government';
  rating: number;
  contact: string;
  location: string;
  specialization: string[];
  distance: number;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  subsidy: number;
  eligibility: string[];
  applicationUrl: string;
  description: string;
}