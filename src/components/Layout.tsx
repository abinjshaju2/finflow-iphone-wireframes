
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, PieChart, Plus, User } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="iphone-screen bg-background">
      {/* Status Bar */}
      <div className="notch-area">
        <div className="status-bar text-xs font-semibold">
          <span>{currentTime}</span>
          <span>100%</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="app-content">
        {children}
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pb-6 pt-2 px-4">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => navigate('/')}
            className={`flex flex-col items-center ${isActive('/') ? 'text-expense-primary' : 'text-gray-500'}`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
          
          <button 
            onClick={() => navigate('/analytics')}
            className={`flex flex-col items-center ${isActive('/analytics') ? 'text-expense-primary' : 'text-gray-500'}`}
          >
            <PieChart className="h-5 w-5" />
            <span className="text-xs mt-1">Analytics</span>
          </button>
          
          <div className="relative -mt-5">
            <button 
              onClick={() => navigate('/add-expense')}
              className="bg-expense-primary text-white p-3 rounded-full shadow-lg"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
          
          <div className="w-5"></div> {/* Empty space for balance */}
          
          <button 
            onClick={() => navigate('/settings')}
            className={`flex flex-col items-center ${isActive('/settings') ? 'text-expense-primary' : 'text-gray-500'}`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </div>
      
      {/* Home Indicator */}
      <div className="home-indicator"></div>
    </div>
  );
};

export default Layout;
