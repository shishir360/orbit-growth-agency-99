import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SEO from '@/components/ui/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Video, Phone, Mail, User, CheckCircle2, Sparkles, Star, Award, Zap, ArrowRight, Play, ChevronRight, Shield, ShieldCheck, Activity, Layers, Database } from 'lucide-react';
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
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
  ];

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];

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
        title: "Protocol Error",
        description: "Please fill in all required intelligence fields.",
        variant: "destructive"
      });
      return;
    }

    if (bookedSlots.includes(formData.time)) {
      toast({
        title: "Node Unavailable",
        description: "This time node has already been synchronized. Please select another slot.",
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
        title: "Protocol Synchronized",
        description: "Your absolute strategy session has been confirmed. Check your uplink for details."
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
        title: "Transmission Error",
        description: "Failed to submit protocol. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Secure Strategy Session | LUNEXO MEDIA";
  }, []);

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO 
        title="Secure Strategy Session | LUNEXO MEDIA" 
        description="Schedule a free consultation with our experts. Book your appointment through Google Meet, Zoom, or phone call." 
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/book-apartment"
        keywords="book appointment, schedule consultation, free consultation, online meeting" 
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-8 py-3 text-sm font-bold rounded-full backdrop-blur-xl">
                <Star className="w-5 h-5 mr-3" />
                Premium Strategy Session Protocol
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              Elevate Your <br /> <span className="text-primary italic">Absolute DNA.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Join the elite. Schedule an exclusive consultation and transform your <span className="text-primary italic font-bold">vision into absolute reality.</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Booking Architecture */}
      <section className="py-24 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto items-start">
            {/* Left Info */}
            <div className="space-y-16">
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-24 shadow-glass relative space-y-12">
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
                  <Sparkles className="w-5 h-5 mr-3" /> Absolute Benefits
                </Badge>
                <h2 className="text-5xl lg:text-7xl font-heading font-bold text-slate-900 leading-tight">
                  The <span className="text-primary italic">Experience.</span>
                </h2>
                <div className="space-y-10">
                  {[
                    "Absolute consultation with our senior experts",
                    "Bespoke ROI-driven growth blueprint",
                    "Flexible meeting nodes (Meet, Zoom, Call)",
                    "No obligation, pure strategic velocity"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-8 group">
                      <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center border border-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <span className="text-2xl font-bold text-slate-700 pt-3">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-16 shadow-glass">
                <div className="grid grid-cols-3 gap-12">
                  {[
                    { value: "98%", label: "Satisfaction" },
                    { value: "24h", label: "Response" },
                    { value: "500+", label: "Architectures" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-4xl lg:text-5xl font-heading font-black text-primary tracking-tighter">{stat.value}</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 lg:p-24 shadow-glass relative"
            >
              <div className="mb-16 space-y-6">
                <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
                  Secure Your Node
                </Badge>
                <h2 className="text-5xl font-heading font-bold text-slate-900">Reserve Session.</h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">Limited availability for high-velocity strategy.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-4">
                  <Label htmlFor="name" className="text-slate-900 font-black uppercase tracking-widest text-[10px] ml-1 flex items-center gap-3">
                    <User className="w-4 h-4 text-primary" /> Full Name Protocol *
                  </Label>
                  <Input 
                    id="name" 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    className="h-20 bg-white/60 border-white/60 rounded-[2rem] px-8 focus:border-primary/50 text-slate-900 font-bold placeholder:text-slate-400"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="email" className="text-slate-900 font-black uppercase tracking-widest text-[10px] ml-1 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" /> Email Protocol *
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    className="h-20 bg-white/60 border-white/60 rounded-[2rem] px-8 focus:border-primary/50 text-slate-900 font-bold placeholder:text-slate-400"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-900 font-black uppercase tracking-widest text-[10px] ml-1 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" /> Phone Protocol *
                  </Label>
                  <div className="flex gap-6">
                    <Select value={formData.countryCode} onValueChange={value => setFormData({ ...formData, countryCode: value })}>
                      <SelectTrigger className="h-20 bg-white/60 border-white/60 rounded-[2rem] px-8 min-w-[140px] font-bold text-slate-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white backdrop-blur-xl border-slate-200 rounded-3xl overflow-hidden">
                        {countryCodes.map(item => (
                          <SelectItem key={item.code} value={item.code} className="font-bold">
                            {item.flag} {item.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      required 
                      type="tel" 
                      value={formData.phone} 
                      onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                      className="flex-1 h-20 bg-white/60 border-white/60 rounded-[2rem] px-8 focus:border-primary/50 text-slate-900 font-bold placeholder:text-slate-400"
                      placeholder="1234567890"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-900 font-black uppercase tracking-widest text-[10px] ml-1 flex items-center gap-3">
                    <CalendarIcon className="w-4 h-4 text-primary" /> Preferred Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className={cn(
                          "w-full h-20 bg-white/60 border-white/60 rounded-[2rem] px-8 justify-start font-bold text-slate-900 hover:bg-white/80", 
                          !date && "text-slate-400"
                        )}
                      >
                        <CalendarIcon className="mr-4 h-6 w-6 text-primary" />
                        {date ? format(date, 'PPP') : "Select Strategy Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-slate-200 shadow-glass rounded-[3rem] overflow-hidden" align="start">
                      <Calendar 
                        mode="single" 
                        selected={date} 
                        onSelect={setDate} 
                        disabled={date => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }} 
                        className="bg-white font-bold p-8"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-900 font-black uppercase tracking-widest text-[10px] ml-1 flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary" /> Preferred Time Node *
                  </Label>
                  <Select value={formData.time} onValueChange={value => setFormData({ ...formData, time: value })} disabled={!date}>
                    <SelectTrigger className="h-20 bg-white/60 border-white/60 rounded-[2rem] px-8 font-bold text-slate-900">
                      <SelectValue placeholder={date ? "Select a time slot" : "Select a date first"} />
                    </SelectTrigger>
                    <SelectContent className="bg-white backdrop-blur-xl border-slate-200 rounded-3xl overflow-hidden">
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time} disabled={bookedSlots.includes(time)} className="font-bold">
                          {time} {bookedSlots.includes(time) && " - Unavailable"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-900 font-black uppercase tracking-widest text-[10px] ml-1 flex items-center gap-3">
                    <Video className="w-4 h-4 text-primary" /> Meeting Platform Protocol *
                  </Label>
                  <Select value={formData.meetingPlatform} onValueChange={value => setFormData({ ...formData, meetingPlatform: value })}>
                    <SelectTrigger className="h-20 bg-white/60 border-white/60 rounded-[2rem] px-8 font-bold text-slate-900">
                      <SelectValue placeholder="Choose protocol platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-white backdrop-blur-xl border-slate-200 rounded-3xl overflow-hidden">
                      <SelectItem value="Google Meet" className="font-bold">Google Meet Protocol</SelectItem>
                      <SelectItem value="Zoom" className="font-bold">Zoom Protocol</SelectItem>
                      <SelectItem value="Phone Call" className="font-bold">Voice Uplink</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-14 rounded-[2.5rem] font-bold text-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-2xl transition-all duration-500 group/btn"
                >
                  {isLoading ? "Synchronizing..." : (
                    <>
                      Secure Strategy Session
                      <ArrowRight className="w-8 h-8 ml-6 group-hover/btn:translate-x-3 transition-transform" />
                    </>
                  )}
                </Button>
                <div className="text-[10px] text-center font-black text-slate-400 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Confidential & Secure Uplink
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookApartment;
