
import React, { useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { userData } from '@/services/expenseData';
import { toast } from '@/components/ui/use-toast';

const ImportExport = () => {
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    try {
      // Convert expenses to CSV format
      const headers = ['id', 'amount', 'category', 'date', 'description'];
      const csvRows = [headers.join(',')];
      
      userData.expenses.forEach(expense => {
        const row = [
          expense.id,
          expense.amount,
          expense.category,
          expense.date.toISOString(),
          expense.description || ''
        ];
        csvRows.push(row.join(','));
      });
      
      const csvContent = csvRows.join('\n');
      
      // Create a blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `expenses_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: `${userData.expenses.length} expenses exported`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data",
        variant: "destructive",
      });
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvContent = e.target?.result as string;
        const lines = csvContent.split('\n');
        const headers = lines[0].split(',');
        
        // Mock functionality - in a real app, this would update the actual data
        const count = lines.length - 1; // Subtract header row
        
        toast({
          title: "Import Successful",
          description: `${count} expenses imported`,
        });
      } catch (error) {
        console.error('Import error:', error);
        toast({
          title: "Import Failed",
          description: "Unable to process the uploaded file",
          variant: "destructive",
        });
      } finally {
        setIsImporting(false);
        // Reset file input
        event.target.value = '';
      }
    };
    
    reader.onerror = () => {
      toast({
        title: "Import Failed",
        description: "Error reading the file",
        variant: "destructive",
      });
      setIsImporting(false);
      // Reset file input
      event.target.value = '';
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Import / Export Data</h1>
      
      <div className="space-y-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Export Your Data</h2>
          <p className="text-sm text-gray-500 mb-4">
            Download all your expense entries as a CSV file that you can open in Excel or Google Sheets.
          </p>
          <Button onClick={handleExport} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export Expenses
          </Button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Import Data</h2>
          <p className="text-sm text-gray-500 mb-4">
            Upload a CSV file to import expenses. The file should have headers: id, amount, category, date, description.
          </p>
          <div className="relative">
            <input
              type="file"
              id="csv-upload"
              accept=".csv"
              onChange={handleImport}
              className="hidden"
              disabled={isImporting}
            />
            <label htmlFor="csv-upload">
              <Button variant="outline" className="w-full" disabled={isImporting} asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  {isImporting ? 'Processing...' : 'Upload CSV File'}
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExport;
