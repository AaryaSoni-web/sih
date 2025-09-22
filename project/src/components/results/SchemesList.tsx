import React from 'react';
import { GovernmentScheme } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  ExternalLink, 
  Percent, 
  CheckCircle, 
  FileText 
} from 'lucide-react';

interface SchemesListProps {
  schemes: GovernmentScheme[];
}

export const SchemesList: React.FC<SchemesListProps> = ({ schemes }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Government Schemes & Subsidies
      </h2>
      
      <div className="space-y-4">
        {schemes.map((scheme) => (
          <Card key={scheme.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {scheme.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Percent className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {scheme.subsidy}% Subsidy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {scheme.description}
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Eligibility Criteria:
              </h4>
              <ul className="space-y-1">
                {scheme.eligibility.map((criteria, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              size="sm"
              icon={ExternalLink}
              iconPosition="right"
              onClick={() => window.open(scheme.applicationUrl, '_blank')}
            >
              Apply Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};