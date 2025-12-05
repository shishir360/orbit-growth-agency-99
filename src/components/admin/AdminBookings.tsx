import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Calendar, Clock, Mail, Phone, Video, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  meeting_platform: string;
  notes: string | null;
  status: string;
  source: string;
  timezone: string | null;
  timezone_offset: number | null;
  created_at: string;
  updated_at: string;
}

// Helper functions to convert user's local time to Bangladesh time (Asia/Dhaka)
const parseTimeToMinutes = (timeStr: string) => {
  const [time, ampm] = timeStr.split(' ');
  let [h, m] = time.split(':').map(Number);
  if (ampm?.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (ampm?.toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + (m || 0);
};

const formatMinutesTo12Hour = (mins: number) => {
  const total = ((mins % (24 * 60)) + (24 * 60)) % (24 * 60);
  let h = Math.floor(total / 60);
  const m = total % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  const hh = h.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  return `${hh}:${mm} ${ampm}`;
};

const toDhakaTime = (localTimeStr: string, userOffset: number | null | undefined) => {
  if (userOffset === null || userOffset === undefined) return null;
  const localMins = parseTimeToMinutes(localTimeStr);
  const utcMins = localMins + userOffset; // getTimezoneOffset semantics
  const dhakaOffset = -360; // Asia/Dhaka = UTC+6 -> getTimezoneOffset = -360
  const dhakaMins = utcMins - dhakaOffset;
  return formatMinutesTo12Hour(dhakaMins);
};

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('apartment_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.phone.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      pending: 'default',
      confirmed: 'secondary',
      completed: 'secondary',
      cancelled: 'destructive'
    };
    return variants[status] || 'default';
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('apartment_bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setBookings(bookings.map(booking =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      ));

      // Send confirmation email when status changes to 'confirmed'
      if (newStatus === 'confirmed') {
        try {
          const { error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
            body: { bookingId: id }
          });
          
          if (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            toast({
              title: "Warning",
              description: "Status updated but confirmation email failed to send",
              variant: "destructive"
            });
            return;
          }

          toast({
            title: "Success",
            description: "Booking confirmed and email sent to customer"
          });
        } catch (emailErr) {
          console.error('Error sending confirmation email:', emailErr);
          toast({
            title: "Warning",
            description: "Status updated but email notification failed",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Success",
          description: "Booking status updated"
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const { error } = await supabase
        .from('apartment_bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBookings(bookings.filter(booking => booking.id !== id));
      toast({
        title: "Success",
        description: "Booking deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive"
      });
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    withNotes: bookings.filter(b => b.notes && b.notes.trim() !== '').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Apartment Bookings</h2>
        <p className="text-muted-foreground">Manage all appointment bookings and consultations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Notes</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.withNotes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No bookings found</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            <span className="text-xs">{booking.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            <span className="text-xs">{booking.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span className="text-xs">{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">{booking.time}</span>
                          </div>
                          {booking.timezone && (
                            <div className="text-xs text-primary font-semibold">
                              🌍 {booking.timezone}
                              {booking.timezone_offset !== null && ` (UTC${booking.timezone_offset > 0 ? '-' : '+'}${Math.abs(booking.timezone_offset/60)})`}
                            </div>
                          )}
                          {typeof booking.timezone_offset === 'number' && (
                            <div className="text-xs text-accent font-semibold">
                              🇧🇩 BD Time: {toDhakaTime(booking.time, booking.timezone_offset)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Video className="h-3 w-3" />
                          <span className="text-xs">{booking.meeting_platform}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        {booking.notes ? (
                          <div className="text-xs text-muted-foreground">
                            {booking.notes}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">No notes</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {booking.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(booking.id, 'confirmed')}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirm
                            </Button>
                          )}
                          {booking.status === 'confirmed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(booking.id, 'completed')}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteBooking(booking.id)}
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
    </div>
  );
};

export default AdminBookings;
