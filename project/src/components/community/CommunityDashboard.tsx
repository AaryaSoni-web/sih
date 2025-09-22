import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Users, 
  TrendingUp, 
  MapPin, 
  Plus, 
  Eye,
  Droplets 
} from 'lucide-react';

interface CommunityProject {
  id: string;
  name: string;
  location: string;
  households: number;
  totalCapacity: number;
  status: 'planning' | 'active' | 'completed';
  progress: number;
}

export const CommunityDashboard: React.FC = () => {
  const [projects] = useState<CommunityProject[]>([
    {
      id: '1',
      name: 'Green Valley Residential Complex',
      location: 'Sector 15, Gurgaon',
      households: 45,
      totalCapacity: 25000,
      status: 'active',
      progress: 65
    },
    {
      id: '2',
      name: 'Sunrise Apartments Community',
      location: 'Whitefield, Bangalore',
      households: 32,
      totalCapacity: 18000,
      status: 'planning',
      progress: 25
    },
    {
      id: '3',
      name: 'Heritage Society RWH Project',
      location: 'Koramangala, Bangalore',
      households: 78,
      totalCapacity: 42000,
      status: 'completed',
      progress: 100
    }
  ]);

  const getStatusColor = (status: CommunityProject['status']) => {
    switch (status) {
      case 'planning': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'active': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const totalHouseholds = projects.reduce((sum, project) => sum + project.households, 0);
  const totalCapacity = projects.reduce((sum, project) => sum + project.totalCapacity, 0);
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Community Water Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Collective rainwater harvesting for greater impact
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mx-auto mb-4">
            <Users className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {totalHouseholds}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Households</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-4">
            <Droplets className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {(totalCapacity / 1000).toFixed(1)}K
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Liters Capacity</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {completedProjects}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed Projects</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-4">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {projects.length}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Areas</p>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button icon={Plus} size="lg">
          Start Community Project
        </Button>
        <Button variant="outline" size="lg">
          Join Existing Project
        </Button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Community Projects Near You
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {project.location}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Households</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {project.households}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {project.totalCapacity.toLocaleString()}L
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-gray-900 dark:text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" icon={Eye}>
                  View Details
                </Button>
                <Button size="sm">
                  {project.status === 'planning' ? 'Join Project' : 'Learn More'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};