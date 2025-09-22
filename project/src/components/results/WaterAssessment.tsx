import React from 'react';
import { UserData, RainfallData, GroundwaterData, WaterSavings } from '../../types';
import { Card } from '../ui/Card';
import { Droplets, TrendingUp, MapPin, Gauge } from 'lucide-react';

interface WaterAssessmentProps {
  userData: UserData;
  rainfallData: RainfallData;
  groundwaterData: GroundwaterData;
  waterSavings: WaterSavings;
}

export const WaterAssessment: React.FC<WaterAssessmentProps> = ({
  userData,
  rainfallData,
  groundwaterData,
  waterSavings
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Water Action Plan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Personalized recommendations for {userData.location}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-4">
            <Droplets className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {waterSavings.harvestable.toLocaleString()}L
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Annual Harvestable</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mx-auto mb-4">
            <Gauge className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {waterSavings.demandMet}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Demand Coverage</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            ₹{waterSavings.costSavings.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Annual Savings</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full mx-auto mb-4">
            <MapPin className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {waterSavings.roiPeriod}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Years ROI</p>
        </Card>
      </div>

      {/* Environmental Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Rainfall Analysis
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Annual Rainfall</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {rainfallData.annualRainfall}mm
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Rainy Days</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {rainfallData.rainyDays} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Intensity</span>
              <span className={`font-semibold capitalize ${
                rainfallData.intensity === 'high' ? 'text-red-600' :
                rainfallData.intensity === 'medium' ? 'text-amber-600' : 'text-green-600'
              }`}>
                {rainfallData.intensity}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Groundwater Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Water Table Depth</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {groundwaterData.level}m
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Quality</span>
              <span className={`font-semibold capitalize ${
                groundwaterData.quality === 'excellent' ? 'text-green-600' :
                groundwaterData.quality === 'good' ? 'text-blue-600' :
                groundwaterData.quality === 'fair' ? 'text-amber-600' : 'text-red-600'
              }`}>
                {groundwaterData.quality}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Recharge Rate</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {groundwaterData.rechargeRate} cm/year
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};