import { useState, useEffect } from 'react';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SEO from '@/components/ui/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Video, Phone, Mail, User, CheckCircle2, Sparkles, Star, Award, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const BookApartment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
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
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' }
  ];

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];

  // Fetch booked time slots when date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!date) return;
      setLoadingSlots(true);
      try {
        const formattedDate = format(date, 'PPP');
        const { data, error } = await supabase
          .from('apartment_bookings')
          .select('time')
          .eq('date', formattedDate)
          .neq('status', 'cancelled');
        if (error) throw error;
        const slots = data?.map(booking => booking.time) || [];
        setBookedSlots(slots);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchBookedSlots();
  }, [date]);

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

    if (bookedSlots.includes(formData.time)) {
      toast({
        title: "Time Slot Unavailable",
        description: "This time slot has already been booked. Please select another time.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timezoneOffset = new Date().getTimezoneOffset();
      
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode}${formData.phone}`,
        date: format(date, 'PPP'),
        time: formData.time,
        meeting_platform: formData.meetingPlatform,
        notes: formData.notes || '',
        timezone: userTimezone,
        timezone_offset: timezoneOffset
      };

      const { error: functionError } = await supabase.functions.invoke('booking-notification', {
        body: bookingData,
      });

      if (functionError) throw functionError;

      toast({
        title: "Success!",
        description: "Your booking has been confirmed. Check your email for details."
      });

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
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/book-apartment"
        keywords="book appointment, schedule consultation, free consultation, online meeting" 
      />
      <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5FF4A]/5 rounded-full blur-[150px]" />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <Navigation />
        
        <main className="flex-grow container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Premium Hero Section */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full mb-8">
                <Star className="w-5 h-5 text-[#C5FF4A]" />
                <span className="text-sm font-semibold text-white">Premium Strategy Session</span>
                <Star className="w-5 h-5 text-[#C5FF4A]" />
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95]">
                <span className="text-white">Elevate Your</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-[#C5FF4A] bg-clip-text text-transparent">Digital Presence</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-12">
                Join the elite. Schedule an exclusive consultation with our award-winning team and transform your vision into reality.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="flex items-center gap-2 text-gray-300">
                  <Award className="w-6 h-6 text-emerald-400" />
                  <span className="text-sm font-medium">Industry Leaders</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Zap className="w-6 h-6 text-[#C5FF4A]" />
                  <span className="text-sm font-medium">24hr Response</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                  <span className="text-sm font-medium">50+ Projects</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Premium Features */}
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />
                  <div className="p-10 relative">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Exclusive Benefits</span>
                    </div>
                    <h2 className="text-3xl font-black mb-8 text-white">
                      What You'll <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
                    </h2>
                    <ul className="space-y-6">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-4 group">
                          <div className="mt-1 w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-lg font-medium text-gray-200 leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-[#C5FF4A]/20 rounded-3xl overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-[#C5FF4A]" />
                  <div className="p-10">
                    <h3 className="text-2xl font-black mb-4 text-white">
                      The <span className="text-[#C5FF4A]">Elite</span> Advantage
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg mb-6">
                      Join 500+ successful businesses who've transformed their digital presence with our guidance. 
                      Our award-winning team delivers personalized strategies backed by proven results.
                    </p>
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">98%</div>
                        <div className="text-xs text-gray-500 mt-1">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-[#C5FF4A] bg-clip-text text-transparent">24h</div>
                        <div className="text-xs text-gray-500 mt-1">Response</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-black bg-gradient-to-r from-[#C5FF4A] to-emerald-400 bg-clip-text text-transparent">50+</div>
                        <div className="text-xs text-gray-500 mt-1">Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Premium Booking Form */}
              <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-[#C5FF4A]" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="p-10 relative">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-4">
                      <CalendarIcon className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Secure Your Spot</span>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">
                      Reserve Your <span className="bg-gradient-to-r from-emerald-400 to-[#C5FF4A] bg-clip-text text-transparent">Session</span>
                    </h2>
                    <p className="text-gray-400">Limited slots available this month</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-7">
                    {/* Name */}
                    <div className="space-y-3">
                      <Label htmlFor="name" className="flex items-center gap-2 text-white font-semibold text-sm">
                        <User className="w-4 h-4 text-emerald-400" />
                        Full Name *
                      </Label>
                      <Input 
                        id="name" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })} 
                        placeholder="John Doe" 
                        className="h-12 bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" 
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                      <Label htmlFor="email" className="flex items-center gap-2 text-white font-semibold text-sm">
                        <Mail className="w-4 h-4 text-emerald-400" />
                        Email Address *
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={e => setFormData({ ...formData, email: e.target.value })} 
                        placeholder="john@company.com" 
                        className="h-12 bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" 
                      />
                    </div>

                    {/* Phone with Country Code */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-white font-semibold text-sm">
                        <Phone className="w-4 h-4 text-emerald-400" />
                        Phone Number *
                      </Label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Select value={formData.countryCode} onValueChange={value => setFormData({ ...formData, countryCode: value })}>
                          <SelectTrigger className="w-full sm:w-[160px] h-12 bg-black/50 border-white/10 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all">
                            <SelectValue>
                              <div className="flex items-center gap-2">
                                <span className="text-xl">
                                  {countryCodes.find(c => c.code === formData.countryCode)?.flag}
                                </span>
                                <span className="font-medium">{formData.countryCode}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] bg-zinc-900 border-white/10">
                            {countryCodes.map(item => (
                              <SelectItem key={item.code} value={item.code} className="text-white hover:bg-white/10 focus:bg-white/10">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{item.flag}</span>
                                  <span className="font-medium">{item.code}</span>
                                  <span className="text-gray-400 text-sm">({item.country})</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input 
                          required 
                          type="tel" 
                          value={formData.phone} 
                          onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                          placeholder="1234567890" 
                          className="flex-1 h-12 bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium" 
                        />
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-white font-semibold text-sm">
                        <CalendarIcon className="w-4 h-4 text-emerald-400" />
                        Preferred Date *
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal bg-black/50 border-white/10 text-white hover:bg-white/5 hover:border-emerald-500 transition-all", 
                              !date && "text-gray-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-zinc-900 border-white/10" align="start">
                          <Calendar 
                            mode="single" 
                            selected={date} 
                            onSelect={setDate} 
                            disabled={date => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }} 
                            initialFocus 
                            className="pointer-events-auto bg-zinc-900 text-white [&_.rdp-day]:text-white [&_.rdp-day_button:hover]:bg-emerald-500/20 [&_.rdp-day_button.rdp-day_selected]:bg-emerald-500 [&_.rdp-head_cell]:text-gray-400 [&_.rdp-caption]:text-white [&_.rdp-nav_button]:text-white [&_.rdp-nav_button:hover]:bg-white/10" 
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-white font-semibold text-sm">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        Preferred Time *
                      </Label>
                      {loadingSlots ? (
                        <div className="h-12 bg-black/50 border border-white/10 rounded-md flex items-center justify-center">
                          <span className="text-sm text-gray-400">Loading available slots...</span>
                        </div>
                      ) : (
                        <Select value={formData.time} onValueChange={value => setFormData({ ...formData, time: value })} disabled={!date}>
                          <SelectTrigger className="h-12 bg-black/50 border-white/10 text-white">
                            <SelectValue placeholder={date ? "Select a time slot" : "Please select a date first"} />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            {timeSlots.map(time => {
                              const isBooked = bookedSlots.includes(time);
                              return (
                                <SelectItem 
                                  key={time} 
                                  value={time} 
                                  disabled={isBooked} 
                                  className={cn("text-white hover:bg-white/10 focus:bg-white/10", isBooked && "opacity-50")}
                                >
                                  <div className="flex items-center justify-between w-full gap-2">
                                    <span>{time}</span>
                                    {isBooked && (
                                      <span className="text-xs text-amber-500 font-medium">⚠️ Occupied</span>
                                    )}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    {/* Meeting Platform */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-white font-semibold text-sm">
                        <Video className="w-4 h-4 text-emerald-400" />
                        Meeting Platform *
                      </Label>
                      <Select value={formData.meetingPlatform} onValueChange={value => setFormData({ ...formData, meetingPlatform: value })}>
                        <SelectTrigger className="h-12 bg-black/50 border-white/10 text-white">
                          <SelectValue placeholder="Choose your preferred platform" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10">
                          <SelectItem value="Google Meet" className="text-white hover:bg-white/10 focus:bg-white/10">
                            <div className="flex items-center gap-2">
                              <Video className="w-4 h-4" />
                              Google Meet
                            </div>
                          </SelectItem>
                          <SelectItem value="Zoom" className="text-white hover:bg-white/10 focus:bg-white/10">
                            <div className="flex items-center gap-2">
                              <Video className="w-4 h-4" />
                              Zoom
                            </div>
                          </SelectItem>
                          <SelectItem value="Phone Call" className="text-white hover:bg-white/10 focus:bg-white/10">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Phone Call
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Notes */}
                    <div className="space-y-3">
                      <Label htmlFor="notes" className="text-white font-semibold text-sm">
                        Additional Information (Optional)
                      </Label>
                      <Input 
                        id="notes" 
                        value={formData.notes} 
                        onChange={e => setFormData({ ...formData, notes: e.target.value })} 
                        placeholder="Tell us about your project or specific requirements..." 
                        className="h-12 bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" 
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold bg-[#C5FF4A] text-black hover:bg-[#d4ff6a] hover:shadow-2xl hover:shadow-[#C5FF4A]/20 hover:scale-[1.02] transition-all duration-300" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                            Securing Your Spot...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Secure My Premium Session
                            <Sparkles className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-center text-gray-500 mt-3">
                        🔒 Your information is secure and confidential
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-sm">
                  Need immediate assistance? 
                  <a 
                    href="https://wa.me/17024830749" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#C5FF4A] hover:underline ml-1 font-semibold"
                  >
                    Contact us on WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BookApartment;
