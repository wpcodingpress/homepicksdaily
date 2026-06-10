import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  mobileImage?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  overlay?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  backgroundImage,
  mobileImage,
  breadcrumbs,
  overlay = true,
}: PageHeaderProps) {
  return (
    <section style={{
      position: 'relative',
      minHeight: 'clamp(220px, 35vw, 340px)',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
    }}>
      {/* Desktop background */}
      <div className={mobileImage ? 'hidden md:block' : ''} style={{ position:'absolute', inset:0 }}>
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Mobile background */}
      {mobileImage && (
        <div className="md:hidden" style={{ position:'absolute', inset:0 }}>
          <Image
            src={mobileImage}
            alt={title}
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>
      )}

      {/* Overlay */}
      {overlay && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(27,63,114,0.85) 0%, rgba(27,63,114,0.4) 50%, rgba(0,0,0,0.1) 100%)',
        }} />
      )}

      {/* Content */}
      <div className="container" style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(2rem, 5vw, 4rem) 1.5rem clamp(2rem, 4vw, 3rem)',
        width: '100%',
      }}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.75rem', flexWrap:'wrap' }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                fontSize:'0.8125rem', fontFamily:'var(--font-body)',
                color: i === breadcrumbs.length - 1
                  ? 'rgba(255,255,255,0.95)'
                  : 'rgba(255,255,255,0.6)',
              }}>
                {i > 0 && <span style={{ opacity:0.4 }}>/</span>}
                {crumb.href && i < breadcrumbs.length - 1 ? (
                  <a href={crumb.href} style={{ color:'rgba(255,255,255,0.6)', textDecoration:'none' }}>
                    {crumb.label}
                  </a>
                ) : (
                  crumb.label
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: subtitle ? '0.75rem' : 0,
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '560px',
            lineHeight: 1.6,
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
