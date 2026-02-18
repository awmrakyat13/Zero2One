import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import publications from '../data/publications';

export default function ResearchPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Research & Contributions - Zero2One Consulting';

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Published research and conference contributions by the Zero2One Consulting team.');
    }

    return () => {
      document.title = 'Zero2One Consulting';
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
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
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Research & Contributions</h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] leading-relaxed">
            Theory that informs practice. Published work by the Zero2One team.
          </p>
        </div>
      </section>

      {/* Publications List */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {publications.map((pub, i) => (
            <div key={i} className={`py-10 ${i < publications.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
              <h2 className="font-serif text-2xl md:text-3xl mb-3">{pub.title}</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="text-sm text-[var(--color-text-muted)]">{pub.authors}</span>
                <span className="text-xs text-[var(--color-text-muted)]">·</span>
                <span className="text-sm text-[var(--color-text-muted)]">{pub.venue}</span>
              </div>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{pub.reference}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Interested in Our Work?</h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-8">Tell us what you're working on. We'll tell you what's possible, and what isn't.</p>
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
