import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronDown } from 'lucide-react';
import { Lang } from '@/hooks/useLanguage';
import { fadeUp, stagger, slideLeft, slideRight } from '@/lib/animations';
import PrimaryButton from '@/components/PrimaryButton';
import OutlineButton from '@/components/OutlineButton';
import { useContactForm } from '@/contexts/ContactFormContext';

const en = {
  badge: "AI-Powered Real Estate System",
  line1: "The AI System That Runs",
  line2: "Real Estate Sales & Marketing.",
  sub: "Sky Leads isn't just a marketing tool. It's a complete AI system that builds your campaigns, manages them, analyzes performance, and optimizes results — from campaign creation to closed deals.",
  desc: "",
  micro: "Built on 7+ years of experience. 30M+ EGP managed.",
  cta1: "Start a Campaign",
  cta2: "Request a Free Demo",
  cta3: "See It In Action",
};

const ar = {
  badge: "نظام عقاري بالذكاء الاصطناعي",
  line1: "سكاي ليدز بلاتفورم متكاملة",
  line2: "بتدير مبيعات وتسويق",
  line3: "شركات العقارات بالكامل.",
  sub1: "مش مجرد أداة تسويق.",
  sub2: "ده نظام AI متكامل بيبني حملاتك",
  sub3: "وبيديرها ويحللها ويحسّنها.",
  sub4: "من أول إنشاء الكامبين لحد ما الـ Deal يتقفل.",
  micro1: "خبرة أكتر من ٧ سنين",
  micro2: "أكتر من ٣٠ مليون جنيه إنفاق إعلاني",
  cta1: "ابدأ كامبين",
  cta2: "اطلب نسخة تجريبية مجاناً",
  cta3: "شوف السيستم بيشتغل إزاي",
};

const enStages = [
  "Campaign Creation",
  "Lead Capture",
  "CRM Tracking",
  "Sales",
  "AI Analysis",
  "Campaign Improvement",
];
const arStages = [
  "إنشاء الحملة",
  "استقطاب العملاء",
  "متابعة الـ CRM",
  "المبيعات",
  "تحليل الـ AI",
  "تحسين الحملات",
];

interface HeroProps {
  lang: Lang;
}

