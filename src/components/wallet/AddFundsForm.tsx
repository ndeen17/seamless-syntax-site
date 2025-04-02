import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { addFunds } from '@/services/walletService';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be greater than 0" }),
});

type FormValues = z.infer<typeof formSchema>;

const AddFundsForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails") || '{}');
      const response = await addFunds({
        amount: values.amount,
        walletId: userDetails.id
      });
      toast({
        title: "Funds added successfully",
        description: `${values.amount} USD has been added to your wallet.`,
      });
      form.reset({ amount: 0 });
      // Optionally: trigger a callback to refresh wallet balance in WalletPage.
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to add funds",
        description: "There was an error processing your request. Please try again.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Funds</CardTitle>
        <CardDescription>Add money to your wallet to make purchases on our platform.</CardDescription>
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
                      <Input {...field} type="number" step="0.01" min="0" className="pl-8" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Processing...' : 'Add Funds'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm text-gray-500">
        <p>Funds will be available immediately after processing.</p>
        <p className="mt-1">For larger amounts, please contact support.</p>
      </CardFooter>
    </Card>
  );
};

export default AddFundsForm;