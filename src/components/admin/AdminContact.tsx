import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Mail, Phone, Calendar, Search, Trash2, Reply } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'replied' | 'archived';
  source: 'contact-form' | 'quote-request' | 'newsletter';
}

const AdminContact = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<ContactSubmission[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      subject: 'Website Design Inquiry',
      message: 'Hi, I am interested in your website design services. Could you please provide more information about pricing and timeline?',
      date: '2024-01-20',
      status: 'new',
      source: 'contact-form'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@startup.com',
      phone: '+1 (555) 987-6543',
      subject: 'Google Ads Management Quote',
      message: 'We need help with our Google Ads campaigns. Our current ROAS is not meeting expectations.',
      date: '2024-01-19',
      status: 'replied',
      source: 'quote-request'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@company.com',
      subject: 'AI Automation Discussion',
      message: 'Interested in implementing AI chatbots for our customer service. Can we schedule a call?',
      date: '2024-01-18',
      status: 'new',
      source: 'contact-form'
    }
  ]);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getSourceBadge = (source: string) => {
    const colors = {
      'contact-form': 'bg-purple-100 text-purple-800',
      'quote-request': 'bg-orange-100 text-orange-800',
      'newsletter': 'bg-indigo-100 text-indigo-800'
    };
    return colors[source as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const updateStatus = (id: string, newStatus: ContactSubmission['status']) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: newStatus } : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
        <p className="text-gray-600 mt-2">Manage contact form submissions and inquiries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.length}</p>
                <p className="text-sm text-gray-600">Total Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.filter(c => c.status === 'new').length}</p>
                <p className="text-sm text-gray-600">New Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Reply className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.filter(c => c.status === 'replied').length}</p>
                <p className="text-sm text-gray-600">Replied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.filter(c => c.phone).length}</p>
                <p className="text-sm text-gray-600">With Phone</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Submissions</CardTitle>
          <CardDescription>
            Manage and respond to customer inquiries
          </CardDescription>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                      {contact.phone && (
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contact.subject}</div>
                      <div className="text-sm text-gray-500 max-w-[300px] truncate">
                        {contact.message}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSourceBadge(contact.source)}>
                      {contact.source.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(contact.status)}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {contact.date}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {contact.status === 'new' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateStatus(contact.id, 'replied')}
                        >
                          <Reply className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteContact(contact.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContact;