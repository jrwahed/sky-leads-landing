import { Lang } from '@/hooks/useLanguage';
import SectionHeader from '@/components/SectionHeader';

const en = { overline: "OUR CLIENTS", title: "Trusted By", titleAccent: "Leading Real Estate Companies." };
const ar = { overline: "عملاؤنا", title: "وثق فينا", titleAccent: "أكبر شركات العقارات." };

const clientsRow1 = ["Hometown Developments", "Mountain View", "Valore El-Thawra", "El Massar", "Adeer", "Nile Developments", "Sobek Developments", "Founders"];
const clientsRow2 = ["Nawassy", "Capital Hills", "Khaled Sabry Holding", "Julidar Real Estate", "Concord Plaza", "DIG", "Palm Hills", "Captain Developments"];
const clientsRow3 = ["The Address Investments", "Coldwell Banker", "BGR Brothers Group", "Five Steps", "Almothlth Real Estate", "Smart Assets", "Rehal Investment"];

const ClientPill = ({ name }: { name: string }) => (
  <div
    className="client-pill"
    style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '12px 32px', margin: '0 4px',
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-full)', whiteSpace: 'nowrap',
      cursor: 'default', transition: 'var(--transition-fast)',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.background = 'rgba(200,240,0,0.06)';
      el.style.borderColor = 'rgba(200,240,0,0.2)';
      el.style.color = 'var(--t1)';
      const dot = el.querySelector('.pill-dot') as HTMLElement;
      if (dot) dot.style.background = 'var(--accent)';
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.background = 'var(--bg-card)';
      el.style.borderColor = 'var(--border)';
      el.style.color = '';
      const dot = el.querySelector('.pill-dot') as HTMLElement;
      if (dot) dot.style.background = 'var(--accent-15)';
    }}
  >
    <span className="pill-dot" style={{
      width: 5, height: 5, borderRadius: '50%',
      background: 'var(--accent-15)', marginRight: 10, flexShrink: 0,
      transition: 'var(--transition-fast)', whiteSpace: 'nowrap',
    }} />
    <span style={{
      fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 14,
      color: 'var(--t3)', letterSpacing: '0.02em',
    }}>{name}</span>
  </div>
);

const MarqueeRow = ({ items, trackClass }: { items: string[]; trackClass: string }) => (
  <div className="marquee-wrapper" style={{ marginBottom: 20, overflow: 'hidden', width: '100%' }}>
    <div className={trackClass}>
      {[...items, ...items].map((name, i) => (
        <ClientPill key={i} name={name} />
      ))}
    </div>
  </div>
);

const Clients = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;

  return (
    <section style={{
      background: 'var(--bg-2)', padding: 'var(--section-py) 0',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
    }}>
      <div className="container">
        <SectionHeader overline={t.overline} title={t.title} titleAccent={t.titleAccent} center isAr={isAr} />
      </div>
      <div style={{ marginTop: 64 }}>
        <MarqueeRow items={clientsRow1} trackClass="marquee-track-ltr" />
        <MarqueeRow items={clientsRow2} trackClass="marquee-track-rtl" />
        <div style={{ marginBottom: 0 }}>
          <MarqueeRow items={clientsRow3} trackClass="marquee-track-ltr-slow" />
        </div>
      </div>
    </section>
  );
};

export default Clients;
