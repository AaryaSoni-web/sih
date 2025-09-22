import React from 'react';
import { RWHRecommendation } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Container, 
  CircleDot, 
  Waves, 
  ArrowDown, 
  Building2, 
  IndianRupee,
  Ruler,
  CheckCircle
} from 'lucide-react';

interface RecommendationsGridProps {
  recommendations: RWHRecommendation[];
}

const getStructureIcon = (type: RWHRecommendation['type']) => {
  switch (type) {
    case 'tank': return Container;
    case 'soak_pit': return CircleDot;
    case 'trench': return Waves;
    case 'recharge_shaft': return ArrowDown;
    case 'percolation_pit': return Building2;
    default: return Container;
  }
};

const getStructureColor = (type: RWHRecommendation['type']) => {
  switch (type) {
    case 'tank': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
    case 'soak_pit': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    case 'trench': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
    case 'recharge_shaft': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
    case 'percolation_pit': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
  }
};

export const RecommendationsGrid: React.FC<RecommendationsGridProps> = ({ recommendations }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Recommended Structures
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customized solutions based on your property and local conditions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => {
          const Icon = getStructureIcon(rec.type);
          const colorClass = getStructureColor(rec.type);
          
          return (
            <Card key={index} variant="bordered" className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {rec.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        rec.suitability >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        rec.suitability >= 75 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {rec.suitability}% Suitable
                      </span>
                      {rec.diyFriendly && (
                        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
                          DIY Friendly
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {rec.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Container className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Capacity
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {rec.capacity.toLocaleString()}L
                  </span>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Total Cost
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ₹{rec.cost.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Ruler className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Dimensions
                  </span>
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  {rec.dimensions.length && rec.dimensions.width ? (
                    `${rec.dimensions.length}cm × ${rec.dimensions.width}cm × ${rec.dimensions.depth}cm`
                  ) : rec.dimensions.diameter ? (
                    `Diameter: ${rec.dimensions.diameter}cm, Depth: ${rec.dimensions.depth}cm`
                  ) : (
                    `Depth: ${rec.dimensions.depth}cm`
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Material: ₹{rec.cost.material.toLocaleString()} • 
                  Labor: ₹{rec.cost.labor.toLocaleString()}
                </div>
                <Button size="sm">
                  View Guide
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};