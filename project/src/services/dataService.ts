import { RainfallData, GroundwaterData, CertifiedAgency, GovernmentScheme } from '../types';

// Simulate API calls with realistic data
export const fetchRainfallData = async (location: string): Promise<RainfallData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data based on location
  const baseRainfall = Math.random() * 1000 + 500; // 500-1500mm
  return {
    annualRainfall: Math.round(baseRainfall),
    monthlyDistribution: Array.from({ length: 12 }, () => Math.round(Math.random() * 200)),
    rainyDays: Math.round(Math.random() * 50 + 60), // 60-110 days
    intensity: baseRainfall > 1200 ? 'high' : baseRainfall > 800 ? 'medium' : 'low'
  };
};

export const fetchGroundwaterData = async (location: string): Promise<GroundwaterData> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const level = Math.random() * 30 + 5; // 5-35 meters
  return {
    level: Math.round(level * 100) / 100,
    quality: level < 10 ? 'excellent' : level < 20 ? 'good' : level < 30 ? 'fair' : 'poor',
    rechargeRate: Math.round((Math.random() * 20 + 5) * 100) / 100, // 5-25 cm/year
    aquiferType: Math.random() > 0.5 ? 'unconfined' : 'confined'
  };
};

export const fetchCertifiedAgencies = async (location: string): Promise<CertifiedAgency[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const agencies: CertifiedAgency[] = [
    {
      id: '1',
      name: 'EcoWater Solutions',
      type: 'contractor',
      rating: 4.8,
      contact: '+91-9876543210',
      location: 'Within 5km',
      specialization: ['Residential RWH', 'Maintenance'],
      distance: 3.2
    },
    {
      id: '2',
      name: 'Green Earth Foundation',
      type: 'ngo',
      rating: 4.6,
      contact: '+91-9876543211',
      location: 'Within 8km',
      specialization: ['Community Projects', 'Training'],
      distance: 6.8
    },
    {
      id: '3',
      name: 'AquaTech Engineers',
      type: 'contractor',
      rating: 4.9,
      contact: '+91-9876543212',
      location: 'Within 10km',
      specialization: ['Large Scale', 'Commercial'],
      distance: 9.1
    }
  ];
  
  return agencies.sort((a, b) => a.distance - b.distance);
};

export const fetchGovernmentSchemes = async (location: string): Promise<GovernmentScheme[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [
    {
      id: '1',
      name: 'Jal Shakti Abhiyan - RWH Subsidy',
      subsidy: 50,
      eligibility: ['Residential Buildings', 'Plot Area > 100 sqm'],
      applicationUrl: 'https://jalshakti.gov.in/rwh-subsidy',
      description: 'Up to ₹50,000 subsidy for rainwater harvesting systems'
    },
    {
      id: '2',
      name: 'State Water Conservation Scheme',
      subsidy: 75,
      eligibility: ['Rural Areas', 'BPL Families'],
      applicationUrl: 'https://state-water.gov.in/conservation',
      description: 'Enhanced subsidy for rural and economically weaker sections'
    },
    {
      id: '3',
      name: 'Municipal RWH Incentive',
      subsidy: 30,
      eligibility: ['Urban Areas', 'Property Tax Payers'],
      applicationUrl: 'https://municipal.gov.in/rwh-incentive',
      description: 'Property tax rebate and installation incentives'
    }
  ];
};