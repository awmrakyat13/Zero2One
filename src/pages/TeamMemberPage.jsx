import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Linkedin } from 'lucide-react';
import team from '../data/team';

export default function TeamMemberPage() {
  const { slug } = useParams();
  const member = team.find(m => m.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (member) {
      document.title = `${member.name} - Zero2One Consulting`;

      const metaDescription = document.querySelector('meta[name="description"]');
      const originalDescription = metaDescription?.getAttribute('content');
      if (metaDescription) {
        metaDescription.setAttribute('content', member.bio);
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: member.name,
        jobTitle: member.domain ? `${member.role} | ${member.domain}` : member.role,
        description: member.bio,
        url: `https://zero2one.in/team/${member.slug}`,
        worksFor: {
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
  }, [member]);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-4xl mb-4">Profile Not Found</h1>
          <Link to="/#collective" className="text-[var(--color-accent)] hover:underline">Back to Team</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link to="/#collective" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
          <ArrowLeft size={14} />
          Back to Team
        </Link>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-start gap-8">
            <div className="shrink-0 w-24 h-24 bg-[var(--color-accent)] text-[var(--color-bg)] flex items-center justify-center text-lg font-medium tracking-wide">
              {member.initials}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-serif text-4xl md:text-5xl">{member.name}</h1>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mt-1">
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">{member.credentials}</p>
              <p className="text-lg text-[var(--color-accent)]">
                {member.role}
                {member.domain && <><span className="text-[var(--color-border)]">|</span>{member.domain}</>}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-2">About</h2>
          <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">{member.bio}</p>
          {member.previously && (
            <p className="text-sm text-[var(--color-text-muted)] mt-6 pt-4 border-t border-[var(--color-border)]">
              <span className="tracking-widest uppercase text-xs">Previously:</span> {member.previously.join(' · ')}
            </p>
          )}
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Experience</h2>
          <ul className="space-y-4 border-l-2 border-[var(--color-accent)] pl-6">
            {member.experience.map((item, i) => (
              <li key={i} className="text-[var(--color-text-muted)] leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Key Accomplishments */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Key Accomplishments</h2>
          <ul className="space-y-4 border-l-2 border-[var(--color-accent)] pl-6">
            {member.accomplishments.map((item, i) => (
              <li key={i} className="text-[var(--color-text-muted)] leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* In Their Words */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">In Their Words</h2>
          <blockquote className="border-l-2 border-[var(--color-accent)] pl-6">
            <p className="font-serif text-2xl md:text-3xl leading-snug text-[var(--color-text)]">"{member.quote}"</p>
          </blockquote>
        </div>
      </section>

      {/* What They Bring */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-2">What They Bring</h2>
          <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">{member.whatTheyBring}</p>
        </div>
      </section>
    </div>
  );
}
