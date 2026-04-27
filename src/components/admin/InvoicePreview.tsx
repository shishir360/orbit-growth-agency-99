import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Mail, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

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
  id: string;
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

interface InvoicePreviewProps {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
  onSendEmail: (invoice: Invoice) => void;
}

const InvoicePreview = ({ invoice, open, onClose, onSendEmail }: InvoicePreviewProps) => {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (invoice) {
      fetchInvoiceData();
    }
  }, [invoice]);

  const fetchInvoiceData = async () => {
    if (!invoice) return;

    try {
      setIsLoading(true);
      const [itemsRes, companyRes] = await Promise.all([
        supabase
          .from('invoice_items')
          .select('*')
          .eq('invoice_id', invoice.id)
          .order('display_order'),
        supabase
          .from('company_info')
          .select('*')
          .limit(1)
          .single()
      ]);

      if (itemsRes.error) throw itemsRes.error;
      if (companyRes.error) console.warn('Company info not found');

      setItems(itemsRes.data || []);
      setCompanyInfo(companyRes.data);
    } catch (error) {
      console.error('Error fetching invoice data:', error);
      toast({
        title: "Error",
        description: "Failed to load invoice details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const printContent = document.getElementById('invoice-print-content');
    if (!printContent) return;

    const originalContents = document.body.innerHTML;
    const printContents = printContent.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (!invoice) return null;

  const client = invoice.clients;

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Invoice Preview</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSendEmail(invoice)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading invoice...</div>
          ) : (
            <div id="invoice-print-content" className="bg-white text-slate-900 p-12 border rounded-xl shadow-2xl relative overflow-hidden font-body">
              {/* Premium Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary-variant" />
              
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl inline-block shadow-lg">
                    <img 
                      src="/logo.png" 
                      alt="Lunexo Media"
                      className="h-12 w-auto object-contain invert"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://www.lunexomedia.com/logo.png';
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-heading font-bold tracking-tight text-slate-900">
                      {companyInfo?.company_name || 'LUNEXO MEDIA'}
                    </h1>
                    <div className="mt-2 space-y-1 text-sm text-slate-500 font-medium">
                      <p>{companyInfo?.address || 'Digital Growth Hub'}</p>
                      <p>{companyInfo?.email || 'hello@lunexomedia.com'}</p>
                      <p>{companyInfo?.phone || '+1-702-483-0749'}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-5xl font-heading font-bold text-slate-900/10 mb-2 select-none">INVOICE</h2>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Invoice Number</p>
                    <p className="text-xl font-heading font-bold text-primary">#{invoice.invoice_number}</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-right">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issue Date</p>
                      <p className="text-sm font-semibold">{format(new Date(invoice.issue_date), 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Date</p>
                      <p className="text-sm font-semibold text-accent">{format(new Date(invoice.due_date), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Ribbon */}
              <div className="absolute top-12 right-0 -rotate-45 translate-x-12 translate-y-2">
                <div className={`px-12 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                  invoice.status === 'paid' ? 'bg-emerald-500 text-white' :
                  invoice.status === 'sent' ? 'bg-blue-500 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {invoice.status}
                </div>
              </div>

              {/* Bill To & Details Section */}
              <div className="grid grid-cols-2 gap-12 mb-12 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Client Details</h3>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-slate-900">{client?.name}</p>
                    {client?.company && <p className="font-semibold text-primary/80">{client.company}</p>}
                    <div className="mt-4 text-sm text-slate-500 leading-relaxed">
                      {client?.address && <p>{client.address}</p>}
                      {(client?.city || client?.state || client?.zip_code) && (
                        <p>
                          {client.city}{client.city && client.state ? ', ' : ''}{client.state} {client.zip_code}
                        </p>
                      )}
                      {client?.country && <p className="font-bold text-slate-400">{client.country}</p>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end text-right">
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Payment Information</h3>
                    <div className="space-y-2">
                      <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm inline-block">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Payment Terms</p>
                        <p className="text-sm font-bold text-slate-900">{invoice.payment_terms || 'Net 30'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Amount Due</p>
                    <p className="text-3xl font-orbitron font-black text-slate-900">
                      ${Number(invoice.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Invoice Items Table */}
              <div className="mb-12 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="text-left px-6 py-4 font-orbitron text-[10px] font-bold uppercase tracking-widest">Service Description</th>
                      <th className="text-center px-4 py-4 font-orbitron text-[10px] font-bold uppercase tracking-widest w-24">Qty</th>
                      <th className="text-right px-4 py-4 font-orbitron text-[10px] font-bold uppercase tracking-widest w-32">Unit Price</th>
                      <th className="text-right px-6 py-4 font-orbitron text-[10px] font-bold uppercase tracking-widest w-32">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{item.description}</p>
                          <p className="text-xs text-slate-400 mt-0.5 font-medium">Digital Solution Delivery</p>
                        </td>
                        <td className="px-4 py-4 text-center font-bold text-slate-600">{item.quantity}</td>
                        <td className="px-4 py-4 text-right font-medium text-slate-600">${Number(item.unit_price).toFixed(2)}</td>
                        <td className="px-6 py-4 text-right font-bold text-primary">${Number(item.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary and Notes */}
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  {invoice.notes && (
                    <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-primary shadow-sm">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Terms & Notes</h3>
                      <p className="text-xs text-slate-600 leading-relaxed italic">{invoice.notes}</p>
                    </div>
                  )}
                  <div className="p-6 bg-slate-950 rounded-2xl text-white shadow-xl">
                    <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Quick Support</h3>
                    <div className="space-y-2 text-[10px] font-medium text-slate-400">
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Dedicated support for all billing inquiries
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Instant project updates via our portal
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between px-4 py-2 text-sm font-medium text-slate-500">
                    <span>Subtotal</span>
                    <span className="text-slate-900 font-bold">${Number(invoice.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2 text-sm font-medium text-slate-500 bg-slate-50 rounded-lg">
                    <span>Tax ({invoice.tax_rate}%)</span>
                    <span className="text-slate-900 font-bold">${Number(invoice.tax_amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-6 bg-primary text-white rounded-2xl shadow-lg mt-4 transform scale-105">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Total Amount Due</span>
                      <span className="text-xs font-bold opacity-60 italic">Currency: USD</span>
                    </div>
                    <span className="text-3xl font-orbitron font-black">${Number(invoice.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
                <div className="flex gap-8">
                  {['Web Design', 'SEO & Ads', 'AI Automation', 'Branding'].map((service) => (
                    <span key={service} className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                      {service}
                    </span>
                  ))}
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-900">Thank you for choosing Lunexo Media!</p>
                  <p className="text-[10px] font-medium text-slate-400 max-w-sm">
                    We appreciate your partnership. For any questions regarding this invoice, 
                    please contact us at hello@lunexomedia.com or visit our website.
                  </p>
                  {companyInfo?.website && (
                    <p className="text-[10px] font-black text-primary tracking-widest uppercase pt-2">
                      {companyInfo.website}
                    </p>
                  )}
                </div>
                
                {/* Visual Branding Element */}
                <div className="w-12 h-1.5 rounded-full bg-slate-100 mt-4" />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-print-content,
          #invoice-print-content * {
            visibility: visible;
          }
          #invoice-print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            padding: 40px !important;
          }
          @page {
            margin: 1cm;
            size: A4;
          }
        }
      `}</style>
    </>
  );
};

export default InvoicePreview;
