import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/config/api';
import { loadStripe } from '@stripe/stripe-js';
import { createCurrencyPayment } from '@/services/paymentService';

const stripePromise = loadStripe('pk_test_51LWkUkEAeq2MFW6f94ApFRmNkRzMr6GKJK68CoI6VDJqjBktDUEIFmtDGGdzJouthdJ7oxe4Jft0UAH1Qk9rFgmZ00uS6aMCp4'); // Replace with your actual publishable key

// Payment methods available
const paymentMethods = [
  { value: 'card', label: 'Card' },
  { value: 'alipay', label: 'Alipay' },
  { value: 'ideal', label: 'iDEAL' },
  { value: 'sepa_debit', label: 'SEPA Direct Debit' },
  { value: 'sofort', label: 'SOFORT' },
  { value: 'giropay', label: 'Giropay' },
  { value: 'p24', label: 'Przelewy24 (P24)' },
  { value: 'eps', label: 'EPS' },
  { value: 'bancontact', label: 'Bancontact' },
  { value: 'wechat_pay', label: 'WeChat Pay' },
  { value: 'us_bank_account', label: 'US Bank Account' },
  { value: 'bacs_debit', label: 'BACS Direct Debit' },
  { value: 'boleto', label: 'Boleto' },
  { value: 'oxxo', label: 'OXXO' },
  { value: 'grabpay', label: 'GrabPay' },
  { value: 'afterpay_clearpay', label: 'Afterpay/Clearpay' },
  { value: 'klarna', label: 'Klarna' }
];

// Currencies available per payment method
const currenciesMap: Record<string, string[]> = {
  card: ['usd', 'eur', 'gbp', 'aud', 'cad', 'chf', 'cny', 'jpy', 'inr', 'rub', 'brl', 'mxn', 'zar', 'krw', 'sgd', 'hkd', 'sek', 'nok', 'ngn', 'dkk', 'pln', 'try'],
  alipay: ['usd', 'cny'],
  ideal: ['eur'],
  sepa_debit: ['eur'],
  sofort: ['eur'],
  giropay: ['eur'],
  p24: ['pln'],
  eps: ['eur'],
  bancontact: ['eur'],
  wechat_pay: ['usd', 'cny'],
  us_bank_account: ['usd'],
  bacs_debit: ['gbp'],
  boleto: ['brl'],
  oxxo: ['mxn'],
  grabpay: ['sgd'],
  afterpay_clearpay: ['usd', 'aud', 'gbp'],
  klarna: ['usd', 'eur', 'gbp', 'sek', 'nok', 'dkk']
};

// Hardcoded exchange rates (you may later move these to config or a dedicated API)
const exchangeRates: Record<string, number> = {
  usd: 1,
  eur: 1.1,
  gbp: 1.3,
  aud: 0.65,
  cad: 0.75,
  chf: 1.08,
  cny: 0.14,
  jpy: 0.0068,
  inr: 0.012,
  rub: 0.011,
  brl: 0.20,
  mxn: 0.058,
  zar: 0.055,
  krw: 0.00075,
  sgd: 0.74,
  hkd: 0.13,
  sek: 0.093,
  nok: 0.095,
  ngn: 0.0013,
  dkk: 0.15,
  pln: 0.25,
  try: 0.033
};

function convertToUSD(amount: number, fromCurrency: string): number | null {
  const rate = exchangeRates[fromCurrency];
  if (!rate) {
    alert(`Exchange rate for ${fromCurrency.toUpperCase()} not available.`);
    return null;
  }
  return amount * rate;
}

const CreateCurrencyPayment: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [currency, setCurrency] = useState<string>('usd');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [currencyOptions, setCurrencyOptions] = useState<string[]>(currenciesMap['card']);
  const [responseMsg, setResponseMsg] = useState<string>('');

  // When payment method changes, update available currencies and set the default currency
  useEffect(() => {
    const options = currenciesMap[paymentMethod] || [];
    setCurrencyOptions(options);
    setCurrency(options[0] || '');
  }, [paymentMethod]);

  async function createPaymentHandler() {
    localStorage.setItem('currentPayment', "add_to_wallet_with_stripe");
    const amountInUSD = convertToUSD(amount, currency);
    if (amountInUSD === null) return;
  
    localStorage.setItem('paymentDetails', JSON.stringify({
      payment_type: 'wallet_funding',
      payment_status: 'pending',
      payment_gateway: 'stripe',
      amount: amountInUSD.toFixed(2),
      transaction_type: 'deposit',
      user_id: JSON.parse(localStorage.getItem("userDetails") || '{}').id
    }));
  
    setResponseMsg('');
    try {
      const data = await createCurrencyPayment({
        amount: amount, // original input amount (in entered currency)
        currency: currency,
        description: description,
        payment_method_types: [paymentMethod]
      });
      if (data.sessionId) {
        setResponseMsg('Redirecting to checkout...');
        const stripe = await stripePromise;
        stripe?.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        setResponseMsg(`Error: ${data.message}`);
      }
    } catch (error: any) {
      setResponseMsg(`Error: ${error.message}`);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 className="text-xl font-bold mb-4">Create Currency Payment</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        >
          {paymentMethods.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        >
          {currencyOptions.map((cur) => (
            <option key={cur} value={cur}>
              {cur.toUpperCase()}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          required
          className="w-full p-3 border rounded mb-4"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <input
          type="text"
          placeholder="Description"
          required
          className="w-full p-3 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={createPaymentHandler}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded"
        >
          Create Payment
        </Button>
        {responseMsg && (
          <div className="mt-4 text-center text-sm text-red-500">{responseMsg}</div>
        )}
      </div>
    </div>
  );
};

export default CreateCurrencyPayment;