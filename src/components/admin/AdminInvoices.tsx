import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, FileText, Mail, Printer, Trash2, DollarSign, Users, Clock, CheckCircle, Download, Upload, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import InvoicePreview from './InvoicePreview';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string;
}

interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  display_order: number;
}

interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  issue_date: string;
  due_date: string;
  status: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string | null;
  payment_terms: string | null;
  payment_receipt_url: string | null;
  clients?: Client;
}

const AdminInvoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Client form state
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'USA'
  });

  // Invoice form state
  const [invoiceForm, setInvoiceForm] = useState({
    client_id: '',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    tax_rate: 0,
    notes: '',
    payment_terms: 'Net 30'
  });

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, unit_price: 0, amount: 0, display_order: 0 }
  ]);

  const [paymentDetails, setPaymentDetails] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [clientsRes, invoicesRes] = await Promise.all([
        supabase.from('clients').select('*').order('name'),
        supabase.from('invoices').select(`
          *,
          clients (*)
        `).order('created_at', { ascending: false })
      ]);

      if (clientsRes.error) throw clientsRes.error;
      if (invoicesRes.error) throw invoicesRes.error;

      setClients(clientsRes.data || []);
      setInvoices(invoicesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClient = async () => {
    try {
      const { error } = await supabase
        .from('clients')
        .insert([clientForm]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Client added successfully"
      });

      setShowClientDialog(false);
      setClientForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: 'USA'
      });
      fetchData();
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        title: "Error",
        description: "Failed to add client",
        variant: "destructive"
      });
    }
  };

  const calculateInvoiceTotal = () => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (invoiceForm.tax_rate / 100);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...invoiceItems];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'unit_price') {
      newItems[index].amount = newItems[index].quantity * newItems[index].unit_price;
    }
    
    setInvoiceItems(newItems);
  };

  const addInvoiceItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { description: '', quantity: 1, unit_price: 0, amount: 0, display_order: invoiceItems.length }
    ]);
  };

  const removeInvoiceItem = (index: number) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const handleReceiptUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('invoice-receipts')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('invoice-receipts')
        .getPublicUrl(filePath);

      setReceiptUrl(publicUrl);
      toast({
        title: "Success",
        description: "Receipt uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Error",
        description: "Failed to upload receipt",
        variant: "destructive"
      });
    }
  };

  const handleGenerateWithAI = async () => {
    if (!paymentDetails || !invoiceForm.client_id) {
      toast({
        title: "Missing Information",
        description: "Please select a client and provide payment details",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingAI(true);
    try {
      const selectedClient = clients.find(c => c.id === invoiceForm.client_id);
      
      const { data, error } = await supabase.functions.invoke('generate-invoice-ai', {
        body: {
          paymentDetails,
          clientInfo: selectedClient
        }
      });

      if (error) throw error;

      if (data.items && Array.isArray(data.items)) {
        setInvoiceItems(data.items.map((item: any, index: number) => ({
          ...item,
          display_order: index
        })));
      }

      if (data.notes) {
        setInvoiceForm(prev => ({ ...prev, notes: data.notes }));
      }

      if (data.payment_terms) {
        setInvoiceForm(prev => ({ ...prev, payment_terms: data.payment_terms }));
      }

      toast({
        title: "Success",
        description: "Invoice items generated with AI!"
      });
    } catch (error) {
      console.error('Error generating with AI:', error);
      toast({
        title: "Error",
        description: "Failed to generate invoice with AI",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleCreateInvoice = async () => {
    try {
      // Generate invoice number
      const { data: invoiceNumberData } = await supabase
        .rpc('generate_invoice_number');

      const { subtotal, taxAmount, total } = calculateInvoiceTotal();

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert([{
          invoice_number: invoiceNumberData,
          client_id: invoiceForm.client_id,
          issue_date: invoiceForm.issue_date,
          due_date: invoiceForm.due_date,
          status: 'draft',
          subtotal,
          tax_rate: invoiceForm.tax_rate,
          tax_amount: taxAmount,
          total,
          notes: invoiceForm.notes,
          payment_terms: invoiceForm.payment_terms,
          payment_receipt_url: receiptUrl
        }])
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Create invoice items
      const itemsToInsert = invoiceItems.map((item, index) => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.amount,
        display_order: index
      }));

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      toast({
        title: "Success",
        description: "Invoice created successfully"
      });

      setShowInvoiceDialog(false);
      resetInvoiceForm();
      fetchData();
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive"
      });
    }
  };

  const resetInvoiceForm = () => {
    setInvoiceForm({
      client_id: '',
      issue_date: new Date().toISOString().split('T')[0],
      due_date: '',
      tax_rate: 0,
      notes: '',
      payment_terms: 'Net 30'
    });
    setInvoiceItems([{ description: '', quantity: 1, unit_price: 0, amount: 0, display_order: 0 }]);
    setPaymentDetails('');
    setReceiptFile(null);
    setReceiptUrl(null);
  };

  const handleViewInvoice = async (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPreview(true);
  };

  const handleSendEmail = async (invoice: Invoice) => {
    try {
      toast({
        title: "Sending...",
        description: "Preparing invoice email"
      });

      // Update invoice status to sent
      const { error } = await supabase
        .from('invoices')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', invoice.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Invoice sent successfully"
      });

      fetchData();
    } catch (error) {
      console.error('Error sending invoice:', error);
      toast({
        title: "Error",
        description: "Failed to send invoice",
        variant: "destructive"
      });
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;

    try {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Invoice deleted successfully"
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast({
        title: "Error",
        description: "Failed to delete invoice",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      draft: 'default',
      sent: 'secondary',
      paid: 'secondary',
      overdue: 'destructive',
      cancelled: 'destructive'
    };
    return variants[status] || 'default';
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.clients?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.clients?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: invoices.length,
    draft: invoices.filter(i => i.status === 'draft').length,
    sent: invoices.filter(i => i.status === 'sent').length,
    paid: invoices.filter(i => i.status === 'paid').length,
    totalRevenue: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + Number(i.total), 0)
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Invoice Management</h2>
        <p className="text-muted-foreground">Manage clients and create professional invoices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.paid}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Dialog open={showClientDialog} onOpenChange={setShowClientDialog}>
          <DialogTrigger asChild>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Name *</Label>
                <Input
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={clientForm.phone}
                  onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div className="col-span-2">
                <Label>Company</Label>
                <Input
                  value={clientForm.company}
                  onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                  placeholder="Company Name"
                />
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input
                  value={clientForm.address}
                  onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })}
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={clientForm.city}
                  onChange={(e) => setClientForm({ ...clientForm, city: e.target.value })}
                  placeholder="New York"
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  value={clientForm.state}
                  onChange={(e) => setClientForm({ ...clientForm, state: e.target.value })}
                  placeholder="NY"
                />
              </div>
              <div>
                <Label>ZIP Code</Label>
                <Input
                  value={clientForm.zip_code}
                  onChange={(e) => setClientForm({ ...clientForm, zip_code: e.target.value })}
                  placeholder="10001"
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={clientForm.country}
                  onChange={(e) => setClientForm({ ...clientForm, country: e.target.value })}
                  placeholder="USA"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowClientDialog(false)}>Cancel</Button>
              <Button onClick={handleAddClient}>Add Client</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client *</Label>
                  <Select value={invoiceForm.client_id} onValueChange={(value) => setInvoiceForm({ ...invoiceForm, client_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} - {client.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Payment Terms</Label>
                  <Input
                    value={invoiceForm.payment_terms}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, payment_terms: e.target.value })}
                    placeholder="Net 30"
                  />
                </div>
                <div>
                  <Label>Issue Date *</Label>
                  <Input
                    type="date"
                    value={invoiceForm.issue_date}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, issue_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Due Date *</Label>
                  <Input
                    type="date"
                    value={invoiceForm.due_date}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, due_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Tax Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={invoiceForm.tax_rate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, tax_rate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Invoice Items</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addInvoiceItem}>
                    <Plus className="h-4 w-4 mr-1" /> Add Item
                  </Button>
                </div>
                {invoiceItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                    <Input
                      className="col-span-5"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    />
                    <Input
                      className="col-span-2"
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                    />
                    <Input
                      className="col-span-2"
                      type="number"
                      placeholder="Price"
                      value={item.unit_price}
                      onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                    />
                    <Input
                      className="col-span-2"
                      value={`$${item.amount.toFixed(2)}`}
                      disabled
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="col-span-1"
                      onClick={() => removeInvoiceItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-end space-y-1">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold">${calculateInvoiceTotal().subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({invoiceForm.tax_rate}%):</span>
                      <span className="font-bold">${calculateInvoiceTotal().taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg border-t pt-2">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold">${calculateInvoiceTotal().total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Generation Section */}
              <div className="border-t pt-4 space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
                  <Label className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Invoice Generation
                  </Label>
                  <Textarea
                    value={paymentDetails}
                    onChange={(e) => setPaymentDetails(e.target.value)}
                    placeholder="Describe the payment received, services provided, or paste payment details here. AI will generate invoice items for you."
                    rows={3}
                    className="mb-2"
                  />
                  <Button 
                    type="button" 
                    onClick={handleGenerateWithAI}
                    disabled={isGeneratingAI || !paymentDetails || !invoiceForm.client_id}
                    className="w-full"
                  >
                    {isGeneratingAI ? (
                      <>Generating with AI...</>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Invoice Items with AI
                      </>
                    )}
                  </Button>
                </div>

                {/* Receipt Upload */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Upload className="h-4 w-4" />
                    Payment Receipt (Optional)
                  </Label>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setReceiptFile(file);
                        handleReceiptUpload(file);
                      }
                    }}
                  />
                  {receiptUrl && (
                    <p className="text-sm text-green-600 mt-2">✓ Receipt uploaded successfully</p>
                  )}
                </div>
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea
                  value={invoiceForm.notes}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, notes: e.target.value })}
                  placeholder="Additional notes or terms..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowInvoiceDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateInvoice}>Create Invoice</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading invoices...</div>
          ) : filteredInvoices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No invoices found</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{invoice.clients?.name}</div>
                          <div className="text-xs text-muted-foreground">{invoice.clients?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{format(new Date(invoice.issue_date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{format(new Date(invoice.due_date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="font-bold">${Number(invoice.total).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                       <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewInvoice(invoice)}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          {invoice.status === 'draft' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSendEmail(invoice)}
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Send
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteInvoice(invoice.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Preview Dialog */}
      <InvoicePreview
        invoice={selectedInvoice}
        open={showPreview}
        onClose={() => {
          setShowPreview(false);
          setSelectedInvoice(null);
        }}
        onSendEmail={(invoice) => {
          setShowPreview(false);
          handleSendEmail(invoice);
        }}
      />
    </div>
  );
};

export default AdminInvoices;
