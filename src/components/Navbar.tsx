import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Lang } from '@/hooks/useLanguage';
import { useContactForm } from '@/contexts/ContactFormContext';

interface NavbarProps {
  lang: Lang;
  switchLang: (l: Lang) => void;
}

const navLinksEn = ['Home', 'About', 'Services', 'Contact'];
const navLinksAr = ['الرئيسية', 'عن سكاي ليدز', 'الخدمات', 'تواصل معنا'];
const scrollTargets = ['top', 'how-it-works', 'what-you-get', 'final-cta'];

const Navbar = ({ lang, switchLang }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [showStickyCTAs, setShowStickyCTAs] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAr = lang === 'ar';
  const links = isAr ? navLinksAr : navLinksEn;
  const ctaLabel = isAr ? 'ابدأ كامبين' : 'Start a Campaign';
  const { openForm } = useContactForm();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowStickyCTAs(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          height: 72,
          background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,240,0,0.08)' : '1px solid transparent',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="Sky Leads Digital Marketing"
              style={{ height: 42, width: 'auto', objectFit: 'contain' }}
            />
          </a>

          {/* Center Links */}
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {links.map((link, i) => (
              <a
                key={i}
                href="#"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (scrollTargets[i] === 'top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    document.getElementById(scrollTargets[i])?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: isAr ? 15 : 14,
                  color: 'var(--t2)',
                  textDecoration: 'none',
                  padding: '6px 0',
                  position: 'relative',
                  transition: 'var(--transition-fast)',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Sticky CTAs (desktop) */}
            <div className="sticky-ctas-desktop" style={{
              display: 'flex', gap: 8,
              opacity: showStickyCTAs ? 1 : 0,
              transform: showStickyCTAs ? 'translateY(0)' : 'translateY(-8px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              pointerEvents: showStickyCTAs ? 'auto' : 'none',
            }}>
              <button onClick={() => openForm('campaign')} style={{
                background: 'var(--accent)', color: '#000',
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                fontWeight: 700, fontSize: 12, padding: '6px 16px',
                borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer',
                transition: 'var(--transition-fast)', whiteSpace: 'nowrap',
              }}>{isAr ? 'ابدأ كامبين' : 'Start Campaign'}</button>
              <button onClick={() => openForm('demo')} style={{
                background: 'transparent', color: 'var(--t2)',
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                fontWeight: 600, fontSize: 12, padding: '6px 16px',
                borderRadius: 'var(--r-full)', border: '1px solid var(--border-2)',
                cursor: 'pointer', transition: 'var(--transition-fast)', whiteSpace: 'nowrap',
              }}>{isAr ? 'ديمو مجاناً' : 'Free Demo'}</button>
            </div>

            {/* Lang Toggle */}
            <div
              className="lang-toggle-desktop"
              style={{
                display: 'flex',
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-full)',
                padding: 3,
                gap: 2,
              }}
            >
              <button
                onClick={() => switchLang('en')}
                style={{
                  padding: '5px 14px',
                  borderRadius: 'var(--r-full)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: '0.05em',
                  background: lang === 'en' ? 'var(--accent)' : 'transparent',
                  color: lang === 'en' ? '#000' : 'var(--t3)',
                  transition: 'var(--transition-fast)',
                }}
              >
                EN
              </button>
              <button
                onClick={() => switchLang('ar')}
                style={{
                  padding: '5px 14px',
                  borderRadius: 'var(--r-full)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Tajawal', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  background: lang === 'ar' ? 'var(--accent)' : 'transparent',
                  color: lang === 'ar' ? '#000' : 'var(--t3)',
                  transition: 'var(--transition-fast)',
                }}
              >
                عربي
              </button>
            </div>

            {/* CTA */}
            <button
              className="nav-cta-desktop"
              onClick={() => openForm('campaign')}
              style={{
                opacity: showStickyCTAs ? 0 : 1,
                pointerEvents: showStickyCTAs ? 'none' : 'auto',
                transition: 'opacity 0.3s ease',
                background: 'var(--accent)',
                color: '#000',
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                padding: '12px 24px',
                borderRadius: 'var(--r-full)',
                border: 'none',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {ctaLabel}
            </button>

            {/* Hamburger */}
            <button
              className="hamburger-mobile"
              onClick={() => setMobileOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', padding: 4 }}
            >
              <Menu color="var(--t2)" size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sticky CTA Bar */}
      <div className="sticky-ctas-mobile" style={{
        position: 'fixed', top: 72, left: 0, width: '100%',
        background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)', padding: '8px 20px',
        zIndex: 999, display: 'none',
        transform: showStickyCTAs ? 'translateY(0)' : 'translateY(-100%)',
        opacity: showStickyCTAs ? 1 : 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        gap: 8,
      }}>
        <button onClick={() => openForm('campaign')} style={{
          flex: 1, background: 'var(--accent)', color: '#000',
          fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
          fontWeight: 700, fontSize: 13, padding: '8px 12px',
          borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer',
        }}>{isAr ? 'ابدأ كامبين' : 'Start Campaign'}</button>
        <button onClick={() => openForm('demo')} style={{
          flex: 1, background: 'transparent', color: 'var(--t2)',
          fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
          fontWeight: 600, fontSize: 13, padding: '8px 12px',
          borderRadius: 'var(--r-full)', border: '1px solid var(--border-2)',
          cursor: 'pointer',
        }}>{isAr ? 'ديمو مجاناً' : 'Free Demo'}</button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              background: 'var(--bg-2)',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <X color="var(--t2)" size={24} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 40 }}>
              {links.map((link, i) => (
                <a key={i} href="#" onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  setTimeout(() => {
                    if (scrollTargets[i] === 'top') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      document.getElementById(scrollTargets[i])?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 300);
                }} style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                  fontWeight: 600, fontSize: 20, color: 'var(--t1)', textDecoration: 'none',
                }}>
                  {link}
                </a>
              ))}
            </div>

            <div style={{
              display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-full)', padding: 3, gap: 2, marginTop: 40, alignSelf: 'flex-start',
            }}>
              <button onClick={() => { switchLang('en'); setMobileOpen(false); }} style={{
                padding: '6px 16px', borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 13,
                background: lang === 'en' ? 'var(--accent)' : 'transparent',
                color: lang === 'en' ? '#000' : 'var(--t3)',
              }}>EN</button>
              <button onClick={() => { switchLang('ar'); setMobileOpen(false); }} style={{
                padding: '6px 16px', borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer',
                fontFamily: "'Tajawal', sans-serif", fontWeight: 700, fontSize: 14,
                background: lang === 'ar' ? 'var(--accent)' : 'transparent',
                color: lang === 'ar' ? '#000' : 'var(--t3)',
              }}>عربي</button>
            </div>

            <button onClick={() => { openForm('campaign'); setMobileOpen(false); }} style={{
              background: 'var(--accent)', color: '#000',
              fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
              fontWeight: 700, fontSize: 15, padding: '14px 32px',
              borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer',
              marginTop: 20, alignSelf: 'flex-start',
            }}>
              {ctaLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
