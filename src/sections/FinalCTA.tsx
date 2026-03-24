import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';
import PrimaryButton from '@/components/PrimaryButton';
import OutlineButton from '@/components/OutlineButton';
import { useContactForm } from '@/contexts/ContactFormContext';

const en = {
  overline: "READY TO SCALE?",
  line1: "Stop Guessing.",
  line2: "Start Closing Deals.",
  body: "This is the system that will change how real estate companies in Egypt run their marketing and sales. Start a campaign with us or request a demo to see the platform in action.",
  cta1: "Start a Campaign",
  cta2: "Request a Free Demo",
  trust: ["No commitment required", "30-minute call only", "Free campaign analysis"],
};

const ar = {
  overline: "ابدأ دلوقتي",
  line1: "خلاص متخمنش.",
  line2: "ابدأ تقفل Deals.",
  body: "ده السيستم اللي هيغير طريقة شركات العقارات في مصر ما بتدير التسويق والمبيعات. ابدأ كامبين معانا أو اطلب ديمو تشوف المنصة بنفسك.",
  cta1: "ابدأ كامبين",
  cta2: "اطلب نسخة تجريبية مجاناً",
  trust: ["من غير أي التزام", "٣٠ دقيقة بس", "تحليل كامبينز مجاني"],
};

const FinalCTA = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;
  const { openForm } = useContactForm();

  return (
    <section id="final-cta" style={{
      background: 'var(--bg)', padding: 'var(--section-py) 0',
      position: 'relative', overflow: 'hidden', textAlign: 'center',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(200,240,0,0.07) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(200,240,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,0,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="container"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Overline */}
        <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: 'var(--accent)', opacity: 0.4 }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 11,
              color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em',
            }}>{t.overline}</span>
            <span style={{ width: 32, height: 1, background: 'var(--accent)', opacity: 0.4 }} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2 variants={fadeUp} style={{
          fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
          fontWeight: isAr ? 700 : 800,
          fontSize: 'clamp(28px, 7vw, 96px)',
          lineHeight: isAr ? 1.4 : 1.0,
          letterSpacing: isAr ? '0.02em' : '-0.03em',
          wordSpacing: isAr ? '6px' : 'normal',
          marginBottom: 32,
        }}>
          <span style={{ display: 'block', color: 'var(--t1)', marginBottom: isAr ? 8 : 4 }}>{t.line1}</span>
          <span style={{ display: 'block', color: 'var(--accent)' }}>{t.line2}</span>
        </motion.h2>

        {/* Body */}
        <motion.p variants={fadeUp} style={{
          fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
          fontWeight: 400, fontSize: 18, color: 'var(--t2)',
          maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.7,
        }}>{t.body}</motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="finalcta-buttons" style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(200,240,0,0)',
                '0 0 40px 8px rgba(200,240,0,0.2)',
                '0 0 0 0 rgba(200,240,0,0)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block', borderRadius: 'var(--r-full)' }}
          >
            <PrimaryButton label={t.cta1} onClick={() => openForm('campaign')} size="lg" />
          </motion.div>
          <OutlineButton label={t.cta2} onClick={() => openForm('demo')} />
        </motion.div>

        {/* Trust */}
        <motion.div variants={fadeUp} style={{
          display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32,
        }}>
          {t.trust.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={15} color="var(--accent)" />
              <span style={{
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                fontWeight: 400, fontSize: 14, color: 'var(--t3)',
              }}>{item}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <style>{`
        @media (max-width: 768px) {
          .finalcta-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .finalcta-buttons > * {
            width: 100% !important;
          }
          .finalcta-buttons button {
            width: 100% !important;
            min-height: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FinalCTA;
