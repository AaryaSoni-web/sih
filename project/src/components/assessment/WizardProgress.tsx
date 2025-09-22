import React from 'react';
import { Check } from 'lucide-react';

interface WizardProgressProps {
  steps: string[];
  currentStep: number;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-200 ${
                index < currentStep
                  ? 'bg-emerald-500 text-white'
                  : index === currentStep
                  ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`ml-3 font-medium ${
                index <= currentStep
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                index < currentStep
                  ? 'bg-emerald-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};