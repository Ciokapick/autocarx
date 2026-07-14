import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, ClipboardList, Clock, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { leadApi } from "@/services/api";

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service") ?? "";
  const requestedEstimate = searchParams.get("estimate") ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    website: "",
    message: requestedService
      ? `I'm interested in: ${requestedService}.${requestedEstimate ? ` The website showed an indicative range of $${requestedEstimate}.` : ""}`
      : ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await leadApi.create({ ...formData, source: requestedEstimate ? "estimator" : "contact" });
      toast({ title: "Request received", description: `Reference ${result.id}. The workshop can now review your brief.` });
      setFormData({ name: "", email: "", phone: "", service: "", website: "", message: "" });
    } catch (error) {
      toast({ title: "Request not sent", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      icon: ClipboardList,
      title: "Project Brief",
      lines: ["Vehicle, symptoms", "Desired outcome"]
    },
    {
      icon: CalendarCheck,
      title: "Inspection",
      lines: ["Scheduled in advance", "Time reserved for your car"]
    },
    {
      icon: MapPin,
      title: "Workshop",
      lines: ["Bucharest", "Visits by appointment"]
    },
    {
      icon: Clock,
      title: "Working Hours",
      lines: ["Project enquiries online", "Replies during workshop hours"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Contact Us</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or ready to start your project? We'd love to hear from you. 
              Reach out and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-3">{info.title}</h3>
                {info.lines.map((line, lineIndex) => (
                  <p key={lineIndex} className="text-muted-foreground text-sm">{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your preferred number"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Interested In</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Select a service</option>
                      <option value="repair">General Repairs</option>
                      <option value="bodywork">Auto Body & Paint</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="detailing">Detailing</option>
                      <option value="performance">Performance</option>
                      <option value="restoration">Restoration</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Message</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={5}
                    required
                    className="bg-background"
                  />
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full uppercase tracking-wider font-bold">
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </div>

            <div className="relative flex min-h-[400px] overflow-hidden border border-border bg-secondary p-8 md:p-12">
              <div className="my-auto max-w-lg">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">A useful first message</p>
                <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">Give us the details that change the diagnosis.</h2>
                <div className="mt-8 grid gap-4 text-sm text-muted-foreground">
                  {["Make, model, year and engine", "Symptoms, warning lights or recent work", "Photos, fault codes or a short video", "The outcome and timeframe you have in mind"].map((item, index) => (
                    <div key={item} className="flex gap-4 border-t border-white/10 pt-4"><span className="font-bold text-primary">0{index + 1}</span><span>{item}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How long will my project take?",
                a: "Timing depends on diagnosis, parts availability and scope. We establish the expected timeline after inspection rather than promising a generic turnaround."
              },
              {
                q: "Will I receive a quote first?",
                a: "Yes. Inspection comes first, followed by a scoped recommendation. The quick estimator is only a planning range, not a final quote."
              },
              {
                q: "What should I send with my enquiry?",
                a: "Include the vehicle specification, symptoms, warning lights, recent work and the outcome you want. Photos or fault codes are especially useful."
              },
              {
                q: "Can I visit without an appointment?",
                a: "Workshop visits are by appointment so time can be reserved for your car and the right specialist can be available."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
