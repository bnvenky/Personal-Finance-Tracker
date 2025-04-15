'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TransactionForm({ onSubmit, initialData }) {
  const [date, setDate] = useState(initialData?.date ? new Date(initialData.date) : new Date());
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialData || {}
  });

  const onFormSubmit = (data) => {
    onSubmit({ ...data, date: date.toISOString() });
    reset();
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register('description', { required: 'Description is required' })}
          placeholder="Enter transaction description"
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register('amount', { 
            required: 'Amount is required',
            valueAsNumber: true,
            min: { value: 0.01, message: 'Amount must be greater than 0' }
          })}
          placeholder="Enter amount"
        />
        {errors.amount && (
          <p className="text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full">
        {initialData ? 'Update' : 'Add'} Transaction
      </Button>
    </form>
  );
}