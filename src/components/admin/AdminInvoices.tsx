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
  receipt_url: string | null;
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
    payment_terms: 'Net 30',
    receipt_url: ''
  });

  const [paymentDetails, setPaymentDetails] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, unit_price: 0, amount: 0, display_order: 0 }
  ]);

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
          clients(*)
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
          receipt_url: receiptUrl
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
      payment_terms: 'Net 30',
      receipt_url: ''
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

      // Call edge function to send email
      const { data, error: emailError } = await supabase.functions.invoke('send-invoice-email', {
        body: { invoiceId: invoice.id }
      });

      if (emailError) throw emailError;

      // Update invoice status to sent
      const { error } = await supabase
        .from('invoices')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', invoice.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Invoice email sent to ${invoice.clients?.email}`
      });

      setShowPreview(false);
      fetchData();
    } catch (error: any) {
      console.error('Error sending invoice:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send invoice email",
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
    (invoice.invoice_number?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (invoice.clients?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (invoice.clients?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: invoices.length,
    draft: invoices.filter(i => i.status === 'draft').length,
    sent: invoices.filter(i => i.status === 'sent').length,
    paid: invoices.filter(i => i.status === 'paid').length,
    totalRevenue: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + (Number(i.total) || 0), 0)
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/40 backdrop-blur-3xl p-10 rounded-[2.5rem] text-slate-900 shadow-glass border border-white/40 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 blur-[80px] -ml-24 -mb-24 rounded-full" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-primary rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Intelligence Hub</span>
          </div>
          <h2 className="text-5xl font-heading font-bold mb-2 tracking-tighter">Command Center</h2>
          <p className="text-slate-600 font-medium max-w-md">Orchestrate elite client billing with Lunexo's AI-powered precision</p>
        </div>

        <div className="flex flex-wrap gap-4 relative z-10">
          <Dialog open={showClientDialog} onOpenChange={setShowClientDialog}>
            <DialogTrigger asChild>
              <Button className="h-14 px-8 bg-white/40 hover:bg-white/60 border-white/40 text-slate-900 backdrop-blur-2xl rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-sm">
                <Users className="h-5 w-5 mr-3 text-primary" />
                <span className="font-bold tracking-tight">New Elite Client</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-white/10 bg-slate-950 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-orbitron font-bold">Onboard New Client</DialogTitle>
                <p className="text-sm text-slate-400">Initialize a new relationship in our ecosystem</p>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-5 mt-6">
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</Label>
                  <Input
                    className="bg-white/5 border-white/10 h-12 focus:ring-primary"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Architecture</Label>
                  <Input
                    className="bg-white/5 border-white/10 h-12"
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    placeholder="client@domain.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Secure Line</Label>
                  <Input
                    className="bg-white/5 border-white/10 h-12"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                    placeholder="+1 (000) 000-0000"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Organization / Entity</Label>
                  <Input
                    className="bg-white/5 border-white/10 h-12"
                    value={clientForm.company}
                    onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                    placeholder="Entity Name"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Geographic Node</Label>
                  <Input
                    className="bg-white/5 border-white/10 h-12"
                    value={clientForm.address}
                    onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })}
                    placeholder="Street Address"
                  />
                </div>
                <div className="grid grid-cols-3 col-span-2 gap-4">
                  <Input className="bg-white/5 border-white/10 h-12" placeholder="City" value={clientForm.city} onChange={(e) => setClientForm({ ...clientForm, city: e.target.value })} />
                  <Input className="bg-white/5 border-white/10 h-12" placeholder="State" value={clientForm.state} onChange={(e) => setClientForm({ ...clientForm, state: e.target.value })} />
                  <Input className="bg-white/5 border-white/10 h-12" placeholder="ZIP" value={clientForm.zip_code} onChange={(e) => setClientForm({ ...clientForm, zip_code: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <Button variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setShowClientDialog(false)}>Dismiss</Button>
                <Button onClick={handleAddClient} className="bg-primary hover:bg-primary-dark text-white h-12 px-8 font-bold rounded-xl shadow-lg shadow-primary/20">Initialize Client</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
            <DialogTrigger asChild>
              <Button className="h-14 px-10 bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-[0_10px_40px_rgba(236,72,153,0.3)] transition-all hover:scale-105 active:scale-95 border-none group">
                <Plus className="h-6 w-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-black text-lg tracking-tight">Forge Invoice</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-3xl font-heading font-bold text-slate-900 flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-primary" />
                  Invoice Forge
                </DialogTitle>
                <p className="text-slate-500 font-medium italic">Architecting a new financial milestone</p>
              </DialogHeader>
              <div className="space-y-8 pt-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Target Recipient</Label>
                    <Select value={invoiceForm.client_id} onValueChange={(value) => setInvoiceForm({ ...invoiceForm, client_id: value })}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-200 rounded-xl focus:ring-primary shadow-sm">
                        <SelectValue placeholder="Select high-value client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} {client.company && `— ${client.company}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Engagement Terms</Label>
                    <Input
                      className="h-14 bg-slate-50 border-slate-200 rounded-xl shadow-sm"
                      value={invoiceForm.payment_terms}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, payment_terms: e.target.value })}
                      placeholder="e.g., Net 30 Priority"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Deployment Date</Label>
                    <Input
                      className="h-14 bg-slate-50 border-slate-200 rounded-xl shadow-sm"
                      type="date"
                      value={invoiceForm.issue_date}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, issue_date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Threshold Date</Label>
                    <Input
                      className="h-14 bg-slate-50 border-slate-200 rounded-xl shadow-sm"
                      type="date"
                      value={invoiceForm.due_date}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, due_date: e.target.value })}
                    />
                  </div>
                </div>

                {/* Premium AI Forge */}
                <div className="relative p-1 rounded-[2rem] bg-gradient-to-br from-primary via-accent to-primary-variant group overflow-hidden">
                  <div className="bg-white p-8 rounded-[1.8rem] relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <Sparkles className="h-6 w-6 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-slate-900 uppercase tracking-tight">AI Extraction Engine</h4>
                          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Neural Line Item Generation</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-primary/20 text-primary font-black px-3 py-1">V2.0 LIVE</Badge>
                    </div>
                    <Textarea
                      value={paymentDetails}
                      onChange={(e) => setPaymentDetails(e.target.value)}
                      placeholder="Describe the project scope or paste raw payment logs here. Our AI will architect the precise line items for you..."
                      rows={4}
                      className="mb-6 bg-slate-50/50 border-slate-100 rounded-2xl p-4 focus:ring-primary font-medium"
                    />
                    <Button 
                      type="button" 
                      onClick={handleGenerateWithAI}
                      disabled={isGeneratingAI || !paymentDetails || !invoiceForm.client_id}
                      className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black h-14 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isGeneratingAI ? (
                        <span className="flex items-center gap-3">
                          <Clock className="h-5 w-5 animate-spin" />
                          SYTHESIZING DATA NODES...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          <Sparkles className="h-5 w-5" />
                          LAUNCH AI FORGE
                        </span>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="font-heading font-bold text-xl text-slate-900 tracking-tight">Financial Components</h3>
                    <Button type="button" size="sm" variant="ghost" onClick={addInvoiceItem} className="text-primary hover:bg-primary/5 font-black uppercase tracking-widest text-[10px]">
                      <Plus className="h-4 w-4 mr-1" /> Add Manual Component
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {invoiceItems.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-5 p-5 bg-slate-50/80 rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-primary/20">
                        <div className="col-span-6 space-y-1">
                          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Node</Label>
                          <Input
                            className="bg-white h-12 rounded-xl border-slate-200"
                            placeholder="Describe component..."
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          />
                        </div>
                        <div className="col-span-2 space-y-1">
                          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Qty</Label>
                          <Input
                            className="bg-white h-12 rounded-xl border-slate-200 text-center font-bold"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-span-3 space-y-1">
                          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit Value</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                            <Input
                              className="pl-7 bg-white h-12 rounded-xl border-slate-200 font-bold"
                              type="number"
                              value={item.unit_price}
                              onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        <div className="col-span-1 flex items-end pb-1.5">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-10 w-10 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50"
                            onClick={() => removeInvoiceItem(index)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 pt-10 border-t border-slate-100">
                  <div className="flex-1 space-y-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Engagement Verification</Label>
                      <div className="group relative cursor-pointer">
                        <Input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setReceiptFile(file);
                              handleReceiptUpload(file);
                            }
                          }}
                        />
                        <div className={`h-24 rounded-[1.5rem] border-2 border-dashed flex items-center justify-center gap-4 transition-all ${
                          receiptUrl ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-primary/30 group-hover:bg-primary/5'
                        }`}>
                          <Upload className="h-6 w-6" />
                          <div className="text-left">
                            <p className="font-bold">{receiptUrl ? 'Receipt Securely Stored' : 'Upload Transaction Node'}</p>
                            <p className="text-[10px] uppercase font-black tracking-widest opacity-60">{receiptUrl ? 'Deployment ready' : 'PNG, JPG, or PDF'}</p>
                          </div>
                          {receiptUrl && <CheckCircle className="h-6 w-6" />}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Core Logic / Terms</Label>
                      <Textarea
                        value={invoiceForm.notes}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, notes: e.target.value })}
                        placeholder="Define the core logic or special terms for this engagement..."
                        rows={3}
                        className="bg-slate-50 border-slate-200 rounded-2xl p-4 font-medium"
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-[360px] bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 rounded-full" />
                    
                    <div className="space-y-4 mb-10 relative z-10">
                      <div className="flex justify-between text-slate-500 text-[10px] font-black uppercase tracking-widest">
                        <span>Gross Subtotal</span>
                        <span className="text-white">${calculateInvoiceTotal().subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Regulatory Tax</span>
                          <Input 
                            type="number" 
                            className="w-14 h-7 bg-primary text-white text-[10px] font-black text-center p-0 rounded-lg border-none focus:ring-0"
                            value={invoiceForm.tax_rate}
                            onChange={(e) => setInvoiceForm({ ...invoiceForm, tax_rate: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <span className="text-white font-black font-orbitron">${calculateInvoiceTotal().taxAmount.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-10 relative z-10">
                      <p className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Net Capital Forge</p>
                      <div className="text-5xl font-heading font-bold text-white leading-none">
                        ${calculateInvoiceTotal().total.toFixed(2)}
                      </div>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Currency: USD Architecture</p>
                    </div>

                    <Button onClick={handleCreateInvoice} className="w-full bg-primary hover:bg-primary-dark text-white font-black h-16 rounded-2xl shadow-[0_15px_40px_rgba(236,72,153,0.3)] transition-all hover:scale-105 active:scale-95 text-lg relative z-10 border-none">
                      FINALIZE DEPLOYMENT
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Volume', value: stats.total, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Revenue Pool', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Sent Nodes', value: stats.sent, icon: Mail, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Finalized', value: stats.paid, icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10' },
        ].map((stat, i) => (
          <Card key={i} className="group hover:border-primary/20 transition-all duration-300 rounded-3xl overflow-hidden shadow-glass hover:shadow-xl hover:-translate-y-1 bg-white/60 backdrop-blur-xl border-white/40">
            <CardContent className="p-8">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                  <p className="text-3xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:rotate-12 duration-500`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* Invoices Table */}
      <Card className="border-white/40 shadow-glass rounded-[2rem] overflow-hidden bg-white/40 backdrop-blur-3xl">
        <CardHeader className="border-b border-white/20 p-8">
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
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent border-white/20">
                    <TableHead className="font-heading font-bold text-slate-900 py-6 pl-8">Invoice #</TableHead>
                    <TableHead className="font-heading font-bold text-slate-900 py-6">Client</TableHead>
                    <TableHead className="font-heading font-bold text-slate-900 py-6">Date</TableHead>
                    <TableHead className="font-heading font-bold text-slate-900 py-6 text-right">Total Value</TableHead>
                    <TableHead className="font-heading font-bold text-slate-900 py-6">Status Node</TableHead>
                    <TableHead className="font-heading font-bold text-slate-900 py-6 text-right pr-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="group hover:bg-primary/5 transition-colors border-white/10">
                      <TableCell className="font-bold py-5 pl-8">{invoice.invoice_number}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-heading font-bold text-slate-900">{invoice.clients?.name}</div>
                          <div className="text-xs text-slate-500">{invoice.clients?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{format(new Date(invoice.issue_date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="text-right font-bold">${Number(invoice.total).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(invoice.status)} className="rounded-full px-3 py-1 font-black uppercase text-[10px] tracking-widest">
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
