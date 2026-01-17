import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL = 'hello@lunexomedia.com';

const resend = new Resend(RESEND_API_KEY);
interface TelegramPhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

interface TelegramDocument {
  file_id: string;
  file_unique_id: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

interface TelegramMessage {
  message_id: number;
  from: {
    id: number;
    first_name: string;
    username?: string;
  };
  chat: {
    id: number;
    type: string;
  };
  text?: string;
  photo?: TelegramPhotoSize[];
  document?: TelegramDocument;
  caption?: string;
  date: number;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

// Currency patterns with symbols and codes
const CURRENCY_PATTERNS: { [key: string]: { code: string; symbol: string; name: string } } = {
  '$': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'usd': { code: 'USD', symbol: '$', name: 'US Dollar' },
  '৳': { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  'bdt': { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  'taka': { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  'tk': { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  '€': { code: 'EUR', symbol: '€', name: 'Euro' },
  'eur': { code: 'EUR', symbol: '€', name: 'Euro' },
  'euro': { code: 'EUR', symbol: '€', name: 'Euro' },
  '£': { code: 'GBP', symbol: '£', name: 'British Pound' },
  'gbp': { code: 'GBP', symbol: '£', name: 'British Pound' },
  'pound': { code: 'GBP', symbol: '£', name: 'British Pound' },
  '₹': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  'inr': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  'rupee': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  'aed': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  'dirham': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  'sar': { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  'riyal': { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  'myr': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  'ringgit': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  'sgd': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  'cad': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  'aud': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  '¥': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  'jpy': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  'yen': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  'cny': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  'yuan': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  'pkr': { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  'php': { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  'peso': { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
};

async function sendTelegramMessage(chatId: number, text: string, parseMode: string = 'HTML') {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: parseMode,
      }),
    });
    
    const result = await response.json();
    console.log('Telegram send result:', result);
    return result;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
}

async function getFileUrl(fileId: string): Promise<string | null> {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`;
  
  try {
    const response = await fetch(url);
    const result = await response.json();
    
    if (result.ok && result.result.file_path) {
      return `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${result.result.file_path}`;
    }
    return null;
  } catch (error) {
    console.error('Error getting file URL:', error);
    return null;
  }
}

const INVOICE_PROMPT = `Analyze this image carefully. It could be an invoice, receipt, payment screenshot, bank transfer confirmation, or any financial document.

Look for:
- Payment received/sent amounts
- Transaction amounts
- Balance changes
- Any monetary values

Return ONLY a valid JSON object with these fields:
{
  "type": "income" or "expense" (payment received = income, payment sent/purchase = expense),
  "amount": the main transaction amount as a number (no currency symbols),
  "currency": the currency code like "USD", "BDT", "EUR", "GBP", "INR", "AED" etc,
  "purpose": a short description of the transaction (max 50 chars),
  "details": additional details (sender/receiver name, date, reference number if visible)
}

If you cannot determine a value, use these defaults:
- type: "expense"
- amount: 0
- currency: "USD"
- purpose: "Transaction"
- details: "Unable to extract details"

Important: Return ONLY the JSON object, no markdown, no explanation, no code blocks.`;

// Helper function to convert ArrayBuffer to base64 in chunks
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.slice(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

async function analyzeInvoiceImage(imageUrl: string): Promise<{
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  purpose: string;
  details: string;
} | null> {
  try {
    console.log('Fetching image from:', imageUrl);
    
    // Download the image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      console.error('Failed to fetch image:', imageResponse.status);
      return null;
    }
    
    const imageBuffer = await imageResponse.arrayBuffer();
    console.log('Image size:', imageBuffer.byteLength, 'bytes');
    
    // Check if image is too large (limit to 4MB for base64)
    if (imageBuffer.byteLength > 4 * 1024 * 1024) {
      console.error('Image too large for processing');
      return null;
    }
    
    // Convert to base64 using chunked approach
    const base64Image = arrayBufferToBase64(imageBuffer);
    const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';
    
    console.log('Analyzing invoice image with AI...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: INVOICE_PROMPT },
              {
                type: 'image_url',
                image_url: { url: `data:${mimeType};base64,${base64Image}` }
              }
            ]
          }
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return null;
    }

    const result = await response.json();
    console.log('AI response:', JSON.stringify(result));
    
    return parseAIResponse(result);
  } catch (error) {
    console.error('Error analyzing invoice image:', error);
    return null;
  }
}

async function analyzeInvoicePDF(pdfUrl: string): Promise<{
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  purpose: string;
  details: string;
} | null> {
  try {
    // Download the PDF and convert to base64
    const pdfResponse = await fetch(pdfUrl);
    const pdfBuffer = await pdfResponse.arrayBuffer();
    const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
    
    console.log('Analyzing invoice PDF...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: INVOICE_PROMPT },
              {
                type: 'image_url',
                image_url: { url: `data:application/pdf;base64,${base64Pdf}` }
              }
            ]
          }
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('AI gateway error:', response.status);
      return null;
    }

    const result = await response.json();
    console.log('AI response:', JSON.stringify(result));
    
    return parseAIResponse(result);
  } catch (error) {
    console.error('Error analyzing invoice PDF:', error);
    return null;
  }
}

function parseAIResponse(result: any): {
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  purpose: string;
  details: string;
} | null {
  if (result.choices && result.choices[0]?.message?.content) {
    let content = result.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      const parsed = JSON.parse(content);
      
      return {
        type: parsed.type === 'income' ? 'income' : 'expense',
        amount: typeof parsed.amount === 'number' ? parsed.amount : parseFloat(parsed.amount) || 0,
        currency: parsed.currency?.toUpperCase() || 'USD',
        purpose: String(parsed.purpose || 'Invoice').slice(0, 50),
        details: String(parsed.details || '').slice(0, 200),
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError, 'Content:', content);
      return null;
    }
  }
  return null;
}

function parseTransaction(text: string): { type: 'income' | 'expense'; amount: number; currency: string; purpose: string } | null {
  const lowerText = text.toLowerCase().trim();
  
  // Detect type
  let type: 'income' | 'expense' = 'expense';
  const incomeKeywords = ['income', 'received', 'got', 'earned', 'পেলাম', 'আয়', 'ইনকাম', '+'];
  const expenseKeywords = ['expense', 'spent', 'paid', 'bought', 'খরচ', 'দিলাম', 'কিনলাম', '-'];
  
  for (const keyword of incomeKeywords) {
    if (lowerText.includes(keyword)) {
      type = 'income';
      break;
    }
  }
  
  for (const keyword of expenseKeywords) {
    if (lowerText.includes(keyword)) {
      type = 'expense';
      break;
    }
  }

  // Extract amount and currency
  const amountPatterns = [
    /([৳$€£₹¥₱₨])\s*(\d+(?:,\d{3})*(?:\.\d{1,2})?)/i,
    /(\d+(?:,\d{3})*(?:\.\d{1,2})?)\s*([৳$€£₹¥₱₨])/i,
    /(\d+(?:,\d{3})*(?:\.\d{1,2})?)\s*(usd|bdt|taka|tk|eur|euro|gbp|pound|inr|rupee|aed|dirham|sar|riyal|myr|ringgit|sgd|cad|aud|jpy|yen|cny|yuan|pkr|php|peso)/i,
    /(usd|bdt|taka|tk|eur|euro|gbp|pound|inr|rupee|aed|dirham|sar|riyal|myr|ringgit|sgd|cad|aud|jpy|yen|cny|yuan|pkr|php|peso)\s*(\d+(?:,\d{3})*(?:\.\d{1,2})?)/i,
    /(\d+(?:,\d{3})*(?:\.\d{1,2})?)/,
  ];

  let amount = 0;
  let currency = 'USD';

  for (const pattern of amountPatterns) {
    const match = text.match(pattern);
    if (match) {
      const group1 = match[1];
      const group2 = match[2];
      
      if (/^\d/.test(group1)) {
        amount = parseFloat(group1.replace(/,/g, ''));
        if (group2) {
          const currencyInfo = CURRENCY_PATTERNS[group2.toLowerCase()];
          if (currencyInfo) {
            currency = currencyInfo.code;
          }
        }
      } else if (group2 && /^\d/.test(group2)) {
        amount = parseFloat(group2.replace(/,/g, ''));
        const currencyInfo = CURRENCY_PATTERNS[group1.toLowerCase()];
        if (currencyInfo) {
          currency = currencyInfo.code;
        }
      } else if (/^\d/.test(group1)) {
        amount = parseFloat(group1.replace(/,/g, ''));
      }
      
      break;
    }
  }

  if (amount <= 0) {
    return null;
  }

  let purpose = text
    .replace(/[৳$€£₹¥₱₨]\s*\d+(?:,\d{3})*(?:\.\d{1,2})?/gi, '')
    .replace(/\d+(?:,\d{3})*(?:\.\d{1,2})?\s*[৳$€£₹¥₱₨]/gi, '')
    .replace(/\d+(?:,\d{3})*(?:\.\d{1,2})?\s*(usd|bdt|taka|tk|eur|euro|gbp|pound|inr|rupee|aed|dirham|sar|riyal|myr|ringgit|sgd|cad|aud|jpy|yen|cny|yuan|pkr|php|peso)/gi, '')
    .replace(/(usd|bdt|taka|tk|eur|euro|gbp|pound|inr|rupee|aed|dirham|sar|riyal|myr|ringgit|sgd|cad|aud|jpy|yen|cny|yuan|pkr|php|peso)\s*\d+(?:,\d{3})*(?:\.\d{1,2})?/gi, '')
    .replace(/income|expense|spent|paid|bought|received|got|earned|খরচ|দিলাম|কিনলাম|পেলাম|আয়|ইনকাম/gi, '')
    .replace(/[+\-]/g, '')
    .trim();

  if (!purpose) {
    purpose = type === 'income' ? 'Income' : 'Expense';
  }

  return { type, amount, currency, purpose };
}

async function getExchangeRate(currencyCode: string): Promise<number> {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
  
  const { data, error } = await supabase
    .from('supported_currencies')
    .select('exchange_rate_to_usd')
    .eq('code', currencyCode)
    .single();
  
  if (error || !data) {
    console.log('Currency not found, defaulting to 1:', currencyCode);
    return 1;
  }
  
  return data.exchange_rate_to_usd;
}

async function saveTransaction(transaction: {
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  purpose: string;
  telegramMessageId: string;
  description?: string;
}): Promise<boolean> {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
  
  const exchangeRate = await getExchangeRate(transaction.currency);
  const amountInUsd = transaction.amount * exchangeRate;
  
  const { error } = await supabase.from('wallet_transactions').insert([{
    type: transaction.type,
    amount: transaction.amount,
    currency: transaction.currency,
    amount_in_usd: amountInUsd,
    exchange_rate: exchangeRate,
    purpose: transaction.purpose,
    description: transaction.description || null,
    source: 'telegram',
    telegram_message_id: transaction.telegramMessageId,
  }]);
  
  if (error) {
    console.error('Error saving transaction:', error);
    return false;
  }
  
  return true;
}

async function sendInvoiceEmailNotification(invoiceData: {
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  purpose: string;
  details?: string;
  amountInUsd: number;
  source: 'image' | 'pdf';
}): Promise<void> {
  try {
    const emoji = invoiceData.type === 'income' ? '📈' : '📉';
    const typeColor = invoiceData.type === 'income' ? '#22c55e' : '#ef4444';
    const currencySymbol = CURRENCY_PATTERNS[invoiceData.currency.toLowerCase()]?.symbol || '$';
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">${emoji} Invoice Processed via Telegram</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">New ${invoiceData.source.toUpperCase()} invoice analyzed</p>
        </div>
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                <strong>Type:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">
                <span style="background: ${typeColor}; color: white; padding: 4px 12px; border-radius: 12px; font-weight: bold;">
                  ${invoiceData.type.toUpperCase()}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                <strong>Amount:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right; font-size: 18px; font-weight: bold;">
                ${currencySymbol}${invoiceData.amount.toLocaleString()} ${invoiceData.currency}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                <strong>USD Value:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">
                ~$${invoiceData.amountInUsd.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                <strong>Purpose:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">
                ${invoiceData.purpose}
              </td>
            </tr>
            ${invoiceData.details ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                <strong>Details:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">
                ${invoiceData.details}
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0;">
                <strong>Source:</strong>
              </td>
              <td style="padding: 12px 0; text-align: right;">
                Telegram ${invoiceData.source === 'pdf' ? '📄 PDF' : '📸 Photo'}
              </td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              ✅ This transaction has been automatically saved to your wallet.
            </p>
          </div>
        </div>
        <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
          <p>Lunexo Media Wallet Bot</p>
          <p>Processed at: ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: 'Lunexo Media <hello@lunexomedia.com>',
      to: [ADMIN_EMAIL],
      subject: `${emoji} Invoice Processed: ${currencySymbol}${invoiceData.amount.toLocaleString()} ${invoiceData.currency} (${invoiceData.type})`,
      html: emailHtml,
    });

    console.log('Invoice email notification sent successfully');
  } catch (error) {
    console.error('Error sending invoice email notification:', error);
    // Don't throw - email failure shouldn't break the flow
  }
}

async function getWalletSummary(): Promise<{ income: number; expense: number; balance: number }> {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
  
  const { data, error } = await supabase
    .from('wallet_transactions')
    .select('type, amount_in_usd');
  
  if (error || !data) {
    return { income: 0, expense: 0, balance: 0 };
  }
  
  let income = 0;
  let expense = 0;
  
  for (const t of data) {
    if (t.type === 'income') {
      income += t.amount_in_usd || 0;
    } else {
      expense += t.amount_in_usd || 0;
    }
  }
  
  return { income, expense, balance: income - expense };
}

async function handlePhotoMessage(message: TelegramMessage) {
  const chatId = message.chat.id;
  
  // Get the largest photo
  const photo = message.photo![message.photo!.length - 1];
  
  await sendTelegramMessage(chatId, '🔍 Analyzing your invoice image...');
  
  const imageUrl = await getFileUrl(photo.file_id);
  
  if (!imageUrl) {
    await sendTelegramMessage(chatId, '❌ Failed to download the image. Please try again.');
    return;
  }
  
  const invoiceData = await analyzeInvoiceImage(imageUrl);
  
  if (!invoiceData || invoiceData.amount <= 0) {
    await sendTelegramMessage(chatId, `
❌ <b>Could not extract invoice data</b>

I couldn't read the invoice clearly. Please try:
• Sending a clearer photo
• Making sure the total amount is visible
• Or manually type: <code>$50 description</code>
    `);
    return;
  }
  
  const success = await saveTransaction({
    type: invoiceData.type,
    amount: invoiceData.amount,
    currency: invoiceData.currency,
    purpose: invoiceData.purpose,
    description: invoiceData.details,
    telegramMessageId: String(message.message_id),
  });
  
  if (success) {
    const exchangeRate = await getExchangeRate(invoiceData.currency);
    const amountInUsd = invoiceData.amount * exchangeRate;
    
    // Get updated wallet summary
    const summary = await getWalletSummary();
    
    const emoji = invoiceData.type === 'income' ? '📈' : '📉';
    const color = invoiceData.type === 'income' ? '🟢' : '🔴';
    
    const confirmText = `
${emoji} <b>Invoice Analyzed & Saved!</b>

${color} Type: ${invoiceData.type.toUpperCase()}
💵 Amount: ${CURRENCY_PATTERNS[invoiceData.currency.toLowerCase()]?.symbol || '$'}${invoiceData.amount.toLocaleString()} ${invoiceData.currency}
💱 USD: ~$${amountInUsd.toFixed(2)}
📝 Purpose: ${invoiceData.purpose}
${invoiceData.details ? `📋 Details: ${invoiceData.details}` : ''}

━━━━━━━━━━━━━━━
💰 <b>Wallet Summary</b>
📈 Total Income: <code>$${summary.income.toFixed(2)}</code>
📉 Total Expense: <code>$${summary.expense.toFixed(2)}</code>
💵 Balance: <code>$${summary.balance.toFixed(2)}</code>

✅ Added to your wallet!
📧 Email notification sent!
    `;
    await sendTelegramMessage(chatId, confirmText);
    
    // Send email notification
    await sendInvoiceEmailNotification({
      type: invoiceData.type,
      amount: invoiceData.amount,
      currency: invoiceData.currency,
      purpose: invoiceData.purpose,
      details: invoiceData.details,
      amountInUsd,
      source: 'image',
    });
  } else {
    await sendTelegramMessage(chatId, '❌ Failed to save transaction. Please try again.');
  }
}

async function handleDocumentMessage(message: TelegramMessage) {
  const chatId = message.chat.id;
  const doc = message.document!;
  
  // Check if it's a PDF
  if (doc.mime_type !== 'application/pdf') {
    await sendTelegramMessage(chatId, `
❌ <b>Unsupported file type</b>

Please send a PDF invoice or a photo/image.
    `);
    return;
  }
  
  await sendTelegramMessage(chatId, '📄 Analyzing your PDF invoice...');
  
  const pdfUrl = await getFileUrl(doc.file_id);
  
  if (!pdfUrl) {
    await sendTelegramMessage(chatId, '❌ Failed to download the PDF. Please try again.');
    return;
  }
  
  const invoiceData = await analyzeInvoicePDF(pdfUrl);
  
  if (!invoiceData || invoiceData.amount <= 0) {
    await sendTelegramMessage(chatId, `
❌ <b>Could not extract invoice data</b>

I couldn't read the PDF clearly. Please try:
• Sending a clearer PDF
• Making sure the total amount is visible
• Or manually type: <code>$50 description</code>
    `);
    return;
  }
  
  const success = await saveTransaction({
    type: invoiceData.type,
    amount: invoiceData.amount,
    currency: invoiceData.currency,
    purpose: invoiceData.purpose,
    description: invoiceData.details,
    telegramMessageId: String(message.message_id),
  });
  
  if (success) {
    const exchangeRate = await getExchangeRate(invoiceData.currency);
    const amountInUsd = invoiceData.amount * exchangeRate;
    
    // Get updated wallet summary
    const summary = await getWalletSummary();
    
    const emoji = invoiceData.type === 'income' ? '📈' : '📉';
    const color = invoiceData.type === 'income' ? '🟢' : '🔴';
    
    const confirmText = `
${emoji} <b>PDF Invoice Analyzed & Saved!</b>

${color} Type: ${invoiceData.type.toUpperCase()}
💵 Amount: ${CURRENCY_PATTERNS[invoiceData.currency.toLowerCase()]?.symbol || '$'}${invoiceData.amount.toLocaleString()} ${invoiceData.currency}
💱 USD: ~$${amountInUsd.toFixed(2)}
📝 Purpose: ${invoiceData.purpose}
${invoiceData.details ? `📋 Details: ${invoiceData.details}` : ''}

━━━━━━━━━━━━━━━
💰 <b>Wallet Summary</b>
📈 Total Income: <code>$${summary.income.toFixed(2)}</code>
📉 Total Expense: <code>$${summary.expense.toFixed(2)}</code>
💵 Balance: <code>$${summary.balance.toFixed(2)}</code>

✅ Added to your wallet!
📧 Email notification sent!
    `;
    await sendTelegramMessage(chatId, confirmText);
    
    // Send email notification
    await sendInvoiceEmailNotification({
      type: invoiceData.type,
      amount: invoiceData.amount,
      currency: invoiceData.currency,
      purpose: invoiceData.purpose,
      details: invoiceData.details,
      amountInUsd,
      source: 'pdf',
    });
  } else {
    await sendTelegramMessage(chatId, '❌ Failed to save transaction. Please try again.');
  }
}

async function handleMessage(message: TelegramMessage) {
  const chatId = message.chat.id;
  
  // Handle photo messages
  if (message.photo && message.photo.length > 0) {
    await handlePhotoMessage(message);
    return;
  }
  
  // Handle document/PDF messages
  if (message.document) {
    await handleDocumentMessage(message);
    return;
  }
  
  const text = message.text || '';
  const lowerText = text.toLowerCase().trim();
  
  console.log('Processing message:', text);

  // Help command
  if (lowerText === '/start' || lowerText === '/help') {
    const helpText = `
💰 <b>Wallet Bot - Multi-Currency Tracker</b>

📝 <b>Add Transaction:</b>
Just send a message like:
• <code>$50 lunch</code>
• <code>৳500 shopping</code>
• <code>income $100 client payment</code>
• <code>expense €30 software</code>

📸 <b>Invoice Photo/PDF:</b>
Send an invoice photo or PDF and I'll analyze it automatically!

💱 <b>Supported Currencies:</b>
$ (USD), ৳ (BDT), € (EUR), £ (GBP), ₹ (INR), ¥ (JPY/CNY), and more!

📊 <b>Commands:</b>
/balance - View wallet summary
/help - Show this help

🎯 <b>Tips:</b>
• Use "income" or "+" for income
• Use "expense" or "-" for expense
• Default type is expense
• Default currency is USD
    `;
    await sendTelegramMessage(chatId, helpText);
    return;
  }

  // Balance command
  if (lowerText === '/balance' || lowerText === '/summary') {
    const summary = await getWalletSummary();
    const balanceText = `
💰 <b>Wallet Summary</b>

📈 Income: <code>$${summary.income.toFixed(2)}</code>
📉 Expense: <code>$${summary.expense.toFixed(2)}</code>
━━━━━━━━━━━━━━━
💵 Balance: <code>$${summary.balance.toFixed(2)}</code>
${summary.balance < 0 ? '⚠️ Deficit!' : '✅ Positive'}
    `;
    await sendTelegramMessage(chatId, balanceText);
    return;
  }

  // Try to parse as transaction
  const transaction = parseTransaction(text);
  
  if (transaction) {
    const success = await saveTransaction({
      ...transaction,
      telegramMessageId: String(message.message_id),
    });
    
    if (success) {
      const exchangeRate = await getExchangeRate(transaction.currency);
      const amountInUsd = transaction.amount * exchangeRate;
      
      const emoji = transaction.type === 'income' ? '📈' : '📉';
      const color = transaction.type === 'income' ? '🟢' : '🔴';
      
      const confirmText = `
${emoji} <b>Transaction Added!</b>

${color} Type: ${transaction.type.toUpperCase()}
💵 Amount: ${CURRENCY_PATTERNS[transaction.currency.toLowerCase()]?.symbol || '$'}${transaction.amount.toLocaleString()} ${transaction.currency}
💱 USD: ~$${amountInUsd.toFixed(2)}
📝 Purpose: ${transaction.purpose}

✅ Saved to your wallet!
      `;
      await sendTelegramMessage(chatId, confirmText);
    } else {
      await sendTelegramMessage(chatId, '❌ Failed to save transaction. Please try again.');
    }
  } else {
    await sendTelegramMessage(chatId, `
❓ I couldn't understand that.

<b>Try something like:</b>
• <code>$50 lunch</code>
• <code>৳500 shopping</code>
• <code>income $100 payment</code>
• 📸 Send an invoice photo or PDF

Type /help for more info.
    `);
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    
    // Webhook verification
    if (req.method === 'GET') {
      return new Response('Telegram Wallet Bot is running!', {
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
      });
    }

    // Process webhook update
    if (req.method === 'POST') {
      const update: TelegramUpdate = await req.json();
      console.log('Received update:', JSON.stringify(update));
      
      if (update.message) {
        await handleMessage(update.message);
      }
      
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
