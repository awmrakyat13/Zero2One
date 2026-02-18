import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import engagements from '../data/engagements';

export default function ImpactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Impact — Zero2One Consulting';

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real engagements. Structural outcomes. See how Zero2One has helped organizations redesign governance, performance systems, and operational architecture.');
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Impact — Zero2One Consulting',
      description: 'Featured client engagements demonstrating structural transformation outcomes.',
      url: 'https://zero2one.in/impact',
      mainEntity: engagements.map(e => ({
        '@type': 'CreativeWork',
        name: `${e.company} — ${e.engagementFocus}`,
        url: `https://zero2one.in/impact/${e.slug}`
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.title = 'Zero2One Consulting';
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
      document.head.removeChild(script);
    };
  }, []);

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
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Structure Changes Outcomes.</h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] leading-relaxed">
            Selected engagements where organizational architecture drove measurable change.
          </p>
        </div>
      </section>

      {/* Engagement Cards */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {engagements.map((engagement, i) => (
            <div key={engagement.slug} className={`py-10 ${i < engagements.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">{engagement.industry}</span>
                <span className="text-xs text-[var(--color-text-muted)]">·</span>
                <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">{engagement.engagementFocus}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">{engagement.company}</h2>
              <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-6">{engagement.impactStatement}</p>
              <Link
                to={`/impact/${engagement.slug}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
              >
                View Engagement <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Every Organization Has a Structure Problem.</h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-8">Tell us yours. We'll tell you what's possible, and what isn't.</p>
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
