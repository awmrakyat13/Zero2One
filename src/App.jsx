import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, ArrowRight, ChevronDown } from 'lucide-react';
import services from './data/services';
import ServicePage from './pages/ServicePage';
import engagements from './data/engagements';
import ImpactPage from './pages/ImpactPage';
import CaseStudyPage from './pages/CaseStudyPage';

const team = [
  {
    name: "Uttam Shri Harsha",
    role: "Founder & Principal",
    domain: "Operations Architecture & Organizational Design",
    bio: "Builder of operating systems for growing organizations. Specializes in translating founder vision into scalable structure, process, and governance.",
    initials: "UH",
    linkedin: null
  },
  {
    name: "Dr. Hema Harsha",
    role: "Partner — Training & Academic Excellence",
    domain: "Leadership Development & Corporate Training",
    bio: "Academician and corporate trainer with deep expertise in leadership development, organizational behavior, and institutional capacity building.",
    initials: "HH",
    linkedin: "https://www.linkedin.com/in/dr-hema-harsha/"
  },
  {
    name: "Lt Col L Shri Harsha (Retd.)",
    role: "Partner — Strategy & Leadership",
    domain: "Strategic Planning & Leadership Under Pressure",
    bio: "Decorated military leader turned strategy consultant. Brings disciplined execution frameworks and leadership under pressure to complex organizational challenges.",
    initials: "LSH",
    linkedin: "https://www.linkedin.com/in/ltcol-l-shriharsha-retd/"
  },
  {
    name: "Shrigauri Naidu",
    role: "Partner — Training & Development",
    domain: "Capability Building & Performance Systems",
    bio: "Specialist in designing training architectures that connect individual capability to organizational performance. Focused on measurable development outcomes.",
    initials: "SN",
    linkedin: "https://www.linkedin.com/in/shrigaurinaidu/"
  }
];

const capabilities = [
  "Governance Architecture",
  "Performance Frameworks",
  "Culture Systems",
  "Leadership Under Pressure",
  "Strategic Documentation",
  "Organizational Redesign"
];

const writingServices = [
  "Executive Ghostwriting",
  "Strategic & Technical Writing",
  "Policy & Research Writing",
  "Board & Institutional Documentation"
];

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (id) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full bg-[var(--color-bg)]/95 backdrop-blur-sm z-50 border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-serif text-2xl tracking-tight">
            Zero2One
          </Link>
          <div className="hidden md:flex gap-10 items-center text-sm">
            <button onClick={() => scrollToSection('offerings')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Services</button>
            <Link to="/impact" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Impact</Link>
            <button onClick={() => scrollToSection('approach')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Approach</button>
            <button onClick={() => scrollToSection('collective')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Collective</button>
            <button onClick={() => scrollToSection('contact')} className="px-5 py-2 bg-[var(--color-text)] text-[var(--color-bg)] text-sm hover:bg-[var(--color-accent)] transition-colors">
              Contact Us
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pb-4 space-y-4 text-sm fade-in">
            <button onClick={() => scrollToSection('offerings')} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Services</button>
            <Link to="/impact" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Impact</Link>
            <button onClick={() => scrollToSection('approach')} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Approach</button>
            <button onClick={() => scrollToSection('collective')} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Collective</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Contact</button>
          </div>
        )}
      </div>
    </nav>
  );
}

