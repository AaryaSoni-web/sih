import React from 'react';
import { Droplets, Heart, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">AquaHarvest</h3>
                <p className="text-sm text-gray-400">Smart Water Solutions</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Empowering communities to harness rainwater for a sustainable future through intelligent assessment and personalized recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#assessment" className="text-gray-300 hover:text-emerald-400 transition-colors">Water Assessment</a></li>
              <li><a href="#community" className="text-gray-300 hover:text-emerald-400 transition-colors">Community Plans</a></li>
              <li><a href="#resources" className="text-gray-300 hover:text-emerald-400 transition-colors">DIY Guides</a></li>
              <li><a href="#contractors" className="text-gray-300 hover:text-emerald-400 transition-colors">Find Contractors</a></li>
            </ul>
          </div>

          {/* Government */}
          <div>
            <h4 className="font-semibold text-white mb-4">Government</h4>
            <ul className="space-y-2">
              <li><a href="#schemes" className="text-gray-300 hover:text-emerald-400 transition-colors">Subsidy Schemes</a></li>
              <li><a href="#policies" className="text-gray-300 hover:text-emerald-400 transition-colors">Water Policies</a></li>
              <li><a href="#reports" className="text-gray-300 hover:text-emerald-400 transition-colors">Generate Reports</a></li>
              <li><a href="#compliance" className="text-gray-300 hover:text-emerald-400 transition-colors">Compliance</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#help" className="text-gray-300 hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-emerald-400 transition-colors">Contact Us</a></li>
              <li><a href="#feedback" className="text-gray-300 hover:text-emerald-400 transition-colors">Feedback</a></li>
              <li className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="text-gray-300 text-sm">Multiple Languages</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for sustainable water management • © 2025 AquaHarvest</span>
          </p>
        </div>
      </div>
    </footer>
  );
};