const AILoop = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const stages = isAr ? arStages : enStages;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % 6);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hexagonal positions (6 nodes in a circle)
  const cx = 200;
  const cy = 185;
  const rx = 155;
  const ry = 145;
  const positions = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    return { x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) };
  });

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
      <svg viewBox="0 0 400 370" width="100%" height="100%">
        {/* Connection lines */}
        {positions.map((pos, i) => {
          const next = positions[(i + 1) % 6];
          const isActiveEdge = i === active;
          return (
            <g key={`line-${i}`}>
              <line
                x1={pos.x}
                y1={pos.y}
                x2={next.x}
                y2={next.y}
                stroke="rgba(200,240,0,0.12)"
                strokeWidth="1.5"
              />
              {/* Animated pulse on active edge */}
              {isActiveEdge && (
                <motion.circle
                  r="4"
                  fill="#c8f000"
                  initial={{ cx: pos.x, cy: pos.y, opacity: 0.9 }}
                  animate={{ cx: next.x, cy: next.y, opacity: 0 }}
                  transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
                />
              )}
            </g>
          );
        })}

        {/* Arrow indicators on edges */}
        {positions.map((pos, i) => {
          const next = positions[(i + 1) % 6];
          const midX = (pos.x + next.x) / 2;
          const midY = (pos.y + next.y) / 2;
          const angle = Math.atan2(next.y - pos.y, next.x - pos.x) * (180 / Math.PI);
          return (
            <g key={`arrow-${i}`} transform={`translate(${midX},${midY}) rotate(${angle})`}>
              <polygon
                points="-4,-3 4,0 -4,3"
                fill="rgba(200,240,0,0.25)"
              />
            </g>
          );
        })}

        {/* Stage nodes */}
        {positions.map((pos, i) => {
          const isActive = i === active;
          const nodeW = 120;
          const nodeH = 44;
          return (
            <motion.g
              key={`node-${i}`}
              animate={{
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              {/* Glow behind active */}
              {isActive && (
                <motion.ellipse
                  cx={pos.x}
                  cy={pos.y}
                  rx={nodeW / 2 + 12}
                  ry={nodeH / 2 + 10}
                  fill="none"
                  stroke="#c8f000"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              <rect
                x={pos.x - nodeW / 2}
                y={pos.y - nodeH / 2}
                width={nodeW}
                height={nodeH}
                rx={12}
                fill={isActive ? 'rgba(200,240,0,0.12)' : 'rgba(255,255,255,0.03)'}
                stroke={isActive ? '#c8f000' : 'rgba(255,255,255,0.1)'}
                strokeWidth={isActive ? 2 : 1}
              />
              {isActive && (
                <motion.rect
                  x={pos.x - nodeW / 2}
                  y={pos.y - nodeH / 2}
                  width={nodeW}
                  height={nodeH}
                  rx={12}
                  fill="none"
                  stroke="#c8f000"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ filter: 'blur(6px)' }}
                />
              )}
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? '#c8f000' : 'rgba(255,255,255,0.5)'}
                fontFamily={isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif"}
                fontWeight={isActive ? 700 : 500}
                fontSize={i === 5 ? 10 : 11.5}
                direction={isAr ? 'rtl' : 'ltr'}
              >
                {stages[i]}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

const Hero = ({ lang }: HeroProps) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;
  const { openForm } = useContactForm();

  return (
    <section
      style={{
        minHeight: '100vh',
        paddingTop: 0,
        paddingBottom: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blob 1 */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -100,
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(200,240,0,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Blob 2 */}
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(200,240,0,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Grid */}
      <div
        className="hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 80,
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '80px 48px 72px',
          position: 'relative',
          zIndex: 1,
          direction: isAr ? 'rtl' : 'ltr',
        }}
      >
        {/* LEFT — Text */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--accent-08)',
                border: '1px solid var(--accent-15)',
                borderRadius: 'var(--r-full)',
                padding: '8px 18px',
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                color: 'var(--accent)',
              }}
            >
              <Zap size={13} color="var(--accent)" />
              {t.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
            <h1
              style={{
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                fontWeight: isAr ? 700 : 800,
                fontSize: 'clamp(48px, 5vw, 72px)',
                lineHeight: isAr ? 1.4 : 1.0,
                letterSpacing: isAr ? '0.02em' : '-0.03em',
                wordSpacing: isAr ? '6px' : 'normal',
              }}
            >
              {isAr ? (
                <>
                  <span style={{ display: 'block', color: 'var(--t1)', marginBottom: 8 }}>{(t as typeof ar).line1}</span>
                  <span style={{ display: 'block', color: 'var(--accent)', marginBottom: 8 }}>{(t as typeof ar).line2}</span>
                  <span style={{ display: 'block', color: 'var(--accent)' }}>{(t as typeof ar).line3}</span>
                </>
              ) : (
                <>
                  <span style={{ display: 'block', color: 'var(--t1)' }}>{(t as typeof en).line1}</span>
                  <span style={{ display: 'block', color: 'var(--accent)' }}>{(t as typeof en).line2}</span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Sub — tagline */}
          <motion.div variants={fadeUp} style={{ marginBottom: 20, maxWidth: 520 }}>
            {isAr ? (
              <div style={{
                fontFamily: "'Tajawal', sans-serif",
                fontWeight: 500,
                fontSize: 18,
                color: 'var(--t2)',
                lineHeight: 1.9,
              }}>
                <span style={{ display: 'block', marginBottom: 4 }}>{(t as typeof ar).sub1}</span>
                <span style={{ display: 'block', marginBottom: 4 }}>{(t as typeof ar).sub2}</span>
                <span style={{ display: 'block', marginBottom: 4 }}>{(t as typeof ar).sub3}</span>
                <span style={{ display: 'block' }}>{(t as typeof ar).sub4}</span>
              </div>
            ) : (
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: 20,
                color: 'var(--t1)',
                lineHeight: 1.7,
              }}>
                {(t as typeof en).sub}
              </p>
            )}
          </motion.div>

          {/* Microcopy */}
          <motion.div
            variants={fadeUp}
            style={{
              fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              color: '#c8f000',
              marginBottom: 36,
              opacity: 0.7,
            }}
          >
            {isAr ? (
              <>
                <span style={{ display: 'block', marginBottom: 4 }}>{(t as typeof ar).micro1}</span>
                <span style={{ display: 'block' }}>{(t as typeof ar).micro2}</span>
              </>
            ) : (
              <span>{(t as typeof en).micro}</span>
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="hero-ctas"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              alignItems: isAr ? 'flex-end' : 'flex-start',
            }}
          >
            <div className="hero-cta-buttons" style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              alignItems: 'center',
              flexDirection: isAr ? 'row-reverse' : 'row',
            }}>
              <PrimaryButton
                label={t.cta1}
                size="lg"
                onClick={() => openForm('campaign')}
              />
              <OutlineButton
                label={t.cta2}
                onClick={() => openForm('demo')}
              />
            </div>
            <div className="hero-see-action">
              <button
                onClick={() => {
                  const nextSection = document.querySelector('section:nth-of-type(2)');
                  nextSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: 'var(--t3)',
                  padding: '8px 0',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--t3)'; }}
              >
                {t.cta3}
                <ChevronDown size={14} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — AI Loop Animation */}
        <motion.div
          className="hero-dashboard-card"
          variants={isAr ? slideRight : slideLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AILoop lang={lang} />
          </motion.div>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1440px) {
          .hero-grid {
            gap: 48px !important;
          }
          .hero-grid h1 {
            font-size: clamp(40px, 4.5vw, 60px) !important;
          }
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 80px 32px 60px !important;
            text-align: center !important;
          }
          .hero-grid > div:first-child > div {
            max-width: 100% !important;
          }
          .hero-ctas {
            align-items: center !important;
          }
          .hero-dashboard-card {
            width: 100% !important;
            max-width: 400px !important;
            margin: 0 auto !important;
          }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 60px 20px 40px !important;
            text-align: center !important;
          }
          .hero-grid h1 {
            font-size: clamp(28px, 7vw, 40px) !important;
            line-height: 1.1 !important;
          }
          .hero-grid p {
            font-size: 15px !important;
          }
          .hero-dashboard-card {
            width: 100% !important;
            max-width: 280px !important;
            margin: 0 auto !important;
          }
          .hero-ctas {
            align-items: stretch !important;
            width: 100% !important;
          }
          .hero-see-action {
            width: 100% !important;
          }
          .hero-see-action button {
            width: 100% !important;
            justify-content: center !important;
            min-height: 48px !important;
          }
          .hero-cta-buttons {
            flex-direction: column !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .hero-cta-buttons button {
            width: 100% !important;
            justify-content: center !important;
            min-height: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
