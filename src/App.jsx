import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import services from './data/services';
import ServicePage from './pages/ServicePage';
import engagements from './data/engagements';
import ImpactPage from './pages/ImpactPage';
import CaseStudyPage from './pages/CaseStudyPage';
import publications from './data/publications';
import ResearchPage from './pages/ResearchPage';
import impactMetrics from './data/impactMetrics';
import team from './data/team';
import TeamMemberPage from './pages/TeamMemberPage';


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
            <Link to="/impact" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Case Studies</Link>
            <Link to="/research" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Research</Link>
            <button onClick={() => scrollToSection('approach')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Our Process</button>
            <button onClick={() => scrollToSection('collective')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Team</button>
            <button onClick={() => scrollToSection('contact')} className="px-5 py-2 bg-[var(--color-accent)] text-[var(--color-bg)] text-sm hover:bg-[var(--color-accent-light)] transition-colors">
              Talk to Us
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pb-4 space-y-4 text-sm fade-in">
            <button onClick={() => scrollToSection('offerings')} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Services</button>
            <Link to="/impact" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Case Studies</Link>
            <Link to="/research" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Research</Link>
            <button onClick={() => scrollToSection('approach')} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Our Process</button>
            <button onClick={() => scrollToSection('collective')} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Team</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-[var(--color-text-muted)]">Talk to Us</button>
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

  const methodologySteps = [
    { title: "Diagnostic", description: "We map your current structure, decision flows, and pain points against what you're actually trying to achieve. You get a clear, written picture of the gap, not a 90-slide deck." },
    { title: "Alignment", description: "We work with your leadership team to agree on what the organization needs to look like, who owns what, and what 'good' means. No alignment, no point building anything." },
    { title: "Implementation", description: "We build the systems, processes, and governance architecture alongside your team, not in a vacuum. Frameworks get tested in real operating conditions before we call them done." },
    { title: "Transfer of Ownership", description: "We hand it over. Documentation, training, operating playbooks, everything your team needs to run what we built without calling us." }
  ];

  return (
    <>

      {/* Hero */}
      <section className="min-h-[85vh] flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-5 opacity-0 fade-in">
              Strategy and Structure: Designed for Scale, Built to Last.
            </h1>
            <div className="flex flex-wrap items-center gap-y-2 text-sm md:text-base text-[var(--color-text-muted)] mb-8 opacity-0 fade-in delay-100 tracking-wide">
              <span>Strategic Advisory</span>
              <span className="mx-3 w-px h-4 bg-[var(--color-accent)] opacity-30 inline-block" />
              <span>Organisational Design</span>
              <span className="mx-3 w-px h-4 bg-[var(--color-accent)] opacity-30 inline-block" />
              <span>Operational Consulting</span>
              <span className="mx-3 w-px h-4 bg-[var(--color-accent)] opacity-30 inline-block" />
              <span>Training Consulting</span>
              <span className="mx-3 w-px h-4 bg-[var(--color-accent)] opacity-30 inline-block" />
              <span>Leadership &amp; Capability Development</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 fade-in delay-200">
              <Link to="/impact" className="group px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg)] text-sm tracking-wide hover:bg-[var(--color-accent-light)] transition-colors inline-flex items-center gap-3">
                Explore Our Work <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 border border-[var(--color-border)] text-sm tracking-wide hover:border-[var(--color-text)] transition-colors">
                Speak With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifier Line */}
      <p className="text-center text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] py-4 px-6">
        For founders, CXOs, and leadership teams building companies that have outgrown how they operate.
      </p>

      {/* What We Install */}
      <section id="offerings" className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="font-serif text-4xl md:text-5xl mb-2">What We Install</h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">Four pillars of organizational excellence, each designed to compound on the others.</p>
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
          <div className="mt-12 border-t border-[var(--color-border)] pt-12">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="font-serif text-3xl md:text-4xl mb-1">Where We've Done It</h3>
                <p className="text-[var(--color-text-muted)]">Engagements with outcomes you can trace.</p>
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
                    <div className="flip-card-front absolute inset-0 bg-[var(--color-bg)] border border-[var(--color-border)] border-t-2 border-t-[var(--color-accent)] p-8 flex flex-col justify-center hover:border-[var(--color-accent)] transition-colors">
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

      {/* Social Proof Strip */}
      <div className="py-6 text-center">
        <p className="text-lg md:text-xl text-[var(--color-accent)] tracking-wide">
          {impactMetrics[0].value} engagements across {impactMetrics[1].value} industries. {impactMetrics[2].value} professionals impacted.
        </p>
      </div>

      {/* How We Work */}
      <section id="approach" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="font-serif text-4xl md:text-5xl mb-2">How We Work</h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">A process built to transfer ownership, not create dependency.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {methodologySteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-xs text-[var(--color-warm)] mb-3 tracking-widest uppercase">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.description}</p>
                {i < 3 && <div className="hidden md:block absolute top-8 right-0 w-8 border-t border-[var(--color-border)]" />}
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--color-border)] pt-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "One-time Engagements", desc: "A defined scope, a fixed timeline, a clear deliverable. For companies that know what's broken." },
                { title: "Ongoing Advisory Retainers", desc: "Monthly strategic counsel for leadership teams navigating growth, transitions, or complexity they haven't seen before." },
                { title: "Embedded Execution", desc: "We put someone in the room, working alongside your team, building systems in real time. For when the problem is too deep for advice alone." }
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
      <section id="collective" className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="font-serif text-4xl md:text-5xl mb-2">Who's in the Room</h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">Industry practitioners with institutional depth, from Amazon and high-growth startups to military operations and published research.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-[var(--color-bg)] border border-[var(--color-border)] p-6 flex gap-5">
                <div className="shrink-0 w-16 h-16 bg-[var(--color-accent)] text-[var(--color-bg)] flex items-center justify-center text-sm font-medium tracking-wide">
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium mb-1">{member.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">{member.credentials}</p>
                  <p className="text-sm text-[var(--color-accent)] mb-3">{member.role}</p>
                  <Link
                    to={`/team/${member.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
                  >
                    View Profile <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Research & Contributions */}
          <div className="mt-12 border-t border-[var(--color-border)] pt-12">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="font-serif text-3xl md:text-4xl mb-1">Research That Informs Our Practice</h3>
                <p className="text-[var(--color-text-muted)]">Our practice is informed by published research, not recycled frameworks. Here's what we've put our names on.</p>
              </div>
              <Link to="/research" className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors">
                View Full List <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-0">
              {publications.slice(0, 4).map((pub, i) => (
                <div key={i} className="py-5 border-b border-[var(--color-border)]">
                  <h4 className="font-serif text-lg mb-1">{pub.title}</h4>
                  <span className="text-sm text-[var(--color-text-muted)]">{pub.authors}</span>
                  {pub.reference && (
                    <p className="text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed opacity-80">{pub.reference}</p>
                  )}
                </div>
              ))}
            </div>
            <Link to="/research" className="md:hidden inline-flex items-center gap-2 mt-6 text-sm text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors">
              View Full List <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action / Contact */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-3">Clarity Begins With a Conversation.</h2>
              <p className="text-[var(--color-text-muted)] text-lg mb-6">Tell us what's not working: the structure, the team, the pace. We'll tell you what we can fix and what we can't.</p>
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
                    <label htmlFor="message" className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">What are you dealing with? *</label>
                    <textarea id="message" rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-0 py-3 bg-transparent border-0 border-b border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-text)] transition-colors resize-none" />
                  </div>
                  <button onClick={handleSubmit} className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg)] text-sm tracking-wide hover:bg-[var(--color-accent-light)] transition-colors">
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
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/team/:slug" element={<TeamMemberPage />} />
      </Routes>
      <footer className="border-t-2 border-t-[var(--color-accent)] py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-xs text-[var(--color-text-muted)] space-y-3">
          <div className="flex justify-center gap-6">
            <Link to="/#offerings" className="hover:text-[var(--color-text)] transition-colors">Services</Link>
            <Link to="/impact" className="hover:text-[var(--color-text)] transition-colors">Case Studies</Link>
            <Link to="/research" className="hover:text-[var(--color-text)] transition-colors">Research</Link>
          </div>
          <p>info@zero2one.in</p>
          <p>&copy; {new Date().getFullYear()} Zero2One Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
