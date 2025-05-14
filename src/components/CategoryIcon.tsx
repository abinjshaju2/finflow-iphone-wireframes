
import React from 'react';
import { Calendar, Car, ShoppingBag, Utensils, Tv, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

type CategoryType = 'food' | 'transport' | 'bills' | 'shopping' | 'entertainment' | 'other';

interface CategoryIconProps {
  category: CategoryType;
  size?: number;
  className?: string;
  color?: string;
  withBackground?: boolean;
}

const getCategoryColor = (category: CategoryType): string => {
  switch (category) {
    case 'food': return 'text-expense-food';
    case 'transport': return 'text-expense-transport';
    case 'bills': return 'text-expense-bills';
    case 'shopping': return 'text-expense-shopping';
    case 'entertainment': return 'text-expense-entertainment';
    default: return 'text-muted-foreground';
  }
};

const getCategoryBgColor = (category: CategoryType): string => {
  switch (category) {
    case 'food': return 'bg-expense-food/10';
    case 'transport': return 'bg-expense-transport/10';
    case 'bills': return 'bg-expense-bills/10';
    case 'shopping': return 'bg-expense-shopping/10';
    case 'entertainment': return 'bg-expense-entertainment/10';
    default: return 'bg-secondary';
  }
};

const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  size = 20, 
  className,
  color,
  withBackground = false
}) => {
  const renderIcon = () => {
    switch (category) {
      case 'food':
        return <Utensils size={size} />;
      case 'transport':
        return <Car size={size} />;
      case 'bills':
        return <CircleDollarSign size={size} />;
      case 'shopping':
        return <ShoppingBag size={size} />;
      case 'entertainment':
        return <Tv size={size} />;
      default:
        return <Calendar size={size} />;
    }
  };

  const colorClass = color ? color : getCategoryColor(category);
  
  if (withBackground) {
    return (
      <div className={cn(
        "flex items-center justify-center rounded-full p-2",
        getCategoryBgColor(category),
        className
      )}>
        <div className={colorClass}>{renderIcon()}</div>
      </div>
    );
  }

  return <div className={cn(colorClass, className)}>{renderIcon()}</div>;
};

export default CategoryIcon;
