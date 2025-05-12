
import { Expense } from '../components/ExpenseCard';

// Generate mock expenses
const generateMockExpenses = (): Expense[] => {
  const today = new Date();
  const categories: ('food' | 'transport' | 'bills' | 'shopping' | 'entertainment' | 'other')[] = [
    'food', 'transport', 'bills', 'shopping', 'entertainment', 'other'
  ];
  
  const descriptions: Record<string, string[]> = {
    food: ['Lunch', 'Dinner', 'Groceries', 'Coffee', 'Restaurant'],
    transport: ['Uber', 'Metro', 'Bus', 'Petrol', 'Parking'],
    bills: ['Electricity', 'Water', 'Internet', 'Mobile', 'Rent'],
    shopping: ['Clothes', 'Electronics', 'Home Decor', 'Gifts', 'Books'],
    entertainment: ['Movies', 'Concert', 'Games', 'Subscription', 'Pub'],
    other: ['Healthcare', 'Education', 'Charity', 'Personal Care', 'Miscellaneous']
  };
  
  const expenses: Expense[] = [];
  
  // Create 20 random expenses within the last 30 days
  for (let i = 0; i < 20; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomDescription = descriptions[randomCategory][Math.floor(Math.random() * descriptions[randomCategory].length)];
    
    // Random date within the last 30 days
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const date = new Date(today);
    date.setDate(date.getDate() - randomDaysAgo);
    
    // Random amount between ₹100 and ₹5000
    const amount = Math.floor(Math.random() * 4900 + 100);
    
    expenses.push({
      id: i,
      amount,
      category: randomCategory,
      date,
      description: randomDescription
    });
  }
  
  // Sort by date (newest first)
  return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Mock user data
export const userData = {
  name: 'Ananya Singh',
  avatar: '',
  salary: 50000,
  budget: 20000,
  paymentDate: 1, // 1st of the month
  expenses: generateMockExpenses()
};

// Get total spent in current month
export const getCurrentMonthSpent = (): number => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  return userData.expenses.reduce((total, expense) => {
    const expenseMonth = expense.date.getMonth();
    const expenseYear = expense.date.getFullYear();
    
    if (expenseMonth === currentMonth && expenseYear === currentYear) {
      return total + expense.amount;
    }
    return total;
  }, 0);
};

// Get expenses grouped by category for analytics
export const getExpensesByCategory = (): Record<string, number> => {
  const categorySums: Record<string, number> = {};
  
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  userData.expenses.forEach(expense => {
    const expenseMonth = expense.date.getMonth();
    const expenseYear = expense.date.getFullYear();
    
    if (expenseMonth === currentMonth && expenseYear === currentYear) {
      if (!categorySums[expense.category]) {
        categorySums[expense.category] = 0;
      }
      categorySums[expense.category] += expense.amount;
    }
  });
  
  return categorySums;
};

// Get expenses grouped by day for trend analysis
export const getExpensesByDay = (): Record<string, number> => {
  const daySums: Record<string, number> = {};
  
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Initialize with all days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    daySums[i.toString()] = 0;
  }
  
  userData.expenses.forEach(expense => {
    const expenseMonth = expense.date.getMonth();
    const expenseYear = expense.date.getFullYear();
    
    if (expenseMonth === currentMonth && expenseYear === currentYear) {
      const day = expense.date.getDate().toString();
      daySums[day] += expense.amount;
    }
  });
  
  return daySums;
};

// Get recent expenses
export const getRecentExpenses = (limit = 5): Expense[] => {
  return userData.expenses.slice(0, limit);
};
