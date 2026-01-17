import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus,
  Send,
  TrendingUp,
  TrendingDown,
  Wallet,
  RefreshCcw,
  Search,
  Filter,
  DollarSign,
  Globe,
  Calendar,
  MoreHorizontal,
  Trash2,
  Bot
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCurrency, setFilterCurrency] = useState<string>('all');
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

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesCurrency = filterCurrency === 'all' || t.currency === filterCurrency;
    return matchesSearch && matchesType && matchesCurrency;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0a] px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Wallet</h1>
              <p className="text-sm text-gray-400">Multi-Currency Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchData}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <RefreshCcw className="w-5 h-5" />
            </Button>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 flex items-center gap-1">
              <Bot className="w-3 h-3" />
              Telegram Connected
            </Badge>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-[#16213e] to-[#0f3460] border-0 shadow-2xl">
          <CardContent className="p-6">
            <p className="text-gray-400 text-sm mb-1">Total Balance (USD)</p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-white">
                ${Math.abs(balanceUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {balanceUsd < 0 && <span className="text-red-400 text-sm">Deficit</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowDownLeft className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">Income</span>
                </div>
                <p className="text-xl font-bold text-white">
                  ${totalIncomeUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpRight className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm">Expense</span>
                </div>
                <p className="text-xl font-bold text-white">
                  ${totalExpenseUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4 grid grid-cols-2 gap-4">
        <Dialog open={dialogOpen && form.type === 'income'} onOpenChange={(open) => {
          setDialogOpen(open);
          if (open) setForm(prev => ({ ...prev, type: 'income' }));
        }}>
          <DialogTrigger asChild>
            <Button 
              className="h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-xl shadow-lg shadow-green-500/20"
            >
              <ArrowDownLeft className="w-5 h-5 mr-2" />
              Add Income
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a2e] border-gray-800 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ArrowDownLeft className="w-4 h-4 text-green-400" />
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
              className="h-14 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 rounded-xl shadow-lg shadow-red-500/20"
            >
              <ArrowUpRight className="w-5 h-5 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a2e] border-gray-800 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-red-400" />
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

      {/* Search & Filter */}
      <div className="px-6 py-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1a1a2e] border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
          <Select value={filterType} onValueChange={(v: 'all' | 'income' | 'expense') => setFilterType(v)}>
            <SelectTrigger className="w-[120px] bg-[#1a1a2e] border-gray-800 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-gray-800">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCurrency} onValueChange={setFilterCurrency}>
            <SelectTrigger className="w-[100px] bg-[#1a1a2e] border-gray-800 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-gray-800">
              <SelectItem value="all">All</SelectItem>
              {currencies.map(c => (
                <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
          <span className="text-sm text-gray-400">{filteredTransactions.length} transactions</span>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No transactions found</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <TransactionCard
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
          <Label className="text-gray-400 text-sm">Amount *</Label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {selectedCurrency?.symbol || '$'}
            </span>
            <Input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="pl-8 bg-[#0f0f1a] border-gray-700 text-white text-lg"
            />
          </div>
        </div>
        <div>
          <Label className="text-gray-400 text-sm">Currency</Label>
          <Select value={form.currency} onValueChange={(v) => setForm({ ...form, currency: v })}>
            <SelectTrigger className="mt-1 bg-[#0f0f1a] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-gray-700 max-h-[200px]">
              {currencies.map(c => (
                <SelectItem key={c.code} value={c.code}>
                  <div className="flex items-center gap-2">
                    <span>{c.symbol}</span>
                    <span>{c.code}</span>
                    <span className="text-gray-500 text-xs">({c.country})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-gray-400 text-sm">Purpose *</Label>
        <Input
          placeholder="What was this for?"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          className="mt-1 bg-[#0f0f1a] border-gray-700 text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-400 text-sm">Category</Label>
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger className="mt-1 bg-[#0f0f1a] border-gray-700 text-white">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-gray-700">
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-gray-400 text-sm">Payment Method</Label>
          <Select value={form.payment_method} onValueChange={(v) => setForm({ ...form, payment_method: v })}>
            <SelectTrigger className="mt-1 bg-[#0f0f1a] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-gray-700">
              {paymentMethods.map(method => (
                <SelectItem key={method} value={method.toLowerCase()}>{method}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-gray-400 text-sm">Description (Optional)</Label>
        <Textarea
          placeholder="Add details..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 bg-[#0f0f1a] border-gray-700 text-white resize-none"
          rows={2}
        />
      </div>

      {selectedCurrency && selectedCurrency.code !== 'USD' && form.amount && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-blue-400 text-sm">
            <RefreshCcw className="w-4 h-4" />
            <span>
              ≈ ${(parseFloat(form.amount) * selectedCurrency.exchange_rate_to_usd).toFixed(2)} USD
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Rate: 1 {selectedCurrency.code} = ${selectedCurrency.exchange_rate_to_usd.toFixed(4)} USD
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="flex-1 border border-gray-700 text-gray-400 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className={cn(
            "flex-1",
            form.type === 'income' 
              ? "bg-gradient-to-r from-green-500 to-emerald-600" 
              : "bg-gradient-to-r from-red-500 to-pink-600"
          )}
        >
          Add {form.type === 'income' ? 'Income' : 'Expense'}
        </Button>
      </div>
    </div>
  );
};

// Transaction Card Component
interface TransactionCardProps {
  transaction: Transaction;
  getCurrencySymbol: (code: string) => string;
  onDelete: (id: string) => void;
}

const TransactionCard = ({ transaction, getCurrencySymbol, onDelete }: TransactionCardProps) => {
  const isIncome = transaction.type === 'income';

  return (
    <div className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-800/50 hover:border-gray-700 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isIncome ? "bg-green-500/20" : "bg-red-500/20"
          )}>
            {isIncome ? (
              <ArrowDownLeft className="w-5 h-5 text-green-400" />
            ) : (
              <ArrowUpRight className="w-5 h-5 text-red-400" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-white font-medium">{transaction.purpose}</p>
            <div className="flex items-center gap-2 mt-1">
              {transaction.category && (
                <Badge variant="outline" className="bg-gray-800/50 text-gray-400 border-gray-700 text-xs">
                  {transaction.category}
                </Badge>
              )}
              {transaction.source === 'telegram' && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                  <Bot className="w-3 h-3 mr-1" />
                  Telegram
                </Badge>
              )}
              <span className="text-xs text-gray-500">
                {format(new Date(transaction.created_at), 'MMM dd, yyyy • h:mm a')}
              </span>
            </div>
            {transaction.description && (
              <p className="text-sm text-gray-500 mt-1">{transaction.description}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className={cn(
            "text-lg font-semibold",
            isIncome ? "text-green-400" : "text-red-400"
          )}>
            {isIncome ? '+' : '-'}{getCurrencySymbol(transaction.currency)}{transaction.amount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            ≈ ${transaction.amount_in_usd?.toFixed(2)} USD
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(transaction.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-400 hover:bg-red-500/10 mt-1"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminWallet;
