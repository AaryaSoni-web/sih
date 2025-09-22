import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  BookOpen, 
  Video, 
  Download, 
  ExternalLink,
  Play,
  FileText,
  Wrench
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'video' | 'pdf' | 'tool';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  downloadUrl?: string;
  videoUrl?: string;
}

export const ResourcesHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'DIY Soak Pit Installation Guide',
      description: 'Step-by-step instructions for building a basic soak pit for rainwater infiltration',
      type: 'guide',
      difficulty: 'beginner',
      duration: '15 min read'
    },
    {
      id: '2',
      title: 'Rooftop Water Collection System',
      description: 'Complete video tutorial on setting up gutters and first flush diverters',
      type: 'video',
      difficulty: 'intermediate',
      duration: '25 min',
      videoUrl: '#'
    },
    {
      id: '3',
      title: 'RWH System Maintenance Manual',
      description: 'Comprehensive PDF guide on maintaining your rainwater harvesting system',
      type: 'pdf',
      difficulty: 'beginner',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Cost Estimation Calculator',
      description: 'Interactive tool to estimate costs for different RWH structures',
      type: 'tool',
      difficulty: 'beginner'
    },
    {
      id: '5',
      title: 'Advanced Recharge Shaft Design',
      description: 'Technical specifications and construction details for deep recharge systems',
      type: 'guide',
      difficulty: 'advanced',
      duration: '30 min read'
    },
    {
      id: '6',
      title: 'Community Project Planning',
      description: 'How to organize and implement community-wide rainwater harvesting projects',
      type: 'video',
      difficulty: 'intermediate',
      duration: '40 min',
      videoUrl: '#'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Resources' },
    { key: 'guide', label: 'DIY Guides' },
    { key: 'video', label: 'Video Tutorials' },
    { key: 'pdf', label: 'Downloads' },
    { key: 'tool', label: 'Tools' }
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === activeCategory);

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'guide': return BookOpen;
      case 'video': return Video;
      case 'pdf': return FileText;
      case 'tool': return Wrench;
      default: return BookOpen;
    }
  };

  const getResourceColor = (type: Resource['type']) => {
    switch (type) {
      case 'guide': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'video': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'pdf': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'tool': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getDifficultyColor = (difficulty: Resource['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'intermediate': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Resources Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Everything you need to implement rainwater harvesting
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={activeCategory === category.key ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category.key)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const Icon = getResourceIcon(resource.type);
          const iconColor = getResourceColor(resource.type);
          const difficultyColor = getDifficultyColor(resource.difficulty);

          return (
            <Card key={resource.id} className="p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${difficultyColor}`}>
                  {resource.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {resource.description}
              </p>

              {resource.duration && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                  {resource.duration}
                </p>
              )}

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-500 capitalize">
                  {resource.type}
                </span>
                
                {resource.type === 'video' && (
                  <Button
                    size="sm"
                    icon={Play}
                    onClick={() => resource.videoUrl && window.open(resource.videoUrl)}
                  >
                    Watch
                  </Button>
                )}
                
                {resource.type === 'pdf' && (
                  <Button
                    size="sm"
                    icon={Download}
                    onClick={() => resource.downloadUrl && window.open(resource.downloadUrl)}
                  >
                    Download
                  </Button>
                )}
                
                {resource.type === 'guide' && (
                  <Button size="sm" icon={BookOpen}>
                    Read Guide
                  </Button>
                )}
                
                {resource.type === 'tool' && (
                  <Button size="sm" icon={ExternalLink}>
                    Open Tool
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Need Personalized Help?</h2>
        <p className="text-emerald-100 mb-4">
          Get expert consultation for your specific rainwater harvesting needs
        </p>
        <Button variant="outline" className="bg-white text-emerald-600 hover:bg-gray-50">
          Contact an Expert
        </Button>
      </div>
    </div>
  );
};