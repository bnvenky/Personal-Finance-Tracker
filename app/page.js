'use client';

import { useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyChart from '@/components/MonthlyChart';
import { Card } from '@/components/ui/card';

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    ));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Personal Finance Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
            <TransactionForm onSubmit={addTransaction} />
          </Card>
          
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Monthly Expenses</h2>
            <MonthlyChart transactions={transactions} />
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionList 
            transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={editTransaction}
          />
        </Card>
      </div>
    </div>
  );
}