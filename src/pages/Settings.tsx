
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { userData } from '@/services/expenseData';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const [salary, setSalary] = useState<string>(userData.salary.toString());
  const [budget, setBudget] = useState<string>(userData.budget.toString());
  const [paymentDate, setPaymentDate] = useState<number>(userData.paymentDate);
  const [autoSync, setAutoSync] = useState<boolean>(false);
  
  const handleSalaryChange = (value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setSalary(value);
    }
  };
  
  const handleBudgetChange = (value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setBudget(value);
    }
  };
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
    // In a real app, this would update the user's settings in a database
  };
  
  return (
    <div className="flex flex-col h-full pb-24 px-5">
      <h1 className="text-xl font-bold py-4">Salary Settings</h1>
      
      {/* Salary Input */}
      <div className="mb-6">
        <label className="text-gray-500 mb-1 block text-sm">Monthly Salary</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
          <input
            type="text"
            value={salary}
            onChange={(e) => handleSalaryChange(e.target.value)}
            className="w-full pl-10 pr-4 py-4 text-lg font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-expense-primary bg-white"
            placeholder="50000"
          />
        </div>
      </div>
      
      {/* Monthly Budget */}
      <div className="mb-6">
        <label className="text-gray-500 mb-1 block text-sm">Monthly Budget</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
          <input
            type="text"
            value={budget}
            onChange={(e) => handleBudgetChange(e.target.value)}
            className="w-full pl-10 pr-4 py-4 text-lg font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-expense-primary bg-white"
            placeholder="20000"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Recommended: {Math.round(parseInt(salary) * 0.4).toLocaleString()} (40% of salary)</p>
      </div>
      
      {/* Salary Date */}
      <div className="mb-6">
        <label className="text-gray-500 mb-1 block text-sm">Salary Credit Date</label>
        <div className="relative">
          <div className="flex items-center border rounded-xl overflow-hidden">
            <button 
              onClick={() => setPaymentDate(prev => Math.max(1, prev - 1))}
              className="px-4 py-4 bg-gray-50"
            >
              -
            </button>
            <div className="flex-1 flex items-center justify-center gap-2 py-4">
              <Calendar size={18} className="text-gray-500" />
              <span className="font-medium">{paymentDate}<sup>st</sup> of every month</span>
            </div>
            <button 
              onClick={() => setPaymentDate(prev => Math.min(28, prev + 1))}
              className="px-4 py-4 bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      {/* Bank Sync Toggle */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Bank Balance Sync</h3>
            <p className="text-xs text-gray-500">Automatically track expenses</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={autoSync} onChange={() => setAutoSync(!autoSync)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-expense-primary/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-expense-primary"></div>
          </label>
        </div>
      </div>
      
      {/* Save Button */}
      <div className="mt-auto mb-3">
        <Button 
          onClick={handleSaveSettings}
          className="w-full py-6 rounded-xl bg-expense-primary text-md font-medium"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
