'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { format, startOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

export default function MonthlyChart({ transactions }) {
  const monthlyData = useMemo(() => {
    const endDate = new Date();
    const startDate = subMonths(endDate, 5);
    
    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    
    const monthlyTotals = months.map(month => {
      const monthStart = startOfMonth(month);
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return format(transactionDate, 'yyyy-MM') === format(monthStart, 'yyyy-MM');
      });
      
      const total = monthTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
      
      return {
        month: format(monthStart, 'MMM yyyy'),
        total: total
      };
    });

    return monthlyTotals;
  }, [transactions]);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`$${value.toFixed(2)}`, 'Total']}
          />
          <Bar dataKey="total" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}