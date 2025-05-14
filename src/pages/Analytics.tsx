
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getExpensesByCategory, getExpensesByDay, getCurrentMonthSpent } from '@/services/expenseData';
import CategoryIcon from '@/components/CategoryIcon';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';

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
  
  // Material You color mapping for categories
  const COLORS = {
    food: 'hsl(var(--expense-food))',
    transport: 'hsl(var(--expense-transport))',
    bills: 'hsl(var(--expense-bills))',
    shopping: 'hsl(var(--expense-shopping))',
    entertainment: 'hsl(var(--expense-entertainment))',
    other: 'hsl(var(--muted-foreground))'
  };

  // Chart config for Material You styling
  const chartConfig = {
    food: { 
      label: 'Food', 
      theme: { light: 'var(--expense-food)', dark: 'var(--expense-food)' } 
    },
    transport: { 
      label: 'Transport', 
      theme: { light: 'var(--expense-transport)', dark: 'var(--expense-transport)' } 
    },
    bills: { 
      label: 'Bills', 
      theme: { light: 'var(--expense-bills)', dark: 'var(--expense-bills)' } 
    },
    shopping: { 
      label: 'Shopping', 
      theme: { light: 'var(--expense-shopping)', dark: 'var(--expense-shopping)' } 
    },
    entertainment: { 
      label: 'Entertainment', 
      theme: { light: 'var(--expense-entertainment)', dark: 'var(--expense-entertainment)' } 
    },
    other: { 
      label: 'Other', 
      theme: { light: 'var(--muted-foreground)', dark: 'var(--muted-foreground)' } 
    },
    amount: {
      label: 'Amount',
      theme: { light: 'var(--expense-primary)', dark: 'var(--expense-primary)' }
    }
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
      
      {/* Pie Chart - Material You Style */}
      <div className="bg-white rounded-3xl p-4 shadow-sm mb-6">
        <h2 className="font-semibold mb-2">Spending by Category</h2>
        <div className="h-60">
          <ChartContainer config={chartConfig} className="h-full">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                stroke="none"
              >
                {pieChartData.map(entry => (
                  <Cell 
                    key={`cell-${entry.name}`}
                    style={{ '--color-bg': COLORS[entry.name as keyof typeof COLORS] } as React.CSSProperties}
                    fill="var(--color-bg)"
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border bg-background p-2 shadow-md">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium capitalize">{data.name}</span>
                          <span className="text-xs font-bold">₹{data.value.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ChartContainer>
        </div>
        
        {/* Category Legend - Material You Style */}
        <div className="mt-2 space-y-2">
          {categoryPercentages.map(({ category, amount, percentage }) => (
            <div key={category} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <CategoryIcon category={category} withBackground size={16} />
                <span className="text-sm capitalize">{category}</span>
              </div>
              <div className="text-sm font-medium">
                <span>{percentage}%</span>
                <span className="ml-2 text-muted-foreground">₹{amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Line Chart - Material You Style */}
      <div className="bg-white rounded-3xl p-4 shadow-sm mb-6">
        <h2 className="font-semibold mb-2">Daily Spending Trend</h2>
        <div className="h-48">
          <ChartContainer config={chartConfig} className="h-full">
            <LineChart data={lineChartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--expense-primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--expense-primary))" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(day) => `${day}`}
                stroke="hsl(var(--muted-foreground))"
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `₹${value}`} 
                width={45}
                stroke="hsl(var(--muted-foreground))"
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl border bg-background p-2 shadow-md">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Day {label}</span>
                          <span className="text-xs font-bold">₹{payload[0].value?.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                name="amount"
                stroke="hsl(var(--expense-primary))" 
                strokeWidth={2.5}
                dot={{ 
                  fill: 'hsl(var(--expense-primary))', 
                  stroke: 'white',
                  r: 4,
                  strokeWidth: 2
                }}
                activeDot={{ 
                  r: 6, 
                  stroke: 'hsl(var(--expense-primary))',
                  strokeWidth: 2,
                  fill: 'white'
                }}
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
      
      {/* Insights - Material You Style */}
      <div className="bg-white rounded-3xl p-4 shadow-sm">
        <h2 className="font-semibold mb-2">Insights</h2>
        {categoryPercentages.length > 0 && (
          <div className="p-3 bg-expense-primary/10 rounded-xl mb-3">
            <p className="text-sm">
              You spent most on <span className="font-semibold capitalize">{categoryPercentages[0].category}</span> this month ({categoryPercentages[0].percentage}% of total expenses).
            </p>
          </div>
        )}
        {lineChartData.length > 0 && (
          <div className="p-3 rounded-xl" style={{ 
            backgroundColor: `${COLORS[categoryPercentages[0]?.category || 'other']}20`
          }}>
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
