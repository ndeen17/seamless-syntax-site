import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Clock, ArrowUpDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WalletHeader from "@/components/wallet/WalletHeader";
import TransactionItem from "@/components/wallet/TransactionItem";
import WithdrawFundsForm from "@/components/wallet/WithdrawFundsForm";
import { getUserPayments } from "@/services/paymentService";
import { toast } from "@/hooks/use-toast";
import { Transaction } from "@/types/wallet";
import { useAuth } from "@/contexts/AuthContext";

import { loadStripe } from "@stripe/stripe-js";
import { stripVTControlCharacters } from "node:util";
import { authService } from "@/services/authService";

// outside the component
const stripePromise = loadStripe(
  "pk_test_51LWkUkEAeq2MFW6f94ApFRmNkRzMr6GKJK68CoI6VDJqjBktDUEIFmtDGGdzJouthdJ7oxe4Jft0UAH1Qk9rFgmZ00uS6aMCp4"
); // <<< USE YOUR PUBLIC KEY
const currencies = {
  card: [
    "usd",
    "eur",
    "gbp",
    "aud",
    "cad",
    "chf",
    "cny",
    "jpy",
    "inr",
    "rub",
    "brl",
    "mxn",
    "zar",
    "krw",
    "sgd",
    "hkd",
    "sek",
    "nok",
    "ngn",
    "dkk",
    "pln",
    "try",
  ],
  alipay: ["usd", "cny"],
  ideal: ["eur"],
  sepa_debit: ["eur"],
  sofort: ["eur"],
  giropay: ["eur"],
  p24: ["pln"],
  eps: ["eur"],
  bancontact: ["eur"],
  wechat_pay: ["usd", "cny"],
  us_bank_account: ["usd"],
  bacs_debit: ["gbp"],
  boleto: ["brl"],
  oxxo: ["mxn"],
  grabpay: ["sgd"],
  afterpay_clearpay: ["usd", "aud", "gbp"],
  klarna: ["usd", "eur", "gbp", "sek", "nok", "dkk"],
};

const exchangeRates = {
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
  brl: 0.2,
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
  try: 0.033,
};

