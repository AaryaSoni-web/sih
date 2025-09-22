import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { UserData } from '../../../types';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

interface LocationStepProps {
  data: Partial<UserData>;
  onNext: (data: Partial<UserData>) => void;
  onBack?: () => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    location: data.location || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLocating, setIsLocating] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.location.trim()) {
      newErrors.location = 'Please enter your location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAutoDetect = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you'd reverse geocode these coordinates
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          setErrors({ location: 'Unable to detect location. Please enter manually.' });
        }
      );
    } else {
      setIsLocating(false);
      setErrors({ location: 'Geolocation is not supported by this browser.' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({
        location: formData.location.trim()
      });
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-4">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Where are you located?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We'll fetch local rainfall data and groundwater information for your area
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            label="Your Location"
            type="text"
            icon={MapPin}
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            error={errors.location}
            hint="Enter city, district, or pin code"
            placeholder="e.g., Mumbai, Maharashtra or 400001"
          />
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={Navigation}
            onClick={handleAutoDetect}
            loading={isLocating}
            className="mt-3"
          >
            {isLocating ? 'Detecting...' : 'Auto-detect location'}
          </Button>
        </div>

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