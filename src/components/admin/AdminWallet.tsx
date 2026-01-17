import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  RefreshCcw,
  ChevronRight,
  User,
  DollarSign,
  PiggyBank,
  Send,
  CreditCard,
  History,
  Settings,
  Trash2,
  Bot,
  Banknote,
  Coins
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  amount_in_usd: number | null;
  exchange_rate: number;
  purpose: string;
  description: string | null;
  category: string | null;
  payment_method: string | null;
  country: string | null;
  source: string;
  created_at: string;
}

interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  country: string | null;
  exchange_rate_to_usd: number;
  is_active: boolean;
}

const AdminWallet = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'history'>('home');
  const { toast } = useToast();

  const [form, setForm] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    currency: 'USD',
    purpose: '',
    description: '',
    category: '',
    payment_method: 'cash',
    country: ''
  });

  const categories = {
    income: ['Client Payment', 'Project Fee', 'Consultation', 'Freelance', 'Investment', 'Refund', 'Other'],
    expense: ['Shopping', 'Food', 'Travel', 'Software', 'Hardware', 'Marketing', 'Salary', 'Rent', 'Utilities', 'Other']
  };

  const paymentMethods = ['Cash', 'Bank Transfer', 'Credit Card', 'PayPal', 'Crypto', 'bKash', 'Nagad', 'Wise'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [transactionsRes, currenciesRes] = await Promise.all([
        supabase.from('wallet_transactions').select('*').order('created_at', { ascending: false }),
        supabase.from('supported_currencies').select('*').eq('is_active', true).order('code')
      ]);

      if (transactionsRes.error) throw transactionsRes.error;
      if (currenciesRes.error) throw currenciesRes.error;

      setTransactions(transactionsRes.data || []);
      setCurrencies(currenciesRes.data || []);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async () => {
    if (!form.amount || !form.purpose) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const selectedCurrency = currencies.find(c => c.code === form.currency);
      const exchangeRate = selectedCurrency?.exchange_rate_to_usd || 1;
      const amountInUsd = parseFloat(form.amount) * exchangeRate;

      const { error } = await supabase.from('wallet_transactions').insert([{
        type: form.type,
        amount: parseFloat(form.amount),
        currency: form.currency,
        amount_in_usd: amountInUsd,
        exchange_rate: exchangeRate,
        purpose: form.purpose,
        description: form.description || null,
        category: form.category || null,
        payment_method: form.payment_method,
        country: form.country || selectedCurrency?.country || null,
        source: 'admin'
      }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${form.type === 'income' ? 'Income' : 'Expense'} added successfully`
      });

      setDialogOpen(false);
      setForm({
        type: 'expense',
        amount: '',
        currency: 'USD',
        purpose: '',
        description: '',
        category: '',
        payment_method: 'cash',
        country: ''
      });
      fetchData();
    } catch (error: any) {
      console.error('Error adding transaction:', error);
      toast({
        title: "Error",
        description: "Failed to add transaction",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
      const { error } = await supabase.from('wallet_transactions').delete().eq('id', id);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Transaction deleted"
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: "Error",
        description: "Failed to delete transaction",
        variant: "destructive"
      });
    }
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || '$';
  };

  const totalIncomeUsd = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (t.amount_in_usd || 0), 0);

  const totalExpenseUsd = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t.amount_in_usd || 0), 0);

  const balanceUsd = totalIncomeUsd - totalExpenseUsd;

  // Calculate this month's stats
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthTransactions = transactions.filter(t => {
    const d = new Date(t.created_at);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });
  const monthlyIncome = thisMonthTransactions.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount_in_usd || 0), 0);
  const monthlyExpense = thisMonthTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount_in_usd || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#f5f5f5]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#f5f5f5] px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Money</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchData}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-full"
            >
              <RefreshCcw className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Main Balance Card */}
        <Card className="bg-white rounded-3xl shadow-sm border-0 mb-4">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-base font-medium">Cash balance</span>
              <button className="flex items-center gap-1 text-gray-400 text-sm">
                Account & routing
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-6">
              ${balanceUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Dialog open={dialogOpen && form.type === 'income'} onOpenChange={(open) => {
                setDialogOpen(open);
                if (open) setForm(prev => ({ ...prev, type: 'income' }));
              }}>
                <DialogTrigger asChild>
                  <Button 
                    className="h-12 bg-[#f0f0f0] hover:bg-[#e5e5e5] text-gray-900 font-semibold border-0 rounded-full shadow-none"
                  >
                    Add Cash
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <ArrowDownLeft className="w-4 h-4 text-green-600" />
                      </div>
                      Add Income
                    </DialogTitle>
                  </DialogHeader>
                  <TransactionForm 
                    form={form} 
                    setForm={setForm} 
                    currencies={currencies}
                    categories={categories.income}
                    paymentMethods={paymentMethods}
                    onSubmit={handleAddTransaction}
                    onCancel={() => setDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={dialogOpen && form.type === 'expense'} onOpenChange={(open) => {
                setDialogOpen(open);
                if (open) setForm(prev => ({ ...prev, type: 'expense' }));
              }}>
                <DialogTrigger asChild>
                  <Button 
                    className="h-12 bg-[#f0f0f0] hover:bg-[#e5e5e5] text-gray-900 font-semibold border-0 rounded-full shadow-none"
                  >
                    Cash Out
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-red-600" />
                      </div>
                      Add Expense
                    </DialogTitle>
                  </DialogHeader>
                  <TransactionForm 
                    form={form} 
                    setForm={setForm} 
                    currencies={currencies}
                    categories={categories.expense}
                    paymentMethods={paymentMethods}
                    onSubmit={handleAddTransaction}
                    onCancel={() => setDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Income Card */}
          <Card className="bg-white rounded-3xl shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900 font-semibold">Income</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Banknote className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${totalIncomeUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-sm text-gray-500 mt-1">Total received</p>
            </CardContent>
          </Card>

          {/* Expense Card */}
          <Card className="bg-white rounded-3xl shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900 font-semibold">Expense</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Send className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${totalExpenseUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-sm text-gray-500 mt-1">Total spent</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Monthly Income */}
          <Card className="bg-white rounded-3xl shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900 font-semibold">This Month</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-sm text-green-600 mt-1">+{transactions.filter(t => t.type === 'income' && new Date(t.created_at).getMonth() === thisMonth).length} transactions</p>
            </CardContent>
          </Card>

          {/* Currencies */}
          <Card className="bg-white rounded-3xl shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900 font-semibold">Currencies</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {currencies.length}
              </div>
              <p className="text-sm text-gray-500 mt-1">Supported</p>
            </CardContent>
          </Card>
        </div>

        {/* Telegram Bot Card */}
        <Card className="bg-white rounded-3xl shadow-sm border-0 mb-3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Telegram Bot</p>
                  <p className="text-sm text-gray-500">Add transactions via chat</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 border-0">
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="px-5 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <span className="text-sm text-gray-500">{transactions.length} total</span>
        </div>

        <ScrollArea className="h-[350px]">
          <div className="space-y-2">
            {transactions.length === 0 ? (
              <Card className="bg-white rounded-2xl shadow-sm border-0">
                <CardContent className="py-12 text-center">
                  <Wallet className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500">No transactions yet</p>
                </CardContent>
              </Card>
            ) : (
              transactions.slice(0, 10).map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  getCurrencySymbol={getCurrencySymbol}
                  onDelete={handleDeleteTransaction}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1">
          <DollarSign className="w-6 h-6 text-gray-900" />
          <span className="text-xs text-gray-900 font-medium">${balanceUsd.toFixed(0)}</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <CreditCard className="w-6 h-6 text-gray-400" />
        </button>
        <button className="flex flex-col items-center gap-1">
          <Banknote className="w-6 h-6 text-gray-400" />
        </button>
        <button className="flex flex-col items-center gap-1">
          <PiggyBank className="w-6 h-6 text-gray-400" />
        </button>
        <button className="flex flex-col items-center gap-1">
          <History className="w-6 h-6 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

// Transaction Form Component
interface TransactionFormProps {
  form: any;
  setForm: (form: any) => void;
  currencies: Currency[];
  categories: string[];
  paymentMethods: string[];
  onSubmit: () => void;
  onCancel: () => void;
}

const TransactionForm = ({ form, setForm, currencies, categories, paymentMethods, onSubmit, onCancel }: TransactionFormProps) => {
  const selectedCurrency = currencies.find(c => c.code === form.currency);

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-600 text-sm">Amount *</Label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {selectedCurrency?.symbol || '$'}
            </span>
            <Input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="pl-8 bg-gray-50 border-gray-200 text-gray-900 text-lg rounded-xl"
            />
          </div>
        </div>
        <div>
          <Label className="text-gray-600 text-sm">Currency</Label>
          <Select value={form.currency} onValueChange={(v) => setForm({ ...form, currency: v })}>
            <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 text-gray-900 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 max-h-[200px]">
              {currencies.map(c => (
                <SelectItem key={c.code} value={c.code}>
                  <div className="flex items-center gap-2">
                    <span>{c.symbol}</span>
                    <span>{c.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-gray-600 text-sm">Purpose *</Label>
        <Input
          placeholder="What was this for?"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          className="mt-1 bg-gray-50 border-gray-200 text-gray-900 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-600 text-sm">Category</Label>
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 text-gray-900 rounded-xl">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-gray-600 text-sm">Payment Method</Label>
          <Select value={form.payment_method} onValueChange={(v) => setForm({ ...form, payment_method: v })}>
            <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 text-gray-900 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {paymentMethods.map(method => (
                <SelectItem key={method} value={method.toLowerCase()}>{method}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-gray-600 text-sm">Description (Optional)</Label>
        <Textarea
          placeholder="Add details..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 bg-gray-50 border-gray-200 text-gray-900 resize-none rounded-xl"
          rows={2}
        />
      </div>

      {selectedCurrency && selectedCurrency.code !== 'USD' && form.amount && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
          <div className="flex items-center gap-2 text-blue-700 text-sm">
            <RefreshCcw className="w-4 h-4" />
            <span>
              ≈ ${(parseFloat(form.amount) * selectedCurrency.exchange_rate_to_usd).toFixed(2)} USD
            </span>
          </div>
          <p className="text-xs text-blue-500 mt-1">
            Rate: 1 {selectedCurrency.code} = ${selectedCurrency.exchange_rate_to_usd.toFixed(4)} USD
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-full h-12"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className={cn(
            "flex-1 h-12 rounded-full font-semibold",
            form.type === 'income' 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-gray-900 hover:bg-gray-800 text-white"
          )}
        >
          Add {form.type === 'income' ? 'Income' : 'Expense'}
        </Button>
      </div>
    </div>
  );
};

// Transaction Item Component
interface TransactionItemProps {
  transaction: Transaction;
  getCurrencySymbol: (code: string) => string;
  onDelete: (id: string) => void;
}

const TransactionItem = ({ transaction, getCurrencySymbol, onDelete }: TransactionItemProps) => {
  const isIncome = transaction.type === 'income';

  return (
    <Card className="bg-white rounded-2xl shadow-sm border-0 hover:shadow-md transition-shadow group">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isIncome ? "bg-green-100" : "bg-gray-100"
            )}>
              {isIncome ? (
                <ArrowDownLeft className="w-5 h-5 text-green-600" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div>
              <p className="text-gray-900 font-medium">{transaction.purpose}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {format(new Date(transaction.created_at), 'MMM dd')}
                </span>
                {transaction.source === 'telegram' && (
                  <Badge className="bg-blue-50 text-blue-600 border-0 text-[10px] px-1.5 py-0">
                    Telegram
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right flex items-center gap-2">
            <div>
              <p className={cn(
                "text-lg font-semibold",
                isIncome ? "text-green-600" : "text-gray-900"
              )}>
                {isIncome ? '+' : '-'}{getCurrencySymbol(transaction.currency)}{transaction.amount.toLocaleString()}
              </p>
              {transaction.currency !== 'USD' && (
                <p className="text-xs text-gray-400">
                  ≈ ${transaction.amount_in_usd?.toFixed(2)}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(transaction.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 hover:bg-red-50 h-8 w-8"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminWallet;
