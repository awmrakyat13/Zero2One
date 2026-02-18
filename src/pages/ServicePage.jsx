import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import services from '../data/services';

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service) {
      document.title = `${service.title} — Zero2One Consulting`;
    }
    return () => { document.title = 'Zero2One Consulting'; };
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-4xl mb-4">Page Not Found</h1>
          <Link to="/" className="text-[var(--color-accent)] hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">{service.title}</h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] leading-relaxed">{service.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {service.description.map((paragraph, i) => (
              <p key={i} className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">What This Includes</h2>
          <div className="space-y-0">
            {service.offerings.map((item, i) => (
              <div key={i} className="py-5 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Interested in {service.title}?</h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-8">Tell us what you're working on. We'll tell you what's possible — and what isn't.</p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg)] text-sm tracking-wide hover:bg-[var(--color-accent-light)] transition-colors"
          >
            Speak With Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
