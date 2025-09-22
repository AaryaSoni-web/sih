import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AssessmentWizard } from './components/assessment/AssessmentWizard';
import { ResultsDashboard } from './components/results/ResultsDashboard';
import { CommunityDashboard } from './components/community/CommunityDashboard';
import { ResourcesHub } from './components/resources/ResourcesHub';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { UserData } from './types';
import { 
  Droplets, 
  Calculator, 
  Users, 
  BookOpen, 
  TrendingUp,
  Shield,
  Zap,
  Award
} from 'lucide-react';

type AppView = 'home' | 'assessment' | 'results' | 'community' | 'resources';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [assessmentData, setAssessmentData] = useState<UserData | null>(null);

  const handleAssessmentComplete = (data: UserData) => {
    setAssessmentData(data);
    setCurrentView('results');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setAssessmentData(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'assessment':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AssessmentWizard onComplete={handleAssessmentComplete} />
            </div>
          </div>
        );
      
      case 'results':
        return assessmentData ? (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ResultsDashboard 
                userData={assessmentData} 
                onBack={() => setCurrentView('assessment')} 
              />
            </div>
          </div>
        ) : null;
      
      case 'community':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CommunityDashboard />
            </div>
          </div>
        );
      
      case 'resources':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ResourcesHub />
            </div>
          </div>
        );
      
      default:
        return <HomePage onStartAssessment={() => setCurrentView('assessment')} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Header onMenuToggle={() => {/* Mobile menu implementation */}} />
        
        {/* Navigation */}
        {currentView === 'home' && (
          <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-8 py-4">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="text-emerald-600 border-b-2 border-emerald-600 pb-2 font-medium"
                >
                  Home
                </button>
                <button 
                  onClick={() => setCurrentView('assessment')}
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 pb-2 font-medium"
                >
                  Assessment
                </button>
                <button 
                  onClick={() => setCurrentView('community')}
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 pb-2 font-medium"
                >
                  Community
                </button>
                <button 
                  onClick={() => setCurrentView('resources')}
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 pb-2 font-medium"
                >
                  Resources
                </button>
              </div>
            </div>
          </nav>
        )}
        
        <main>
          {renderContent()}
        </main>
        
        {currentView === 'home' && <Footer />}
      </div>
    </ThemeProvider>
  );
}

const HomePage: React.FC<{ onStartAssessment: () => void }> = ({ onStartAssessment }) => {
  const features = [
    {
      icon: Calculator,
      title: 'Smart Assessment',
      description: 'AI-powered analysis of your rainwater harvesting potential using local data'
    },
    {
      icon: Shield,
      title: 'Certified Partners',
      description: 'Connect with verified contractors and NGOs for professional implementation'
    },
    {
      icon: TrendingUp,
      title: 'ROI Calculator',
      description: 'Detailed cost-benefit analysis with government subsidy integration'
    },
    {
      icon: Users,
      title: 'Community Projects',
      description: 'Aggregate households for larger impact and shared resources'
    },
    {
      icon: Zap,
      title: 'DIY Solutions',
      description: 'Step-by-step guides for affordable, self-built systems'
    },
    {
      icon: Award,
      title: 'Government Schemes',
      description: 'Automatic matching with applicable subsidies and incentives'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-50 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto mb-8">
              <Droplets className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Harvest Every Drop,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                {' '}Power Every Home
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Transform your property into a water-smart solution with personalized rainwater harvesting recommendations, 
              certified implementation partners, and government subsidy integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onStartAssessment} className="text-lg px-8 py-4">
                Start Free Assessment
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Assessments Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500M+</div>
              <div className="text-gray-600 dark:text-gray-400">Liters Potential Identified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">₹2.5Cr+</div>
              <div className="text-gray-600 dark:text-gray-400">Water Bill Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-gray-600 dark:text-gray-400">Certified Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Water Harvesting Solution
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From assessment to implementation, we provide everything you need for successful rainwater harvesting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Water Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Get your personalized rainwater harvesting plan in just 5 minutes
          </p>
          <Button 
            size="lg" 
            onClick={onStartAssessment}
            className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-8 py-4"
          >
            Begin Assessment Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default App;