import { useState } from 'react';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SEO from '@/components/ui/seo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Video, Phone, Mail, User, CheckCircle2, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const BookApartment = () => {
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
        title: "Error",
        description: "Please fill in all required fields",
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
          title: "Success!",
          description: "Your booking has been submitted successfully. We'll contact you shortly.",
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
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    "Free consultation with our experts",
    "Flexible meeting options (Google Meet, Zoom, Phone)",
    "Get personalized recommendations",
    "No commitment required"
  ];

  return (
    <>
      <SEO 
        title="Book Your Appointment - LUNEXO MEDIA"
        description="Schedule a free consultation with our experts. Book your appointment through Google Meet, Zoom, or phone call."
        keywords="book appointment, schedule consultation, free consultation, online meeting"
      />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navigation />
        
        <main className="flex-grow container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Free Strategy Session</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent leading-tight">
                Book Your Free Consultation
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Schedule a personalized meeting with our team. We'll discuss your project, answer your questions, 
                and provide actionable insights to help you achieve your goals.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Side - Features */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                      What You'll Get
                    </h2>
                    <ul className="space-y-4">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <span className="text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Why Book With Us?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      We've helped hundreds of businesses achieve their digital goals. 
                      Our expert team will provide you with a customized strategy tailored to your specific needs. 
                      No sales pressure - just honest advice and actionable insights.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side - Booking Form */}
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <CalendarIcon className="w-6 h-6 text-primary" />
                    Schedule Your Meeting
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2 text-gray-200">
                        <User className="w-4 h-4" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-primary"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-gray-200">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="example@email.com"
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-primary"
                      />
                    </div>

                    {/* Phone with Country Code */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-200">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </Label>
                      <div className="flex gap-2">
                        <Select
                          value={formData.countryCode}
                          onValueChange={(value) => setFormData({...formData, countryCode: value})}
                        >
                          <SelectTrigger className="w-[180px] bg-slate-900/50 border-slate-600 text-white">
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
                          className="flex-1 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-200">
                        <CalendarIcon className="w-4 h-4" />
                        Preferred Date *
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-slate-900/50 border-slate-600 text-white hover:bg-slate-800 hover:text-white",
                              !date && "text-gray-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : "Pick a date"}
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
                      <Label className="flex items-center gap-2 text-gray-200">
                        <Clock className="w-4 h-4" />
                        Preferred Time *
                      </Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => setFormData({...formData, time: value})}
                      >
                        <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select a time slot" />
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
                      <Label className="flex items-center gap-2 text-gray-200">
                        <Video className="w-4 h-4" />
                        Meeting Platform *
                      </Label>
                      <Select
                        value={formData.meetingPlatform}
                        onValueChange={(value) => setFormData({...formData, meetingPlatform: value})}
                      >
                        <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                          <SelectValue placeholder="Choose your preferred platform" />
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
                      <Label htmlFor="notes" className="text-gray-200">
                        Additional Information (Optional)
                      </Label>
                      <Input
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Tell us about your project or any specific requirements"
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-primary"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Confirm Booking'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-400">
                Need help? Contact us directly at 
                <a href="/contact" className="text-primary hover:underline ml-1">
                  our contact page
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
