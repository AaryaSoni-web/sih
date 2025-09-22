import React from 'react';
import { Droplets, Sun, Moon, Menu } from 'lucide-react';
import { useThemeContext } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">AquaHarvest</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Smart Water Solutions</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#assessment" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
              Assessment
            </a>
            <a href="#community" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
              Community
            </a>
            <a href="#resources" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
              Resources
            </a>
            <a href="#schemes" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
              Schemes
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              icon={theme === 'light' ? Moon : Sun}
              onClick={toggleTheme}
              className="p-2"
            />
            <Button
              variant="ghost"
              size="sm"
              icon={Menu}
              onClick={onMenuToggle}
              className="p-2 md:hidden"
            />
          </div>
        </div>
      </div>
    </header>
  );
};