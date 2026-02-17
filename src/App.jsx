import { useState } from 'react';
import { Menu, X, ArrowRight, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const services = [
    {
      title: "Operations & Strategy",
      description: "Transform your operations into competitive advantages. We optimize processes, reduce costs, and build sustainable growth frameworks.",
      icon: "⚡"
    },
    {
      title: "Management Consulting",
      description: "Navigate complexity with confidence. Strategic guidance for organizational transformation, change management, and executive decision-making.",
      icon: "🎯"
    },
    {
      title: "Training & Development",
      description: "Empower your teams with cutting-edge skills. Custom training programs that drive performance and foster innovation.",
      icon: "🚀"
    },
    {
      title: "B2B Sales & Marketing",
      description: "Revenue growth through precision. Data-driven strategies that convert prospects into long-term partners.",
      icon: "📈"
    }
  ];

  const team = [
    { name: "Uttam S", role: "Founder, Operations Specialist", linkedin: "https://linkedin.com", image: "US" },
    { name: "Shrigauri Naidu", role: "Training and Development", linkedin: "https://linkedin.com", image: "SN" },
    { name: "Dr. Hema Harsha", role: "Academician, Corporate Trainer", linkedin: "https://linkedin.com", image: "HH" },
    { name: "Lt Col (retd). L Shri Harsha", role: "Professional Trainer, Strategy Leader", linkedin: "https://linkedin.com", image: "LSH" }
  ];

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxzqPgtu1v8DEx3gsqsD9t5Gp_kN5KE4zda45zYCWsP0DqA8IyNqGcHxASnufykWMij/exec';
    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors'
      });
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 3000);
    } catch (error) {
      alert('There was an error submitting the form. Please try again.');
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/90 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-display text-2xl font-bold text-gradient">Zero2One</div>
            <div className="hidden md:flex gap-8 items-center">
              <button onClick={() => scrollToSection('offerings')} className="nav-link hover:text-[#00ff9d]">Offerings</button>
              <button onClick={() => scrollToSection('team')} className="nav-link hover:text-[#00ff9d]">Team</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link hover:text-[#00ff9d]">Contact</button>
              <button onClick={() => scrollToSection('contact')} className="px-6 py-2 accent-gradient text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#00ff9d]/50 transition-all">Get Started</button>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
              <button onClick={() => scrollToSection('offerings')} className="block w-full text-left hover:text-[#00ff9d]">Offerings</button>
              <button onClick={() => scrollToSection('team')} className="block w-full text-left hover:text-[#00ff9d]">Team</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left hover:text-[#00ff9d]">Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#00ff9d] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00d4ff] rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="opacity-0 animate-slide-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 font-display">From Zero<br /><span className="text-gradient">To One</span></h1>
          </div>
          <div className="opacity-0 animate-slide-in delay-200">
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light">Boutique consulting that transforms ambitious visions into measurable results. We don&apos;t just advise—we execute.</p>
          </div>
          <div className="opacity-0 animate-slide-in delay-300">
            <button onClick={() => scrollToSection('offerings')} className="group px-8 py-4 accent-gradient text-black font-semibold rounded-full text-lg hover:shadow-2xl hover:shadow-[#00ff9d]/50 transition-all inline-flex items-center gap-2">
              Explore Our Services <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display">What We <span className="text-gradient">Deliver</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Specialized expertise across four core pillars of business excellence</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card p-8 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 font-display">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-32 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display">Meet Our <span className="text-gradient">Team</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Veteran consultants with decades of combined experience</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="team-card text-center">
                <div className="w-32 h-32 mx-auto mb-4 accent-gradient rounded-full flex items-center justify-center text-black text-2xl font-bold">{member.image}</div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-400 mb-4">{member.role}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#00ff9d] hover:text-[#00d4ff] transition-colors">
                  <Linkedin size={20} /><span>Connect</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display">Let&apos;s <span className="text-gradient">Connect</span></h2>
            <p className="text-xl text-gray-400">Ready to transform your business? Start the conversation.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 accent-gradient rounded-lg"><Mail className="text-black" size={24} /></div>
                <div><h3 className="font-bold mb-1">Email</h3><a href="mailto:info@zero2one.in" className="text-gray-400 hover:text-[#00ff9d] transition-colors">info@zero2one.in</a></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 accent-gradient rounded-lg"><Phone className="text-black" size={24} /></div>
                <div><h3 className="font-bold mb-1">Phone</h3><a href="tel:+918310777767" className="text-gray-400 hover:text-[#00ff9d] transition-colors">+91 8310777767</a></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 accent-gradient rounded-lg"><MapPin className="text-black" size={24} /></div>
                <div><h3 className="font-bold mb-1">Location</h3><p className="text-gray-400">Bengaluru, KA<br />India</p></div>
              </div>
            </div>
            <div>
              {formSubmitted ? (
                <div className="h-full flex items-center justify-center text-center p-8 border border-[#00ff9d] rounded-2xl glow-effect">
                  <div>
                    <div className="text-6xl mb-4">✓</div>
                    <h3 className="text-2xl font-bold text-[#00ff9d] mb-2">Message Sent!</h3>
                    <p className="text-gray-400">We&apos;ll get back to you soon.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <input type="text" placeholder="Your Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg text-white" />
                  <input type="email" placeholder="Email Address *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg text-white" />
                  <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-3 rounded-lg text-white" />
                  <textarea placeholder="Tell us about your project... *" rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-lg text-white resize-none" />
                  <button onClick={handleSubmit} className="w-full py-4 accent-gradient text-black font-semibold rounded-lg hover:shadow-2xl hover:shadow-[#00ff9d]/50 transition-all">Send Message</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p className="font-display">&copy; 2025 Zero2One Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
