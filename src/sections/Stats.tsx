import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';

const useCountUp = (end: number, duration = 2000, started: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return count;
};

const en = {
  overline: "BY THE NUMBERS",
  stats: [
    { value: 50, suffix: "M+", unit: "EGP", label: "Managed Ad Spend" },
    { value: 1400, suffix: "+", unit: "", label: "Property Sales Closed" },
    { value: 200, suffix: "K+", unit: "", label: "Qualified Leads" },
    { value: 35, suffix: "K", unit: "EGP", label: "Avg. Cost Per Sale" },
  ],
  micro: "See exactly where every pound goes, which leads close, and how fast deals happen — live.",
};

const ar = {
  overline: "بالأرقام",
  stats: [
    { value: 50, suffix: "M+", unit: "ج", label: "إجمالي الإنفاق الإعلاني" },
    { value: 1400, suffix: "+", unit: "", label: "وحدة عقارية متباعة" },
    { value: 200, suffix: "K+", unit: "", label: "ليد في قاعدة البيانات" },
    { value: 35, suffix: "K", unit: "ج", label: "متوسط تكلفة البيعة" },
  ],
  micro: "شوف بالظبط فين كل جنيه بيروح، أنهي ليدز بتتقفل، وبتحصل إزاي — لايف.",
};

const Stats = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '48px 0',
      }}
    >
      <div className="container">
        {/* Overline */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: 'var(--accent)', opacity: 0.4 }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}>
              {t.overline}
            </span>
            <span style={{ width: 32, height: 1, background: 'var(--accent)', opacity: 0.4 }} />
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}
        >
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                padding: '32px 40px',
                cursor: 'default',
                borderRight: i < t.stats.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'var(--transition-fast)',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,240,0,0.03)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
                {stat.unit && (
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    color: 'var(--accent)',
                    opacity: 0.7,
                  }}>
                    {stat.unit}
                  </span>
                )}
                <StatNumber value={stat.value} started={started} isAr={isAr} />
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 24,
                  color: 'var(--accent)',
                  opacity: 0.8,
                }}>
                  {stat.suffix}
                </span>
              </div>
              <div style={{
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: 'var(--t2)',
                marginTop: 12,
                lineHeight: 1.4,
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Microcopy */}
        <p style={{
          textAlign: 'center',
          marginTop: 48,
          fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: 'var(--t3)',
          maxWidth: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.6,
        }}>
          {t.micro}
        </p>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #stats .container > div:nth-child(2) {
            grid-template-columns: 1fr 1fr !important;
          }
          #stats .container > div:nth-child(2) > div {
            border-right: none !important;
            padding: 28px 24px !important;
          }
        }
        @media (max-width: 768px) {
          #stats .container > div:nth-child(2) {
            grid-template-columns: 1fr 1fr !important;
            gap: 0 !important;
            width: 100% !important;
            overflow: hidden !important;
          }
          #stats .container > div:nth-child(2) > div {
            border-right: none !important;
            padding: 28px 16px !important;
            text-align: center !important;
            overflow: hidden !important;
          }
          #stats .container > div:nth-child(2) > div > div:first-child span {
            font-size: clamp(32px, 9vw, 56px) !important;
            white-space: nowrap !important;
            overflow: hidden !important;
          }
          #stats .container > div:nth-child(2) > div > div:first-child span:first-child,
          #stats .container > div:nth-child(2) > div > div:first-child span:last-child {
            font-size: 0.45em !important;
          }
        }
      `}</style>
    </section>
  );
};

const StatNumber = ({ value, started, isAr }: { value: number; started: boolean; isAr: boolean }) => {
  const count = useCountUp(value, 2200, started);
  return (
    <span style={{
      fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
      fontSize: 'clamp(48px, 5vw, 72px)',
      color: 'var(--accent)',
      letterSpacing: '-0.03em',
      lineHeight: 1,
    }}>
      {count.toLocaleString()}
    </span>
  );
};

export default Stats;
