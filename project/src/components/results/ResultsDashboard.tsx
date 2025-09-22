import React, { useState, useEffect } from 'react';
import { UserData, RainfallData, GroundwaterData, RWHRecommendation, WaterSavings, CertifiedAgency, GovernmentScheme } from '../../types';
import { fetchRainfallData, fetchGroundwaterData, fetchCertifiedAgencies, fetchGovernmentSchemes } from '../../services/dataService';
import { calculateRunoff, generateRecommendations, calculateWaterSavings } from '../../utils/calculations';
import { WaterAssessment } from './WaterAssessment';
import { RecommendationsGrid } from './RecommendationsGrid';
import { AgencyList } from './AgencyList';
import { SchemesList } from './SchemesList';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Button } from '../ui/Button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';

interface ResultsDashboardProps {
  userData: UserData;
  onBack: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ userData, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [rainfallData, setRainfallData] = useState<RainfallData | null>(null);
  const [groundwaterData, setGroundwaterData] = useState<GroundwaterData | null>(null);
  const [recommendations, setRecommendations] = useState<RWHRecommendation[]>([]);
  const [waterSavings, setWaterSavings] = useState<WaterSavings | null>(null);
  const [agencies, setAgencies] = useState<CertifiedAgency[]>([]);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [rainfall, groundwater, agencyData, schemeData] = await Promise.all([
          fetchRainfallData(userData.location),
          fetchGroundwaterData(userData.location),
          fetchCertifiedAgencies(userData.location),
          fetchGovernmentSchemes(userData.location)
        ]);

        // Calculate recommendations and savings
        const runoff = calculateRunoff(userData, rainfall);
        const recs = generateRecommendations(userData, runoff);
        const savings = calculateWaterSavings(userData, rainfall, recs);

        setRainfallData(rainfall);
        setGroundwaterData(groundwater);
        setRecommendations(recs);
        setWaterSavings(savings);
        setAgencies(agencyData);
        setSchemes(schemeData);
      } catch (error) {
        console.error('Error loading assessment data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userData]);

  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF report
    console.log('Downloading assessment report...');
  };

  const handleShareResults = () => {
    // In a real app, this would open a sharing modal
    console.log('Sharing results...');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
        <p className="ml-4 text-lg text-gray-600 dark:text-gray-400">
          Analyzing your rainwater harvesting potential...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" icon={ArrowLeft} onClick={onBack}>
            Back to Assessment
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" icon={Download} onClick={handleDownloadReport}>
            Download Report
          </Button>
          <Button variant="secondary" icon={Share2} onClick={handleShareResults}>
            Share Results
          </Button>
        </div>
      </div>

      {/* Main Assessment */}
      {rainfallData && groundwaterData && waterSavings && (
        <WaterAssessment
          userData={userData}
          rainfallData={rainfallData}
          groundwaterData={groundwaterData}
          waterSavings={waterSavings}
        />
      )}

      {/* Recommendations */}
      <RecommendationsGrid recommendations={recommendations} />

      {/* Agencies and Schemes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AgencyList agencies={agencies} />
        <SchemesList schemes={schemes} />
      </div>
    </div>
  );
};