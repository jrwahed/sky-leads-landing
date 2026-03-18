import { MessageCircle, MapPin } from 'lucide-react';
import { Lang } from '@/hooks/useLanguage';
import { useContactForm } from '@/contexts/ContactFormContext';

const en = {
  tagline: "AI-Powered Real Estate Marketing",
  links: ["Home", "About", "Services", "Contact"],
  whatsapp: "Chat on WhatsApp",
  copy: "© 2025 Sky Leads Digital Marketing. All rights reserved.",
  location: "Cairo, Egypt",
};

const ar = {
  tagline: "تسويق عقاري مدعوم بالذكاء الاصطناعي",
  links: ["الرئيسية", "عن سكاي ليدز", "الخدمات", "تواصل معنا"],
  whatsapp: "تواصل عبر واتساب",
  copy: "© ٢٠٢٥ Sky Leads Digital Marketing. جميع الحقوق محفوظة.",
  location: "القاهرة، مصر",
};

const Footer = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;
  const { openForm } = useContactForm();

  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        {/* Top */}
        <div className="footer-top" style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center', gap: 40, padding: '64px 0 48px',
        }}>
          {/* Left — Logo */}
          <div>
            <img
              src="/logo.png"
              alt="Sky Leads"
              style={{ height: 36, width: 'auto', objectFit: 'contain' }}
            />
            <p style={{
              fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
              fontWeight: 400, fontSize: 13, color: 'var(--t4)', marginTop: 10,
            }}>{t.tagline}</p>
          </div>

          {/* Center — Links */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {t.links.map((link, i) => (
              <a key={i} href="#" style={{
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                fontWeight: 500, fontSize: 14, color: 'var(--t4)',
                textDecoration: 'none', transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--t1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--t4)'; }}
              >{link}</a>
            ))}
          </div>

          {/* Right — WhatsApp */}
          <div style={{ display: 'flex', justifyContent: isAr ? 'flex-start' : 'flex-end' }}>
            <button
              onClick={() => openForm('campaign')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent',
                border: '1px solid rgba(200,240,0,0.25)',
                borderRadius: 'var(--r-full)',
                padding: '10px 22px', color: 'var(--accent)',
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                fontWeight: 500, fontSize: 14, cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-08)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(200,240,0,0.25)';
              }}
            >
              <MessageCircle size={16} />
              {t.whatsapp}
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '20px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 8,
          flexDirection: isAr ? 'row-reverse' : 'row',
        }}>
          <span style={{
            fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
            fontWeight: 400, fontSize: 13, color: 'var(--t4)',
          }}>{t.copy}</span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
            fontWeight: 400, fontSize: 13, color: 'var(--t4)',
          }}>
            <MapPin size={13} />
            {t.location}
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-top {
            display: flex !important;
            flex-direction: column !important;
            text-align: center !important;
            gap: 32px !important;
          }
          .footer-top > div:last-child {
            justify-content: center !important;
          }
          .footer-top a {
            min-height: 44px !important;
            display: inline-flex !important;
            align-items: center !important;
          }
          .footer-top button {
            min-height: 44px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
