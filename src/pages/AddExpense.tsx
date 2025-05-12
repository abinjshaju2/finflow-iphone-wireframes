
import React, { useState } from 'react';
import { format } from 'date-fns';
import CategoryIcon from '@/components/CategoryIcon';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type CategoryType = 'food' | 'transport' | 'bills' | 'shopping' | 'entertainment' | 'other';

const AddExpense: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [note, setNote] = useState<string>('');
  const navigate = useNavigate();
  
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'food', label: 'Food' },
    { id: 'transport', label: 'Transport' },
    { id: 'bills', label: 'Bills' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'other', label: 'Other' },
  ];
  
  const handleAmountChange = (value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleSubmit = () => {
    if (!amount || !selectedCategory) {
      toast.error("Please enter amount and select category");
      return;
    }
    
    // In a real app, we would save this to a database
    toast.success("Expense added successfully");
    navigate('/');
  };
  
  const handlePayNow = () => {
    if (!amount || !selectedCategory) {
      toast.error("Please enter amount and select category");
      return;
    }
    
    // In a real app, this would open payment app
    toast.success("Opening payment app...");
    
    // After 2 seconds, save expense and navigate back
    setTimeout(() => {
      toast.success("Payment successful");
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-full pb-24 px-5">
      <h1 className="text-xl font-bold py-4">Add Expense</h1>
      
      {/* Amount Input */}
      <div className="mb-6">
        <label className="text-gray-500 mb-1 block text-sm">Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
          <input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full pl-10 pr-4 py-4 text-2xl font-semibold border rounded-xl focus:outline-none focus:ring-2 focus:ring-expense-primary bg-white"
            placeholder="0"
          />
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <label className="text-gray-500 mb-3 block text-sm">Category</label>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center p-4 rounded-xl border ${
                selectedCategory === category.id
                  ? 'border-expense-primary bg-expense-primary/5'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <CategoryIcon 
                category={category.id} 
                size={22} 
                withBackground 
                className="mb-2"
              />
              <span className="text-sm">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Date Picker */}
      <div className="mb-6">
        <label className="text-gray-500 mb-1 block text-sm">Date</label>
        <button className="w-full flex items-center justify-between px-4 py-4 rounded-xl border bg-white">
          <span>{format(date, 'MMMM d, yyyy')}</span>
          <Calendar size={18} className="text-gray-500" />
        </button>
      </div>
      
      {/* Notes */}
      <div className="mb-6">
        <label className="text-gray-500 mb-1 block text-sm">Notes (Optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-4 rounded-xl border bg-white resize-none focus:outline-none focus:ring-2 focus:ring-expense-primary"
          placeholder="Add notes..."
          rows={2}
        />
      </div>
      
      {/* Action Buttons */}
      <div className="mt-auto mb-3 grid grid-cols-2 gap-3">
        <Button 
          onClick={handleSubmit}
          variant="outline" 
          className="w-full py-6 rounded-xl text-md font-medium"
        >
          Save
        </Button>
        <Button 
          onClick={handlePayNow}
          className="w-full py-6 rounded-xl bg-expense-primary text-md font-medium"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
