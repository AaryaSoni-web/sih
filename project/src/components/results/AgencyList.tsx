import React from 'react';
import { CertifiedAgency } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Phone, 
  MapPin, 
  Star, 
  Building, 
  Users, 
  Shield 
} from 'lucide-react';

interface AgencyListProps {
  agencies: CertifiedAgency[];
}

const getAgencyIcon = (type: CertifiedAgency['type']) => {
  switch (type) {
    case 'ngo': return Users;
    case 'contractor': return Building;
    case 'government': return Shield;
    default: return Building;
  }
};

const getAgencyColor = (type: CertifiedAgency['type']) => {
  switch (type) {
    case 'ngo': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    case 'contractor': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
    case 'government': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
  }
};

export const AgencyList: React.FC<AgencyListProps> = ({ agencies }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Certified Implementation Partners
      </h2>
      
      <div className="space-y-4">
        {agencies.map((agency) => {
          const Icon = getAgencyIcon(agency.type);
          const colorClass = getAgencyColor(agency.type);
          
          return (
            <Card key={agency.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {agency.name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {agency.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {agency.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {agency.location} • {agency.distance}km away
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {agency.specialization.map((spec, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    icon={Phone}
                    onClick={() => window.open(`tel:${agency.contact}`)}
                  >
                    Call
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};