import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Brain, Building2, Crosshair } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';
import SectionHeader from '@/components/SectionHeader';

const icons = { Rocket, Brain, Building2, Crosshair };

const en = {
  overline: "HOW THE SYSTEM WORKS",
  title: "One Connected System.",
  titleAccent: "From Ad to Deal.",
  steps: [
    { number: "01", icon: "Rocket", title: "We Build Your Campaigns", body: "Sky Leads creates your ad campaigns from scratch — targeting, creatives, copy, and budget allocation — all optimized by AI from day one.", micro: "You don't lift a finger. We build it." },
    { number: "02", icon: "Brain", title: "AI Analyzes Your Campaigns", body: "The system monitors all campaigns 24/7, detects underperformance, and recommends exactly where to shift budget.", micro: "No more guessing which campaign works." },
    { number: "03", icon: "Building2", title: "Leads Enter the Smart CRM", body: "Every lead is captured, tracked, and scored by AI — hot, warm, or cold. Your team knows exactly who to call first.", micro: "The right lead, at the right time." },
    { number: "04", icon: "Crosshair", title: "Sales Activity Gets Tracked", body: "From first call to signed contract, every interaction is logged. The system shows where deals stall and why.", micro: "Full visibility on your sales pipeline." },
  ],
};

const ar = {
  overline: "إزاي السيستم بيشتغل",
  title: "نظام واحد متصل.",
  titleAccent: "من الإعلان للـ Deal.",
  steps: [
    { number: "01", icon: "Rocket", title: "بنبنيلك الكامبين", body: "Sky Leads بتنشئلك الكامبينز الإعلانية من الصفر — الاستهداف، الإعلانات، الكوبي، وتوزيع الميزانية — كلها متحسّنة بالـ AI من أول يوم.", micro: "مش بتعمل حاجة. إحنا بنبنيها." },
    { number: "02", icon: "Brain", title: "الـ AI بيحلل الكامبين", body: "السيستم بيراقب كل الكامبينز ٢٤/٧، بيكتشف الضعف، وبيقولك بالظبط فين تحوّل الميزانية.", micro: "خلاص مفيش تخمين أنهي كامبين شغال." },
    { number: "03", icon: "Building2", title: "الليدز بتدخل الـ CRM الذكي", body: "كل ليد بيتسجل وبيتتبع وبياخد score من الـ AI — سخن، فاتر، أو بارد. فريقك يعرف مين يكلمه الأول.", micro: "الليد الصح، في الوقت الصح." },
    { number: "04", icon: "Crosshair", title: "نشاط المبيعات بيتتبع", body: "من أول مكالمة لحد توقيع العقد، كل تفاعل متسجل. السيستم بيوريك فين الـ Deals بتقف وليه.", micro: "رؤية كاملة على مسار المبيعات." },
  ],
};

const HowItWorks = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="how-it-works" style={{ background: 'var(--bg-2)', padding: 'var(--section-py) 0' }}>
      <div className="container">
        <SectionHeader overline={t.overline} title={t.title} titleAccent={t.titleAccent} center isAr={isAr} />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hiw-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 72 }}
        >
          {t.steps.map((step, i) => {
            const IconComp = icons[step.icon as keyof typeof icons];
            const isHovered = hoveredIdx === i;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)',
                  padding: '36px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'var(--transition)',
                  ...(isHovered ? {
                    borderColor: 'rgba(200,240,0,0.2)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  } : {}),
                }}
              >
                {/* Connecting line */}
                {i < 3 && (
                  <div className="hiw-connector" style={{
                    position: 'absolute',
                    right: -12,
                    top: '50%',
                    width: 24,
                    height: 1,
                    background: 'linear-gradient(to right, var(--accent-15), transparent)',
                    zIndex: 10,
                  }} />
                )}

                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                  <div style={{
                    width: 40, height: 40,
                    background: 'var(--accent-08)',
                    border: '1px solid var(--accent-15)',
                    borderRadius: 'var(--r-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700, fontSize: 14, color: 'var(--accent)', letterSpacing: '0.05em',
                  }}>
                    {step.number}
                  </div>
                  <div style={{
                    width: 44, height: 44,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'var(--transition)',
                  }}>
                    <IconComp size={20} color={isHovered ? 'var(--accent)' : 'var(--t3)'} />
                  </div>
                </div>

                <h3 style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: 22, color: '#ffffff',
                  lineHeight: 1.3, letterSpacing: isAr ? 0 : '-0.02em', marginBottom: 12,
                }}>{step.title}</h3>

                <p style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                  fontWeight: 400, fontSize: 18, color: '#e8e8e8', lineHeight: 1.85, marginBottom: 20,
                }}>{step.body}</p>

                {/* Micro */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  paddingTop: 20, borderTop: '1px solid var(--border)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                    fontWeight: 400, fontSize: 14, color: '#a0a0a0', fontStyle: 'italic',
                  }}>{step.micro}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hiw-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hiw-connector { display: none !important; }
        }
        @media (max-width: 768px) {
          .hiw-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .hiw-grid > div { padding: 24px 20px !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
