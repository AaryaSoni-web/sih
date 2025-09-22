import React, { useState } from 'react';
import { Users, Home } from 'lucide-react';
import { UserData } from '../../../types';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';

interface BasicInfoStepProps {
  data: Partial<UserData>;
  onNext: (data: Partial<UserData>) => void;
  onBack?: () => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    dwellers: data.dwellers?.toString() || '',
    buildingType: data.buildingType || 'residential'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const buildingTypes = [
    { value: 'residential', label: 'Residential Building' },
    { value: 'commercial', label: 'Commercial Building' },
    { value: 'institutional', label: 'Institutional Building' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.dwellers || parseInt(formData.dwellers) < 1) {
      newErrors.dwellers = 'Please enter a valid number of dwellers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({
        dwellers: parseInt(formData.dwellers),
        buildingType: formData.buildingType as UserData['buildingType']
      });
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mx-auto mb-4">
          <Home className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tell us about your property
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We'll use this information to calculate your water needs and harvesting potential
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Number of people/dwellers"
          type="number"
          min="1"
          icon={Users}
          value={formData.dwellers}
          onChange={(e) => setFormData(prev => ({ ...prev, dwellers: e.target.value }))}
          error={errors.dwellers}
          hint="Include all permanent residents and regular occupants"
          placeholder="Enter number of dwellers"
        />

        <Select
          label="Building Type"
          options={buildingTypes}
          value={formData.buildingType}
          onChange={(e) => setFormData(prev => ({ ...prev, buildingType: e.target.value }))}
        />

        <div className="flex justify-between pt-6">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button type="submit" className={onBack ? '' : 'ml-auto'}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};