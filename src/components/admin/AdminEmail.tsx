import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send, Inbox, Clock, User, RefreshCw, Check, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface ReceivedEmail {
  id: string;
  from_email: string;
  from_name: string | null;
  to_email: string;
  subject: string;
  text_body: string | null;
  html_body: string | null;
  received_at: string;
  is_read: boolean;
  is_replied: boolean;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  company: string | null;
  phone: string | null;
  status: string;
  created_at: string;
}

const AdminEmail = () => {
  const [receivedEmails, setReceivedEmails] = useState<ReceivedEmail[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<ReceivedEmail | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  
  // Compose email state
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch received emails
      const { data: emails, error: emailError } = await supabase
        .from("received_emails")
        .select("*")
        .order("received_at", { ascending: false });

      if (emailError) {
        console.error("Error fetching received emails:", emailError);
      } else {
        setReceivedEmails(emails || []);
      }

      // Fetch contact submissions
      const { data: contacts, error: contactError } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (contactError) {
        console.error("Error fetching contact submissions:", contactError);
      } else {
        setContactSubmissions(contacts || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch emails",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Subscribe to realtime updates
    const emailChannel = supabase
      .channel("received_emails_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "received_emails" },
        () => fetchData()
      )
      .subscribe();

    const contactChannel = supabase
      .channel("contact_submissions_email")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_submissions" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(emailChannel);
      supabase.removeChannel(contactChannel);
    };
  }, []);

  const sendEmail = async () => {
    if (!toEmail || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-admin-email", {
        body: {
          to: toEmail,
          subject,
          message,
          fromEmail: "hello@lunexomedia.com",
        },
      });

      if (error) throw error;

      toast({
        title: "Email Sent",
        description: `Email sent successfully to ${toEmail}`,
      });

      setToEmail("");
      setSubject("");
      setMessage("");
      setShowCompose(false);
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const markAsRead = async (emailId: string) => {
    try {
      await supabase
        .from("received_emails")
        .update({ is_read: true })
        .eq("id", emailId);
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const deleteEmail = async (emailId: string) => {
    try {
      await supabase.from("received_emails").delete().eq("id", emailId);
      toast({ title: "Email deleted" });
      setSelectedEmail(null);
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const replyToEmail = (email: ReceivedEmail) => {
    setToEmail(email.from_email);
    setSubject(`Re: ${email.subject}`);
    setMessage("");
    setShowCompose(true);
    setSelectedEmail(null);
  };

  const replyToContact = (contact: ContactSubmission) => {
    setToEmail(contact.email);
    setSubject(`Re: Message from ${contact.name}`);
    setMessage("");
    setShowCompose(true);
    setSelectedContact(null);
  };

  const unreadCount = receivedEmails.filter((e) => !e.is_read).length;
  const newContactsCount = contactSubmissions.filter((c) => c.status === "new").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Email Management</h1>
          <p className="text-muted-foreground mt-1">
            Send and receive emails from hello@lunexomedia.com
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowCompose(!showCompose)}>
            <Send className="h-4 w-4 mr-2" />
            Compose Email
          </Button>
        </div>
      </div>

      {/* Compose Email Section */}
      {showCompose && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Compose New Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Input value="hello@lunexomedia.com" disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Input
                  type="email"
                  placeholder="recipient@example.com"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCompose(false)}>
                Cancel
              </Button>
              <Button onClick={sendEmail} disabled={sending}>
                {sending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Email
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Received Emails</p>
                <p className="text-2xl font-bold">{receivedEmails.length}</p>
              </div>
              <Inbox className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contact Forms</p>
                <p className="text-2xl font-bold">{contactSubmissions.length}</p>
              </div>
              <User className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Contacts</p>
                <p className="text-2xl font-bold">{newContactsCount}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Tabs */}
      <Tabs defaultValue="inbox" className="w-full">
        <TabsList>
          <TabsTrigger value="inbox" className="relative">
            Inbox
            {unreadCount > 0 && (
              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="contacts" className="relative">
            Contact Forms
            {newContactsCount > 0 && (
              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {newContactsCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Inbox Tab */}
        <TabsContent value="inbox">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Inbox className="h-5 w-5" />
                Received Emails
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : receivedEmails.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No emails received yet</p>
                  <p className="text-sm mt-2">
                    To receive emails, set up Resend inbound webhook at:
                  </p>
                  <code className="text-xs bg-muted p-2 rounded mt-2 block">
                    https://qiczzqaevdztzhllgnlg.supabase.co/functions/v1/receive-email-webhook
                  </code>
                </div>
              ) : (
                <div className="space-y-3">
                  {receivedEmails.map((email) => (
                    <div
                      key={email.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedEmail?.id === email.id ? "border-primary bg-muted/30" : ""
                      } ${!email.is_read ? "bg-primary/5 border-primary/20" : ""}`}
                      onClick={() => {
                        setSelectedEmail(selectedEmail?.id === email.id ? null : email);
                        if (!email.is_read) markAsRead(email.id);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${!email.is_read ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                            <Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${!email.is_read ? "font-bold" : ""}`}>
                                {email.from_name || email.from_email}
                              </span>
                              {!email.is_read && <Badge variant="default" className="text-xs">New</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{email.subject}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(email.received_at), "MMM d, h:mm a")}
                        </span>
                      </div>
                      
                      {selectedEmail?.id === email.id && (
                        <div className="mt-4 pt-4 border-t space-y-3">
                          <p className="text-sm">
                            <span className="text-muted-foreground">From:</span> {email.from_email}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">To:</span> {email.to_email}
                          </p>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Message:</p>
                            <div className="text-sm bg-muted/50 p-3 rounded-lg whitespace-pre-wrap max-h-64 overflow-y-auto">
                              {email.text_body || "No text content"}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => replyToEmail(email)}>
                              <Send className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteEmail(email.id)}>
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Forms Tab */}
        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Form Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : contactSubmissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No contact submissions yet
                </div>
              ) : (
                <div className="space-y-3">
                  {contactSubmissions.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedContact?.id === contact.id ? "border-primary bg-muted/30" : ""
                      }`}
                      onClick={() => setSelectedContact(selectedContact?.id === contact.id ? null : contact)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{contact.name}</span>
                              <Badge variant={contact.status === "new" ? "default" : "secondary"}>
                                {contact.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(contact.created_at), "MMM d, h:mm a")}
                        </span>
                      </div>
                      
                      {selectedContact?.id === contact.id && (
                        <div className="mt-4 pt-4 border-t space-y-3">
                          {contact.company && (
                            <p className="text-sm">
                              <span className="text-muted-foreground">Company:</span> {contact.company}
                            </p>
                          )}
                          {contact.phone && (
                            <p className="text-sm">
                              <span className="text-muted-foreground">Phone:</span> {contact.phone}
                            </p>
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Message:</p>
                            <p className="text-sm bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">
                              {contact.message}
                            </p>
                          </div>
                          <Button size="sm" onClick={() => replyToContact(contact)}>
                            <Send className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminEmail;
