
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, PieChart, Plus, User, Download } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="app-content flex-1 overflow-auto">
        {children}
      </div>
      
      {/* Bottom Navigation - Material You Style */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.05)] border-t border-border/40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button 
            onClick={() => navigate('/')}
            className={`flex flex-col items-center py-3 px-4 ${isActive('/') ? 'text-expense-primary' : 'text-gray-500'}`}
          >
            <Calendar className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/analytics')}
            className={`flex flex-col items-center py-3 px-4 ${isActive('/analytics') ? 'text-expense-primary' : 'text-gray-500'}`}
          >
            <PieChart className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-xs mt-1 font-medium">Analytics</span>
          </button>
          
          <div className="relative -mt-5">
            <button 
              onClick={() => navigate('/add-expense')}
              className="material-fab h-14 w-14"
            >
              <Plus className="h-7 w-7" strokeWidth={2} />
            </button>
          </div>
          
          <button 
            onClick={() => navigate('/import-export')}
            className={`flex flex-col items-center py-3 px-4 ${isActive('/import-export') ? 'text-expense-primary' : 'text-gray-500'}`}
          >
            <Download className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-xs mt-1 font-medium">Export</span>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className={`flex flex-col items-center py-3 px-4 ${isActive('/settings') ? 'text-expense-primary' : 'text-gray-500'}`}
          >
            <User className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-xs mt-1 font-medium">Settings</span>
          </button>
        </div>
      </div>
      {/* Bottom Navigation End */}
    </div>
  );
};

export default Layout;
