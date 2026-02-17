import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import engagements from '../data/engagements';
import services from '../data/services';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const engagement = engagements.find(e => e.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (engagement) {
      document.title = `${engagement.company} — Impact — Zero2One Consulting`;

      const metaDescription = document.querySelector('meta[name="description"]');
      const originalDescription = metaDescription?.getAttribute('content');
      if (metaDescription) {
        metaDescription.setAttribute('content', engagement.impactStatement);
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: `${engagement.company} — ${engagement.engagementFocus}`,
        description: engagement.impactStatement,
        url: `https://zero2one.in/impact/${engagement.slug}`,
        publisher: {
          '@type': 'Organization',
          name: 'Zero2One Consulting'
        }
      });
      document.head.appendChild(script);

      return () => {
        document.title = 'Zero2One Consulting';
        if (metaDescription && originalDescription) {
          metaDescription.setAttribute('content', originalDescription);
        }
        document.head.removeChild(script);
      };
    }
  }, [engagement]);

  if (!engagement) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-4xl mb-4">Engagement Not Found</h1>
          <Link to="/impact" className="text-[var(--color-accent)] hover:underline">Back to Impact</Link>
        </div>
      </div>
    );
  }

  const resolvedCapabilities = engagement.relatedCapabilities
    .map(capSlug => services.find(s => s.slug === capSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link to="/impact" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
          <ArrowLeft size={14} />
          Back to Impact
        </Link>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">{engagement.industry}</span>
            <span className="text-xs text-[var(--color-text-muted)]">·</span>
            <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">{engagement.engagementFocus}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">{engagement.company}</h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] leading-relaxed">{engagement.impactStatement}</p>
        </div>
      </section>

      {/* Context */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">Context</h2>
          <div className={`grid gap-8 mb-10 ${engagement.scale ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            <div>
              <div className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Industry</div>
              <div className="text-sm">{engagement.industry}</div>
            </div>
            <div>
              <div className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Organization Type</div>
              <div className="text-sm">{engagement.orgType}</div>
            </div>
            {engagement.scale && (
              <div>
                <div className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">Scale</div>
                <div className="text-sm">{engagement.scale}</div>
              </div>
            )}
          </div>
          <div className="border-t border-[var(--color-border)] pt-10">
            <h3 className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-4">What Prompted the Engagement</h3>
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">{engagement.triggerMoment}</p>
            {engagement.triggerMomentExtra && (
              <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mt-4">{engagement.triggerMomentExtra}</p>
            )}
          </div>
        </div>
      </section>

      {/* Structural Friction */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">Structural Friction</h2>
          <ul className="space-y-4 border-l-2 border-[var(--color-accent)] pl-6">
            {engagement.structuralFrictions.map((friction, i) => (
              <li key={i} className="text-[var(--color-text-muted)] leading-relaxed">{friction}</li>
            ))}
          </ul>
          {engagement.structuralFrictionSummary && (
            <p className="mt-8 text-[var(--color-text-muted)] text-lg italic">{engagement.structuralFrictionSummary}</p>
          )}
        </div>
      </section>

      {/* Intervention Architecture */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Intervention Architecture</h2>
          {engagement.interventionPreamble && (
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-10">{engagement.interventionPreamble}</p>
          )}
          {!engagement.interventionPreamble && <div className="mb-6" />}
          <div className="space-y-10">
            {engagement.interventionArchitecture.map((item, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="text-xs tracking-widest uppercase text-[var(--color-warm)] mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-serif text-xl">{item.heading}</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[var(--color-text-muted)] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          {engagement.interventionFootnote && (
            <p className="mt-10 text-[var(--color-text-muted)] text-lg italic">{engagement.interventionFootnote}</p>
          )}
        </div>
      </section>

      {/* What Changed */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">What Changed</h2>
          <ul className="space-y-4 border-l-2 border-[var(--color-accent)] pl-6">
            {engagement.whatChanged.map((outcome, i) => (
              <li key={i} className="text-[var(--color-text-muted)] leading-relaxed">{outcome}</li>
            ))}
          </ul>
          {engagement.whatChangedSummary && (
            <p className="mt-8 text-[var(--color-text-muted)] text-lg italic">{engagement.whatChangedSummary}</p>
          )}
        </div>
      </section>

      {/* Related Capabilities */}
      {resolvedCapabilities.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl mb-10">Related Capabilities</h2>
            <div className="space-y-0">
              {resolvedCapabilities.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="block py-5 border-b border-[var(--color-border)] group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-xl group-hover:text-[var(--color-accent)] transition-colors">{service.title}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1">{service.summary}</p>
                    </div>
                    <ArrowRight size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors shrink-0 ml-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Facing a Similar Challenge?</h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-8">Tell us what you're working on. We'll tell you honestly if and how we can help.</p>
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
