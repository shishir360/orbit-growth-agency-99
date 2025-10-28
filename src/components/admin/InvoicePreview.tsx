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
            <div id="invoice-print-content" className="bg-background p-8 border rounded-lg">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8 border-b pb-6">
                <div>
                  {companyInfo?.logo && (
                    <img 
                      src={companyInfo.logo} 
                      alt={companyInfo.company_name}
                      className="h-16 mb-4"
                    />
                  )}
                  <h1 className="text-3xl font-bold mb-2">{companyInfo?.company_name || 'Your Company'}</h1>
                  {companyInfo?.address && <p className="text-sm text-muted-foreground">{companyInfo.address}</p>}
                  {companyInfo?.email && <p className="text-sm text-muted-foreground">{companyInfo.email}</p>}
                  {companyInfo?.phone && <p className="text-sm text-muted-foreground">{companyInfo.phone}</p>}
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-bold mb-2">INVOICE</h2>
                  <p className="text-sm"><span className="font-semibold">Invoice #:</span> {invoice.invoice_number}</p>
                  <p className="text-sm"><span className="font-semibold">Issue Date:</span> {format(new Date(invoice.issue_date), 'MMMM dd, yyyy')}</p>
                  <p className="text-sm"><span className="font-semibold">Due Date:</span> {format(new Date(invoice.due_date), 'MMMM dd, yyyy')}</p>
                  <p className="text-sm mt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Bill To Section */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-muted-foreground">BILL TO:</h3>
                  <div className="text-sm">
                    <p className="font-bold text-lg mb-1">{client?.name}</p>
                    {client?.company && <p className="text-muted-foreground">{client.company}</p>}
                    {client?.address && <p>{client.address}</p>}
                    {(client?.city || client?.state || client?.zip_code) && (
                      <p>
                        {client.city}{client.city && client.state ? ', ' : ''}{client.state} {client.zip_code}
                      </p>
                    )}
                    {client?.country && <p>{client.country}</p>}
                    {client?.email && <p className="mt-2">{client.email}</p>}
                    {client?.phone && <p>{client.phone}</p>}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-muted-foreground">PAYMENT TERMS:</h3>
                  <p className="text-sm">{invoice.payment_terms || 'Net 30'}</p>
                </div>
              </div>

              {/* Invoice Items Table */}
              <div className="mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-foreground">
                      <th className="text-left py-3 font-semibold text-sm">DESCRIPTION</th>
                      <th className="text-right py-3 font-semibold text-sm w-20">QTY</th>
                      <th className="text-right py-3 font-semibold text-sm w-28">UNIT PRICE</th>
                      <th className="text-right py-3 font-semibold text-sm w-28">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-muted">
                        <td className="py-3 text-sm">{item.description}</td>
                        <td className="py-3 text-right text-sm">{item.quantity}</td>
                        <td className="py-3 text-right text-sm">${Number(item.unit_price).toFixed(2)}</td>
                        <td className="py-3 text-right text-sm font-semibold">${Number(item.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-80">
                  <div className="flex justify-between py-2 text-sm">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${Number(invoice.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm border-b border-muted">
                    <span>Tax ({invoice.tax_rate}%):</span>
                    <span className="font-semibold">${Number(invoice.tax_amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-3 text-lg font-bold border-b-2 border-foreground">
                    <span>TOTAL:</span>
                    <span>${Number(invoice.total).toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div className="mb-8 p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">NOTES:</h3>
                  <p className="text-sm whitespace-pre-wrap">{invoice.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="border-t pt-6 text-center text-xs text-muted-foreground">
                <p>Thank you for your business!</p>
                {companyInfo?.website && (
                  <p className="mt-1">{companyInfo.website}</p>
                )}
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
