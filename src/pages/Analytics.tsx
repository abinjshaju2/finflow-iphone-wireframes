
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { getExpensesByCategory, getExpensesByDay, getCurrentMonthSpent } from '@/services/expenseData';
import CategoryIcon from '@/components/CategoryIcon';

const Analytics: React.FC = () => {
  const expensesByCategory = useMemo(() => getExpensesByCategory(), []);
  const expensesByDay = useMemo(() => getExpensesByDay(), []);
  const totalSpent = getCurrentMonthSpent();
  
  // Prepare pie chart data
  const pieChartData = useMemo(() => {
    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  }, [expensesByCategory]);
  
  // Prepare line chart data
  const lineChartData = useMemo(() => {
    return Object.entries(expensesByDay)
      .map(([day, amount]) => ({
        day: parseInt(day),
        amount
      }))
      .filter(item => item.amount > 0) // Only include days with expenses
      .sort((a, b) => a.day - b.day); // Sort by day
  }, [expensesByDay]);
  
  // Color mapping for categories
  const COLORS = {
    food: '#F97316',
    transport: '#0EA5E9',
    bills: '#D946EF',
    shopping: '#22C55E',
    entertainment: '#EAB308',
    other: '#94A3B8'
  };
  
  // Calculate percentages for each category
  const categoryPercentages = useMemo(() => {
    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      category: category as 'food' | 'transport' | 'bills' | 'shopping' | 'entertainment' | 'other',
      amount,
      percentage: totalSpent ? Math.round((amount / totalSpent) * 100) : 0
    })).sort((a, b) => b.percentage - a.percentage);
  }, [expensesByCategory, totalSpent]);
  
  return (
    <div className="flex flex-col h-full pb-24 px-5">
      <h1 className="text-xl font-bold py-4">Analytics</h1>
      
      {/* Pie Chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <h2 className="font-semibold mb-2">Spending by Category</h2>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                labelFormatter={(name) => name.charAt(0).toUpperCase() + name.slice(1)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Category Legend */}
        <div className="mt-2 space-y-2">
          {categoryPercentages.map(({ category, amount, percentage }) => (
            <div key={category} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <CategoryIcon category={category} withBackground size={16} />
                <span className="text-sm capitalize">{category}</span>
              </div>
              <div className="text-sm font-medium">
                <span>{percentage}%</span>
                <span className="ml-2 text-gray-500">₹{amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Line Chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <h2 className="font-semibold mb-2">Daily Spending Trend</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(day) => `${day}`}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `₹${value}`} 
                width={45}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                labelFormatter={(day) => `Day ${day}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8B5CF6" 
                strokeWidth={2} 
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Insights */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="font-semibold mb-2">Insights</h2>
        {categoryPercentages.length > 0 && (
          <div className="p-3 bg-expense-primary/5 rounded-xl">
            <p className="text-sm">
              You spent most on <span className="font-semibold capitalize">{categoryPercentages[0].category}</span> this month ({categoryPercentages[0].percentage}% of total expenses).
            </p>
          </div>
        )}
        {lineChartData.length > 0 && (
          <div className="p-3 bg-blue-50 rounded-xl mt-3">
            <p className="text-sm">
              Your highest spending day was day {
                lineChartData.reduce((max, item) => item.amount > lineChartData[max].amount ? lineChartData.indexOf(item) : max, 0) + 1
              } with ₹{Math.max(...lineChartData.map(item => item.amount)).toLocaleString()}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
