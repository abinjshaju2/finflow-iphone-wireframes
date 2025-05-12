
import React from 'react';
import { format } from 'date-fns';
import ProgressBar from '@/components/ProgressBar';
import ExpenseCard from '@/components/ExpenseCard';
import { getCurrentMonthSpent, getRecentExpenses, userData } from '@/services/expenseData';

const Dashboard: React.FC = () => {
  const currentMonth = format(new Date(), 'MMMM yyyy');
  const spent = getCurrentMonthSpent();
  const budget = userData.budget;
  const remaining = Math.max(0, budget - spent);
  const recentExpenses = getRecentExpenses(5);
  
  return (
    <div className="flex flex-col h-full pb-24">
      {/* Header */}
      <div className="px-5 pt-3 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{currentMonth}</h1>
          <p className="text-gray-500 text-sm">Hello, {userData.name}</p>
        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
          {userData.avatar ? (
            <img src={userData.avatar} alt="User avatar" />
          ) : (
            <span className="text-gray-500 font-semibold">{userData.name.charAt(0)}</span>
          )}
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="px-5 space-y-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-500">Monthly Budget</h3>
              <span className="text-sm font-medium">₹{budget.toLocaleString()}</span>
            </div>
            <ProgressBar value={spent} max={budget} />
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-sm text-gray-500">Spent</p>
                <p className="text-lg font-semibold">₹{spent.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-lg font-semibold text-green-600">₹{remaining.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="px-5 mt-6 flex-1 overflow-hidden">
        <h2 className="font-semibold mb-3">Recent Transactions</h2>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {recentExpenses.length > 0 ? (
            recentExpenses.map(expense => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))
          ) : (
            <div className="p-5 text-center text-gray-500">No recent transactions</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
