import React, { useState } from 'react';
import { UserData } from '../../types';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { LocationStep } from './steps/LocationStep';
import { PropertyStep } from './steps/PropertyStep';
import { WizardProgress } from './WizardProgress';
import { Card } from '../ui/Card';

interface AssessmentWizardProps {
  onComplete: (data: UserData) => void;
}

export const AssessmentWizard: React.FC<AssessmentWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<Partial<UserData>>({});
  
  const steps = [
    { title: 'Basic Information', component: BasicInfoStep },
    { title: 'Location Details', component: LocationStep },
    { title: 'Property Information', component: PropertyStep }
  ];

  const handleStepComplete = (stepData: Partial<UserData>) => {
    const updatedData = { ...userData, ...stepData };
    setUserData(updatedData);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(updatedData as UserData);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8">
        <WizardProgress 
          steps={steps.map(s => s.title)} 
          currentStep={currentStep} 
        />
        
        <div className="mt-8">
          <CurrentStepComponent
            data={userData}
            onNext={handleStepComplete}
            onBack={currentStep > 0 ? handleBack : undefined}
          />
        </div>
      </Card>
    </div>
  );
};