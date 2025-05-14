
import React from 'react';
import { format } from 'date-fns';
import CategoryIcon from './CategoryIcon';

export interface Expense {
  id: number;
  amount: number;
  category: 'food' | 'transport' | 'bills' | 'shopping' | 'entertainment' | 'other';
  date: Date;
  description?: string;
}

interface ExpenseCardProps {
  expense: Expense;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
  const { amount, category, date, description } = expense;
  
  const getCategoryLabel = (cat: string): string => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-border/40 hover:bg-secondary/30 transition-colors">
      <div className="flex items-center gap-4">
        <CategoryIcon category={category} withBackground size={18} />
        <div>
          <h4 className="font-medium">{getCategoryLabel(category)}</h4>
          <p className="text-xs text-muted-foreground">
            {description || format(date, 'MMM d')}
          </p>
        </div>
      </div>
      <div className="font-semibold">₹{amount.toLocaleString()}</div>
    </div>
  );
};

export default ExpenseCard;