function convertToUSD(amount, fromCurrency) {
  if (!exchangeRates[fromCurrency]) {
    alert(`Exchange rate for ${fromCurrency.toUpperCase()} not available.`);
    return null;
  }
  return amount * exchangeRates[fromCurrency];
}

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  // const { checkAuthStatus } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [funding, setFunding] = useState(false);
  const [userId, setUserId] = useState("");
  const [paymentType, setPaymentType] = useState("normal");
  const [cryptoPrice, setcryptoPrice] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthStatus = async () => {
    try {
      const response = await authService.verifyUser();
      if (response.message === "Please log in again.") {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error("Authentication error", error);
      return error;
    }
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await checkAuthStatus();
        console.log("Auth status response:", response); // Log the response here
        setLoading(false);
        const userDetails = response.id;
        setUserId(userDetails);
        console.log(userDetails);
        if (!userDetails) {
          toast({
            variant: "destructive",
            title: "Authentication required",
            description: "Please log in to access your wallet.",
          });
          return;
        }
        // const data = await getWalletBalance(userDetails.id);
        setBalance(Number(response.wallet_balance) || 0);

        // Fetch transactions
        setTransactionsLoading(true);
        try {
          const paymentsData = await getUserPayments(userDetails);
          // Convert payment data to transaction format
          const formattedTransactions: Transaction[] =
            paymentsData.payments.map((payment) => ({
              id: payment.id || `payment-${Date.now()}-${Math.random()}`,
              type:
                payment.transaction_type === "deposit"
                  ? "deposit"
                  : payment.transaction_type === "withdrawal"
                  ? "withdrawal"
                  : "transfer",
              amount: Number(payment.amount),
              currency: payment.currency || "USD",
              status: payment.payment_status,
              date: payment.created_at || new Date().toISOString(),
              description: payment.description,
              payment_gateway: payment.payment_gateway,
              payment_type: payment.payment_type,
              transaction_type: payment.transaction_type,
              ref: payment.ref,
              user_id: payment.user_id,
            }));

          setTransactions(formattedTransactions);
        } catch (error) {
          console.error("Error fetching transactions:", error);
          // Don't show an error for transactions, just leave them empty
        } finally {
          setTransactionsLoading(false);
        }
      } catch (error) {
        console.error("Error in fetching auth status:", error);
      }
    };

    fetchAuthStatus();
  }, []);

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  // inside handleAddFunds
  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod || !currency || !amount) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill all fields to proceed.",
      });
      return;
    }

    // Convert to USD before proceeding
    const amountInUSD = convertToUSD(amount, currency);
    if (amountInUSD === null) return;

    try {
      setFunding(true);

      // Store initial localStorage items
      localStorage.setItem("currentPayment", "add_to_wallet_with_stripe");

      localStorage.setItem(
        "paymentDetails",
        JSON.stringify({
          payment_type: "wallet_funding",
          payment_status: "pending",
          payment_gateway: "stripe",
          amount: amountInUSD.toFixed(2),
          transaction_type: "deposit",
          user_id: userId || "sgsf",
        })
      );

      // API request
      const response = await fetch(
        "https://aitool.asoroautomotive.com/api/create-currency-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: parseFloat(amount),
            currency,
            description: `Adding ${amount} ${currency.toUpperCase()} to wallet`,
            payment_method_types: [paymentMethod],
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const stripe = await stripePromise;
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId: data.sessionId });
        } else {
          throw new Error("Stripe initialization failed");
        }
      } else {
        toast({
          variant: "destructive",
          title: "Payment Error",
          description: data.message || "Failed to create checkout session.",
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setFunding(false);
    }
  };

  const handleCryptoPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceAmount = cryptoPrice;

    try {
      const response = await fetch(
        "https://aitool.asoroautomotive.com/api/create-crypto-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price_amount: Number(priceAmount),
            order_id: `id for ${userId}`,
            order_description: "Wallet funding",
          }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem(
          "paymentDetails",
          JSON.stringify({
            payment_type: "wallet_funding",
            payment_status: "pending",
            payment_gateway: "crypto currency",
            amount: priceAmount,
            transaction_type: "deposit",
            user_id: userId,
          })
        );
        window.location.href = data.data.invoice_url;
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center mb-2">
            <Wallet className="h-6 w-6 mr-2 text-blue-600" />
            My Wallet
          </h1>
          <p className="text-gray-600">
            Manage your funds and track your transactions
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <WalletHeader
                balance={balance}
                onAddFundsClick={() =>
                  document.getElementById("add-funds-tab")?.click()
                }
                onWithdrawClick={() =>
                  document.getElementById("withdraw-tab")?.click()
                }
              />

              <div className="mt-4 flex justify-end">
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Refresh balance
                </button>
              </div>
            </div>

            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="add-funds" id="add-funds-tab">
                  Add Funds
                </TabsTrigger>
                <TabsTrigger value="withdraw" id="withdraw-tab">
                  Withdraw
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="mt-0">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">
                      Recent Transactions
                    </h2>
                  </div>

                  {transactionsLoading ? (
                    <div className="py-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto mb-4"></div>
                      <p className="text-gray-500">Loading transactions...</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {transactions.length > 0 ? (
                        transactions.map((tx) => (
                          <TransactionItem key={tx.id} transaction={tx} />
                        ))
                      ) : (
                        <div className="py-8 text-center text-gray-500">
                          <Clock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p>No transactions yet</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="add-funds" className="mt-0">
                <div className="max-w-xl mx-auto space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Payment Method
                    </label>
                    <div className="flex mt-2">
                      <label className="mr-4 flex items-center">
                        <input
                          type="radio"
                          name="payment-method"
                          value="crypto"
                          checked={paymentType === "crypto"}
                          onChange={() => setPaymentType("crypto")}
                        />
                        <span className="ml-2">Cryptocurrency</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="payment-method"
                          value="normal"
                          checked={paymentType === "normal"}
                          onChange={() => setPaymentType("normal")}
                        />
                        <span className="ml-2">Normal Currencies</span>
                      </label>
                    </div>
                  </div>

                  {paymentType === "normal" && (
                    <div className="max-w-xl mx-auto space-y-6">
                      <form
                        onSubmit={handleAddFunds}
                        className="bg-white p-6 rounded-lg shadow-md space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-semibold mb-1">
                            Payment Method
                          </label>
                          <select
                            className="w-full p-2 border rounded"
                            value={paymentMethod}
                            onChange={(e) => {
                              setPaymentMethod(e.target.value);
                              setCurrency("");
                            }}
                          >
                            <option value="">Select a method</option>
                            {Object.keys(currencies).map((method) => (
                              <option key={method} value={method}>
                                {method.replace(/_/g, " ").toUpperCase()}
                              </option>
                            ))}
                          </select>
                        </div>

                        {paymentMethod && (
                          <div>
                            <label className="block text-sm font-semibold mb-1">
                              Currency
                            </label>
                            <select
                              className="w-full p-2 border rounded"
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                            >
                              <option value="">Select a currency</option>
                              {currencies[paymentMethod].map((cur) => (
                                <option key={cur} value={cur}>
                                  {cur.toUpperCase()}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {currency && (
                          <div>
                            <label className="block text-sm font-semibold mb-1">
                              Amount
                            </label>
                            <input
                              type="number"
                              min="1"
                              step="any"
                              className="w-full p-2 border rounded"
                              placeholder="Enter amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={funding}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                        >
                          {funding ? "Processing..." : "Proceed to Payment"}
                        </button>
                      </form>
                    </div>
                  )}

                  {paymentType === "crypto" && (
                    <div className="max-w-xl mx-auto space-y-6">
                      <form
                        onSubmit={handleCryptoPayment}
                        className="bg-white p-6 rounded-lg shadow-md space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-semibold mb-1">
                            Amount
                          </label>
                          <input
                            type="number"
                            min="1"
                            step="any"
                            className="w-full p-2 border rounded"
                            placeholder="Enter amount in USD"
                            value={cryptoPrice}
                            onChange={(e) => setcryptoPrice(e.target.value)}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={funding}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                        >
                          {funding ? "Processing..." : "Proceed to Payment"}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="withdraw" className="mt-0">
                <div className="max-w-xl mx-auto">
                  <WithdrawFundsForm currentBalance={balance} />
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WalletPage;