function HomePage() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
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
      }, 4000);
    } catch {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 opacity-0 fade-in">
              Where Strategy Becomes Structure.
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-12 opacity-0 fade-in delay-100 tracking-wide">
              Strategy. Structure. Leadership. Narrative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 fade-in delay-200">
              <button onClick={() => scrollToSection('offerings')} className="group px-8 py-4 bg-[var(--color-text)] text-[var(--color-bg)] text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors inline-flex items-center gap-3">
                Explore Our Work <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 border border-[var(--color-border)] text-sm tracking-wide hover:border-[var(--color-text)] transition-colors">
                Speak With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="offerings" className="py-24 md:py-32 bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">What We Do</h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">Four pillars of organizational excellence — each designed to compound on the others.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((item, index) => (
              <div
                key={index}
                className="bg-[var(--color-bg)] border border-[var(--color-border)] p-8 hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                role="button"
                tabIndex={0}
                aria-expanded={expandedCard === index}
                onKeyDown={(e) => e.key === 'Enter' && setExpandedCard(expandedCard === index ? null : index)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-2xl md:text-3xl">{item.title}</h3>
                  <ChevronDown
                    size={20}
                    className={`text-[var(--color-text-muted)] mt-2 transition-transform ${expandedCard === index ? 'rotate-180' : ''}`}
                  />
                </div>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{item.summary}</p>
                {expandedCard === index && (
                  <div className="fade-in">
                    <ul className="mt-6 space-y-2">
                      {item.offerings.slice(0, 4).map((detail, i) => (
                        <li key={i} className="text-sm text-[var(--color-text-muted)] pl-4 border-l-2 border-[var(--color-accent)]">
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/services/${item.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 mt-6 text-sm text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
                    >
                      Learn more <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="mt-16 border-t border-[var(--color-border)] pt-16">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="font-serif text-3xl md:text-4xl mb-2">Case Studies</h3>
                <p className="text-[var(--color-text-muted)]">Structure applied. Outcomes delivered.</p>
              </div>
              <Link to="/impact" className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {engagements.map((engagement, index) => (
                <div
                  key={engagement.slug}
                  className="flip-card h-56 cursor-pointer"
                  onClick={() => setFlippedCard(flippedCard === index ? null : index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setFlippedCard(flippedCard === index ? null : index)}
                >
                  <div className={`flip-card-inner relative w-full h-full ${flippedCard === index ? 'flipped' : ''}`}>
                    {/* Front */}
                    <div className="flip-card-front absolute inset-0 bg-[var(--color-bg)] border border-[var(--color-border)] p-8 flex flex-col justify-center hover:border-[var(--color-accent)] transition-colors">
                      <div className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-4">{engagement.industry}</div>
                      <h4 className="font-serif text-2xl">{engagement.company}</h4>
                    </div>
                    {/* Back */}
                    <div className="flip-card-back absolute inset-0 bg-[var(--color-text)] text-[var(--color-bg)] border border-[var(--color-text)] p-8 flex flex-col justify-between">
                      <p className="text-sm leading-relaxed text-[#ccc]">{engagement.impactStatement}</p>
                      <Link
                        to={`/impact/${engagement.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-accent-light)] hover:text-[var(--color-bg)] transition-colors"
                      >
                        Read More <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/impact" className="md:hidden inline-flex items-center gap-2 mt-6 text-sm text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors">
              View all engagements <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="approach" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">How We Work</h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">A structured methodology that builds internal capability — not dependency.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {["Diagnostic", "Alignment", "Implementation", "Transfer of Ownership"].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-xs text-[var(--color-text-muted)] mb-3 tracking-widest uppercase">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif text-xl mb-2">{step}</h3>
                {i < 3 && <div className="hidden md:block absolute top-8 right-0 w-8 border-t border-[var(--color-border)]" />}
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--color-border)] pt-12">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "One-time Engagements", desc: "Focused interventions for specific organizational challenges." },
                { title: "Ongoing Advisory Retainers", desc: "Continuous strategic counsel for evolving needs." },
                { title: "Embedded Execution", desc: "On-ground implementation with your teams." }
              ].map((model, i) => (
                <div key={i}>
                  <h3 className="font-medium mb-2">{model.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{model.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Collective */}
      <section id="collective" className="py-24 md:py-32 bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">The Zero2One Collective</h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">Practitioners with institutional experience — not theorists with frameworks.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-[var(--color-bg)] border border-[var(--color-border)] p-8 flex gap-6">
                <div className="shrink-0 w-16 h-16 bg-[var(--color-text)] text-[var(--color-bg)] flex items-center justify-center text-sm font-medium tracking-wide">
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium">{member.name}</h3>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                        <Linkedin size={16} />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-accent)] mb-1">{member.role}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-3 tracking-wide uppercase">{member.domain}</p>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Capability */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Built for Scale. Designed for Reality.</h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">Depth that shows in the work — not in the pitch.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
            {capabilities.map((cap, i) => (
              <div key={i} className="py-4 border-b border-[var(--color-border)]">
                <span className="text-sm">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing & Strategic Communication */}
      <section className="py-24 md:py-32 bg-[var(--color-text)] text-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[var(--color-bg)]">Clarity in Words. Authority in Positioning.</h2>
              <p className="text-[#999] text-lg">Strategic communication that builds institutional credibility and executive authority.</p>
            </div>
            <div className="space-y-0">
              {writingServices.map((service, i) => (
                <div key={i} className="py-5 border-b border-white/10">
                  <span className="text-sm tracking-wide">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action / Contact */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Clarity Begins With a Conversation.</h2>
              <p className="text-[var(--color-text-muted)] text-lg mb-8">Tell us what you are building, fixing, or rethinking. We will tell you honestly if and how we can help.</p>
              <div className="space-y-4 text-sm text-[var(--color-text-muted)]">
                <p>info@zero2one.in</p>
                <p>+91 8310777767</p>
                <p>Bengaluru, India</p>
              </div>
            </div>
            <div>
              {formSubmitted ? (
                <div className="h-full flex items-center justify-center text-center p-12 border border-[var(--color-accent)]">
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Message Received.</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">We will be in touch shortly.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Name *</label>
                    <input id="name" type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-0 py-3 bg-transparent border-0 border-b border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-text)] transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Email *</label>
                    <input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-0 py-3 bg-transparent border-0 border-b border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-text)] transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Organization</label>
                    <input id="company" type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-0 py-3 bg-transparent border-0 border-b border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-text)] transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">How can we help? *</label>
                    <textarea id="message" rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-0 py-3 bg-transparent border-0 border-b border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-text)] transition-colors resize-none" />
                  </div>
                  <button onClick={handleSubmit} className="px-8 py-4 bg-[var(--color-text)] text-[var(--color-bg)] text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors">
                    Start a Conversation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/impact/:slug" element={<CaseStudyPage />} />
      </Routes>
      <footer className="border-t border-[var(--color-border)] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <p>&copy; 2025 Zero2One Consulting. All rights reserved.</p>
          <p>Bengaluru, India</p>
        </div>
      </footer>
    </div>
  );
}
