import React, { useState } from 'react';
import { Square, Layers, Droplets } from 'lucide-react';
import { UserData } from '../../../types';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';

interface PropertyStepProps {
  data: Partial<UserData>;
  onNext: (data: Partial<UserData>) => void;
  onBack?: () => void;
}

export const PropertyStep: React.FC<PropertyStepProps> = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    roofArea: data.roofArea?.toString() || '',
    openSpace: data.openSpace?.toString() || '',
    soilType: data.soilType || 'mixed',
    waterSource: data.waterSource || 'municipal'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const soilTypes = [
    { value: 'clayey', label: 'Clayey (Heavy, water-retaining)' },
    { value: 'sandy', label: 'Sandy (Light, well-draining)' },
    { value: 'rocky', label: 'Rocky (Hard, poor drainage)' },
    { value: 'mixed', label: 'Mixed/Loamy (Balanced)' }
  ];

  const waterSources = [
    { value: 'municipal', label: 'Municipal Water Supply' },
    { value: 'borewell', label: 'Borewell/Tubewell' },
    { value: 'both', label: 'Both Municipal & Borewell' },
    { value: 'none', label: 'No reliable source' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.roofArea || parseFloat(formData.roofArea) < 10) {
      newErrors.roofArea = 'Please enter a valid roof area (minimum 10 sq.m)';
    }
    
    if (!formData.openSpace || parseFloat(formData.openSpace) < 0) {
      newErrors.openSpace = 'Please enter the available open space (0 if none)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({
        roofArea: parseFloat(formData.roofArea),
        openSpace: parseFloat(formData.openSpace),
        soilType: formData.soilType as UserData['soilType'],
        waterSource: formData.waterSource as UserData['waterSource']
      });
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mx-auto mb-4">
          <Square className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Property specifications
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          These details help us recommend the most suitable harvesting structures
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Roof Area (sq. meters)"
            type="number"
            min="10"
            step="0.1"
            icon={Square}
            value={formData.roofArea}
            onChange={(e) => setFormData(prev => ({ ...prev, roofArea: e.target.value }))}
            error={errors.roofArea}
            hint="Total covered area from which water can be collected"
            placeholder="e.g., 150"
          />

          <Input
            label="Open Space (sq. meters)"
            type="number"
            min="0"
            step="0.1"
            icon={Layers}
            value={formData.openSpace}
            onChange={(e) => setFormData(prev => ({ ...prev, openSpace: e.target.value }))}
            error={errors.openSpace}
            hint="Available space for recharge structures"
            placeholder="e.g., 50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Select
            label="Soil Type"
            options={soilTypes}
            value={formData.soilType}
            onChange={(e) => setFormData(prev => ({ ...prev, soilType: e.target.value }))}
          />

          <Select
            label="Current Water Source"
            options={waterSources}
            value={formData.waterSource}
            onChange={(e) => setFormData(prev => ({ ...prev, waterSource: e.target.value }))}
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Droplets className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                Measurement Tips
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                <li>• Roof area: Length × Width of all covered areas</li>
                <li>• Open space: Available ground area excluding built-up portions</li>
                <li>• Soil type affects water absorption and recharge efficiency</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button type="submit" className={onBack ? '' : 'ml-auto'}>
            Generate Assessment
          </Button>
        </div>
      </form>
    </div>
  );
};