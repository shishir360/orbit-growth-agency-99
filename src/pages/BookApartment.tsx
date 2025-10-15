import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SEO from '@/components/ui/seo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Video, Phone, Mail, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const BookApartment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+880',
    phone: '',
    time: '',
    meetingPlatform: '',
    notes: ''
  });

  const countryCodes = [
    { code: '+880', country: 'Bangladesh' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+971', country: 'UAE' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+92', country: 'Pakistan' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.time || !formData.meetingPlatform) {
      toast({
        title: "ত্রুটি",
        description: "সব ফিল্ড পূরণ করুন",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode}${formData.phone}`,
        date: format(date, 'PPP'),
        time: formData.time,
        meetingPlatform: formData.meetingPlatform,
        notes: formData.notes,
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('https://iamfts0bbb.app.n8n.cloud/webhook-test/Apt-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        toast({
          title: "সফল!",
          description: "আপনার বুকিং সফলভাবে জমা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          countryCode: '+880',
          phone: '',
          time: '',
          meetingPlatform: '',
          notes: ''
        });
        setDate(undefined);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "ত্রুটি",
        description: "বুকিং জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Book Your Apartment Consultation - LUNEXO MEDIA"
        description="Schedule a free consultation with our experts. Book your appointment through Google Meet, Zoom, or phone call."
        keywords="book appointment, schedule consultation, apartment booking, free consultation, online meeting"
      />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                অ্যাপার্টমেন্ট বুকিং
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                আপনার সুবিধামত সময়ে আমাদের সাথে মিটিং বুক করুন। আমরা Google Meet, Zoom অথবা Phone Call এর মাধ্যমে আপনার সাথে যোগাযোগ করব।
              </p>
            </div>

            <Card className="shadow-2xl border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CalendarIcon className="w-6 h-6 text-primary" />
                  বুকিং ফর্ম
                </CardTitle>
                <CardDescription>
                  নিচের ফর্মটি পূরণ করে আপনার অ্যাপয়েন্টমেন্ট কনফার্ম করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      আপনার নাম *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      ইমেইল *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="example@email.com"
                    />
                  </div>

                  {/* Phone with Country Code */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      ফোন নম্বর *
                    </Label>
                    <div className="flex gap-2">
                      <Select
                        value={formData.countryCode}
                        onValueChange={(value) => setFormData({...formData, countryCode: value})}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((item) => (
                            <SelectItem key={item.code} value={item.code}>
                              {item.code} ({item.country})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="1234567890"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      তারিখ নির্বাচন করুন *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : "একটি তারিখ বেছে নিন"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      সময় নির্বাচন করুন *
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => setFormData({...formData, time: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="একটি সময় বেছে নিন" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Meeting Platform */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      মিটিং প্ল্যাটফর্ম *
                    </Label>
                    <Select
                      value={formData.meetingPlatform}
                      onValueChange={(value) => setFormData({...formData, meetingPlatform: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="মিটিং প্ল্যাটফর্ম বেছে নিন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Google Meet">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Google Meet
                          </div>
                        </SelectItem>
                        <SelectItem value="Zoom">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Zoom
                          </div>
                        </SelectItem>
                        <SelectItem value="Phone Call">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone Call
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">
                      অতিরিক্ত তথ্য (ঐচ্ছিক)
                    </Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="আপনার কোন বিশেষ প্রয়োজন থাকলে লিখুন"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? 'জমা দেওয়া হচ্ছে...' : 'বুকিং কনফার্ম করুন'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                কোন সমস্যা হলে আমাদের সাথে সরাসরি যোগাযোগ করুন: 
                <a href="/contact" className="text-primary hover:underline ml-1">
                  Contact Page
                </a>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BookApartment;
