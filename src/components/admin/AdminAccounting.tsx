import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Download, 
  CalendarIcon,
  DollarSign,
  Receipt,
  Trash2,
  Edit,
  FileText,
  Upload,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  payment_method: string;
  vendor?: string;
  client_id?: string;
  invoice_id?: string;
  receipt_url?: string;
  notes?: string;
  status: string;
}

interface Income {
  id: string;
  date: string;
  source: string;
  description: string;
  amount: number;
  payment_method: string;
  client_id?: string;
  invoice_id?: string;
  receipt_url?: string;
  notes?: string;
  status: string;
}

interface Client {
  id: string;
  name: string;
}

const AdminAccounting = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('overview');
  const { toast } = useToast();

  const [expenseForm, setExpenseForm] = useState({
    date: new Date(),
    category: '',
    description: '',
    amount: '',
    payment_method: 'cash',
    vendor: '',
    client_id: '',
    notes: ''
  });

  const [incomeForm, setIncomeForm] = useState({
    date: new Date(),
    source: '',
    description: '',
    amount: '',
    payment_method: 'cash',
    client_id: '',
    notes: ''
  });

  const expenseCategories = [
    'Office Supplies',
    'Software & Tools',
    'Marketing & Ads',
    'Salaries',
    'Rent & Utilities',
    'Travel',
    'Equipment',
    'Contractors',
    'Client Projects',
    'Miscellaneous'
  ];

  const incomeSources = [
    'Client Payment',
    'Project Fee',
    'Consultation',
    'Recurring Service',
    'Other Income'
  ];

  const paymentMethods = [
    'Cash',
    'Bank Transfer',
    'Credit Card',
    'PayPal',
    'Stripe',
    'Crypto',
    'Check'
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expensesRes, incomeRes, clientsRes] = await Promise.all([
        supabase.from('expenses').select('*').order('date', { ascending: false }),
        supabase.from('income').select('*').order('date', { ascending: false }),
        supabase.from('clients').select('id, name')
      ]);

      if (expensesRes.error) throw expensesRes.error;
      if (incomeRes.error) throw incomeRes.error;
      if (clientsRes.error) throw clientsRes.error;

      setExpenses(expensesRes.data || []);
      setIncome(incomeRes.data || []);
      setClients(clientsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load accounting data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async () => {
    try {
      const { error } = await supabase.from('expenses').insert([{
        date: format(expenseForm.date, 'yyyy-MM-dd'),
        category: expenseForm.category,
        description: expenseForm.description,
        amount: parseFloat(expenseForm.amount),
        payment_method: expenseForm.payment_method,
        vendor: expenseForm.vendor || null,
        client_id: expenseForm.client_id || null,
        notes: expenseForm.notes || null
      }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Expense added successfully"
      });

      setExpenseDialogOpen(false);
      setExpenseForm({
        date: new Date(),
        category: '',
        description: '',
        amount: '',
        payment_method: 'cash',
        vendor: '',
        client_id: '',
        notes: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive"
      });
    }
  };

  const handleAddIncome = async () => {
    try {
      const { error } = await supabase.from('income').insert([{
        date: format(incomeForm.date, 'yyyy-MM-dd'),
        source: incomeForm.source,
        description: incomeForm.description,
        amount: parseFloat(incomeForm.amount),
        payment_method: incomeForm.payment_method,
        client_id: incomeForm.client_id || null,
        notes: incomeForm.notes || null
      }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Income added successfully"
      });

      setIncomeDialogOpen(false);
      setIncomeForm({
        date: new Date(),
        source: '',
        description: '',
        amount: '',
        payment_method: 'cash',
        client_id: '',
        notes: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error adding income:', error);
      toast({
        title: "Error",
        description: "Failed to add income",
        variant: "destructive"
      });
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      const { error } = await supabase.from('expenses').delete().eq('id', id);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Expense deleted successfully"
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error",
        description: "Failed to delete expense",
        variant: "destructive"
      });
    }
  };

  const handleDeleteIncome = async (id: string) => {
    if (!confirm('Are you sure you want to delete this income?')) return;

    try {
      const { error } = await supabase.from('income').delete().eq('id', id);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Income deleted successfully"
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting income:', error);
      toast({
        title: "Error",
        description: "Failed to delete income",
        variant: "destructive"
      });
    }
  };

  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const netProfit = totalIncome - totalExpenses;

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount', 'Payment Method', 'Client'];
    
    const expenseRows = expenses.map(e => [
      e.date,
      'Expense',
      e.category,
      e.description,
      `-$${e.amount}`,
      e.payment_method,
      clients.find(c => c.id === e.client_id)?.name || ''
    ]);

    const incomeRows = income.map(i => [
      i.date,
      'Income',
      i.source,
      i.description,
      `$${i.amount}`,
      i.payment_method,
      clients.find(c => c.id === i.client_id)?.name || ''
    ]);

    const allRows = [...expenseRows, ...incomeRows].sort((a, b) => 
      new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );

    const csv = [
      headers.join(','),
      ...allRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounting-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounting & Finance</h1>
          <p className="text-muted-foreground">Manage your income, expenses and transactions</p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Total Income</CardTitle>
            <ArrowUpRight className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1">{income.length} transactions</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-900">Total Expenses</CardTitle>
            <ArrowDownRight className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-red-600 mt-1">{expenses.length} transactions</p>
          </CardContent>
        </Card>

        <Card className={cn(
          "border-2",
          netProfit >= 0 ? "border-blue-200 bg-blue-50/50" : "border-orange-200 bg-orange-50/50"
        )}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className={cn(
              "text-sm font-medium",
              netProfit >= 0 ? "text-blue-900" : "text-orange-900"
            )}>
              Net Profit/Loss
            </CardTitle>
            <DollarSign className={cn(
              "h-5 w-5",
              netProfit >= 0 ? "text-blue-600" : "text-orange-600"
            )} />
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-3xl font-bold",
              netProfit >= 0 ? "text-blue-700" : "text-orange-700"
            )}>
              ${Math.abs(netProfit).toFixed(2)}
            </div>
            <p className={cn(
              "text-xs mt-1",
              netProfit >= 0 ? "text-blue-600" : "text-orange-600"
            )}>
              {netProfit >= 0 ? 'Profit' : 'Loss'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...expenses.map(e => ({ ...e, type: 'expense' })), ...income.map(i => ({ ...i, type: 'income' }))]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 10)
                    .map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{format(new Date(item.date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            item.type === 'income' 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          )}>
                            {item.type === 'income' ? 'Income' : 'Expense'}
                          </span>
                        </TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.type === 'income' ? item.source : item.category}</TableCell>
                        <TableCell className={cn(
                          "text-right font-medium",
                          item.type === 'income' ? "text-green-600" : "text-red-600"
                        )}>
                          {item.type === 'income' ? '+' : '-'}${item.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={incomeDialogOpen} onOpenChange={setIncomeDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Income
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Income</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="income-date">Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !incomeForm.date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {incomeForm.date ? format(incomeForm.date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={incomeForm.date}
                            onSelect={(date) => setIncomeForm({ ...incomeForm, date: date || new Date() })}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="income-source">Source *</Label>
                      <Select 
                        value={incomeForm.source}
                        onValueChange={(value) => setIncomeForm({ ...incomeForm, source: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          {incomeSources.map(source => (
                            <SelectItem key={source} value={source}>{source}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income-description">Description *</Label>
                    <Input
                      id="income-description"
                      value={incomeForm.description}
                      onChange={(e) => setIncomeForm({ ...incomeForm, description: e.target.value })}
                      placeholder="Payment for web design project"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="income-amount">Amount *</Label>
                      <Input
                        id="income-amount"
                        type="number"
                        step="0.01"
                        value={incomeForm.amount}
                        onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="income-payment">Payment Method *</Label>
                      <Select 
                        value={incomeForm.payment_method}
                        onValueChange={(value) => setIncomeForm({ ...incomeForm, payment_method: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map(method => (
                            <SelectItem key={method} value={method.toLowerCase()}>{method}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income-client">Client (Optional)</Label>
                    <Select 
                      value={incomeForm.client_id}
                      onValueChange={(value) => setIncomeForm({ ...incomeForm, client_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {clients.map(client => (
                          <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income-notes">Notes</Label>
                    <Textarea
                      id="income-notes"
                      value={incomeForm.notes}
                      onChange={(e) => setIncomeForm({ ...incomeForm, notes: e.target.value })}
                      placeholder="Additional notes..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIncomeDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddIncome}>Add Income</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Income History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {income.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{format(new Date(item.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{item.source}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{clients.find(c => c.id === item.client_id)?.name || '-'}</TableCell>
                      <TableCell className="capitalize">{item.payment_method}</TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        ${item.amount}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteIncome(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-date">Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !expenseForm.date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {expenseForm.date ? format(expenseForm.date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expenseForm.date}
                            onSelect={(date) => setExpenseForm({ ...expenseForm, date: date || new Date() })}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expense-category">Category *</Label>
                      <Select 
                        value={expenseForm.category}
                        onValueChange={(value) => setExpenseForm({ ...expenseForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {expenseCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expense-description">Description *</Label>
                    <Input
                      id="expense-description"
                      value={expenseForm.description}
                      onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                      placeholder="Adobe Creative Cloud subscription"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-amount">Amount *</Label>
                      <Input
                        id="expense-amount"
                        type="number"
                        step="0.01"
                        value={expenseForm.amount}
                        onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expense-payment">Payment Method *</Label>
                      <Select 
                        value={expenseForm.payment_method}
                        onValueChange={(value) => setExpenseForm({ ...expenseForm, payment_method: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map(method => (
                            <SelectItem key={method} value={method.toLowerCase()}>{method}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-vendor">Vendor</Label>
                      <Input
                        id="expense-vendor"
                        value={expenseForm.vendor}
                        onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })}
                        placeholder="Company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expense-client">Related Client</Label>
                      <Select 
                        value={expenseForm.client_id}
                        onValueChange={(value) => setExpenseForm({ ...expenseForm, client_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {clients.map(client => (
                            <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expense-notes">Notes</Label>
                    <Textarea
                      id="expense-notes"
                      value={expenseForm.notes}
                      onChange={(e) => setExpenseForm({ ...expenseForm, notes: e.target.value })}
                      placeholder="Additional notes..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setExpenseDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddExpense}>Add Expense</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Expense History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{format(new Date(item.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.vendor || '-'}</TableCell>
                      <TableCell>{clients.find(c => c.id === item.client_id)?.name || '-'}</TableCell>
                      <TableCell className="capitalize">{item.payment_method}</TableCell>
                      <TableCell className="text-right font-medium text-red-600">
                        ${item.amount}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteExpense(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAccounting;
