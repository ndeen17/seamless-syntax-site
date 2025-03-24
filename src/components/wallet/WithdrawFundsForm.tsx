
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { withdrawFunds } from '@/services/walletService';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be greater than 0" }),
  accountNumber: z.string().min(5, { message: "Account number is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const WithdrawFundsForm: React.FC<{ currentBalance: number }> = ({ currentBalance }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      accountNumber: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.amount > currentBalance) {
      form.setError('amount', { 
        type: 'manual', 
        message: 'Withdrawal amount exceeds your current balance' 
      });
      return;
    }

    try {
      // In a real app, you would add the user's wallet ID here
      const response = await withdrawFunds({ 
        amount: values.amount,
        accountNumber: values.accountNumber,
        walletId: '123', // This would come from auth context
      });
      toast({
        title: "Withdrawal request submitted",
        description: `${values.amount} USD withdrawal is being processed.`,
      });
      form.reset({ amount: 0, accountNumber: '' });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to process withdrawal",
        description: "There was an error processing your request. Please try again.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw Funds</CardTitle>
        <CardDescription>Withdraw money from your wallet to your bank account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USD)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input {...field} type="number" step="0.01" min="0" max={currentBalance} className="pl-8" />
                    </div>
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">Available balance: ${currentBalance.toFixed(2)}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your account number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Processing...' : 'Withdraw Funds'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm text-gray-500">
        <p>Withdrawals typically process within 1-3 business days.</p>
        <p className="mt-1">Minimum withdrawal amount is $10.</p>
      </CardFooter>
    </Card>
  );
};

export default WithdrawFundsForm;
